/*
  # Initial Schema for DocuMaster

  1. New Tables
    - `profiles`: User profiles with subscription info
    - `documents`: Processed documents storage
    - `teams`: Team collaboration
    - `team_members`: Team membership
    - `document_comments`: Comments on documents
    - `usage_logs`: Track usage for limits
    - `blog_posts`: Blog content storage

  2. Security
    - Enable RLS on all tables
    - Policies for authenticated users to access only their own data
    - Team members can access team documents

  3. Notes
    - Uses UUID for all primary keys
    - Timestamps for tracking
    - Cascading deletes for related data
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  name text DEFAULT '',
  avatar_url text,
  plan text DEFAULT 'free' CHECK (plan IN ('free', 'premium', 'team')),
  plan_expires timestamptz,
  storage_used bigint DEFAULT 0,
  storage_limit bigint DEFAULT 104857600, -- 100 MB for free users
  operations_limit int DEFAULT 5,
  operations_used int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  team_id uuid,
  name text NOT NULL,
  original_name text,
  type text NOT NULL,
  size bigint DEFAULT 0,
  storage_path text,
  is_public boolean DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own documents"
  ON documents FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can create own documents"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents"
  ON documents FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents"
  ON documents FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  owner_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team owners can manage teams"
  ON teams FOR ALL
  TO authenticated
  USING (auth.uid() = owner_id);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  role text DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at timestamptz DEFAULT now(),
  UNIQUE (team_id, user_id)
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view teams they belong to"
  ON team_members FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM teams WHERE teams.id = team_id AND teams.owner_id = auth.uid()
    )
  );

CREATE POLICY "Team owners can add members"
  ON team_members FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM teams WHERE teams.id = team_id AND teams.owner_id = auth.uid()
    )
  );

-- Document comments table
CREATE TABLE IF NOT EXISTS document_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  page_number int,
  position_x float,
  position_y float,
  resolved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE document_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Document owners can view comments"
  ON document_comments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM documents WHERE documents.id = document_id AND documents.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM documents d
      JOIN team_members tm ON tm.team_id = d.team_id
      WHERE d.id = document_id AND tm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can comment on accessible documents"
  ON document_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Usage logs table
CREATE TABLE IF NOT EXISTS usage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  operation text NOT NULL,
  file_size bigint DEFAULT 0,
  duration_ms int DEFAULT 0,
  success boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own usage"
  ON usage_logs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can log usage"
  ON usage_logs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text,
  content text,
  image_url text,
  category text,
  author text DEFAULT 'Hamdan',
  published boolean DEFAULT false,
  published_at timestamptz,
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published posts are public"
  ON blog_posts FOR SELECT
  USING (published = true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_documents_user ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_team ON documents(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user ON team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_user ON usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_created ON usage_logs(created_at);

-- Function to handle_new_user function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

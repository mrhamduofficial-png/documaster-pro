import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import {
  FileText,
  Layers,
  Users,
  HardDrive,
  Zap,
  Crown,
  BarChart3,
  Upload
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  created_at: string;
}

interface Team {
  id: string;
  name: string;
  members: number;
}

export default function Dashboard() {
  const { user, isPremium, checkPremium } = useAuthStore();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      checkPremium();
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      // Fetch recent documents
      const { data: docs } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (docs) setDocuments(docs as Document[]);

      // Fetch teams
      const { data: teamData } = await supabase
        .from('team_members')
        .select('team_id, teams(id, name)')
        .eq('user_id', user.id);

      if (teamData) {
        const teamsList = teamData.map((t: any) => ({
          id: t.team_id,
          name: t.teams?.name || 'Team',
          members: 0
        }));
        setTeams(teamsList);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!user) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold text-secondary-900 mb-4">Sign in to access your dashboard</h1>
        <Link to="/auth" className="btn btn-primary">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">Welcome back!</h1>
          <p className="text-secondary-600">Manage your documents, tools, and subscriptions.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-secondary-600">Documents</p>
                <p className="text-xl font-bold text-secondary-900">{documents.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <p className="text-sm text-secondary-600">Operations</p>
                <p className="text-xl font-bold text-secondary-900">
                  {isPremium ? 'Unlimited' : '5/day'}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                <HardDrive className="w-5 h-5 text-warning-600" />
              </div>
              <div>
                <p className="text-sm text-secondary-600">Storage</p>
                <p className="text-xl font-bold text-secondary-900">{isPremium ? '5 GB' : '100 MB'}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-secondary-600" />
              </div>
              <div>
                <p className="text-sm text-secondary-600">Teams</p>
                <p className="text-xl font-bold text-secondary-900">{teams.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade Banner */}
        {!isPremium && (
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Crown className="w-6 h-6" /> Upgrade to Premium
                </h3>
                <p className="text-white/80">Unlock unlimited tools, faster processing, and team features.</p>
              </div>
              <Link to="/pricing" className="btn bg-white text-primary-600 hover:bg-secondary-100">
                View Plans
              </Link>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Documents */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-secondary-900">Recent Documents</h2>
                <Link to="/tools" className="text-sm text-primary-600 hover:text-primary-700">
                  View All Tools
                </Link>
              </div>

              {loading ? (
                <div className="text-center py-8 text-secondary-600">Loading...</div>
              ) : documents.length === 0 ? (
                <div className="text-center py-8">
                  <Upload className="w-12 h-12 text-secondary-300 mx-auto mb-3" />
                  <p className="text-secondary-600">No documents yet</p>
                  <p className="text-sm text-secondary-500">Use our tools to process your first document</p>
                  <Link to="/tools" className="btn btn-primary mt-4">Start Now</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary-600" />
                        <div>
                          <p className="font-medium text-secondary-900">{doc.name}</p>
                          <p className="text-sm text-secondary-500">{doc.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-secondary-600">{formatBytes(doc.size)}</p>
                        <p className="text-xs text-secondary-400">
                          {new Date(doc.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Tools */}
          <div>
            <div className="card mb-4">
              <h2 className="text-lg font-bold text-secondary-900 mb-4">Quick Tools</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { to: '/tools/pdf-merge', label: 'Merge PDF', icon: Layers },
                  { to: '/tools/pdf-split', label: 'Split PDF', icon: FileText },
                  { to: '/tools/pdf-compress', label: 'Compress', icon: HardDrive },
                  { to: '/tools/image-converter', label: 'Convert', icon: Upload }
                ].map((tool) => (
                  <Link
                    key={tool.to}
                    to={tool.to}
                    className="p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
                  >
                    <tool.icon className="w-5 h-5 text-primary-600 mb-2" />
                    <p className="text-sm font-medium text-secondary-700">{tool.label}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Premium Features */}
            {isPremium && (
              <div className="card bg-gradient-to-br from-primary-50 to-accent-50">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-accent-600" />
                  <h2 className="text-lg font-bold text-secondary-900">Premium Active</h2>
                </div>
                <ul className="space-y-2 text-sm text-secondary-700">
                  <li>Unlimited operations</li>
                  <li>100 MB file limit</li>
                  <li>No ads</li>
                  <li>Priority support</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Usage Analytics */}
        <div className="mt-8 card">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-bold text-secondary-900">Usage This Month</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'PDFs Merged', value: 12 },
              { label: 'PDFs Split', value: 5 },
              { label: 'Files Converted', value: 8 },
              { label: 'OCR Scans', value: 3 }
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-sm text-secondary-600">{stat.label}</p>
                <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

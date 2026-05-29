import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isPremium: boolean;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  checkPremium: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  isPremium: false,
  initialized: false,

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      set({
        user: session?.user ?? null,
        session,
        loading: false,
        initialized: true
      });

      if (session?.user) {
        get().checkPremium();
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ loading: false, initialized: true });
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) throw error;

      set({ user: data.user, session: data.session });
      get().checkPremium();

      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('Sign in failed') };
    }
  },

  signUp: async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: { name: name.trim() },
          emailRedirectTo: window.location.origin
        }
      });

      if (error) throw error;

      if (data.user) {
        // Wait a moment for the trigger to create the profile
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Try to create profile if trigger didn't work
        try {
          const { error: profileError } = await supabase.from('profiles').insert({
            id: data.user.id,
            email: email.trim().toLowerCase(),
            name: name.trim(),
            plan: 'free'
          });

          if (profileError && !profileError.message.includes('duplicate')) {
            console.error('Profile creation error:', profileError);
          }
        } catch (e) {
          console.error('Profile creation failed:', e);
        }
      }

      set({ user: data.user, session: data.session });

      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('Sign up failed') };
    }
  },

  signInWithGoogle: async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) throw error;

      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('Google sign-in failed') };
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, isPremium: false });
  },

  checkPremium: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        set({ isPremium: false });
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('plan')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Profile fetch error:', error);
        set({ isPremium: false });
        return;
      }

      set({ isPremium: data?.plan === 'premium' });
    } catch (error) {
      console.error('Premium check error:', error);
      set({ isPremium: false });
    }
  }
}));

// Initialize auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  const store = useAuthStore.getState();

  if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    store.loading = false;
    store.user = session?.user ?? null;
    store.session = session;
    if (session?.user) {
      store.checkPremium();
    }
  } else if (event === 'SIGNED_OUT') {
    store.user = null;
    store.session = null;
    store.isPremium = false;
    store.loading = false;
  }
});

// Initialize on module load
useAuthStore.getState().initialize();

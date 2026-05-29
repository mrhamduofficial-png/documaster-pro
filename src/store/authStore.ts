import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isPremium: boolean;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkPremium: () => Promise<void>;
  setUser: (user: User | null) => void;
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
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    set({ user: data.user, session: data.session });
    get().checkPremium();
  },

  signUp: async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: window.location.origin
      }
    });
    if (error) throw error;

    if (data.user) {
      try {
        await supabase.from('profiles').insert({
          id: data.user.id,
          email,
          name,
          plan: 'free',
          created_at: new Date().toISOString()
        });
      } catch (profileError) {
        console.error('Profile creation error:', profileError);
      }
    }
    set({ user: data.user, session: data.session });
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
      const { data } = await supabase
        .from('profiles')
        .select('plan')
        .eq('id', user.id)
        .maybeSingle();
      set({ isPremium: data?.plan === 'premium' });
    } catch (error) {
      console.error('Premium check error:', error);
      set({ isPremium: false });
    }
  },

  setUser: (user) => set({ user, loading: false })
}));

// Initialize auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  const store = useAuthStore.getState();

  if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    store.setUser(session?.user ?? null);
    if (session?.user) {
      store.checkPremium();
    }
  } else if (event === 'SIGNED_OUT') {
    store.setUser(null);
    store.isPremium = false;
  }
});

// Initialize on module load
useAuthStore.getState().initialize();

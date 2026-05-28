import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isPremium: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkPremium: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,
  isPremium: false,

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    set({ user: data.user, session: data.session });
  },

  signUp: async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });
    if (error) throw error;

    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        email,
        name,
        plan: 'free'
      });
    }
    set({ user: data.user, session: data.session });
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, isPremium: false });
  },

  checkPremium: async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      set({ isPremium: false });
      return;
    }
    const { data } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single();
    set({ isPremium: data?.plan === 'premium' });
  },

  setUser: (user) => set({ user, loading: false })
}));

// Initialize auth state
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    useAuthStore.getState().setUser(session?.user ?? null);
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.getState().setUser(null);
  }
});

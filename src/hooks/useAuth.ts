import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(() => {
    return localStorage.getItem('morello_guest_mode') === 'true';
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setGuestMode(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const setGuestMode = (enabled: boolean) => {
    setIsGuest(enabled);
    if (enabled) {
      localStorage.setItem('morello_guest_mode', 'true');
    } else {
      localStorage.removeItem('morello_guest_mode');
    }
  };

  const signIn = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    setGuestMode(false);
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return { user, isGuest, loading, signIn, signOut, setGuestMode };
};

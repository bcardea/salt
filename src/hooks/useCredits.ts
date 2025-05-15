import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Credits {
  credits_remaining: number;
  next_reset_at: string;
}

export function useCredits() {
  const [credits, setCredits] = useState<Credits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchCredits = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // If no user is authenticated, just set loading to false and return
      if (!user) {
        setLoading(false);
        setCredits(null);
        return;
      }

      const { data: userCredits, error: creditsError } = await supabase
        .from('user_credits')
        .select('credits_remaining, next_reset_at')
        .single();

      if (creditsError) {
        // If no record exists, create one for the user
        if (creditsError.code === 'PGRST116') {
          const { data: newCredits, error: insertError } = await supabase
            .from('user_credits')
            .insert({
              user_id: user.id // Explicitly set the user_id to match RLS policy
            })
            .select('credits_remaining, next_reset_at')
            .single();

          if (insertError) throw insertError;
          setCredits(newCredits);
          return;
        }
        throw creditsError;
      }

      setCredits(userCredits);
    } catch (err) {
      console.error('Error fetching credits:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch credits');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        fetchCredits();
      } else {
        setCredits(null);
        setLoading(false);
      }
    });

    // Initial auth check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      if (session) {
        fetchCredits();
      } else {
        setLoading(false);
      }
    });

    // Set up realtime subscription only if authenticated
    let channel: ReturnType<typeof supabase.channel> | null = null;
    if (isAuthenticated) {
      channel = supabase
        .channel('credits_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'user_credits',
          },
          () => {
            fetchCredits();
          }
        )
        .subscribe();
    }

    // Cleanup
    return () => {
      subscription?.unsubscribe();
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [isAuthenticated]);

  return { credits, loading, error, refetch: fetchCredits };
}
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

  const fetchCredits = async () => {
    try {
      const { data: userCredits, error: creditsError } = await supabase
        .from('user_credits')
        .select('credits_remaining, next_reset_at')
        .single();

      if (creditsError) {
        // If no record exists, create one for the user
        if (creditsError.code === 'PGRST116') {
          const { data: newCredits, error: insertError } = await supabase
            .from('user_credits')
            .insert({})
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
    fetchCredits();

    // Subscribe to changes
    const channel = supabase
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

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { credits, loading, error, refetch: fetchCredits };
}
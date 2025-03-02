import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../auth/useAuth';

interface UseIsSubscribedResult {
  isSubscribed: boolean;
  isLoading: boolean;
  error: Error | null;
}

export function useIsSubscribed(courseId: string): UseIsSubscribedResult {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const checkSubscription = async () => {
      if (!user) {
        setIsSubscribed(false);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const { data, error: supabaseError } = await supabase
          .from('subscriptions')
          .select('id')
          .eq('user_id', user.id)
          .eq('course_id', courseId)
          .single();

        if (supabaseError && supabaseError.code !== 'PGRST116') {
          throw supabaseError;
        }

        setIsSubscribed(!!data);
      } catch (err) {
        console.error('Error checking subscription:', err);
        setError(err instanceof Error ? err : new Error('Failed to check subscription status'));
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscription();
  }, [courseId, user]);

  return {
    isSubscribed,
    isLoading,
    error,
  };
}

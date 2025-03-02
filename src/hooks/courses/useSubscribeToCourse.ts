import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../auth/useAuth';

interface UseSubscribeToCourseResult {
  subscribe: (courseId: string) => Promise<void>;
  isSubscribing: boolean;
  subscriptionError: Error | null;
}

export function useSubscribeToCourse(): UseSubscribeToCourseResult {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState<Error | null>(null);
  const { user } = useAuth();

  const subscribe = async (courseId: string) => {
    if (!user) {
      throw new Error('You must be logged in to subscribe to a course');
    }

    try {
      setIsSubscribing(true);
      setSubscriptionError(null);

      // Check if user is already subscribed
      const { data: existingSubscription, error: checkError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Check subscription error:', checkError);
        throw checkError;
      }

      if (existingSubscription) {
        throw new Error('You are already subscribed to this course');
      }

      // Create new subscription
      const { data: newSubscription, error: subscribeError } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          course_id: courseId,
          start_date: new Date().toISOString().split('T')[0], // Just the date part
          end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
          payment_status: 'pending',
        })
        .select()
        .single();

      if (subscribeError) {
        console.error('Subscribe error:', subscribeError);
        throw new Error(`Failed to subscribe: ${subscribeError.message}`);
      }

      if (!newSubscription) {
        throw new Error('No subscription was created');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to subscribe to course';
      const error = new Error(errorMessage);
      setSubscriptionError(error);
      throw error;
    } finally {
      setIsSubscribing(false);
    }
  };

  return {
    subscribe,
    isSubscribing,
    subscriptionError,
  };
}

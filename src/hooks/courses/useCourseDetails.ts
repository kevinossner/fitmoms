import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Database } from '../../types/database.types';

type Course = Database['public']['Tables']['courses']['Row'];

interface UseCourseDetailsResult {
  course: Course | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useCourseDetails(courseId: string): UseCourseDetailsResult {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCourseDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (supabaseError) {
        throw supabaseError;
      }

      setCourse(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch course details'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  return {
    course,
    isLoading,
    error,
    refetch: fetchCourseDetails,
  };
}

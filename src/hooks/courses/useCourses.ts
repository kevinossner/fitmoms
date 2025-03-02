import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Database } from '../../types/database.types';

type Course = Database['public']['Tables']['courses']['Row'];

interface UseCoursesResult {
  courses: Course[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useCourses(): UseCoursesResult {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('courses')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      setCourses(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch courses'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    isLoading,
    error,
    refetch: fetchCourses,
  };
}

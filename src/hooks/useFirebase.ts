import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FirebaseService,
  Contact,
  Experience,
  Project,
  Skill,
  contactService,
  experienceService,
  projectService,
  skillService
} from '@/lib/firebase/services';

// Generic hook for Firebase operations
function useFirebaseEntity<T>(service: FirebaseService<T>, entityName: string) {
  const queryClient = useQueryClient();

  // Get all entities
  const useGetAll = () => {
    return useQuery({
      queryKey: [entityName],
      queryFn: () => service.getAll(),
    });
  };

  // Get entity by ID
  const useGetById = (id: string) => {
    return useQuery({
      queryKey: [entityName, id],
      queryFn: () => service.getById(id),
      enabled: !!id,
    });
  };

  // Create entity
  const useCreate = () => {
    return useMutation({
      mutationFn: (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => service.create(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [entityName] });
      },
    });
  };

  // Update entity
  const useUpdate = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<T> }) => service.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [entityName] });
      },
    });
  };

  // Delete entity
  const useDelete = () => {
    return useMutation({
      mutationFn: (id: string) => service.delete(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [entityName] });
      },
    });
  };

  // Query by field
  const useQueryByField = (field: string, value: any) => {
    return useQuery({
      queryKey: [entityName, 'query', field, value],
      queryFn: () => service.queryByField(field, value),
      enabled: !!field && value !== undefined,
    });
  };

  // Real-time subscription
  const useSubscribe = () => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      setLoading(true);
      const unsubscribe = service.subscribe((newData) => {
        setData(newData);
        setLoading(false);
        setError(null);
      });

      return () => {
        unsubscribe();
      };
    }, []);

    return { data, loading, error };
  };

  return {
    useGetAll,
    useGetById,
    useCreate,
    useUpdate,
    useDelete,
    useQueryByField,
    useSubscribe,
  };
}

// Specific hooks for each entity
export const useContacts = () => useFirebaseEntity<Contact>(contactService, 'contacts');
export const useExperiences = () => useFirebaseEntity<Experience>(experienceService, 'experiences');
export const useProjects = () => useFirebaseEntity<Project>(projectService, 'projects');
export const useSkills = () => useFirebaseEntity<Skill>(skillService, 'skills');

// Convenience hooks for common operations
export const useAllContacts = () => useContacts().useGetAll();
export const useAllExperiences = () => useExperiences().useGetAll();
export const useAllProjects = () => useProjects().useGetAll();
export const useAllSkills = () => useSkills().useGetAll();

// Featured/filtered data hooks
export const useFeaturedProjects = () => {
  return useProjects().useQueryByField('featured', true);
};

export const useFeaturedSkills = () => {
  return useSkills().useQueryByField('is_featured', true);
};

export const useCurrentExperience = () => {
  return useExperiences().useQueryByField('is_current', true);
};

export const useProjectsByCategory = (category: string) => {
  return useProjects().useQueryByField('category', category);
};

export const useSkillsByCategory = (category: string) => {
  return useSkills().useQueryByField('category', category);
};
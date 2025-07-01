// Firebase services and types
export {
  contactService as Contact,
  experienceService as Experience,
  projectService as Project,
  skillService as Skill,
  type Contact as ContactType,
  type Experience as ExperienceType,
  type Project as ProjectType,
  type Skill as SkillType
} from '@/lib/firebase/services';

// Firebase auth
export { auth as User } from '@/lib/firebase/config';

// Firebase hooks
export {
  useContacts,
  useExperiences,
  useProjects,
  useSkills,
  useAllContacts,
  useAllExperiences,
  useAllProjects,
  useAllSkills,
  useFeaturedProjects,
  useFeaturedSkills,
  useCurrentExperience,
  useProjectsByCategory,
  useSkillsByCategory
} from '@/hooks/useFirebase';

import {
  contactService,
  experienceService,
  projectService,
  skillService,
  Contact,
  Experience,
  Project,
  Skill
} from '@/lib/firebase/services';

// Sample data based on the JSON schemas
const sampleContacts: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    subject: "Portfolio Inquiry",
    message: "I'm interested in discussing a potential project collaboration.",
    status: "new",
    priority: "medium"
  }
];

const sampleExperiences: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    company: "Tech Company Inc.",
    position: "Senior Full Stack Developer",
    description: "Led development of scalable web applications using React, Node.js, and cloud technologies.",
    start_date: "2022-01-01",
    end_date: null,
    location: "Remote",
    company_logo: "/logos/tech-company.png",
    technologies: ["React", "Node.js", "TypeScript", "AWS"],
    is_current: true
  },
  {
    company: "Startup Solutions",
    position: "Frontend Developer",
    description: "Developed responsive web applications and improved user experience.",
    start_date: "2020-06-01",
    end_date: "2021-12-31",
    location: "New York, NY",
    company_logo: "/logos/startup-solutions.png",
    technologies: ["React", "JavaScript", "CSS", "Redux"],
    is_current: false
  }
];

const sampleProjects: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with React and TypeScript.",
    image_url: "/projects/portfolio.png",
    demo_url: "https://your-portfolio.com",
    github_url: "https://github.com/yourusername/portfolio",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    category: "web",
    featured: true,
    status: "completed"
  },
  {
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration.",
    image_url: "/projects/ecommerce.png",
    demo_url: "https://demo-ecommerce.com",
    github_url: "https://github.com/yourusername/ecommerce",
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    category: "web",
    featured: true,
    status: "completed"
  }
];

const sampleSkills: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: "React",
    category: "frontend",
    proficiency: 90,
    icon: "react",
    years_experience: 4,
    is_featured: true
  },
  {
    name: "TypeScript",
    category: "frontend",
    proficiency: 85,
    icon: "typescript",
    years_experience: 3,
    is_featured: true
  },
  {
    name: "Node.js",
    category: "backend",
    proficiency: 80,
    icon: "nodejs",
    years_experience: 3,
    is_featured: true
  },
  {
    name: "Firebase",
    category: "backend",
    proficiency: 75,
    icon: "firebase",
    years_experience: 2,
    is_featured: false
  }
];

// Migration functions
export async function migrateContacts() {
  console.log('Migrating contacts...');
  for (const contact of sampleContacts) {
    try {
      await contactService.create(contact);
      console.log(`✅ Created contact: ${contact.name}`);
    } catch (error) {
      console.error(`❌ Failed to create contact ${contact.name}:`, error);
    }
  }
}

export async function migrateExperiences() {
  console.log('Migrating experiences...');
  for (const experience of sampleExperiences) {
    try {
      await experienceService.create(experience);
      console.log(`✅ Created experience: ${experience.position} at ${experience.company}`);
    } catch (error) {
      console.error(`❌ Failed to create experience ${experience.position}:`, error);
    }
  }
}

export async function migrateProjects() {
  console.log('Migrating projects...');
  for (const project of sampleProjects) {
    try {
      await projectService.create(project);
      console.log(`✅ Created project: ${project.title}`);
    } catch (error) {
      console.error(`❌ Failed to create project ${project.title}:`, error);
    }
  }
}

export async function migrateSkills() {
  console.log('Migrating skills...');
  for (const skill of sampleSkills) {
    try {
      await skillService.create(skill);
      console.log(`✅ Created skill: ${skill.name}`);
    } catch (error) {
      console.error(`❌ Failed to create skill ${skill.name}:`, error);
    }
  }
}

// Main migration function
export async function migrateAllData() {
  console.log('🚀 Starting Firebase migration...');
  
  try {
    await migrateContacts();
    await migrateExperiences();
    await migrateProjects();
    await migrateSkills();
    
    console.log('✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

// Function to clear all data (use with caution)
export async function clearAllData() {
  console.log('🗑️ Clearing all Firebase data...');
  
  try {
    // Get all data first
    const [contacts, experiences, projects, skills] = await Promise.all([
      contactService.getAll(),
      experienceService.getAll(),
      projectService.getAll(),
      skillService.getAll()
    ]);
    
    // Delete all data
    const deletePromises = [
      ...contacts.map(contact => contactService.delete(contact.id)),
      ...experiences.map(exp => experienceService.delete(exp.id)),
      ...projects.map(project => projectService.delete(project.id)),
      ...skills.map(skill => skillService.delete(skill.id))
    ];
    
    await Promise.all(deletePromises);
    console.log('✅ All data cleared successfully!');
  } catch (error) {
    console.error('❌ Failed to clear data:', error);
  }
}
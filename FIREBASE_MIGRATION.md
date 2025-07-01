# Firebase Migration Guide

This guide will help you migrate your portfolio data from SuperDev to Firebase Realtime Database.

## 🚀 Quick Start

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable **Realtime Database**:
   - Go to "Realtime Database" in the left sidebar
   - Click "Create Database"
   - Choose "Start in test mode" for development
   - Select your preferred location

### 2. Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select "Web" (</>) 
4. Register your app with a nickname
5. Copy the Firebase configuration object

### 3. Environment Variables Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Firebase configuration in `.env`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com/
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### 4. Run Migration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the migration page (you'll need to add this route)
3. Use the Firebase Migration component to migrate your data

## 📁 File Structure

The migration adds these new files:

```
src/
├── lib/
│   └── firebase/
│       ├── config.ts          # Firebase configuration
│       └── services.ts        # Firebase CRUD services
├── hooks/
│   └── useFirebase.ts         # React hooks for Firebase
├── utils/
│   └── migrate-to-firebase.ts # Migration utilities
├── components/
│   └── FirebaseMigration.tsx  # Migration UI component
└── entities/
    └── index.ts               # Updated to use Firebase
```

## 🔄 Data Structure

Your Firebase Realtime Database will have this structure:

```json
{
  "contacts": {
    "contact_id_1": {
      "id": "contact_id_1",
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Portfolio Inquiry",
      "message": "...",
      "status": "new",
      "priority": "medium",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  },
  "experiences": {
    "exp_id_1": {
      "id": "exp_id_1",
      "company": "Tech Company Inc.",
      "position": "Senior Developer",
      "description": "...",
      "start_date": "2022-01-01",
      "end_date": null,
      "location": "Remote",
      "company_logo": "/logos/tech-company.png",
      "technologies": ["React", "Node.js"],
      "is_current": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  },
  "projects": {
    "project_id_1": {
      "id": "project_id_1",
      "title": "Portfolio Website",
      "description": "...",
      "image_url": "/projects/portfolio.png",
      "demo_url": "https://demo.com",
      "github_url": "https://github.com/user/repo",
      "technologies": ["React", "TypeScript"],
      "category": "web",
      "featured": true,
      "status": "completed",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  },
  "skills": {
    "skill_id_1": {
      "id": "skill_id_1",
      "name": "React",
      "category": "frontend",
      "proficiency": 90,
      "icon": "react",
      "years_experience": 4,
      "is_featured": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

## 🎣 Using Firebase Hooks

Replace SuperDev entity usage with Firebase hooks:

### Before (SuperDev):
```tsx
import { Project } from '@/entities';

function ProjectsList() {
  const { data: projects } = Project.useQuery();
  // ...
}
```

### After (Firebase):
```tsx
import { useAllProjects, useFeaturedProjects } from '@/entities';

function ProjectsList() {
  const { data: projects } = useAllProjects();
  const { data: featuredProjects } = useFeaturedProjects();
  // ...
}
```

### Available Hooks:

```tsx
// Get all data
const { data, isLoading, error } = useAllContacts();
const { data, isLoading, error } = useAllExperiences();
const { data, isLoading, error } = useAllProjects();
const { data, isLoading, error } = useAllSkills();

// Filtered data
const { data } = useFeaturedProjects();
const { data } = useFeaturedSkills();
const { data } = useCurrentExperience();
const { data } = useProjectsByCategory('web');
const { data } = useSkillsByCategory('frontend');

// CRUD operations
const contacts = useContacts();
const createContact = contacts.useCreate();
const updateContact = contacts.useUpdate();
const deleteContact = contacts.useDelete();

// Real-time subscriptions
const { data, loading, error } = contacts.useSubscribe();
```

## 🔧 Customizing Migration Data

To migrate your actual data instead of sample data:

1. Edit `src/utils/migrate-to-firebase.ts`
2. Replace the sample data arrays with your actual data
3. Or create functions to read from your existing JSON files:

```tsx
import contactsJson from '../../entities/Contact.json';

// Convert your existing data format to Firebase format
const convertContacts = (existingData: any[]) => {
  return existingData.map(contact => ({
    name: contact.name,
    email: contact.email,
    // ... map other fields
  }));
};
```

## 🔒 Security Rules

For production, update your Firebase Realtime Database rules:

```json
{
  "rules": {
    "contacts": {
      ".write": "auth != null",
      ".read": "auth != null"
    },
    "experiences": {
      ".write": "auth != null",
      ".read": true
    },
    "projects": {
      ".write": "auth != null",
      ".read": true
    },
    "skills": {
      ".write": "auth != null",
      ".read": true
    }
  }
}
```

## 🚨 Troubleshooting

### Common Issues:

1. **"Permission denied" errors**:
   - Check your Firebase Database rules
   - Ensure you're in "test mode" for development

2. **"Firebase not initialized" errors**:
   - Verify your `.env` file has all required variables
   - Check that variable names start with `VITE_`

3. **"Network request failed" errors**:
   - Verify your `VITE_FIREBASE_DATABASE_URL` is correct
   - Check your internet connection

4. **Data not appearing**:
   - Check the Firebase Console to see if data was written
   - Verify your component is using the correct hooks

### Debug Mode:

Add this to your Firebase config for debugging:

```tsx
// In src/lib/firebase/config.ts
import { connectDatabaseEmulator } from 'firebase/database';

// For local development
if (import.meta.env.DEV) {
  // connectDatabaseEmulator(database, 'localhost', 9000);
}
```

## 📚 Next Steps

1. **Update Components**: Replace SuperDev entity usage with Firebase hooks
2. **Add Authentication**: Implement Firebase Auth if needed
3. **Optimize Queries**: Use Firebase query methods for better performance
4. **Add Offline Support**: Implement Firebase offline capabilities
5. **Set up Hosting**: Deploy to Firebase Hosting

## 🔗 Useful Links

- [Firebase Documentation](https://firebase.google.com/docs)
- [Realtime Database Guide](https://firebase.google.com/docs/database)
- [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)
- [Firebase Security Rules](https://firebase.google.com/docs/database/security)
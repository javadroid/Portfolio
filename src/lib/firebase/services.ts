/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, push, set, get, remove, update, query, orderByChild, equalTo, onValue, off } from 'firebase/database';
import { database } from './config';

// Generic Firebase service class
export class FirebaseService<T> {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  // Create a new document
  async create(data: Omit<T, 'id'>): Promise<string> {
    const collectionRef = ref(database, this.collectionName);
    const newDocRef = push(collectionRef);
    await set(newDocRef, {
      ...data,
      id: newDocRef.key,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return newDocRef.key!;
  }

  // Get all documents
  async getAll(): Promise<T[]> {
    const collectionRef = ref(database, this.collectionName);
    const snapshot = await get(collectionRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data) as T[];
    }
    return [];
  }

  // Get document by ID
  async getById(id: string): Promise<T | null> {
    const docRef = ref(database, `${this.collectionName}/${id}`);
    const snapshot = await get(docRef);
    if (snapshot.exists()) {
      return snapshot.val() as T;
    }
    return null;
  }

  // Update document
  async update(id: string, data: Partial<T>): Promise<void> {
    const docRef = ref(database, `${this.collectionName}/${id}`);
    await update(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
  }

  // Delete document
  async delete(id: string): Promise<void> {
    const docRef = ref(database, `${this.collectionName}/${id}`);
    await remove(docRef);
  }

  // Query documents by field
  async queryByField(field: string, value: any): Promise<T[]> {
    const collectionRef = ref(database, this.collectionName);
    const queryRef = query(collectionRef, orderByChild(field), equalTo(value));
    const snapshot = await get(queryRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data) as T[];
    }
    return [];
  }

  // Subscribe to real-time updates
  subscribe(callback: (data: T[]) => void): () => void {
    const collectionRef = ref(database, this.collectionName);
    const unsubscribe = onValue(collectionRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        callback(Object.values(data) as T[]);
      } else {
        callback([]);
      }
    });
    
    return () => off(collectionRef, 'value', unsubscribe);
  }
}

// Type definitions based on the JSON schemas
export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  start_date: string;
  end_date: string | null;
  location: string;
  company_logo: string;
  technologies: string[];
  is_current: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  demo_url: string;
  github_url: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'ai' | 'blockchain';
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'ai' | 'blockchain' | 'tools';
  proficiency: number;
  icon: string;
  years_experience: number;
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// Service instances
export const contactService = new FirebaseService<Contact>('contacts');
export const experienceService = new FirebaseService<Experience>('experiences');
export const projectService = new FirebaseService<Project>('projects');
export const skillService = new FirebaseService<Skill>('skills');
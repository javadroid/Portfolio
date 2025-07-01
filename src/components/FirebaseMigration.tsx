import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Database, Trash2, Upload } from 'lucide-react';
import {
  migrateAllData,
  clearAllData,
  migrateContacts,
  migrateExperiences,
  migrateProjects,
  migrateSkills
} from '@/utils/migrate-to-firebase';

interface MigrationStatus {
  isLoading: boolean;
  message: string;
  type: 'success' | 'error' | 'info' | '';
}

export function FirebaseMigration() {
  const [status, setStatus] = useState<MigrationStatus>({
    isLoading: false,
    message: '',
    type: ''
  });

  const handleMigration = async (migrationFn: () => Promise<void>, actionName: string) => {
    setStatus({ isLoading: true, message: `${actionName}...`, type: 'info' });
    
    try {
      await migrationFn();
      setStatus({ 
        isLoading: false, 
        message: `${actionName} completed successfully!`, 
        type: 'success' 
      });
    } catch (error) {
      setStatus({ 
        isLoading: false, 
        message: `${actionName} failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 
        type: 'error' 
      });
    }
  };

  const migrationActions = [
    {
      title: 'Migrate All Data',
      description: 'Migrate all sample data to Firebase',
      action: () => handleMigration(migrateAllData, 'Migrating all data'),
      icon: Database,
      variant: 'default' as const
    },
    {
      title: 'Migrate Contacts',
      description: 'Migrate contact data only',
      action: () => handleMigration(migrateContacts, 'Migrating contacts'),
      icon: Upload,
      variant: 'outline' as const
    },
    {
      title: 'Migrate Experiences',
      description: 'Migrate experience data only',
      action: () => handleMigration(migrateExperiences, 'Migrating experiences'),
      icon: Upload,
      variant: 'outline' as const
    },
    {
      title: 'Migrate Projects',
      description: 'Migrate project data only',
      action: () => handleMigration(migrateProjects, 'Migrating projects'),
      icon: Upload,
      variant: 'outline' as const
    },
    {
      title: 'Migrate Skills',
      description: 'Migrate skill data only',
      action: () => handleMigration(migrateSkills, 'Migrating skills'),
      icon: Upload,
      variant: 'outline' as const
    },
    {
      title: 'Clear All Data',
      description: 'Remove all data from Firebase (use with caution)',
      action: () => handleMigration(clearAllData, 'Clearing all data'),
      icon: Trash2,
      variant: 'destructive' as const
    }
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Firebase Migration Tools
        </CardTitle>
        <CardDescription>
          Your portfolio now uses Firebase Realtime Database.
          Use the tools below to populate your database with sample data.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {status.message && (
          <Alert className={`
            ${status.type === 'success' ? 'border-green-200 bg-green-50' : ''}
            ${status.type === 'error' ? 'border-red-200 bg-red-50' : ''}
            ${status.type === 'info' ? 'border-blue-200 bg-blue-50' : ''}
          `}>
            <AlertDescription className={`
              ${status.type === 'success' ? 'text-green-800' : ''}
              ${status.type === 'error' ? 'text-red-800' : ''}
              ${status.type === 'info' ? 'text-blue-800' : ''}
            `}>
              {status.message}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid gap-3">
          {migrationActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{action.title}</p>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </div>
                <Button
                  variant={action.variant}
                  size="sm"
                  onClick={action.action}
                  disabled={status.isLoading}
                >
                  {status.isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Run'
                  )}
                </Button>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-2">⚠️ Important Notes:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Make sure your Firebase project is set up with Realtime Database enabled</li>
            <li>• Add your Firebase configuration to the .env file</li>
            <li>• The migration will create sample data - modify the migration script for your actual data</li>
            <li>• Use "Clear All Data" carefully as it will permanently delete all Firebase data</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
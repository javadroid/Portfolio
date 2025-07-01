import React from 'react';
import { FirebaseMigration } from '@/components/FirebaseMigration';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FirebaseMigrationPage() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Firebase Migration</h1>
          <p className="text-muted-foreground">
            Your portfolio now uses Firebase Realtime Database instead of SuperDev.
            Use the tools below to populate your database with sample data.
          </p>
        </div>
        
        <FirebaseMigration />
        
        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Next Steps After Migration</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Verify your data appears in the Firebase Console</li>
            <li>Update your components to use Firebase hooks</li>
            <li>Test the new Firebase integration</li>
            <li>SuperDev dependencies have been removed ✅</li>
            <li>Set up proper Firebase security rules for production</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Star, MapPin, Calendar } from 'lucide-react';
import {
  useAllProjects,
  useAllSkills,
  useAllExperiences,
  useFeaturedProjects,
  useFeaturedSkills,
  useCurrentExperience
} from '@/entities';

// Example component showing how to use Firebase hooks
export function FirebaseExample() {
  // Get all data
  const { data: projects, isLoading: projectsLoading, error: projectsError } = useAllProjects();
  const { data: skills, isLoading: skillsLoading } = useAllSkills();
  const { data: experiences, isLoading: experiencesLoading } = useAllExperiences();
  
  // Get filtered data
  const { data: featuredProjects } = useFeaturedProjects();
  const { data: featuredSkills } = useFeaturedSkills();
  const { data: currentExperience } = useCurrentExperience();

  if (projectsLoading || skillsLoading || experiencesLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading data from Firebase...</span>
      </div>
    );
  }

  if (projectsError) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">Error loading data: {projectsError.message}</p>
        <p className="text-sm text-muted-foreground mt-2">
          Make sure Firebase is configured correctly and you have internet connection.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Firebase Integration Example</h1>
        <p className="text-muted-foreground">
          This component demonstrates how to use Firebase hooks to fetch and display data.
        </p>
      </div>

      {/* Current Experience */}
      {currentExperience && currentExperience.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Current Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentExperience.map((exp) => (
              <div key={exp.id} className="space-y-2">
                <h3 className="text-xl font-semibold">{exp.position}</h3>
                <p className="text-lg text-muted-foreground">{exp.company}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {exp.location}
                </div>
                <p className="text-sm">{exp.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {exp.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Featured Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Featured Projects ({featuredProjects?.length || 0})
          </CardTitle>
          <CardDescription>
            Projects marked as featured in Firebase
          </CardDescription>
        </CardHeader>
        <CardContent>
          {featuredProjects && featuredProjects.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {featuredProjects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.demo_url && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                          Demo
                        </a>
                      </Button>
                    )}
                    {project.github_url && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                          GitHub
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No featured projects found. Run the migration to add sample data.</p>
          )}
        </CardContent>
      </Card>

      {/* Featured Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Featured Skills ({featuredSkills?.length || 0})</CardTitle>
          <CardDescription>
            Skills marked as featured in Firebase
          </CardDescription>
        </CardHeader>
        <CardContent>
          {featuredSkills && featuredSkills.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {featuredSkills.map((skill) => (
                <div key={skill.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{skill.name}</h3>
                    <Badge variant="secondary">{skill.category}</Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Proficiency</span>
                      <span>{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {skill.years_experience} years experience
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No featured skills found. Run the migration to add sample data.</p>
          )}
        </CardContent>
      </Card>

      {/* Data Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Data Summary</CardTitle>
          <CardDescription>
            Overview of all data in Firebase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{projects?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{skills?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Total Skills</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{experiences?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Total Experiences</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{featuredProjects?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Featured Projects</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          This example shows real-time data from Firebase Realtime Database.
          Data updates automatically when changed in Firebase Console.
        </p>
      </div>
    </div>
  );
}
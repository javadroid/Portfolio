import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Briefcase, 
  Code, 
  Mail, 
  BarChart3,
  Users,
  Eye,
  ArrowLeft
} from 'lucide-react';
import ProjectManager from '@/components/dashboard/ProjectManager';
import ExperienceManager from '@/components/dashboard/ExperienceManager';
import SkillManager from '@/components/dashboard/SkillManager';
import ContactManager from '@/components/dashboard/ContactManager';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock analytics data
  const analytics = {
    totalProjects: 12,
    totalExperiences: 5,
    totalSkills: 24,
    unreadMessages: 3,
    portfolioViews: 1247,
    lastUpdated: new Date().toLocaleDateString(),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="glass-morphism border-b border-white/10 sticky top-0 z-50">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-portfolio-primary to-portfolio-accent flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Portfolio Dashboard</h1>
                <p className="text-white/60">Manage your portfolio content</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                asChild
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <a href="/" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Portfolio</span>
                </a>
              </Button>
              
              <Button
                asChild
                className="btn-gradient text-white"
              >
                <a href="/" target="_blank" className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-lg">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center space-x-2">
              <FolderOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Messages</span>
              {analytics.unreadMessages > 0 && (
                <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 ml-1">
                  {analytics.unreadMessages}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-card border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/80">Total Projects</CardTitle>
                  <FolderOpen className="h-4 w-4 text-portfolio-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{analytics.totalProjects}</div>
                  <p className="text-xs text-white/60">Active portfolio items</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/80">Experience</CardTitle>
                  <Briefcase className="h-4 w-4 text-portfolio-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{analytics.totalExperiences}</div>
                  <p className="text-xs text-white/60">Work experiences</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/80">Skills</CardTitle>
                  <Code className="h-4 w-4 text-portfolio-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{analytics.totalSkills}</div>
                  <p className="text-xs text-white/60">Technical skills</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white/80">Portfolio Views</CardTitle>
                  <Users className="h-4 w-4 text-portfolio-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{analytics.portfolioViews}</div>
                  <p className="text-xs text-white/60">Total visits</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                  <CardDescription className="text-white/60">
                    Common tasks to manage your portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => setActiveTab('projects')}
                    className="w-full justify-start glass-card hover:bg-white/10"
                    variant="ghost"
                  >
                    <FolderOpen className="w-4 h-4 mr-2" />
                    Add New Project
                  </Button>
                  <Button
                    onClick={() => setActiveTab('experience')}
                    className="w-full justify-start glass-card hover:bg-white/10"
                    variant="ghost"
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Update Experience
                  </Button>
                  <Button
                    onClick={() => setActiveTab('skills')}
                    className="w-full justify-start glass-card hover:bg-white/10"
                    variant="ghost"
                  >
                    <Code className="w-4 h-4 mr-2" />
                    Manage Skills
                  </Button>
                  <Button
                    onClick={() => setActiveTab('contacts')}
                    className="w-full justify-start glass-card hover:bg-white/10"
                    variant="ghost"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Check Messages
                    {analytics.unreadMessages > 0 && (
                      <Badge className="bg-red-500 text-white ml-auto">
                        {analytics.unreadMessages}
                      </Badge>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <CardDescription className="text-white/60">
                    Latest updates to your portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">Portfolio updated</p>
                        <p className="text-white/60 text-xs">Last updated: {analytics.lastUpdated}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">New message received</p>
                        <p className="text-white/60 text-xs">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">Project added</p>
                        <p className="text-white/60 text-xs">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Management Tabs */}
          <TabsContent value="projects">
            <ProjectManager />
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceManager />
          </TabsContent>

          <TabsContent value="skills">
            <SkillManager />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
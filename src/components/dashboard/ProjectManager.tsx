import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Project } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, ExternalLink, Github, Star } from 'lucide-react';

const ProjectManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    demo_url: '',
    github_url: '',
    technologies: '',
    category: '',
    featured: false,
    status: 'completed',
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => Project.list('-created_at', 50),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => Project.create({
      ...data,
      technologies: data.technologies.split(',').map((t: string) => t.trim()).filter(Boolean),
    }),
    onSuccess: () => {
      toast({ title: "Project created successfully!" });
      setIsDialogOpen(false);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: () => {
      toast({ title: "Failed to create project", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => Project.update(id, {
      ...data,
      technologies: data.technologies.split(',').map((t: string) => t.trim()).filter(Boolean),
    }),
    onSuccess: () => {
      toast({ title: "Project updated successfully!" });
      setIsDialogOpen(false);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: () => {
      toast({ title: "Failed to update project", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => Project.delete(id),
    onSuccess: () => {
      toast({ title: "Project deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: () => {
      toast({ title: "Failed to delete project", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      demo_url: '',
      github_url: '',
      technologies: '',
      category: '',
      featured: false,
      status: 'completed',
    });
    setEditingProject(null);
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      image_url: project.image_url || '',
      demo_url: project.demo_url || '',
      github_url: project.github_url || '',
      technologies: project.technologies?.join(', ') || '',
      category: project.category || '',
      featured: project.featured || false,
      status: project.status || 'completed',
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }

    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="glass-card border-white/20 animate-pulse">
              <CardHeader>
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
                <div className="h-3 bg-white/10 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-white/10 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Projects</h2>
          <p className="text-white/60">Manage your portfolio projects</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-gradient text-white" onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          
          <DialogContent className="glass-morphism border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
              <DialogDescription className="text-white/60">
                {editingProject ? 'Update project details' : 'Create a new portfolio project'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Project title"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web App</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="ai">AI/ML</SelectItem>
                      <SelectItem value="blockchain">Blockchain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Project description"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="demo_url">Demo URL</Label>
                  <Input
                    id="demo_url"
                    value={formData.demo_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, demo_url: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="https://demo.example.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input
                    id="github_url"
                    value={formData.github_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <Input
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="React, TypeScript, Node.js"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="planned">Planned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                  />
                  <Label htmlFor="featured">Featured Project</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="btn-gradient text-white"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {editingProject ? 'Update' : 'Create'} Project
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="glass-card border-white/20 hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white flex items-center">
                    {project.title}
                    {project.featured && (
                      <Star className="w-4 h-4 text-yellow-500 ml-2" />
                    )}
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    {project.category && (
                      <Badge variant="outline" className="border-portfolio-primary/30 text-portfolio-primary mr-2">
                        {project.category}
                      </Badge>
                    )}
                    {project.status}
                  </CardDescription>
                </div>
                
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(project)}
                    className="text-white/60 hover:text-white"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(project.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-white/80 text-sm mb-4 line-clamp-3">{project.description}</p>
              
              {project.technologies && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech: string, i: number) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              )}
              
              <div className="flex space-x-2">
                {project.demo_url && (
                  <Button size="sm" asChild className="btn-gradient text-white">
                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Demo
                    </a>
                  </Button>
                )}
                {project.github_url && (
                  <Button size="sm" variant="outline" asChild className="border-white/20 text-white">
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3 h-3" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card className="glass-card border-white/20 text-center py-12">
          <CardContent>
            <p className="text-white/60 mb-4">No projects yet. Create your first project!</p>
            <Button className="btn-gradient text-white" onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectManager;
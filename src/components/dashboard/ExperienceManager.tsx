import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Experience } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Building, Calendar, MapPin } from 'lucide-react';

const ExperienceManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<any>(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    company_logo: '',
    technologies: '',
    is_current: false,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ['experiences'],
    queryFn: () => Experience.list('-start_date', 20),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => Experience.create({
      ...data,
      technologies: data.technologies.split(',').map((t: string) => t.trim()).filter(Boolean),
      end_date: data.is_current ? null : data.end_date,
    }),
    onSuccess: () => {
      toast({ title: "Experience added successfully!" });
      setIsDialogOpen(false);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
    },
    onError: () => {
      toast({ title: "Failed to add experience", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => Experience.update(id, {
      ...data,
      technologies: data.technologies.split(',').map((t: string) => t.trim()).filter(Boolean),
      end_date: data.is_current ? null : data.end_date,
    }),
    onSuccess: () => {
      toast({ title: "Experience updated successfully!" });
      setIsDialogOpen(false);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
    },
    onError: () => {
      toast({ title: "Failed to update experience", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => Experience.delete(id),
    onSuccess: () => {
      toast({ title: "Experience deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
    },
    onError: () => {
      toast({ title: "Failed to delete experience", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      description: '',
      start_date: '',
      end_date: '',
      location: '',
      company_logo: '',
      technologies: '',
      is_current: false,
    });
    setEditingExperience(null);
  };

  const handleEdit = (experience: any) => {
    setEditingExperience(experience);
    setFormData({
      company: experience.company || '',
      position: experience.position || '',
      description: experience.description || '',
      start_date: experience.start_date || '',
      end_date: experience.end_date || '',
      location: experience.location || '',
      company_logo: experience.company_logo || '',
      technologies: experience.technologies?.join(', ') || '',
      is_current: experience.is_current || false,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company || !formData.position || !formData.start_date) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }

    if (editingExperience) {
      updateMutation.mutate({ id: editingExperience.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      deleteMutation.mutate(id);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Experience</h2>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
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
          <h2 className="text-2xl font-bold text-white">Experience</h2>
          <p className="text-white/60">Manage your work experience</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-gradient text-white" onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>
          
          <DialogContent className="glass-morphism border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingExperience ? 'Edit Experience' : 'Add New Experience'}</DialogTitle>
              <DialogDescription className="text-white/60">
                {editingExperience ? 'Update experience details' : 'Add a new work experience'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Company name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Job title"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Job responsibilities and achievements"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">Start Date *</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                    disabled={formData.is_current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_current"
                  checked={formData.is_current}
                  onCheckedChange={(checked) => setFormData(prev => ({ 
                    ...prev, 
                    is_current: checked,
                    end_date: checked ? '' : prev.end_date
                  }))}
                />
                <Label htmlFor="is_current">This is my current position</Label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="City, Country"
                  />
                </div>
                
                <div>
                  <Label htmlFor="company_logo">Company Logo URL</Label>
                  <Input
                    id="company_logo"
                    value={formData.company_logo}
                    onChange={(e) => setFormData(prev => ({ ...prev, company_logo: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <Input
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="React, Node.js, Python"
                />
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
                  {editingExperience ? 'Update' : 'Add'} Experience
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((experience) => (
          <Card key={experience.id} className="glass-card border-white/20 hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  {experience.company_logo && (
                    <img
                      src={experience.company_logo}
                      alt={experience.company}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <CardTitle className="text-white flex items-center">
                      {experience.position}
                      {experience.is_current && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 ml-2">
                          Current
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-white/60 flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Building className="w-4 h-4" />
                        <span>{experience.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDate(experience.start_date)} - {experience.end_date ? formatDate(experience.end_date) : 'Present'}
                        </span>
                      </div>
                      {experience.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{experience.location}</span>
                        </div>
                      )}
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(experience)}
                    className="text-white/60 hover:text-white"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(experience.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {experience.description && (
                <p className="text-white/80 mb-4">{experience.description}</p>
              )}
              
              {experience.technologies && experience.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech: string, i: number) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="border-portfolio-primary/30 text-portfolio-primary bg-portfolio-primary/10"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {experiences.length === 0 && (
        <Card className="glass-card border-white/20 text-center py-12">
          <CardContent>
            <p className="text-white/60 mb-4">No experience added yet. Add your first work experience!</p>
            <Button className="btn-gradient text-white" onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Experience
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExperienceManager;
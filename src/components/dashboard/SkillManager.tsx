import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Skill } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Star } from 'lucide-react';

const SkillManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    proficiency: 50,
    icon: '',
    years_experience: 1,
    is_featured: false,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: skills = [], isLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: () => Skill.list('-proficiency', 50),
  });

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'blockchain', label: 'Blockchain' },
    { id: 'tools', label: 'Tools' },
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const createMutation = useMutation({
    mutationFn: (data: any) => Skill.create(data),
    onSuccess: () => {
      toast({ title: "Skill added successfully!" });
      setIsDialogOpen(false);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
    onError: () => {
      toast({ title: "Failed to add skill", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => Skill.update(id, data),
    onSuccess: () => {
      toast({ title: "Skill updated successfully!" });
      setIsDialogOpen(false);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
    onError: () => {
      toast({ title: "Failed to update skill", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => Skill.delete(id),
    onSuccess: () => {
      toast({ title: "Skill deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
    onError: () => {
      toast({ title: "Failed to delete skill", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      proficiency: 50,
      icon: '',
      years_experience: 1,
      is_featured: false,
    });
    setEditingSkill(null);
  };

  const handleEdit = (skill: any) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name || '',
      category: skill.category || '',
      proficiency: skill.proficiency || 50,
      icon: skill.icon || '',
      years_experience: skill.years_experience || 1,
      is_featured: skill.is_featured || false,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }

    if (editingSkill) {
      updateMutation.mutate({ id: editingSkill.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Skills</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <Card key={i} className="glass-card border-white/20 animate-pulse">
              <CardContent className="p-4">
                <div className="h-8 bg-white/10 rounded mb-2"></div>
                <div className="h-4 bg-white/10 rounded"></div>
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
          <h2 className="text-2xl font-bold text-white">Skills</h2>
          <p className="text-white/60">Manage your technical skills</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-gradient text-white" onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          
          <DialogContent className="glass-morphism border-white/20 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</DialogTitle>
              <DialogDescription className="text-white/60">
                {editingSkill ? 'Update skill details' : 'Add a new technical skill'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Skill Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="e.g., React, Python, Node.js"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="ai">AI/ML</SelectItem>
                    <SelectItem value="blockchain">Blockchain</SelectItem>
                    <SelectItem value="tools">Tools</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="proficiency">Proficiency: {formData.proficiency}%</Label>
                <Slider
                  value={[formData.proficiency]}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, proficiency: value[0] }))}
                  max={100}
                  step={5}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="years_experience">Years of Experience</Label>
                <Input
                  id="years_experience"
                  type="number"
                  min="0"
                  max="20"
                  value={formData.years_experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, years_experience: parseInt(e.target.value) || 0 }))}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="icon">Icon (emoji or text)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="⚛️ or React"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                />
                <Label htmlFor="is_featured">Featured Skill</Label>
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
                  {editingSkill ? 'Update' : 'Add'} Skill
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-portfolio-primary to-portfolio-accent text-white'
                : 'glass-card text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredSkills.map((skill) => (
          <Card key={skill.id} className="glass-card border-white/20 hover:bg-white/10 transition-all duration-300 group">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl">{skill.icon || '🔧'}</div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(skill)}
                    className="text-white/60 hover:text-white p-1 h-auto"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(skill.id)}
                    className="text-red-400 hover:text-red-300 p-1 h-auto"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <h3 className="text-white font-medium text-sm mb-1 flex items-center">
                {skill.name}
                {skill.is_featured && (
                  <Star className="w-3 h-3 text-yellow-500 ml-1" />
                )}
              </h3>
              
              <div className="text-xs text-white/60 mb-2">
                {skill.years_experience}+ years
              </div>
              
              <div className="w-full bg-white/10 rounded-full h-1.5 mb-1">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-portfolio-primary to-portfolio-accent"
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
              
              <div className="text-xs text-white/50">{skill.proficiency}%</div>
              
              <Badge
                variant="outline"
                className="border-portfolio-primary/30 text-portfolio-primary text-xs mt-2"
              >
                {skill.category}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <Card className="glass-card border-white/20 text-center py-12">
          <CardContent>
            <p className="text-white/60 mb-4">
              {selectedCategory === 'all' 
                ? 'No skills added yet. Add your first skill!' 
                : `No skills found in ${categories.find(c => c.id === selectedCategory)?.label} category.`
              }
            </p>
            <Button className="btn-gradient text-white" onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SkillManager;
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Project } from '@/entities';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Filter, Star } from 'lucide-react';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => Project.list('-created_at', 50),
  });

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'blockchain', label: 'Blockchain' },
  ];

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
    const featuredMatch = !showFeaturedOnly || project.featured;
    return categoryMatch && featuredMatch;
  });

  const featuredProjects = projects.filter(project => project.featured);

  if (isLoading) {
    return (
      <section id="projects" className="section-padding bg-black/20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-portfolio-primary to-portfolio-accent mx-auto mb-6"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="project-card animate-pulse">
                <div className="h-48 bg-white/10 rounded-t-2xl"></div>
                <div className="p-6">
                  <div className="h-6 bg-white/10 rounded mb-4"></div>
                  <div className="h-4 bg-white/10 rounded mb-2"></div>
                  <div className="h-4 bg-white/10 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding bg-black/20">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-portfolio-primary to-portfolio-accent mx-auto mb-6"></div>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            A showcase of innovative solutions I've built, ranging from full-stack web applications 
            to AI-powered tools and blockchain implementations.
          </p>
        </div>

        {/* Featured Projects Highlight */}
        {featuredProjects.length > 0 && !showFeaturedOnly && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <Star className="w-6 h-6 text-portfolio-primary mr-2" />
                Spotlight Projects
              </h3>
              <Button
                onClick={() => setShowFeaturedOnly(true)}
                variant="outline"
                className="border-portfolio-primary text-portfolio-primary hover:bg-portfolio-primary hover:text-white"
              >
                View All Featured
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.slice(0, 3).map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} featured />
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-portfolio-primary to-portfolio-accent text-white'
                    : 'glass-card text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                showFeaturedOnly
                  ? 'bg-portfolio-primary text-white'
                  : 'glass-card text-white/70 hover:text-white'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Featured Only</span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, featured = false }: { project: any; index: number; featured?: boolean }) => {
  const [showDemo, setShowDemo] = useState(false);

  const shouldShowDemo = featured && !project.image_url && project.demo_url;

  return (
    <div
      className={`project-card animate-fade-in ${featured ? 'ring-2 ring-portfolio-primary' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Project Image or Demo */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : shouldShowDemo ? (
          <div className="w-full h-full relative">
            <iframe
              src={project.demo_url}
              className="w-full h-full border-0 scale-50 origin-top-left"
              style={{ width: '200%', height: '200%' }}
              title={`${project.title} Demo`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Button
                asChild
                className="btn-gradient text-white"
              >
                <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Full Demo
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-portfolio-primary/20 to-portfolio-accent/20 flex items-center justify-center">
            <span className="text-4xl">🚀</span>
          </div>
        )}
        
        {featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-portfolio-primary text-white">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}
        
        {project.status && (
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-black/50 text-white">
              {project.status}
            </Badge>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
        <p className="text-white/70 mb-4 line-clamp-3">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies?.slice(0, 4).map((tech: string, i: number) => (
            <Badge key={i} variant="outline" className="border-portfolio-primary/30 text-portfolio-primary">
              {tech}
            </Badge>
          ))}
          {project.technologies?.length > 4 && (
            <Badge variant="outline" className="border-white/30 text-white/60">
              +{project.technologies.length - 4} more
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {project.demo_url && (
            <Button
              asChild
              className="btn-gradient text-white flex-1"
            >
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
          
          {project.github_url && (
            <Button
              asChild
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
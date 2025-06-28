import { useQuery } from '@tanstack/react-query';
import { Experience } from '@/entities';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Building } from 'lucide-react';

const ExperienceSection = () => {
  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ['experiences'],
    queryFn: () => Experience.list('-start_date', 20),
  });

  if (isLoading) {
    return (
      <section id="experience" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Professional <span className="text-gradient">Journey</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-portfolio-primary to-portfolio-accent mx-auto mb-6"></div>
          </div>
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="experience-card animate-pulse">
                <div className="h-6 bg-white/10 rounded mb-4 w-1/3"></div>
                <div className="h-4 bg-white/10 rounded mb-2 w-1/2"></div>
                <div className="h-4 bg-white/10 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional <span className="text-gradient">Journey</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-portfolio-primary to-portfolio-accent mx-auto mb-6"></div>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            6+ years of building innovative solutions across diverse industries, 
            from startups to enterprise-level applications.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-portfolio-primary via-portfolio-accent to-portfolio-magenta transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>

        {experiences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No experience data available.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const ExperienceCard = ({ experience, index, isLeft }: { experience: any; index: number; isLeft: boolean }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''}`;
    return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  };

  return (
    <div
      className={`relative animate-fade-in ${
        isLeft ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
      }`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {/* Timeline dot */}
      <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-r from-portfolio-primary to-portfolio-accent rounded-full transform md:-translate-x-1/2 -translate-y-1 border-4 border-background"></div>

      {/* Content */}
      <div className={`ml-16 md:ml-0 ${isLeft ? 'md:mr-8' : 'md:ml-8'}`}>
        <div className="experience-card">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div className="flex items-center space-x-3 mb-2 md:mb-0">
              {experience.company_logo && (
                <img
                  src={experience.company_logo}
                  alt={experience.company}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              )}
              <div>
                <h3 className="text-xl font-bold text-white">{experience.position}</h3>
                <div className="flex items-center space-x-2 text-portfolio-primary">
                  <Building className="w-4 h-4" />
                  <span className="font-medium">{experience.company}</span>
                </div>
              </div>
            </div>
            
            {experience.is_current && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Current
              </Badge>
            )}
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm text-white/60">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>
                {formatDate(experience.start_date)} - {experience.end_date ? formatDate(experience.end_date) : 'Present'}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <span>•</span>
              <span>{getDuration(experience.start_date, experience.end_date)}</span>
            </div>
            {experience.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{experience.location}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-white/80 mb-6 leading-relaxed">{experience.description}</p>

          {/* Technologies */}
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
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
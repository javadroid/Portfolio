import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Skill } from '@/entities';
import { Code, Database, Smartphone, Brain, Blocks, Wrench } from 'lucide-react';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: skills = [], isLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: () => Skill.list('-proficiency', 50),
  });

  const categories = [
    { id: 'all', label: 'All Skills', icon: Code },
    { id: 'frontend', label: 'Frontend', icon: Code },
    { id: 'backend', label: 'Backend', icon: Database },
    { id: 'mobile', label: 'Mobile', icon: Smartphone },
    { id: 'ai', label: 'AI/ML', icon: Brain },
    { id: 'blockchain', label: 'Blockchain', icon: Blocks },
    { id: 'tools', label: 'Tools', icon: Wrench },
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const featuredSkills = skills.filter(skill => skill.is_featured);

  if (isLoading) {
    return (
      <section id="skills" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Technical <span className="text-gradient">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-portfolio-primary to-portfolio-accent mx-auto mb-6"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="skill-card animate-pulse">
                <div className="w-12 h-12 bg-white/10 rounded-lg mb-4"></div>
                <div className="h-4 bg-white/10 rounded mb-2"></div>
                <div className="h-3 bg-white/10 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-portfolio-primary to-portfolio-accent mx-auto mb-6"></div>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            A comprehensive toolkit built over 6+ years of passionate development, 
            spanning modern web technologies, AI/ML, blockchain, and mobile platforms.
          </p>
        </div>

        {/* Featured Skills */}
        {featuredSkills.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Core Expertise</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {featuredSkills.map((skill, index) => (
                <div
                  key={skill.id}
                  className="skill-card text-center animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-portfolio-primary/20 to-portfolio-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-2xl">{skill.icon || '⚡'}</span>
                  </div>
                  <h4 className="font-semibold text-white mb-2">{skill.name}</h4>
                  <div className="text-sm text-white/60 mb-3">{skill.years_experience}+ years</div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-portfolio-primary to-portfolio-accent transition-all duration-1000"
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-white/50 mt-1">{skill.proficiency}%</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-portfolio-primary to-portfolio-accent text-white'
                  : 'glass-card text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.id}
              className="skill-card text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-portfolio-primary/20 to-portfolio-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-xl">{skill.icon || '🔧'}</span>
              </div>
              <h4 className="font-medium text-white mb-2 text-sm">{skill.name}</h4>
              <div className="text-xs text-white/60 mb-2">{skill.years_experience}+ years</div>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-portfolio-primary to-portfolio-accent transition-all duration-1000"
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
              <div className="text-xs text-white/50 mt-1">{skill.proficiency}%</div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No skills found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
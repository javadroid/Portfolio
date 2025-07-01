import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail, Download, Code, Sparkles } from 'lucide-react';

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = [
    'Software Engineer',
    'AI Automation Expert', 
    'Blockchain Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Tech Entrepreneur'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-portfolio-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-portfolio-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-portfolio-magenta/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-portfolio-primary">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">Welcome to my portfolio</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-white">Hi, I'm</span>
                <br />
                <span className="text-gradient">Emmanuel</span>
              </h1>
              
              <div className="text-2xl md:text-3xl text-white/80 h-12 flex items-center">
                <span className="mr-2">A passionate</span>
                <span className="text-gradient font-semibold min-w-fit">
                  {roles[currentRole]}
                </span>
              </div>
              
              <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
                With 6+ years of experience building intelligent systems, blockchain platforms, 
                and AI-powered automation tools. I turn complex problems into clean, simple solutions 
                that make a real impact. Based in Nigeria, working globally.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToSection('projects')}
                className="btn-gradient text-white px-8 py-3 text-lg group"
              >
                <Code className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                View My Work
              </Button>
              
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg"
                onClick={() => scrollToSection('contact')}
              >
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6 pt-4">
              <a
                href="https://github.com/emmanuelochigbo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-portfolio-primary transition-colors p-2 hover:scale-110 transform"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/eochigbo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-portfolio-primary transition-colors p-2 hover:scale-110 transform"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:ochigboemmanuel32@gmail.com"
                className="text-white/60 hover:text-portfolio-primary transition-colors p-2 hover:scale-110 transform"
              >
                <Mail className="w-6 h-6" />
              </a>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/60 hover:text-portfolio-primary"
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </div>
          </div>

          {/* Profile Image/Animation */}
          <div className="relative animate-slide-in-right">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-r from-portfolio-primary via-portfolio-accent to-portfolio-magenta rounded-full blur-2xl opacity-30 animate-glow"></div>
              
              {/* Profile container */}
              <div className="relative glass-card p-8 rounded-full">
                <div className="w-80 h-80 mx-auto rounded-full bg-gradient-to-br from-portfolio-primary/20 to-portfolio-accent/20 flex items-center justify-center">
                  <div className="w-72 h-72 rounded-full bg-gradient-to-br from-portfolio-primary to-portfolio-accent flex items-center justify-center text-white text-8xl font-bold">
                    EO
                  </div>
                </div>
              </div>
              
              {/* Floating tech icons */}
              <div className="absolute top-4 right-4 glass-card p-3 rounded-lg animate-float">
                <Code className="w-6 h-6 text-portfolio-primary" />
              </div>
              <div className="absolute bottom-8 left-4 glass-card p-3 rounded-lg animate-float" style={{ animationDelay: '1s' }}>
                <Sparkles className="w-6 h-6 text-portfolio-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection('about')}
            className="text-white/60 hover:text-white transition-colors"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
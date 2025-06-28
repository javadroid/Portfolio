import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, User, Briefcase, Code, Mail, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "glass-morphism shadow-lg" : "bg-transparent"
    )}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-portfolio-primary to-portfolio-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">EO</span>
            </div>
            <span className="text-white font-semibold text-xl">Emmanuel Ochigbo</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300",
                  activeSection === item.id
                    ? "text-portfolio-primary bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('contact')}
              className="btn-gradient text-white px-6 py-2"
            >
              Let's Talk
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-morphism border-t border-white/10">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-300",
                    activeSection === item.id
                      ? "text-portfolio-primary bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('contact')}
                className="btn-gradient text-white w-full mt-4"
              >
                Let's Talk
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
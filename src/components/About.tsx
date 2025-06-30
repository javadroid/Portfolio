import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Heart, Trophy, Coffee, Book, Gamepad2, Code, Zap, Globe } from 'lucide-react';

const About = () => {
  const [hoveredInterest, setHoveredInterest] = useState<string | null>(null);

  const interests = [
    {
      id: 'automation',
      name: 'AI Automation',
      icon: '🤖',
      description: 'Building intelligent systems that automate the boring stuff',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'blockchain',
      name: 'Blockchain',
      icon: '⛓️',
      description: 'Creating decentralized solutions with smart contracts',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'problem-solving',
      name: 'Problem Solving',
      icon: '🧩',
      description: 'Breaking down complex problems into simple, elegant solutions',
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 'mentoring',
      name: 'Mentoring',
      icon: '👨‍🏫',
      description: 'Helping developers grow and avoid common pitfalls',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'innovation',
      name: 'Innovation',
      icon: '💡',
      description: 'Turning ideas into commercial products that impact lives',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      id: 'simplicity',
      name: 'Simplicity',
      icon: '✨',
      description: 'Making complex systems look easy and intuitive',
      color: 'from-pink-500 to-rose-600'
    }
  ];

  const personalStats = [
    { label: 'Years Experience', value: '6+', icon: Coffee },
    { label: 'Developers Mentored', value: '20+', icon: User },
    { label: 'Technologies Mastered', value: '15+', icon: Code },
    { label: 'Projects Shipped', value: '50+', icon: Trophy }
  ];

  const coreBeliefs = [
    { belief: 'Simplicity > Complexity', icon: '🎯' },
    { belief: 'Impact > Hype', icon: '💥' },
    { belief: 'Utility > Vanity', icon: '🔧' },
    { belief: 'Shipping > Perfection', icon: '🚀' }
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-gradient">Emmanuel</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-portfolio-primary to-portfolio-accent mx-auto mb-6"></div>
          <p className="text-lg text-white/70 max-w-4xl mx-auto">
            A passionate software engineer who turns complex problems into clean, simple solutions. 
            Operating at the intersection of engineering, entrepreneurship, and innovation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Personal Story */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="glass-card p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-portfolio-primary to-portfolio-accent flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">My Journey</h3>
              </div>
              
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  Hi! I'm Emmanuel Ochigbo, a commercially-driven software engineer with over 6 years 
                  of hands-on experience building web and mobile applications, backend systems, 
                  blockchain platforms, and AI-powered automation tools.
                </p>
                
                <p>
                  Based in Nigeria, I operate at the intersection of engineering, entrepreneurship, 
                  and innovation. I'm passionate about simplifying complex problems, automating 
                  workflows, and delivering high-impact solutions for fintech, service marketplaces, 
                  crypto, and AI-based automation.
                </p>
                
                <p>
                  My philosophy is simple: <em>"Automate the boring, innovate the essential—with 
                  clean, simple solutions to real problems."</em> I believe in building technology 
                  that makes a real difference, whether it's through AI automation, blockchain 
                  solutions, or beautiful applications that just work.
                </p>
              </div>
            </div>

            {/* Personal Stats */}
            <div className="grid grid-cols-2 gap-4">
              {personalStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="glass-card p-6 text-center animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <stat.icon className="w-8 h-8 text-portfolio-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Core Beliefs */}
            <div className="glass-card p-6">
              <h4 className="text-white font-semibold mb-4 flex items-center">
                <Zap className="w-5 h-5 text-portfolio-primary mr-2" />
                Core Beliefs
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {coreBeliefs.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-white/80 text-sm">{item.belief}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interests & Approach */}
          <div className="animate-slide-in-right">
            <div className="glass-card p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-portfolio-accent to-portfolio-magenta flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">What Drives Me</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {interests.map((interest, index) => (
                  <div
                    key={interest.id}
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setHoveredInterest(interest.id)}
                    onMouseLeave={() => setHoveredInterest(null)}
                  >
                    <div className="glass-card p-6 text-center transition-all duration-300 hover:scale-105 hover:bg-white/15">
                      <div className="text-4xl mb-3">{interest.icon}</div>
                      <h4 className="text-white font-semibold mb-2">{interest.name}</h4>
                      
                      {/* Hover Description */}
                      <div className={`transition-all duration-300 overflow-hidden ${
                        hoveredInterest === interest.id 
                          ? 'max-h-20 opacity-100' 
                          : 'max-h-0 opacity-0'
                      }`}>
                        <p className="text-white/70 text-sm mt-2">
                          {interest.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Career Vision */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-white font-semibold mb-4 flex items-center">
                  <Globe className="w-5 h-5 text-portfolio-primary mr-2" />
                  Vision & Goals
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mt-1">
                      5 Years
                    </Badge>
                    <span className="text-white/70 text-sm">
                      Become a tech leader building commercial products powered by AI and blockchain
                    </span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 mt-1">
                      10 Years
                    </Badge>
                    <span className="text-white/70 text-sm">
                      Lead a global ecosystem of automation tools impacting millions
                    </span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-1">
                      Mission
                    </Badge>
                    <span className="text-white/70 text-sm">
                      Make complex things look easy through elegant engineering
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="mt-6 p-4 bg-white/5 rounded-lg border-l-4 border-portfolio-primary">
                <p className="text-white/80 italic text-sm">
                  "I build smart apps and tools that help people and businesses automate and get things done perfectly."
                </p>
                <p className="text-white/60 text-xs mt-2">— Emmanuel's Elevator Pitch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
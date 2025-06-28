import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Heart, Trophy, Coffee, Book, Music, Camera, Gamepad2 } from 'lucide-react';

const About = () => {
  const [hoveredInterest, setHoveredInterest] = useState<string | null>(null);

  const interests = [
    {
      id: 'cats',
      name: 'Cats',
      icon: '🐱',
      description: 'Love spending time with these amazing, independent companions',
      color: 'from-orange-400 to-orange-600'
    },
    {
      id: 'chess',
      name: 'Chess',
      icon: '♟️',
      description: 'Strategic thinking and tactical puzzles keep my mind sharp',
      color: 'from-gray-600 to-gray-800'
    },
    {
      id: 'coding',
      name: 'Coding',
      icon: '💻',
      description: 'Building innovative solutions and learning new technologies',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'reading',
      name: 'Reading',
      icon: '📚',
      description: 'Tech blogs, sci-fi novels, and continuous learning',
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 'music',
      name: 'Music',
      icon: '🎵',
      description: 'From coding playlists to discovering new genres',
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 'gaming',
      name: 'Gaming',
      icon: '🎮',
      description: 'Strategy games and puzzle solving for relaxation',
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  const personalStats = [
    { label: 'Years Coding', value: '6+', icon: Coffee },
    { label: 'Projects Built', value: '50+', icon: Trophy },
    { label: 'Technologies', value: '20+', icon: Book },
    { label: 'Chess Rating', value: '1500+', icon: Gamepad2 }
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-portfolio-primary to-portfolio-accent mx-auto mb-6"></div>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Beyond the code, I'm a passionate individual with diverse interests that shape my perspective 
            and creativity in everything I do.
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
                  Hi! I'm Emmanuel, a passionate fullstack developer based in Lagos, Nigeria. 
                  My journey into technology started over 6 years ago, and it's been an incredible 
                  adventure of continuous learning and innovation.
                </p>
                
                <p>
                  When I'm not crafting code or solving complex problems, you'll find me enjoying 
                  a good chess match or spending quality time with cats. These interests might seem 
                  unrelated to programming, but they've actually shaped my approach to development - 
                  chess taught me strategic thinking and patience, while cats remind me of the 
                  importance of independence and curiosity.
                </p>
                
                <p>
                  I believe in building technology that makes a real difference in people's lives, 
                  whether it's through AI automation, blockchain solutions, or beautiful web applications. 
                  Every project is an opportunity to learn something new and push the boundaries of 
                  what's possible.
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
          </div>

          {/* Interests & Hobbies */}
          <div className="animate-slide-in-right">
            <div className="glass-card p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-portfolio-accent to-portfolio-magenta flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Interests & Hobbies</h3>
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

              {/* Fun Facts */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-white font-semibold mb-4">Fun Facts</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                      🐱 Cat Lover
                    </Badge>
                    <span className="text-white/70 text-sm">
                      Believe cats are the perfect coding companions
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
                      ♟️ Chess Player
                    </Badge>
                    <span className="text-white/70 text-sm">
                      Strategic thinking translates to better code architecture
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      🌍 Global Mindset
                    </Badge>
                    <span className="text-white/70 text-sm">
                      Building solutions for users worldwide from Lagos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
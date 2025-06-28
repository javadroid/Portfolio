import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-8">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-white/60">
              © 2024 Emmanuel Ochigbo. Built with passion and modern technologies.
            </p>
            <p className="text-white/40 text-sm mt-2">
              Crafted with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
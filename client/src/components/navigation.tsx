import { useState } from 'react';
import { PERSONAL_INFO } from '@/lib/constants';

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" }
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-mono font-bold cyber-blue">
              DR
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="hover:text-[hsl(var(--cyber-blue))] transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden cyber-blue"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>
          <div className="relative bg-black/90 backdrop-blur-md h-full w-64 ml-auto border-l border-white/10">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="text-xl font-mono font-bold cyber-blue">
                  {PERSONAL_INFO.name}
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="cyber-blue"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              
              <div className="space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left py-2 hover:text-[hsl(var(--cyber-blue))] transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

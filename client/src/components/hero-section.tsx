import { useTypingAnimation } from '@/hooks/use-typing-animation';
import { PERSONAL_INFO, TYPING_ROLES } from '@/lib/constants';

export default function HeroSection() {
  const typingText = useTypingAnimation(TYPING_ROLES, 100, 50, 2000);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = () => {
    // This would trigger a resume download
    alert('Resume download would be implemented here');
  };

  return (
    <section id="home" className="relative z-10 min-h-screen flex items-center justify-center px-6">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 animated-gradient"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-mono font-bold mb-4">
            <span className="text-white">Hello, I'm</span>
            <span className="cyber-blue block mt-2">{PERSONAL_INFO.name}</span>
          </h1>
        </div>
        
        {/* Typing Animation */}
        <div className="mb-8 h-16 flex items-center justify-center">
          <h2 className="text-2xl md:text-3xl font-mono cyber-purple">
            <span>{typingText}</span>
            <span className="animate-pulse">|</span>
          </h2>
        </div>
        
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          {PERSONAL_INFO.objective}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={scrollToProjects}
            className="px-8 py-3 bg-[hsl(var(--cyber-blue))] text-white font-semibold rounded-lg hover:bg-cyan-400 transform hover:scale-105 transition-all duration-300"
          >
            View My Work
          </button>
          <button 
            onClick={downloadResume}
            className="px-8 py-3 border border-[hsl(var(--cyber-purple))] cyber-purple hover:bg-[hsl(var(--cyber-purple))] hover:text-white rounded-lg transform hover:scale-105 transition-all duration-300"
          >
            Download Resume
          </button>
        </div>
        
        {/* Social Links */}
        <div className="mt-12 flex justify-center space-x-6">
          <a 
            href={PERSONAL_INFO.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-[hsl(var(--cyber-blue))] transform hover:scale-110 transition-all duration-300"
          >
            <i className="fab fa-github"></i>
          </a>
          <a 
            href={PERSONAL_INFO.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-[hsl(var(--cyber-blue))] transform hover:scale-110 transition-all duration-300"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a 
            href={PERSONAL_INFO.medium} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-[hsl(var(--cyber-blue))] transform hover:scale-110 transition-all duration-300"
          >
            <i className="fab fa-medium"></i>
          </a>
          <a 
            href={`mailto:${PERSONAL_INFO.email}`}
            className="text-2xl text-gray-400 hover:text-[hsl(var(--cyber-blue))] transform hover:scale-110 transition-all duration-300"
          >
            <i className="fas fa-envelope"></i>
          </a>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <i className="fas fa-chevron-down cyber-blue text-2xl"></i>
        </div>
      </div>
    </section>
  );
}

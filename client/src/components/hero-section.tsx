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
      {/* Professional Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 professional-gradient"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(210,100%,50%,0.05),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,hsl(210,100%,20%,0.05),transparent_60%)]"></div>
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
            <span className="text-muted-foreground">Hello, I'm</span>
            <span className="professional-blue block mt-2">{PERSONAL_INFO.name}</span>
          </h1>
        </div>
        
        {/* Typing Animation */}
        <div className="mb-8 h-16 flex items-center justify-center">
          <h2 className="text-xl md:text-2xl font-medium professional-navy">
            <span>{typingText}</span>
            <span className="animate-pulse professional-blue">|</span>
          </h2>
        </div>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          {PERSONAL_INFO.objective}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={scrollToProjects}
            className="professional-button"
          >
            View My Work
          </button>
        {/* 
        <button 
          onClick={downloadResume}
          className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg font-medium transition-all duration-200"
        >
          Download Resume
        </button> 
        */}
        </div>
        
        {/* Social Links */}
        <div className="mt-12 flex justify-center space-x-6">
          <a 
            href={PERSONAL_INFO.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl text-muted-foreground hover:text-primary transform hover:scale-110 transition-all duration-200"
          >
            <i className="fab fa-github"></i>
          </a>
          <a 
            href={PERSONAL_INFO.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl text-muted-foreground hover:text-primary transform hover:scale-110 transition-all duration-200"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a 
            href={PERSONAL_INFO.medium} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl text-muted-foreground hover:text-primary transform hover:scale-110 transition-all duration-200"
          >
            <i className="fab fa-medium"></i>
          </a>
          <a 
            href={`mailto:${PERSONAL_INFO.email}`}
            className="text-2xl text-muted-foreground hover:text-primary transform hover:scale-110 transition-all duration-200"
          >
            <i className="fas fa-envelope"></i>
          </a>
        </div>
        
      </div>
    </section>
  );
}

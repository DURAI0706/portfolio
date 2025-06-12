import { PERSONAL_INFO } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="relative z-10 py-12 px-6 border-t border-white/10">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-4">
          <div className="text-2xl font-mono font-bold cyber-blue">
            {PERSONAL_INFO.name}
          </div>
          <p className="text-gray-400">
            Building the future with data science and machine learning
          </p>
          <div className="flex justify-center space-x-6">
            <a 
              href={PERSONAL_INFO.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[hsl(var(--cyber-blue))] transition-colors"
            >
              <i className="fab fa-github text-xl"></i>
            </a>
            <a 
              href={PERSONAL_INFO.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[hsl(var(--cyber-blue))] transition-colors"
            >
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a 
              href={PERSONAL_INFO.medium} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[hsl(var(--cyber-blue))] transition-colors"
            >
              <i className="fab fa-medium text-xl"></i>
            </a>
            <a 
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-gray-400 hover:text-[hsl(var(--cyber-blue))] transition-colors"
            >
              <i className="fas fa-envelope text-xl"></i>
            </a>
          </div>
          <div className="pt-8 border-t border-white/10">
            <p className="text-sm text-gray-500">
              © 2024 {PERSONAL_INFO.name}. Built with passion and lots of coffee ☕
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { PERSONAL_INFO } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="relative z-10 py-12 px-6 border-t border-white/10 bg-white/5 backdrop-blur-md">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-6">
          
          {/* Gradient Name Heading */}
          <div className="text-3xl md:text-4xl font-mono font-extrabold bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
            {PERSONAL_INFO.name}
            <p className="text-blue-300 text-sm md:text-base">
              Building the future with data science and machine learning
            </p>
          </div>
          {/* Glass Styled Social Icons */}
          <div className="flex justify-center space-x-4">
            {[
              { href: PERSONAL_INFO.github, icon: "fab fa-github" },
              { href: PERSONAL_INFO.linkedin, icon: "fab fa-linkedin" },
              { href: PERSONAL_INFO.medium, icon: "fab fa-medium" },
              { href: `mailto:${PERSONAL_INFO.email}`, icon: "fas fa-envelope" },
            ].map(({ href, icon }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-xl 
                  bg-white/10 hover:bg-cyan-400/20 
                  text-white hover:text-cyan-300 
                  backdrop-blur-md border border-white/10 
                  transition-all duration-300 transform hover:scale-110"
              >
                <i className={`${icon} text-xl`}></i>
              </a>
            ))}
          </div>

          {/* Footer Note */}
          <div className="pt-6 border-t border-white/10">
            <p className="text-xs text-gray-500 mt-4">
              © 2024 {PERSONAL_INFO.name}. Built with passion and lots of coffee ☕
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

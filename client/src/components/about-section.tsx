import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useCounterAnimation } from '@/hooks/use-counter-animation';
import { PERSONAL_INFO, STATS } from '@/lib/constants';

export default function AboutSection() {
  const { elementRef, isIntersecting } = useIntersectionObserver<HTMLDivElement>();

  return (
    <section id="about" className="relative z-10 py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-center mb-16">
          About <span className="cyber-blue">Me</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold cyber-purple">Professional Objective</h3>
            <p className="text-gray-300 leading-relaxed">
              {PERSONAL_INFO.objective}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <i className="fas fa-graduation-cap cyber-blue"></i>
                <span>{PERSONAL_INFO.education}</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-map-marker-alt cyber-blue"></i>
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-calendar-alt cyber-blue"></i>
                <span>Age: {PERSONAL_INFO.age}</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-language cyber-blue"></i>
                <span>{PERSONAL_INFO.languages.join(', ')}</span>
              </div>
            </div>
          </div>
          
          {/* Stats Counter */}
          <div className="grid grid-cols-2 gap-6" ref={elementRef}>
            {STATS.map((stat, index) => (
              <StatCard 
                key={index} 
                stat={stat} 
                trigger={isIntersecting} 
              />
            ))}
          </div>
        </div>
        
        {/* Hobbies & Interests Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-mono font-bold text-center mb-12">
            Hobbies & <span className="cyber-purple">Interests</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PERSONAL_INFO.hobbies.map((hobby, index) => (
              <div 
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[hsl(var(--cyber-purple))]/50 transition-all duration-300 text-center"
              >
                <div className="text-3xl cyber-purple mb-3 group-hover:scale-110 transition-transform duration-300">
                  <i className={hobby.icon}></i>
                </div>
                <h4 className="font-semibold mb-2">{hobby.name}</h4>
                <p className="text-sm text-gray-400">{hobby.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, trigger }: { stat: typeof STATS[0], trigger: boolean }) {
  const animatedValue = useCounterAnimation(
    stat.value, 
    2000, 
    0, 
    trigger
  );

  return (
    <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[hsl(var(--cyber-blue))]/50 transition-all duration-300">
      <div className="text-3xl font-mono font-bold cyber-blue mb-2">
        {animatedValue}{stat.suffix}
      </div>
      <div className="text-sm text-gray-400">{stat.label}</div>
    </div>
  );
}

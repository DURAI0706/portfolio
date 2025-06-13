import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useCounterAnimation } from '@/hooks/use-counter-animation';
import { PERSONAL_INFO, STATS } from '@/lib/constants';

export default function AboutSection() {
  const { elementRef, isIntersecting } = useIntersectionObserver<HTMLDivElement>();

  return (
    <section id="about" className="relative z-10 py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
          About <span className="professional-blue">Me</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold professional-navy">Professional Overview</h3>
            <p className="text-muted-foreground leading-relaxed">
              {PERSONAL_INFO.objective}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <i className="fas fa-graduation-cap professional-blue"></i>
                <span className="text-foreground">{PERSONAL_INFO.education}</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-map-marker-alt professional-blue"></i>
                <span className="text-foreground">{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-calendar-alt professional-blue"></i>
                <span className="text-foreground">Age: {PERSONAL_INFO.age}</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-language professional-blue"></i>
                <span className="text-foreground">{PERSONAL_INFO.languages.join(', ')}</span>
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
    <div className="professional-card text-center p-6 transition-all duration-300 hover:scale-105">
      <div className="text-3xl font-bold professional-blue mb-2">
        {animatedValue}{stat.suffix}
      </div>
      <div className="text-sm text-muted-foreground">{stat.label}</div>
    </div>
  );
}

import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useCounterAnimation } from '@/hooks/use-counter-animation';
import { PERSONAL_INFO, STATS } from '@/lib/constants';

export default function HobbiesSection() {
  const { elementRef, isIntersecting } = useIntersectionObserver<HTMLDivElement>();

  return (
    <section id="hobbies-section" className="relative z-10 py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Hobbies & Interests Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Hobbies & <span className="professional-blue">Interests</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PERSONAL_INFO.hobbies.map((hobby, index) => (
              <div 
                key={index}
                className="professional-card group p-6 transition-all duration-300 text-center hover:scale-105"
              >
                <div className="text-3xl professional-navy mb-3 group-hover:scale-110 transition-transform duration-300">
                  <i className={hobby.icon}></i>
                </div>
                <h4 className="font-semibold mb-2 text-foreground">{hobby.name}</h4>
                <p className="text-sm text-muted-foreground">{hobby.description}</p>
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
    <div className="professional-card text-center p-6 transition-all duration-300 hover:scale-105">
      <div className="text-3xl font-bold professional-blue mb-2">
        {animatedValue}{stat.suffix}
      </div>
      <div className="text-sm text-muted-foreground">{stat.label}</div>
    </div>
  );
}

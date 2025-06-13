import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { SKILLS } from '@/lib/constants';

type SkillCategory = keyof typeof SKILLS;

const skillTabs = [
  { id: 'programming' as SkillCategory, label: 'Programming', icon: 'fas fa-code' },
  { id: 'frontend' as SkillCategory, label: 'Frontend', icon: 'fas fa-palette' },
  { id: 'backend' as SkillCategory, label: 'Backend', icon: 'fas fa-server' },
  { id: 'ml' as SkillCategory, label: 'ML & Data', icon: 'fas fa-brain' }
];

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<SkillCategory>('programming');
  const { elementRef, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section id="skills" className="relative z-10 py-20 px-6 bg-white/5">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
          Technical <span className="professional-blue">Skills</span>
        </h2>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-12 backdrop-blur-sm">
          {skillTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-2xl font-bold rounded-lg transition-all duration-300 mx-1 mb-2 ${
                activeTab === tab.id
                  ? 'text-blue-400 hover:text-blue-600'
                  : 'professional-gray hover:text-purple-600'
              }`}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div ref={elementRef} className="min-h-[400px]">
          <SkillContent
            key={`${activeTab}-${Date.now()}`}
            category={activeTab}
            skills={SKILLS[activeTab]}
            animate={isIntersecting}
          />
        </div>
      </div>
    </section>
  );
}

function SkillContent({
  category,
  skills,
  animate
}: {
  category: SkillCategory;
  skills: typeof SKILLS[SkillCategory];
  animate: boolean;
}) {
  const getIcon = (category: SkillCategory) => {
    switch (category) {
      case 'programming': return 'fas fa-code';
      case 'frontend': return 'fas fa-palette';
      case 'backend': return 'fas fa-server';
      case 'ml': return 'fas fa-brain';
      default: return 'fas fa-code';
    }
  };

  const getGradient = (category: SkillCategory) => {
    switch (category) {
      case 'programming': return ['from-cyan-400', 'to-blue-500'];
      case 'frontend': return ['from-pink-400', 'to-purple-500'];
      case 'backend': return ['from-green-400', 'to-lime-500'];
      case 'ml': return ['from-yellow-400', 'to-pink-500'];
      default: return ['from-cyan-400', 'to-purple-400'];
    }
  };

  const [from, to] = getGradient(category);

  return (
    <div className="grid md:grid-cols-2 gap-12 items-start">
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            animate={animate}
            delay={index * 300 + 500}
            from={from}
            to={to}
          />
        ))}
      </div>
      <div className="flex items-center justify-center h-full">
        <div
          className={`text-8xl bg-gradient-to-r ${from} ${to} bg-clip-text text-transparent animate-float`}
        >
          <i className={getIcon(category)}></i>
        </div>
      </div>
    </div>
  );
}

function SkillBar({
  skill,
  animate,
  delay,
  from,
  to
}: {
  skill: { name: string; level: number };
  animate: boolean;
  delay: number;
  from: string;
  to: string;
}) {
  const [currentWidth, setCurrentWidth] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (animate && !hasAnimated) {
      const timer = setTimeout(() => {
        setCurrentWidth(skill.level);
        setHasAnimated(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [animate, skill.level, delay, hasAnimated]);

  useEffect(() => {
    setCurrentWidth(0);
    setHasAnimated(false);
  }, [skill.name]);

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-semibold text-[hsl(210,100%,50%)]">
          {skill.name}
        </span>
        <span className="text-[hsl(207,81.7%,47.1%)] font-mono font-bold">{skill.level}%</span>
      </div>
      <div
        className="h-3 rounded-full shadow-lg transition-all duration-2000 ease-out relative overflow-hidden"
        style={{
          width: `${currentWidth}%`,
          background: 'hsl(210, 100%, 20%)'
        }}
      >
        {currentWidth > 0 && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        )}
      </div>
    </div>
  );
}

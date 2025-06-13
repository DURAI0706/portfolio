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
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-center mb-16">
          Technical <span className="cyber-blue">Skills</span>
        </h2>
        
        {/* Tabbed Navigation */}
        <div className="flex flex-wrap justify-center mb-12 bg-black/30 rounded-xl p-2 backdrop-blur-sm border border-white/10">
          {skillTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 mx-1 mb-2 ${
                activeTab === tab.id
                  ? 'bg-[hsl(var(--cyber-blue))] text-white'
                  : 'text-purple-400 hover:text-purple-600'
              }`}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Skills Content */}
        <div ref={elementRef} className="min-h-[400px]">
          <SkillContent 
            key={`${activeTab}-${Date.now()}`}
            category={activeTab} 
            skills={SKILLS[activeTab]} 
            animate={true}
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

  const getColor = (category: SkillCategory) => {
    switch (category) {
      case 'programming': return 'cyber-blue';
      case 'frontend': return 'cyber-purple';
      case 'backend': return 'success-green';
      case 'ml': return 'cyber-purple';
      default: return 'cyber-blue';
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 items-start">
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <SkillBar 
            key={skill.name} 
            skill={skill} 
            animate={animate} 
            delay={index * 300 + 500}
          />
        ))}
      </div>
      <div className="flex items-center justify-center h-full">
        <div className={`text-8xl ${getColor(category)} animate-float opacity-20 hover:opacity-100 transition-opacity duration-500`}>
          <i className={getIcon(category)}></i>
        </div>
      </div>
    </div>
  );
}

function SkillBar({ 
  skill, 
  animate, 
  delay 
}: { 
  skill: { name: string; level: number };
  animate: boolean;
  delay: number;
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

  // Reset animation when switching tabs
  useEffect(() => {
    setCurrentWidth(0);
    setHasAnimated(false);
  }, [skill.name]);

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-3">
        <span className="font-semibold text-white">{skill.name}</span>
        <span className="text-cyan-400 font-mono font-bold">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-3 shadow-inner">
        <div 
          className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg transition-all duration-2000 ease-out relative overflow-hidden"
          style={{ 
            width: `${currentWidth}%`,
            background: 'linear-gradient(90deg, #00bcd4 0%, #9c27b0 100%)'
          }}
        >
          {currentWidth > 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          )}
        </div>
      </div>
    </div>
  );
}

import { TIMELINE_ITEMS } from '@/lib/constants';

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative z-10 py-20 px-6 bg-white/5">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-center mb-16">
          <span className="cyber-blue">Experience</span> & Education
        </h2>
        
        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-purple-500 to-cyan-400 transform -translate-x-1/2 z-0" 
               style={{ 
                 background: 'linear-gradient(180deg, #00bcd4 0%, #9c27b0 50%, #00bcd4 100%)',
                 height: '100%'
               }}>
          </div>
          
          {/* Timeline Items */}
          <div className="relative z-10 space-y-16">
            {TIMELINE_ITEMS.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ 
  item, 
  index 
}: { 
  item: typeof TIMELINE_ITEMS[0];
  index: number;
}) {
  const getDotColor = (color: string) => {
    switch (color) {
      case 'cyber-blue': return '#00bcd4';
      case 'cyber-purple': return '#9c27b0';
      case 'success-green': return '#4caf50';
      case 'gray': return '#9e9e9e';
      default: return '#00bcd4';
    }
  };

  const getTextColorClass = (color: string) => {
    switch (color) {
      case 'cyber-blue': return 'text-cyan-400';
      case 'cyber-purple': return 'text-purple-400';
      case 'success-green': return 'text-green-400';
      case 'gray': return 'text-gray-300';
      default: return 'text-cyan-400';
    }
  };

  const isLeft = item.side === 'left';

  return (
    <div className="relative flex items-center min-h-[120px]">
      {/* Left Content */}
      <div className={`w-1/2 ${isLeft ? 'pr-12' : 'pr-12'}`}>
        {isLeft && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105">
            <TimelineContent item={item} />
          </div>
        )}
      </div>
      
      {/* Timeline Dot */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div 
          className="w-5 h-5 rounded-full border-4 border-black shadow-lg animate-pulse"
          style={{ 
            backgroundColor: getDotColor(item.color),
            boxShadow: `0 0 20px ${getDotColor(item.color)}40`
          }}
        />
      </div>
      
      {/* Right Content */}
      <div className={`w-1/2 ${isLeft ? 'pl-12' : 'pl-12'}`}>
        {!isLeft && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105">
            <TimelineContent item={item} />
          </div>
        )}
      </div>
    </div>
  );
}

function TimelineContent({ item }: { item: typeof TIMELINE_ITEMS[0] }) {
  const getTextColorClass = (color: string) => {
    switch (color) {
      case 'cyber-blue': return 'text-cyan-400';
      case 'cyber-purple': return 'text-purple-400';
      case 'success-green': return 'text-green-400';
      case 'gray': return 'text-gray-300';
      default: return 'text-cyan-400';
    }
  };

  const getIconClass = (type: string) => {
    return type === 'education' ? 'fas fa-graduation-cap' : 'fas fa-briefcase';
  };

  return (
    <>
      <div className="flex items-center mb-3">
        <div className={`text-lg ${getTextColorClass(item.color)} mr-3`}>
          <i className={getIconClass(item.type)}></i>
        </div>
        <h3 className={`text-xl font-semibold ${getTextColorClass(item.color)}`}>
          {item.title}
        </h3>
      </div>
      <p className="text-white font-medium mb-2">{item.organization}</p>
      <p className="text-sm text-gray-400 mb-3 font-mono">{item.period}</p>
      <p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>
    </>
  );
}

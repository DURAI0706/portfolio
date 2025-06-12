import { PROJECTS } from '@/lib/constants';

export default function ProjectsSection() {
  const viewAllProjects = () => {
    alert('View all projects functionality would be implemented here');
  };

  return (
    <section id="projects" className="relative z-10 py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-center mb-16">
          Featured <span className="cyber-blue">Projects</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button 
            onClick={viewAllProjects}
            className="px-8 py-3 border border-[hsl(var(--cyber-blue))] cyber-blue hover:bg-[hsl(var(--cyber-blue))] hover:text-black rounded-lg transform hover:scale-105 transition-all duration-300"
          >
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const getColorClass = (color: string) => {
    switch (color) {
      case 'cyber-blue': return 'cyber-blue';
      case 'cyber-purple': return 'cyber-purple';
      case 'success-green': return 'success-green';
      case 'error-red': return 'error-red';
      default: return 'cyber-blue';
    }
  };

  const getBgColorClass = (color: string) => {
    switch (color) {
      case 'cyber-blue': return 'bg-[hsl(var(--cyber-blue))]/20';
      case 'cyber-purple': return 'bg-[hsl(var(--cyber-purple))]/20';
      case 'success-green': return 'bg-[hsl(var(--success-green))]/20';
      case 'error-red': return 'bg-[hsl(var(--error-red))]/20';
      default: return 'bg-[hsl(var(--cyber-blue))]/20';
    }
  };

  const viewProject = () => {
    alert(`View ${project.title} functionality would be implemented here`);
  };

  const viewGithub = () => {
    if (project.github) {
      window.open(project.github, '_blank');
    } else {
      alert('GitHub link will be updated soon');
    }
  };

  return (
    <div className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[hsl(var(--cyber-blue))]/50 transform hover:scale-105 transition-all duration-300">
      <div className="mb-4">
        <div className={`text-3xl ${getColorClass(project.color)} mb-3`}>
          <i className={project.icon}></i>
        </div>
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-3">{project.period}</p>
        <p className="text-gray-300 text-sm leading-relaxed">
          {project.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span 
            key={tech}
            className={`px-2 py-1 ${getBgColorClass(project.color)} ${getColorClass(project.color)} rounded text-xs`}
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex space-x-3">
        <button 
          onClick={viewProject}
          className="cyber-blue hover:text-cyan-400 transition-colors"
        >
          <i className="fas fa-external-link-alt"></i>
        </button>
        <button 
          onClick={viewGithub}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <i className="fab fa-github"></i>
        </button>
      </div>
    </div>
  );
}

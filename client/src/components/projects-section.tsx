import { PROJECTS } from '@/lib/constants';

export default function ProjectsSection() {
  const viewAllProjects = () => {
    alert('View all projects functionality would be implemented here');
  };

  return (
    <section id="projects" className="relative z-10 py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
          Featured <span className="professional-blue">Projects</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const getColorClass = (color: string) => {
    switch (color) {
      case 'cyber-blue': return 'professional-blue';
      case 'cyber-purple': return 'professional-navy';
      case 'success-green': return 'success-green';
      case 'error-red': return 'text-destructive';
      default: return 'professional-blue';
    }
  };

  const getBgColorClass = (color: string) => {
    switch (color) {
      case 'cyber-blue': return 'bg-blue-50 dark:bg-blue-950/20';
      case 'cyber-purple': return 'bg-blue-100 dark:bg-blue-900/20';
      case 'success-green': return 'bg-green-50 dark:bg-green-950/20';
      case 'error-red': return 'bg-red-50 dark:bg-red-950/20';
      default: return 'bg-blue-50 dark:bg-blue-950/20';
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
    <div className="professional-card group p-6 transform hover:scale-105 transition-all duration-300">
      <div className="mb-4">
        <div className={`text-3xl ${getColorClass(project.color)} mb-3`}>
          <i className={project.icon}></i>
        </div>
        <div className="flex items-center mb-2">
          <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
          <button 
            onClick={viewGithub} 
            className="ml-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <i className="fab fa-github"></i>
          </button>
        </div>
        <p className="text-muted-foreground text-sm mb-3">{project.period}</p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {project.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span 
            key={tech}
            className={`px-2 py-1 ${getBgColorClass(project.color)} ${getColorClass(project.color)} rounded text-xs font-medium`}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

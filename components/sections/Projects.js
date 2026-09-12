import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import { revealDelayClass } from '@/lib/revealDelay';

export default function Projects() {
  return (
    <section className="section" id="projects" aria-label="Featured projects">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">ls projects/ --sort=featured</span>
          <h2 className="section-title">Featured Work</h2>
          <p className="section-subtitle">A showcase of real-world software engineering projects spanning AI &amp; Computer Vision, Haptics, Concurrency, and System Design.</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} {...project} revealClass={revealDelayClass(index, 4)} />
          ))}
        </div>
      </div>
    </section>
  );
}

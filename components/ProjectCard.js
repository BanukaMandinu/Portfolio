import { GithubMarkIcon } from '@/components/icons';

export default function ProjectCard({ id, title, Icon, repoUrl, repoLabel, description, tags, revealClass }) {
  return (
    <article className={['glass-card', 'project-card', 'reveal', revealClass].filter(Boolean).join(' ')} id={id}>
      <div className="project-card-header">
        <div className="project-icon-box" aria-hidden="true">
          <Icon />
        </div>
        <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="project-repo-link" aria-label={repoLabel}>
          <GithubMarkIcon />
          <span>GitHub</span>
        </a>
      </div>
      <div className="project-body">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
      </div>
      <div className="project-tags">
        {tags.map((tag) => (
          <span className="project-tag" key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}

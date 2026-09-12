export default function TimelineItem({ id, title, org, date, status, description, tags, revealClass }) {
  return (
    <div className={['timeline-item', 'reveal', revealClass].filter(Boolean).join(' ')} id={id}>
      <div className="timeline-marker" aria-hidden="true" />
      <div className="timeline-content glass-card">
        <div className="timeline-header">
          <div>
            <h3 className="timeline-title">{title}</h3>
            <span className="timeline-company">{org}</span>
          </div>
          <div className="timeline-meta">
            <span className={`timeline-status timeline-status-${status === 'active' ? 'active' : 'complete'}`}>
              {status === 'active' ? 'Active' : 'Complete'}
            </span>
            <span className="timeline-date">{date}</span>
          </div>
        </div>
        <p className="timeline-description">{description}</p>
        <div className="timeline-tags">
          {tags.map((tag) => (
            <span className="project-tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

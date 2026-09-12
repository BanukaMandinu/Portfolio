import { skillCategories } from '@/data/skills';
import { revealDelayClass } from '@/lib/revealDelay';

export default function Skills() {
  return (
    <section className="section" id="skills" aria-label="Technical skills">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">ls -la skills/</span>
          <h2 className="section-title">Tech Stack &amp; Proficiencies</h2>
          <p className="section-subtitle">Core frameworks, test automation tools, AI/ML paradigms, languages, and development toolkits I specialize in.</p>
        </div>

        <div className="skills-panel reveal">
          <span className="card-tab">skills.json</span>
          {skillCategories.map((category, index) => {
            const Icon = category.Icon;
            return (
              <div className={['skills-row', 'reveal', revealDelayClass(index, 3)].join(' ')} id={category.id} key={category.id}>
                <div className="skills-row-head">
                  <span className="skills-row-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <h3 className="skills-row-title">{category.title}</h3>
                </div>
                <ul className="skills-row-badges">
                  {category.badges.map((badge) => (
                    <li className="skill-badge" key={badge}>
                      {badge}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

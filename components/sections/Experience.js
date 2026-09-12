import TimelineItem from '@/components/TimelineItem';
import { experience } from '@/data/experience';
import { revealDelayClass } from '@/lib/revealDelay';

export default function Experience() {
  return (
    <section className="section" id="experience" aria-label="Work experience">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">git log --oneline experience</span>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">Over 2 years of industry experience driving test automation, manual QA, and software quality.</p>
        </div>

        <div className="timeline">
          {experience.map((item, index) => (
            <TimelineItem key={item.id} {...item} revealClass={revealDelayClass(index, 3)} />
          ))}
        </div>
      </div>
    </section>
  );
}

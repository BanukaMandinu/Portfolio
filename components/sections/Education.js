import TimelineItem from '@/components/TimelineItem';
import { education } from '@/data/education';
import { revealDelayClass } from '@/lib/revealDelay';

export default function Education() {
  return (
    <section className="section" id="education" aria-label="Educational background">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">cat education.log</span>
          <h2 className="section-title">Academic Background</h2>
          <p className="section-subtitle">Formal education and foundational training in Software Engineering, Computer Science, and Physical Sciences.</p>
        </div>

        <div className="timeline">
          {education.map((item, index) => (
            <TimelineItem key={item.id} {...item} revealClass={revealDelayClass(index, 3)} />
          ))}
        </div>
      </div>
    </section>
  );
}

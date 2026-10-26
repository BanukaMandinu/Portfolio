import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Reveal from '@/components/Reveal';
import Counter from '@/components/Counter';
import Work from '@/components/Work';
import Stack from '@/components/Stack';
import Skills from '@/components/Skills';
import CopyEmail from '@/components/CopyEmail';
import { CONTACT } from '@/lib/contact';
import { projects } from '@/data/projects';
import { experience } from '@/data/experience';
import { education } from '@/data/education';
import { skillCategories } from '@/data/skills';

const EMAIL = CONTACT.email;

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/BanukaMandinu' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/banuka-nanayakkara/' },
  { label: 'WhatsApp', href: 'https://wa.me/94766221125' },
];

// Long paragraphs are hard to scan; show one sentence per bullet.
const toPoints = (text) =>
  text
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

// One card per entry; cards stick and stack as you scroll (see .stack in globals.css).
function Timeline({ items }) {
  return (
    <Stack>
      {items.map((item, i) => {
        const badge = item.status === 'active' ? 'Current' : item.badge;
        return (
          <article className="job" key={item.id} style={{ '--i': i }}>
            <div className="job-meta">
              <span className="job-date">{item.date}</span>
              {badge && (
                <span className={`live ${item.status === 'active' ? '' : 'done'}`}>
                  <i /> {badge}
                </span>
              )}
            </div>
            <div className="job-body">
              <h3>{item.title}</h3>
              <p className="job-org">{item.org}</p>
              <ul className="points">
                {toPoints(item.description).map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="tags">
                {item.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </Stack>
  );
}

function SectionHead({ num, label, title, children }) {
  return (
    <Reveal className="sec-head">
      <p className="sec-label">
        <span>{num}</span> {label}
      </p>
      <h2>{title}</h2>
      {children && <p className="sec-sub">{children}</p>}
    </Reveal>
  );
}

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Marquee />

      {/* ABOUT */}
      <section className="section" id="about" aria-labelledby="about-h">
        <div className="container">
          <SectionHead num="01" label="About" title={<span id="about-h">Quality-minded engineer, <em>curious</em> about AI.</span>} />

          <div className="bento">
            <Reveal className="card card-bio">
              <p>
                I&apos;m a <strong>Software Engineering graduate</strong> and{' '}
                <strong>Associate QA Engineer</strong> with over two years of hands-on experience in manual and
                automated testing, using <strong>Playwright, Selenium and MCP servers</strong>, plus API,
                accessibility and test-case design.
              </p>
              <p>
                I&apos;m drawn to <strong>AI-driven and agentic testing</strong>, and I train models in{' '}
                <strong>computer vision, GANs and diffusion models</strong>. I learn fast and care about
                shipping software that holds up.
              </p>
            </Reveal>

            <Reveal className="card card-stat" delay={80}>
              <b><Counter to={2} suffix="+" /></b>
              <span>years in QA</span>
            </Reveal>

            <Reveal className="card card-stat alt" delay={160}>
              <b><Counter to={projects.length} /></b>
              <span>projects on GitHub</span>
            </Reveal>

            <Reveal className="card card-now" delay={120}>
              <p className="mini">Right now</p>
              <p><strong>QA Engineer</strong> at AtLink Communications, building an automation framework and testing RAG-based systems.</p>
            </Reveal>

            <Reveal className="card card-now dark" delay={200}>
              <p className="mini">Graduated</p>
              <p><strong>BEng (Hons) Software Engineering</strong> from the University of Westminster, class of 2026.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section" id="experience" aria-labelledby="exp-h">
        <div className="container">
          <SectionHead num="02" label="Experience" title={<span id="exp-h">Where I&apos;ve <em>worked</em>.</span>} />

          <Timeline items={experience} />

          <Reveal className="sec-head sub">
            <p className="sec-label"><span>↳</span> Education</p>
            <h2>Where I <em>studied</em>.</h2>
          </Reveal>

          <Timeline items={education} />
        </div>
      </section>

      {/* WORK */}
      <section className="section" id="work" aria-labelledby="work-h">
        <div className="container">
          <SectionHead num="03" label="Selected work" title={<span id="work-h">Things I&apos;ve <em>built</em>.</span>}>
            Pick a filter, hover a row, click through to the repository.
          </SectionHead>
          <Work projects={projects} />
        </div>
      </section>

      {/* SKILLS */}
      <section className="section" id="skills" aria-labelledby="skills-h">
        <div className="container">
          <SectionHead num="04" label="Toolbox" title={<span id="skills-h">What I <em>work with</em>.</span>} />
          <Reveal>
            <Skills categories={skillCategories} />
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact" id="contact" aria-labelledby="contact-h">
        <div className="container">
          <Reveal>
            <p className="sec-label"><span>05</span> Contact <span className="live"><i /> Open to opportunities</span></p>
            <h2 id="contact-h" className="contact-title">
              Let&apos;s build<br /> something <em>reliable.</em>
            </h2>
          </Reveal>

          <Reveal className="contact-row" delay={100}>
            <a href={`mailto:${EMAIL}`} className="contact-mail" data-hover>{EMAIL}</a>
            <button type="button" className="btn btn-solid" data-open-contact data-magnetic>Send a message</button>
            <CopyEmail email={EMAIL} />
          </Reveal>

          <Reveal className="socials" delay={180}>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" data-hover>
                {s.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </Reveal>
        </div>

        <footer className="footer container">
          <span>© {new Date().getFullYear()} Banuka Nanayakkara</span>
          <a href="#top">Back to top ↑</a>
        </footer>
      </section>
    </main>
  );
}

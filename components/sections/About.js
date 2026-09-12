export default function About() {
  return (
    <section className="section" id="about" aria-label="About me">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">cat about.md</span>
          <h2 className="section-title">Who I Am</h2>
          <p className="section-subtitle">Bridging the gap between building resilient systems and breaking software to ensure perfection.</p>
        </div>

        <div className="about-wrapper reveal">
          <div className="about-card glass-card">
            <span className="card-tab">about.md</span>
            <h3 className="about-heading">Building Quality, Scalability &amp; AI Solutions</h3>
            <p className="about-bio">
              I am a <strong>Software Engineering graduate</strong> and <strong>Associate QA Engineer</strong> with over two years of industry experience in manual and automation testing.
              I am skilled in <strong>Playwright, Selenium, Playwright Codegen, MCP servers</strong>, API testing, accessibility testing, and test case design, with experience in Java and Python projects.
            </p>
            <p className="about-bio">
              I am passionate about <strong>AI-driven and agentic testing</strong>, with knowledge and hands-on experience in{' '}
              <strong>Computer Vision, GANs, and Diffusion Models</strong>, and machine learning model training. I am a fast learner committed to continuous technical growth and delivering high-quality software.
            </p>

            <div className="about-stats">
              <div className="stat-item glass-card">
                <span className="stat-number">2+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item glass-card">
                <span className="stat-number">8+</span>
                <span className="stat-label">GitHub Projects</span>
              </div>
              <div className="stat-item glass-card">
                <span className="stat-number">100%</span>
                <span className="stat-label">Test Reliability</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

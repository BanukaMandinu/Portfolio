const ITEMS = ['Playwright', 'Selenium', 'Gherkin / BDD', 'PyTorch', 'Diffusion Models', 'Java', 'Python', 'TypeScript', 'React', 'Accessibility', 'API Testing', 'MCP'];

export default function Marquee() {
  const row = ITEMS.map((t) => (
    <span key={t}>
      {t}
      <i aria-hidden="true">✦</i>
    </span>
  ));
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <div>{row}</div>
        <div>{row}</div>
      </div>
    </div>
  );
}

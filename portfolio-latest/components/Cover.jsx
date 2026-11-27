// Project cover: shows project.image if set, otherwise a styled placeholder.

function MockScreen({ project, light }) {
  return (
    <div className={`mock ${light ? "mock-light" : ""}`}>
      <div className="mock-nav">
        <i />
        <span />
        <span />
        <span />
        <b style={{ background: project.color }} />
      </div>
      <div className="mock-hero">
        <div className="mock-h1" />
        <div className="mock-h1 short" />
        <div className="mock-p" />
        <div className="mock-p short" />
        <div className="mock-btns">
          <u style={{ background: project.color }} />
          <u className="dark" />
        </div>
      </div>
    </div>
  );
}

export default function Cover({ project, variant }) {
  if (project.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="cover-img" src={project.image} alt={project.title} loading="lazy" />;
  }

  if (variant === "feature") {
    return (
      <div className="cover cover-feature">
        <MockScreen project={project} light />
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className="cover cover-card"
        style={{
          background: `radial-gradient(120% 90% at 20% 0%, ${project.color}, ${project.color}CC 55%, #2a1a14)`,
        }}
      >
        <MockScreen project={{ ...project, color: "#1b1a18" }} light />
      </div>
    );
  }

  const initials = project.title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="cover cover-art"
      style={{
        background: `radial-gradient(90% 70% at 30% 15%, ${project.color}, transparent 70%), radial-gradient(80% 60% at 80% 100%, ${project.color}99, transparent 70%), #141210`,
        color: project.ink,
      }}
    >
      <div className="art-rings" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="art-mark">{initials}</div>
    </div>
  );
}

// Project cover: shows interactive animated components for flagship projects,
// project.image if set, or a styled vector screen placeholder.

import KioskFanCard from "./KioskFanCard";

function PosMockScreen() {
  return (
    <div className="pos-cover-screen">
      <div className="pos-screen-bar">
        <div className="pos-screen-dots">
          <span />
          <span />
          <span />
        </div>
        <span className="pos-screen-title">OneHubPOS Terminal</span>
        <span className="pos-screen-status">● Live</span>
      </div>
      <div className="pos-screen-content">
        <div className="pos-screen-left">
          <div className="pos-item-grid">
            <div className="pos-item-tile active">
              <span className="pos-icon">🍔</span>
              <span className="pos-name">Burger</span>
              <span className="pos-price">$9.50</span>
            </div>
            <div className="pos-item-tile">
              <span className="pos-icon">🍟</span>
              <span className="pos-name">Fries</span>
              <span className="pos-price">$4.00</span>
            </div>
            <div className="pos-item-tile">
              <span className="pos-icon">🥤</span>
              <span className="pos-name">Soda</span>
              <span className="pos-price">$2.50</span>
            </div>
            <div className="pos-item-tile">
              <span className="pos-icon">☕</span>
              <span className="pos-name">Coffee</span>
              <span className="pos-price">$3.75</span>
            </div>
          </div>
        </div>
        <div className="pos-screen-right">
          <div className="pos-ticket">
            <div className="pos-ticket-head">
              <span>Order #204</span>
              <b>$16.00</b>
            </div>
            <div className="pos-ticket-line" />
            <div className="pos-ticket-sub">Dine In • Table 06</div>
            <div className="pos-ticket-btn">Tap to Pay</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockScreen({ project, light }) {
  return (
    <div className={`mock ${light ? "mock-light" : ""}`}>
      <div className="mock-nav">
        <i />
        <span />
        <span />
        <span />
        <b style={{ background: project.color || "#2B6BF0" }} />
      </div>
      <div className="mock-hero">
        <div className="mock-h1" />
        <div className="mock-h1 short" />
        <div className="mock-p" />
        <div className="mock-p short" />
        <div className="mock-btns">
          <u style={{ background: project.color || "#2B6BF0" }} />
          <u className="dark" />
        </div>
      </div>
    </div>
  );
}

export default function Cover({ project, variant }) {
  // Flagship interactive preview for Self-Ordering Kiosk
  if (project.slug === "kiosk-interface") {
    return <KioskFanCard compact={variant === "card"} showSteps={variant !== "card"} />;
  }

  // If an image is available (e.g. user uploaded cover.jpg), prioritize it!
  if (project.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="cover-img" src={project.image} alt={project.title} loading="lazy" />;
  }

  // Interactive checkout terminal for POS System fallback
  if (project.slug === "pos-system") {
    return (
      <div className="cover cover-pos">
        <PosMockScreen />
      </div>
    );
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

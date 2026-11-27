import Link from "next/link";
import { notFound } from "next/navigation";
import { site, projects } from "../../../data/site";
import KioskMockup from "../../../components/KioskMockup";
import MerchantOnboardingCover from "../../../components/MerchantOnboardingCover";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return {};
  return { title: `${p.title} — ${site.name}`, description: p.summary };
}

export default function WorkPage({ params }) {
  const index = projects.findIndex((x) => x.slug === params.slug);
  if (index === -1) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  const gallery = p.gallery || [];

  return (
    <main className="page case">
      <header className="case-top">
        <Link href="/">← {site.name}</Link>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </header>

      <section className="case-hero" style={{ background: p.color, color: p.ink }}>
        <span className="label">
          {p.kind} · {p.year}
        </span>
        <h1>{p.title}</h1>
        <p>{p.summary}</p>
      </section>

      <section className="case-meta">
        <div>
          <span className="label">Role</span>
          <p>{p.role}</p>
        </div>
        <div>
          <span className="label">Year</span>
          <p>{p.year}</p>
        </div>
        <div>
          <span className="label">Tools</span>
          <p>{p.tools.join(", ")}</p>
        </div>
      </section>

      {p.facts?.length ? (
        <section className="case-facts-grid">
          {p.facts.map((f, fi) => (
            <div key={fi} className="case-fact-item">
              <span className="label">{f.label}</span>
              <span>{f.value}</span>
            </div>
          ))}
        </section>
      ) : null}

      {(p.stats?.length || p.metrics?.length) ? (
        <section className="case-metrics-grid">
          {(p.stats || p.metrics).map((m, mi) => (
            <div key={mi} className="case-metric-card">
              <span className="metric-val">{m.value}</span>
              <strong className="metric-label">{m.label}</strong>
              {m.desc ? <p className="metric-desc">{m.desc}</p> : null}
            </div>
          ))}
        </section>
      ) : null}

      {p.flow?.length ? (
        <section className="case-flow-wrapper">
          <span className="case-flow-label">User Journey Flow</span>
          <div className="case-flow-steps">
            {p.flow.map((step, idx) => (
              <div key={step} className="case-flow-step">
                <span className="case-flow-num">{idx + 1}</span>
                <span>{step}</span>
                {idx < p.flow.length - 1 ? <span className="case-flow-arrow">→</span> : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="case-body">
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={p.title} style={{ width: "100%", borderRadius: 24, boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }} />
        ) : (
          <div className="case-image" style={{ background: p.color, color: p.ink }}>
            <span className="label">Add a cover image in data/site.js</span>
          </div>
        )}
        {p.sections.map((s, i) => (
          <article key={s.title || i}>
            <span className="label">{String(i + 1).padStart(2, "0")}</span>
            <h2>{s.title}</h2>
            {Array.isArray(s.text) ? (
              s.text.map((t, ti) => <p key={ti}>{t}</p>)
            ) : s.text ? (
              <p>{s.text}</p>
            ) : null}

            {s.bullets?.length ? (
              <ul className="case-bullets">
                {s.bullets.map((b, bi) => {
                  if (typeof b === "string") {
                    return (
                      <li key={bi}>
                        <span className="bullet-dot" />
                        <span>{b}</span>
                      </li>
                    );
                  }
                  return (
                    <li key={bi}>
                      <span className="bullet-dot" />
                      <div>
                        {b.title ? <strong>{b.title} — </strong> : null}
                        <span>{b.text}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {(s.showMerchantOnboarding || s.images?.length) ? (
              <div className={`case-img-grid ${s.layout || "wide"}`}>
                {s.showMerchantOnboarding ? (
                  <div className="case-img-card">
                    <div className="case-onboarding-stage">
                      <MerchantOnboardingCover />
                    </div>
                    {s.onboardingCaption ? (
                      <span className="case-caption">{s.onboardingCaption}</span>
                    ) : null}
                  </div>
                ) : null}
                {s.images?.map((imgSrc, imgIdx) => {
                  const isVideo = /\.(mp4|webm|mov)$/i.test(imgSrc);
                  return (
                    <div key={imgSrc} className="case-img-card">
                      {isVideo ? (
                        <video
                          src={imgSrc}
                          autoPlay
                          loop
                          muted
                          playsInline
                          controls
                          preload="metadata"
                        />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={imgSrc} alt={s.captions?.[imgIdx] || `${s.title} visual ${imgIdx + 1}`} loading="lazy" />
                      )}
                      {s.captions?.[imgIdx] ? (
                        <span className="case-caption">{s.captions[imgIdx]}</span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}

            {s.showKioskInteractive ? (
              <div style={{ marginTop: 24 }}>
                <KioskMockup />
              </div>
            ) : null}
          </article>
        ))}
        {p.liveUrl ? (
          <div className="case-links">
            <a className="pill-btn pill-btn-cream" href={p.liveUrl} target="_blank" rel="noreferrer">
              Visit project ↗
            </a>
          </div>
        ) : null}
      </section>

      <Link href={`/work/${next.slug}`} className="case-next">
        <span className="label">Next project</span>
        <strong>{next.title} →</strong>
      </Link>
    </main>
  );
}

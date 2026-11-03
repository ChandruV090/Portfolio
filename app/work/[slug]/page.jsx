import Link from "next/link";
import { notFound } from "next/navigation";
import { site, projects } from "../../../data/site";

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

      <section className="case-body">
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={p.title} style={{ width: "100%", borderRadius: 24 }} />
        ) : (
          <div className="case-image" style={{ background: p.color, color: p.ink }}>
            <span className="label">Add a cover image in data/site.js</span>
          </div>
        )}
        {p.sections.map((s, i) => (
          <article key={s.title}>
            <span className="label">{String(i + 1).padStart(2, "0")}</span>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
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

      {gallery.length ? (
        <section className="case-gallery">
          {gallery.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt={`${p.title} design`} loading="lazy" />
          ))}
        </section>
      ) : null}

      <Link href={`/work/${next.slug}`} className="case-next">
        <span className="label">Next project</span>
        <strong>{next.title} →</strong>
      </Link>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site, projects } from "../data/site";
import Cover from "./Cover";
import Globe from "./Globe";
import { Icon } from "./Icons";

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatCoord(lat, lng) {
  const la = `${Math.abs(lat).toFixed(2)}° ${lat >= 0 ? "N" : "S"}`;
  const ln = `${Math.abs(lng).toFixed(2)}° ${lng >= 0 ? "E" : "W"}`;
  return `${la}, ${ln}`;
}

function Clock({ timezone, label }) {
  const [text, setText] = useState("--:--");
  useEffect(() => {
    const tick = () => {
      try {
        setText(
          new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: timezone,
          }).format(new Date())
        );
      } catch (e) {
        setText("--:--");
      }
    };
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, [timezone]);
  return (
    <span className="label">
      {text} {label}
    </span>
  );
}

function Currently() {
  const c = site.currently;
  const name = c.href ? (
    <a href={c.href} target="_blank" rel="noreferrer">
      {c.company} <Icon name="arrow-up-right" size={14} />
    </a>
  ) : (
    <span>{c.company}</span>
  );
  return (
    <div className="tile tile-cream">
      <div className="row between">
        <span className="label">{c.label}</span>
        <span className="label">{c.since}</span>
      </div>
      <div className="cream-body">
        <div>
          <h3 className="cream-company">{name}</h3>
          <p className="cream-person">{site.name}</p>
          <p className="cream-role">{c.role}</p>
        </div>
        <div className="cream-icon" aria-hidden="true">
          {initials(c.company)}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const parts = site.company.href ? (
    <a href={site.company.href} target="_blank" rel="noreferrer" className="accent">
      @{site.company.name}
    </a>
  ) : (
    <span className="accent">@{site.company.name}</span>
  );
  return (
    <div className="tile tile-hero">
      <div className="row between">
        {site.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="avatar" src={site.avatar} alt={site.name} />
        ) : (
          <div className="avatar avatar-initials" aria-hidden="true">
            {initials(site.name)}
          </div>
        )}
        <span className="pill-status">
          <i /> {site.status}
        </span>
      </div>

      <div className="hero-mid">
        <div className="hero-name">
          <p className="eyebrow">Hey there! I’m</p>
          <h1>{site.name}</h1>
          <p className="handle">{site.handle}</p>
        </div>
        <div className="hero-bio">
          <p className="hero-role">
            {site.role} {parts}
          </p>
          <p className="hero-desc">{site.tagline}</p>
        </div>
      </div>

      <div className="hero-foot">
        <div className="socials">
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="social">
              <Icon name={s.icon} />
            </a>
          ))}
        </div>
        <div className="hero-actions">
          <a className="pill-wide pill-wide-cream" href={`mailto:${site.email}`}>
            <span>{site.email}</span>
            <Icon name="mail" />
          </a>
          {site.cvUrl ? (
            <a className="pill-wide" href={site.cvUrl} download>
              <span>Download CV</span>
              <Icon name="arrow-up-right" size={16} />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function GlobeTile() {
  const loc = site.location;
  return (
    <div className="tile tile-globe">
      <div className="row between">
        <span className="label">Based in</span>
        <Clock timezone={loc.timezone} label={loc.timezoneLabel} />
      </div>
      <div className="globe-wrap">
        <Globe lat={loc.lat} lng={loc.lng} />
      </div>
      <div>
        <h3 className="globe-title">{loc.label}</h3>
        <p className="muted">
          {loc.availability} · {formatCoord(loc.lat, loc.lng)}
        </p>
      </div>
    </div>
  );
}

function ProjectTile({ project }) {
  const href = `/work/${project.slug}`;

  if (project.variant === "card") {
    return (
      <article className="tile tile-card">
        <Link href={href} className="card-cover" aria-label={project.title}>
          <Cover project={project} variant="card" />
          <span className="pill-tag pill-tag-light">{project.status}</span>
        </Link>
        <div className="card-body">
          <span className="label">{project.kind}</span>
          <h3>{project.title}</h3>
          <p className="muted">{project.summary}</p>
          <div className="row gap">
            <Link href={href} className="pill-btn">
              Case study <Icon name="arrow-right" size={15} />
            </Link>
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="pill-btn pill-btn-cream">
                Try it <Icon name="arrow-up-right" size={15} />
              </a>
            ) : null}
          </div>
        </div>
      </article>
    );
  }

  const feature = project.variant === "feature";
  return (
    <Link
      href={href}
      className={`tile tile-media media-${project.column} ${feature ? "media-feature" : "media-art"}`}
    >
      <Cover project={project} variant={feature ? "feature" : "art"} />
      <span className="pill-tag pill-tag-dark">{project.kind}</span>
      {feature ? <span className="pill-tag pill-tag-light pill-tag-right">{project.status}</span> : null}
      <div className="glass-bar">
        <div>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
        </div>
        <span className="circle-btn" aria-hidden="true">
          <Icon name="arrow-up-right" size={18} />
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [done, setDone] = useState(site.todos.map((t) => t.done));

  const visible = projects.filter((p) => filter === "all" || p.category === filter);
  const col = (name) => visible.filter((p) => p.column === name);
  const right = col("right");
  const doneCount = done.filter(Boolean).length;

  return (
    <main className="page">
      <div className="cols">
        <div className="col">
          <Currently />
          {col("left").map((p) => (
            <ProjectTile key={p.slug} project={p} />
          ))}
        </div>

        <div className="col">
          <Hero />
          {col("mid").map((p) => (
            <ProjectTile key={p.slug} project={p} />
          ))}
        </div>

        <div className="col">
          {right[0] ? <ProjectTile project={right[0]} /> : null}
          <GlobeTile />
          {right.slice(1).map((p) => (
            <ProjectTile key={p.slug} project={p} />
          ))}
        </div>
      </div>

      <section className="cols3">
        <div className="tile">
          <div className="row between">
            <span className="label">Tools</span>
          </div>
          <ul className="tool-list">
            {site.tools.map((t) => (
              <li key={t.name}>
                <span>{t.name}</span>
                <em>{t.level}</em>
              </li>
            ))}
          </ul>
        </div>

        <div className="tile">
          <div className="row between">
            <span className="label">To-do</span>
            <span className="label">
              {doneCount}/{site.todos.length}
            </span>
          </div>
          <ul className="todo-list">
            {site.todos.map((t, i) => (
              <li key={t.text}>
                <label>
                  <input
                    type="checkbox"
                    checked={done[i]}
                    onChange={() => setDone((d) => d.map((x, j) => (j === i ? !x : x)))}
                  />
                  <span>{t.text}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="tile">
          <span className="label">How I work</span>
          <ol className="principles">
            {site.principles.map((p) => (
              <li key={p.n}>
                <b>{p.n}</b>
                <div>
                  <strong>{p.title}</strong>
                  <p className="muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="tile tile-contact" id="contact">
        <span className="label">Contact</span>
        <h2>Say hello.</h2>
        <p className="muted">
          Something to design or a role in mind? Email is the fastest way to reach me.
        </p>
        <a className="pill-wide pill-wide-cream contact-pill" href={`mailto:${site.email}`}>
          <span>{site.email}</span>
          <Icon name="mail" />
        </a>
      </section>

      <footer className="footer">
        <span>
          © {new Date().getFullYear()} {site.name} — {site.handle}
        </span>
        <span>Designed &amp; built with Next.js</span>
      </footer>

      <div className="filter" role="tablist" aria-label="Filter work">
        {[
          { id: "all", label: "All" },
          { id: "products", label: "Products" },
          { id: "design", label: "Design" },
        ].map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={filter === f.id}
            className={filter === f.id ? "on" : ""}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </main>
  );
}

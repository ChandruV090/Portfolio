"use client";

import { useEffect, useRef, useState } from "react";

// ─── OneHubPOS Onboarding Splash — ported from onehubpos-onboarding.html ───
// 4 slides: Welcome (rocket), Track (chart), Payments, Team
// Auto-advances every 3.6 s. Respects prefers-reduced-motion.
// ────────────────────────────────────────────────────────────────────────────

const SLIDES = [
  { title: "Welcome to OneHubPOS", sub: "Streamline your business with our powerful point-of-sale system" },
  { title: "Track Everything",     sub: "Real-time insights into sales, inventory, and customer behavior" },
  { title: "Easy Payments",        sub: "Accept multiple payment methods with split bills and tips" },
  { title: "Manage Your Team",     sub: "Employee tracking, permissions, and performance analytics" },
];

const CYCLE = 3600;

function SlideRocket({ active }) {
  return (
    <div className={`ohp-stage${active ? " ohp-active" : ""}`}>
      <span className="ohp-dot-deco ohp-d1" />
      <span className="ohp-dot-deco ohp-d3" />
      <div className={`ohp-card ohp-card-lg${active ? " ohp-popped" : ""}`}>
        <div className="ohp-rocket-wrap">
          <svg width="84" height="84" viewBox="0 0 64 64" aria-hidden="true">
            <path d="M32 6c9 7 13 18 12 30l-6 6H26l-6-6C19 24 23 13 32 6z" fill="#2563eb"/>
            <path d="M32 6c-4 3-6.5 7-7.6 11.5C30 17 34 17 39.6 17.5 38.5 13 36 9 32 6z" fill="#60a5fa" opacity="0.5"/>
            <circle cx="32" cy="26" r="5.2" fill="#fff"/>
            <circle cx="32" cy="26" r="2.4" fill="#2563eb"/>
            <path d="M20 40l-7 8 8-1z" fill="#1e40af"/>
            <path d="M44 40l7 8-8-1z" fill="#1e40af"/>
            <path className="ohp-flame" d="M27 46h10l-5 12z" fill="#fb923c"/>
            <path className="ohp-flame" d="M29.5 46h5l-2.5 7z" fill="#fde68a" style={{animationDelay:"0.15s"}}/>
          </svg>
        </div>
      </div>
      <span className="ohp-trail ohp-t1" />
      <span className="ohp-trail ohp-t2" />
    </div>
  );
}

function SlideChart({ active }) {
  return (
    <div className={`ohp-stage${active ? " ohp-active" : ""}`}>
      <span className="ohp-dot-deco ohp-d2" />
      <span className="ohp-dot-deco ohp-d3" style={{bottom:"110px",left:"40px",background:"#fcd34d"}} />
      <div className={`ohp-card ohp-card-md${active ? " ohp-popped" : ""}`} style={{justifyContent:"center",position:"relative"}}>
        <div className="ohp-chart">
          <div className={`ohp-bar ohp-bg${active ? " ohp-grow" : ""}`} style={{height:"46px",animationDelay:"0.35s"}} />
          <div className={`ohp-bar ohp-br${active ? " ohp-grow" : ""}`} style={{height:"30px",animationDelay:"0.45s"}} />
          <div className={`ohp-bar ohp-bb${active ? " ohp-grow" : ""}`} style={{height:"66px",animationDelay:"0.55s"}} />
        </div>
        <svg className="ohp-trend" viewBox="0 0 150 40" width="150" height="40" aria-hidden="true" style={{position:"absolute",left:"10px",top:"10px",overflow:"visible"}}>
          <path className={active ? "ohp-draw" : ""} d="M6 30 C 30 26, 40 12, 62 18 S 100 8, 144 6"/>
          <circle className={active ? "ohp-fadein" : ""} cx="144" cy="6" r="4"/>
        </svg>
      </div>
    </div>
  );
}

function SlidePayments({ active }) {
  return (
    <div className={`ohp-stage${active ? " ohp-active" : ""}`}>
      <span className="ohp-dot-deco ohp-d4" />
      <span className="ohp-dot-deco ohp-d3" style={{bottom:"70px",left:"28px"}} />
      <div className={`ohp-card${active ? " ohp-popped" : ""}`} style={{width:"170px",height:"150px",flexDirection:"column",alignItems:"stretch",padding:"18px",justifyContent:"flex-start"}}>
        <div className="ohp-pay-head" />
        <div className="ohp-pay-line" style={{width:"100%"}} />
        <div className="ohp-pay-line" style={{width:"70%"}} />
        <div className="ohp-pay-row">
          <span className="ohp-pay-dot" style={{background:"#34d399"}} />
          <span className="ohp-pay-dot" style={{background:"#f87171"}} />
          <span className="ohp-chip-btn">
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 4.5v3M5 2.5v7M8 4v4M10.5 5.5v1" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            <span className={`ohp-check${active ? " ohp-pop-check" : ""}`}>
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M3 7.5l2.5 2.5L11 4.5" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </span>
        </div>
      </div>
      <span className="ohp-coin ohp-c1">$</span>
      <span className="ohp-coin ohp-c2">$</span>
    </div>
  );
}

function SlideTeam({ active }) {
  return (
    <div className={`ohp-stage${active ? " ohp-active" : ""}`}>
      <span className="ohp-sparkle ohp-s1" />
      <span className="ohp-sparkle ohp-s2" />
      <span className="ohp-dot-deco ohp-d1" style={{top:"70px",right:"58px"}} />
      <span className="ohp-dot-deco ohp-d3" style={{bottom:"72px",left:"38px"}} />
      <div className={`ohp-card${active ? " ohp-popped" : ""}`} style={{width:"160px",height:"150px",flexDirection:"column",gap:"6px"}}>
        <div className="ohp-team-bars">
          <div className={`ohp-bar ohp-bg${active ? " ohp-grow" : ""}`} style={{height:"56px",width:"16px",animationDelay:"0.35s"}} />
          <div className={`ohp-bar ohp-br${active ? " ohp-grow" : ""}`} style={{height:"72px",width:"16px",animationDelay:"0.45s"}} />
          <div className={`ohp-bar ohp-bb${active ? " ohp-grow" : ""}`} style={{height:"48px",width:"16px",animationDelay:"0.55s"}} />
        </div>
        <div className="ohp-people">
          {[0,1,2].map(i => (
            <div key={i} className="ohp-person" style={{animationDelay:`${i*0.4}s`}}>
              <div className="ohp-person-head" />
              <div className="ohp-person-body" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MerchantOnboardingCover() {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const [idx, setIdx] = useState(0);
  const tokenRef = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const tok = ++tokenRef.current;
    const id = setInterval(() => {
      if (tok !== tokenRef.current) return;
      setIdx(i => (i + 1) % SLIDES.length);
    }, CYCLE);
    return () => { tokenRef.current++; clearInterval(id); };
  }, [reduce]);

  const goTo = (i) => {
    tokenRef.current++;
    setIdx(i);
  };

  return (
    <div className="ohp-wrap">
      {/* Phone shell */}
      <div className="ohp-phone">
        {/* Status bar */}
        <div className="ohp-status">
          <span>9:41</span>
          <div className="ohp-status-icons">
            <svg width="17" height="11" viewBox="0 0 17 11" aria-hidden="true">
              <rect x="0" y="7" width="3" height="4" rx="1" fill="#0f172a"/>
              <rect x="4.5" y="5" width="3" height="6" rx="1" fill="#0f172a"/>
              <rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="#0f172a"/>
              <rect x="13.5" y="0" width="3" height="11" rx="1" fill="#0f172a"/>
            </svg>
            <div className="ohp-battery" />
          </div>
        </div>

        {/* Slide viewport */}
        <div className="ohp-viewport">
          <div className="ohp-track" style={{transform:`translateX(-${idx * 100}%)`}}>
            {SLIDES.map((s, i) => (
              <section key={i} className={`ohp-slide${i === idx ? " ohp-slide-active" : ""}`}>
                {i === 0 && <SlideRocket active={i === idx} />}
                {i === 1 && <SlideChart active={i === idx} />}
                {i === 2 && <SlidePayments active={i === idx} />}
                {i === 3 && <SlideTeam active={i === idx} />}
                <div className="ohp-copy">
                  <h2 className={i === idx ? "ohp-rise" : ""}>{s.title}</h2>
                  <p className={i === idx ? "ohp-rise ohp-rise-delay" : ""}>{s.sub}</p>
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="ohp-footer">
          <div className="ohp-pager">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`ohp-dot${i === idx ? " ohp-dot-on" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <button className="ohp-next-btn" onClick={() => goTo((idx + 1) % SLIDES.length)}>
            {idx === SLIDES.length - 1 ? "Get Started" : "Next"} {idx < SLIDES.length - 1 && <span className="ohp-arrow">›</span>}
          </button>
          <div className="ohp-home-bar" />
        </div>
      </div>
    </div>
  );
}

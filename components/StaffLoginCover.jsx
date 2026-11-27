"use client";

import { useEffect, useRef, useState } from "react";

// ─── Animated cover for Staff Login, Clock In/Out ───────────────────────────
// Layout mirrors the cover.png:
//   Left  → text block (title lines animate in one-by-one)
//   Centre → tablet  (timesheet, with the "Clocked in" dot pulsing on 02 state,
//                     the shift-ring drawing and bars growing on 03 state)
//   Right → phone keypad (slides in from right, then floats)
//   Top-right → "Clocked in" notification card (pops in, floats)
//   On 04 state the photo (04-order-screen.png) slow-zooms.
//
// States auto-cycle:  01 → 02 → 03 → 04 → 01 …
// Reduced-motion: static cover.png instead.
// ─────────────────────────────────────────────────────────────────────────────

const SCREENS = [
  { id: "01", label: "PIN entry" },
  { id: "02", label: "Clocked in" },
  { id: "03", label: "Shift complete" },
  { id: "04", label: "Order screen" },
];

const CYCLE_MS = 4800;

export default function StaffLoginCover({ variant = "card" }) {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [phase, setPhase] = useState("idle"); // idle → enter → hold → exit
  const [screenIdx, setScreenIdx] = useState(0);
  const [entered, setEntered] = useState(false);
  const tokenRef = useRef(0);

  // On mount: delay a tick then trigger the entry animation
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => {
      setPhase("enter");
      setEntered(true);
    }, 80);
    return () => clearTimeout(t);
  }, [reduce]);

  // Cycle between screens
  useEffect(() => {
    if (reduce) return;
    const tok = ++tokenRef.current;

    const tick = () => {
      if (tok !== tokenRef.current) return;
      setPhase("exit");
      setTimeout(() => {
        if (tok !== tokenRef.current) return;
        setScreenIdx((i) => (i + 1) % SCREENS.length);
        setPhase("enter");
      }, 500);
    };

    const id = setInterval(tick, CYCLE_MS);
    return () => {
      tokenRef.current++;
      clearInterval(id);
    };
  }, [reduce]);

  const screen = SCREENS[screenIdx];
  const isEntering = phase === "enter";
  const isExiting = phase === "exit";

  if (reduce) {
    // Reduced motion: just show the static cover
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        className="cover-img"
        src="/projects/staff-login-clock-in/cover.png"
        alt="Staff Login, Clock In/Out"
        loading="lazy"
      />
    );
  }

  return (
    <div className={`slco-wrap ${entered ? "slco-entered" : ""} slco-screen-${screen.id}`}>
      {/* ── Background glow (breathes via CSS animation) ── */}
      <div className="slco-glow" aria-hidden="true" />

      {/* ── Left: staggered text lines ── */}
      <div className="slco-text" aria-label="Staff Login, Clock In/Out">
        <span className="slco-badge">UI/UX Case Study</span>
        <p className="slco-title-sm">Staff Login</p>
        <h2 className="slco-title-lg">Clock<br />In/Out</h2>
        <p className="slco-sub">Secure sign-in at the start<br />of every shift</p>
      </div>

      {/* ── Thin breathing ring behind tablet ── */}
      <div className="slco-ring" aria-hidden="true" />

      {/* ── Centre: Tablet (timesheet) ── */}
      <div
        className={`slco-tablet ${isEntering ? "slco-tablet-enter" : ""} ${isExiting ? "slco-tablet-exit" : ""}`}
        aria-hidden="true"
      >
        {/* Tablet frame */}
        <div className="slco-tablet-frame">
          {/* Screen 01 – timesheet pre-shift */}
          <div className={`slco-tablet-screen slco-ts-01 ${screen.id === "01" ? "active" : ""}`}>
            <div className="slco-ts-topbar">
              <div className="slco-ts-logo">
                <div className="slco-brand-mark" />
                <span>OneHubPOS</span>
              </div>
              <span className="slco-ts-title">My timesheet</span>
            </div>
            <div className="slco-ts-body">
              <div className="slco-ts-clock-block">
                <div className="slco-ts-day">THURSDAY</div>
                <div className="slco-ts-time">10:16<sup>AM</sup></div>
                <div className="slco-ts-date">May 7, 2026</div>
              </div>
              <div className="slco-ts-stats">
                <div className="slco-ts-stat">
                  <span className="slco-stat-label">TOTAL INVENTORY</span>
                  <span className="slco-stat-val">8h 00m</span>
                  <span className="slco-stat-sub">9:00 AM – 5:00 PM</span>
                </div>
                <div className="slco-ts-stat">
                  <span className="slco-stat-label">WORKED TODAY</span>
                  <span className="slco-stat-val">0h 00m</span>
                  <span className="slco-stat-sub muted">Not yet clocked in</span>
                </div>
              </div>
              <div className="slco-ts-empty">
                <span className="slco-ts-empty-icon">⏱</span>
                <span>No shifts today yet</span>
              </div>
            </div>
          </div>

          {/* Screen 02 – active shift with pulsing dot */}
          <div className={`slco-tablet-screen slco-ts-02 ${screen.id === "02" ? "active" : ""}`}>
            <div className="slco-ts-topbar">
              <div className="slco-ts-logo">
                <div className="slco-brand-mark" />
                <span>OneHubPOS</span>
              </div>
              <span className="slco-ts-title">My timesheet · 1h 45m</span>
            </div>
            <div className="slco-ts-body">
              <div className="slco-ts-stats four">
                <div className="slco-ts-stat">
                  <span className="slco-stat-label">WORKED TODAY</span>
                  <span className="slco-stat-val green">1h 45m</span>
                  <span className="slco-stat-sub green-s">on shift</span>
                </div>
                <div className="slco-ts-stat">
                  <span className="slco-stat-label">BREAK TIME</span>
                  <span className="slco-stat-val">0m/30m</span>
                  <span className="slco-stat-sub muted">Allowance remaining</span>
                </div>
                <div className="slco-ts-stat">
                  <span className="slco-stat-label">EST CLOCK OUT</span>
                  <span className="slco-stat-val">11:33 PM</span>
                </div>
              </div>
              <div className="slco-ts-table">
                <div className="slco-ts-row header">
                  <span>DATE</span><span>JOB/ROLE</span><span>CLOCK IN</span><span>CLOCK OUT</span><span>HOURS</span>
                </div>
                {[
                  { date: "May 7, 2026", role: "Admin", cin: "03:33 PM", cout: "—", hrs: "1h 45m", active: true },
                  { date: "May 6, 2026", role: "Admin", cin: "08:32 AM", cout: "04:48 PM", hrs: "7h 46m" },
                  { date: "May 5, 2026", role: "Admin", cin: "09:01 AM", cout: "05:14 PM", hrs: "7h 28m" },
                ].map((r) => (
                  <div key={r.date} className={`slco-ts-row ${r.active ? "active-row" : ""}`}>
                    <span>{r.date}</span><span>{r.role}</span><span>{r.cin}</span><span>{r.cout}</span>
                    <span className={r.active ? "green" : ""}>{r.hrs}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Screen 03 – shift complete with animated ring + bars */}
          <div className={`slco-tablet-screen slco-ts-03 ${screen.id === "03" ? "active" : ""}`}>
            <div className="slco-ts-topbar">
              <div className="slco-ts-logo">
                <div className="slco-brand-mark" />
                <span>OneHubPOS</span>
              </div>
              <span className="slco-ts-title slco-complete-banner">✓ Shift complete – nice work!</span>
            </div>
            <div className="slco-ts-body">
              <div className="slco-ts-stats four">
                <div className="slco-ts-stat">
                  <span className="slco-stat-label">WORKED TODAY</span>
                  <span className="slco-stat-val green">7h 39m</span>
                </div>
                <div className="slco-ts-stat">
                  <span className="slco-stat-label">BREAK TIME</span>
                  <span className="slco-stat-val">45m used</span>
                </div>
                <div className="slco-ts-stat">
                  <span className="slco-stat-label">OVERTIME</span>
                  <span className="slco-stat-val orange">+0h 14m</span>
                </div>
              </div>
              {/* Animated ring */}
              <div className="slco-shift-ring-wrap">
                <svg className="slco-shift-ring" viewBox="0 0 80 80" aria-hidden="true">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="5" />
                  <circle
                    className="slco-ring-progress"
                    cx="40" cy="40" r="34"
                    fill="none" stroke="#4ade80" strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="213.6"
                    strokeDashoffset="213.6"
                    transform="rotate(-90 40 40)"
                  />
                </svg>
                <div className="slco-ring-label">
                  <span className="slco-ring-val">7h 39m</span>
                  <span className="slco-ring-sub">today</span>
                </div>
              </div>
              {/* Weekly bars */}
              <div className="slco-bars-wrap">
                {[
                  { day: "M", h: 72 }, { day: "T", h: 85 }, { day: "W", h: 60 },
                  { day: "T", h: 90, today: true }, { day: "F", h: 0 },
                ].map((b, i) => (
                  <div key={i} className="slco-bar-col">
                    <div className="slco-bar-track">
                      <div
                        className={`slco-bar-fill ${b.today ? "today" : ""}`}
                        style={{ "--bar-h": `${b.h}%`, animationDelay: `${i * 100}ms` }}
                      />
                    </div>
                    <span className="slco-bar-day">{b.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Screen 04 – order screen (slow zoom on the photo) */}
          <div className={`slco-tablet-screen slco-ts-04 ${screen.id === "04" ? "active" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="slco-order-photo"
              src="/projects/staff-login-clock-in/04-order-screen.png"
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* ── Right: phone keypad (slides in from right) ── */}
      <div
        className={`slco-phone ${isEntering ? "slco-phone-enter" : ""} ${isExiting ? "slco-phone-exit" : ""}`}
        aria-hidden="true"
      >
        <div className="slco-phone-frame">
          <div className="slco-phone-title">Staff login</div>
          <div className="slco-pin-dots">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={`slco-dot ${i < 2 ? "filled" : ""}`} />
            ))}
          </div>
          <div className="slco-keypad">
            {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((k, i) => (
              <div key={i} className={`slco-key ${k === "" ? "empty" : ""}`}>
                {k}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Notification card: "Clocked in" (pops in, only on screen 02+) ── */}
      <div
        className={`slco-notif ${screen.id !== "01" ? "slco-notif-visible" : ""}`}
        aria-hidden="true"
      >
        <div className="slco-notif-header">
          <span className="slco-notif-dot" />
          <span>Clocked in</span>
        </div>
        <p className="slco-notif-body">Your shift is in progress.<br />Tap below when you are done.</p>
        <div className="slco-notif-btn">Clock out</div>
      </div>

      {/* ── Bottom meta bar (static) ── */}
      <div className="slco-meta" aria-hidden="true">
        <div className="slco-meta-col"><span className="slco-meta-key">PLATFORM</span><span>Tablet POS</span></div>
        <div className="slco-meta-col"><span className="slco-meta-key">FOCUS</span><span>Fast, secure access</span></div>
        <div className="slco-meta-col"><span className="slco-meta-key">ROLE</span><span>Lead UI/UX Designer</span></div>
      </div>
    </div>
  );
}

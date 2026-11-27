"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function KioskCoverTile() {
  const containerRef = useRef(null);
  const tiltRef = useRef(null);
  const [tapDine, setTapDine] = useState(false);
  const [tapTake, setTapTake] = useState(false);
  const timerRef = useRef(null);
  const nextTapRef = useRef(0);

  const triggerTap = useCallback((type) => {
    if (type === "dine") {
      setTapDine(false);
      setTimeout(() => setTapDine(true), 10);
    } else {
      setTapTake(false);
      setTimeout(() => setTapTake(true), 10);
    }
  }, []);

  // Auto-tap alternation between Dine In & Take Out
  useEffect(() => {
    const runAuto = () => {
      const type = nextTapRef.current === 0 ? "dine" : "take";
      triggerTap(type);
      nextTapRef.current = 1 - nextTapRef.current;
      timerRef.current = setTimeout(runAuto, 3200);
    };

    timerRef.current = setTimeout(runAuto, 1800);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [triggerTap]);

  // Pointer parallax & idle floating sway
  useEffect(() => {
    const container = containerRef.current;
    const tilt = tiltRef.current;
    if (!container || !tilt) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = null;

    const handlePointerMove = (e) => {
      const r = container.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    };

    const handlePointerLeave = () => {
      tx = 0;
      ty = 0;
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    const frame = (t) => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      const ry = (cx * 9 + Math.sin(t / 1800) * 1.5).toFixed(3);
      const rx = (-cy * 6 + Math.cos(t / 2200) * 1.0).toFixed(3);
      const fy = (Math.sin(t / 1200) * -5).toFixed(2);

      tilt.style.setProperty("--ry", `${ry}deg`);
      tilt.style.setProperty("--rx", `${rx}deg`);
      tilt.style.setProperty("--fy", `${fy}px`);

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const handleManualClick = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (timerRef.current) clearTimeout(timerRef.current);
    triggerTap(type);
    timerRef.current = setTimeout(() => {
      const runAuto = () => {
        const nextType = nextTapRef.current === 0 ? "dine" : "take";
        triggerTap(nextType);
        nextTapRef.current = 1 - nextTapRef.current;
        timerRef.current = setTimeout(runAuto, 3200);
      };
      runAuto();
    }, 6000);
  };

  return (
    <div ref={containerRef} className="kiosk-animated-tile">
      <div className="kiosk-tile-header">
        <span className="kiosk-badge-pill">OneHubPOS • UI/UX Case Study</span>
        <h4 className="kiosk-tile-title">Self-Ordering Kiosk</h4>
      </div>

      <div className="kiosk-stage">
        <div ref={tiltRef} className="kiosk-tilt">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="kiosk-shot"
            src="/projects/kiosk-interface/kiosk-shot.jpg"
            alt="OneHubPOS Self-ordering kiosk with Dine In and Take Out options"
            loading="lazy"
            width={1800}
            height={1518}
          />
          <div className="kiosk-halo" aria-hidden="true" />
          <div className="kiosk-screen-fx" aria-hidden="true">
            <div className="kiosk-sweep" />
          </div>

          <button
            type="button"
            className={`kiosk-hot kiosk-hot-dine ${tapDine ? "is-tap" : ""}`}
            onClick={(e) => handleManualClick(e, "dine")}
            tabIndex={-1}
            aria-label="Dine In mode"
          >
            <span className="kiosk-dot" />
          </button>

          <button
            type="button"
            className={`kiosk-hot kiosk-hot-take ${tapTake ? "is-tap" : ""}`}
            onClick={(e) => handleManualClick(e, "take")}
            tabIndex={-1}
            aria-label="Take Out mode"
          >
            <span className="kiosk-dot" />
          </button>
        </div>
      </div>
    </div>
  );
}

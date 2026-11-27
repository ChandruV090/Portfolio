"use client";

import { useEffect, useRef } from "react";

// Cursor effect: soft fluid "ink" that swirls and fades behind the pointer,
// plus a smooth follower ring that grows over links and buttons.
// Desktop (fine pointer) only; disabled for reduced-motion users.
export default function CursorTrail() {
  const canvasRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const canvas = canvasRef.current;
    const ring = ringRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Pre-rendered soft sprites (one per colour) so drawing stays cheap.
    const COLORS = [
      [232, 106, 58], // terracotta / orange
      [244, 172, 96], // amber
      [140, 104, 232], // violet
      [240, 232, 222], // cream
    ];
    const sprites = COLORS.map(([r, g, b]) => {
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      const x = c.getContext("2d");
      const grad = x.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, `rgba(${r},${g},${b},0.9)`);
      grad.addColorStop(0.35, `rgba(${r},${g},${b},0.35)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      x.fillStyle = grad;
      x.fillRect(0, 0, 128, 128);
      return c;
    });

    const MAX = 260;
    const parts = [];
    let last = null;
    let raf = 0;
    let colorClock = 0;
    let time = 0;

    const emit = (x, y, dx, dy) => {
      colorClock += 0.045;
      // blend through the palette over time; occasional cream sparkle
      const idx = Math.random() < 0.1 ? 3 : Math.floor(colorClock) % 3;
      parts.push({
        x,
        y,
        vx: dx * 0.09 + (Math.random() - 0.5) * 0.5,
        vy: dy * 0.09 + (Math.random() - 0.5) * 0.5,
        age: 0,
        life: 55 + Math.random() * 40,
        size: 38 + Math.random() * 34,
        idx,
        seed: Math.random() * 100,
      });
      if (parts.length > MAX) parts.shift();
    };

    // ring cursor
    let rx = -100;
    let ry = -100;
    let tx = -100;
    let ty = -100;
    let ringScale = 1;
    let ringTarget = 1;

    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      tx = x;
      ty = y;
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const step = 9;
        const n = Math.min(12, Math.floor(dist / step));
        for (let i = 1; i <= n; i++) {
          const t = i / (n + 1);
          emit(last.x + dx * t, last.y + dy * t, dx, dy);
        }
        if (dist > 2) emit(x, y, dx, dy);
      }
      last = { x, y };
      const el = e.target;
      ringTarget =
        el && el.closest && el.closest("a, button, [role='tab'], input, label") ? 1.9 : 1;
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onLeave = () => {
      last = null;
      tx = ty = -100;
    };

    const frame = () => {
      time += 0.016;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.age += 1;
        const k = p.age / p.life;
        if (k >= 1) {
          parts.splice(i, 1);
          continue;
        }
        // swirl: a slowly changing flow field bends the motion
        const a =
          Math.sin(p.x * 0.006 + time * 1.3 + p.seed) * 2.2 +
          Math.cos(p.y * 0.006 - time + p.seed);
        p.vx += Math.cos(a) * 0.07;
        p.vy += Math.sin(a) * 0.07;
        p.vx *= 0.955;
        p.vy *= 0.955;
        p.x += p.vx;
        p.y += p.vy;

        const s = p.size * (0.7 + k * 1.6);
        const alpha = Math.pow(1 - k, 1.6) * 0.58;
        ctx.globalAlpha = alpha;
        ctx.drawImage(sprites[p.idx], p.x - s / 2, p.y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      // ring follows with easing
      rx += (tx - rx) * 0.2;
      ry += (ty - ry) * 0.2;
      ringScale += (ringTarget - ringScale) * 0.18;
      ring.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0) scale(${ringScale})`;
      ring.style.opacity = tx < 0 ? "0" : "1";

      const settled =
        !parts.length &&
        Math.abs(tx - rx) < 0.3 &&
        Math.abs(ty - ry) < 0.3 &&
        Math.abs(ringTarget - ringScale) < 0.01;
      raf = settled ? 0 : requestAnimationFrame(frame);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

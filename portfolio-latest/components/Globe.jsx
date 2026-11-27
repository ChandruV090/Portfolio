"use client";

import { useEffect, useRef } from "react";
import { LAND_B64, LAND_STEP, LAND_W, LAND_H } from "./landMask";

const D2R = Math.PI / 180;

// Build the dot field once: an even-ish grid of points that fall on land.
let DOTS = null;
function getDots() {
  if (DOTS) return DOTS;
  const bin = atob(LAND_B64);
  const isLand = (lat, lng) => {
    const r = Math.min(LAND_H - 1, Math.max(0, Math.floor((90 - lat) / LAND_STEP)));
    const c = Math.min(LAND_W - 1, Math.max(0, Math.floor((lng + 180) / LAND_STEP)));
    const i = r * LAND_W + c;
    return (bin.charCodeAt(i >> 3) >> (i & 7)) & 1;
  };
  const dots = [];
  const spacing = 2.4; // degrees between dots
  for (let lat = -84; lat <= 84; lat += spacing) {
    const step = spacing / Math.max(0.15, Math.cos(lat * D2R));
    for (let lng = -180; lng < 180; lng += step) {
      if (isLand(lat, lng)) dots.push([lat * D2R, lng * D2R]);
    }
  }
  DOTS = dots;
  return dots;
}

// Dotted globe (plain canvas, no WebGL). Eases to the given location and sways gently.
export default function Globe({ lat, lng }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dots = getDots();
    const lat0 = lat * D2R * 0.55;
    const target = lng * D2R;
    let center = reduce ? target : target - 1.3;
    let t = 0;
    let raf = 0;
    let running = true;
    let size = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      size = canvas.offsetWidth || 260;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const project = (la, lo, c, R) => {
      const dl = lo - c;
      const cosLa = Math.cos(la);
      const x = cosLa * Math.sin(dl);
      const y = Math.cos(lat0) * Math.sin(la) - Math.sin(lat0) * cosLa * Math.cos(dl);
      const z = Math.sin(lat0) * Math.sin(la) + Math.cos(lat0) * cosLa * Math.cos(dl);
      return [R + x * R, R - y * R, z];
    };

    const draw = () => {
      const R = size / 2 - 4;
      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.translate(4, 4);

      // sphere body + soft rim
      const g = ctx.createRadialGradient(R * 0.8, R * 0.7, R * 0.1, R, R, R);
      g.addColorStop(0, "#201e1b");
      g.addColorStop(1, "#151311");
      ctx.beginPath();
      ctx.arc(R, R, R, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(196,105,74,0.28)";
      ctx.stroke();

      const c = center + (reduce ? 0 : Math.sin(t) * 0.18);

      // land dots
      for (let i = 0; i < dots.length; i++) {
        const [la, lo] = dots[i];
        const [px, py, z] = project(la, lo, c, R);
        if (z <= 0.02) continue;
        ctx.globalAlpha = 0.18 + 0.72 * z;
        ctx.fillStyle = "#c9c4ba";
        ctx.beginPath();
        ctx.arc(px, py, 0.7 + z * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // location marker
      const [mx, my, mz] = project(lat * D2R, lng * D2R, c, R);
      if (mz > 0) {
        const pulse = reduce ? 0 : (Math.sin(t * 3) + 1) / 2;
        ctx.beginPath();
        ctx.arc(mx, my, 6 + pulse * 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,106,58,${0.25 - pulse * 0.2})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(mx, my, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#ee6a3a";
        ctx.fill();
      }
      ctx.restore();
    };

    const loop = () => {
      if (!running) return;
      t += 0.012;
      center += (target - center) * 0.03;
      draw();
      if (!reduce) raf = requestAnimationFrame(loop);
    };
    draw();
    if (!reduce) raf = requestAnimationFrame(loop);

    // pause when scrolled out of view
    let io;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(([e]) => {
        const vis = e.isIntersecting;
        if (vis && !running) {
          running = true;
          if (!reduce) raf = requestAnimationFrame(loop);
        } else if (!vis) {
          running = false;
          cancelAnimationFrame(raf);
        }
      });
      io.observe(canvas);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (io) io.disconnect();
    };
  }, [lat, lng]);

  return <canvas ref={ref} className="globe-canvas" aria-hidden="true" />;
}

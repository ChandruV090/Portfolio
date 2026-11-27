"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const ANG = [12, 0, -12, -24, -36, 24]; // fan angles by rank, rank 0 is front
const ENTER = 1400;
const HOLD = 3000;
const EXIT = 850;
const GAP = 200;

export default function KioskFanCard({ compact = true, showSteps = false }) {
  const [current, setCurrent] = useState(0);
  const [isOut, setIsOut] = useState(false);
  const [noTransition, setNoTransition] = useState(false);
  const [qrSvg, setQrSvg] = useState([]);
  const panelRef = useRef(null);
  const fanRef = useRef(null);
  const tokenRef = useRef(0);
  const isMountedRef = useRef(false);

  // Generate QR pattern once
  useEffect(() => {
    let seed = 7;
    function rnd() {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    }
    const rects = [];
    for (let y = 0; y < 11; y++) {
      for (let x = 0; x < 11; x++) {
        if ((x < 4 && y < 4) || (x > 6 && y < 4) || (x < 4 && y > 6)) continue;
        if (rnd() > 0.5) {
          rects.push({ x, y, key: `${x}-${y}` });
        }
      }
    }
    setQrSvg(rects);
  }, []);

  // Cycle animation loop
  useEffect(() => {
    isMountedRef.current = true;
    const token = ++tokenRef.current;

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const runCycle = async () => {
      while (isMountedRef.current && token === tokenRef.current) {
        setNoTransition(false);
        setIsOut(false);
        await sleep(ENTER + HOLD);
        if (!isMountedRef.current || token !== tokenRef.current) return;

        setIsOut(true);
        await sleep(EXIT + GAP);
        if (!isMountedRef.current || token !== tokenRef.current) return;

        setNoTransition(true);
        setCurrent((prev) => (prev + 1) % 6);
      }
    };

    const initialTimer = setTimeout(() => {
      runCycle();
    }, 400);

    return () => {
      isMountedRef.current = false;
      tokenRef.current++;
      clearTimeout(initialTimer);
    };
  }, []);

  // Pointer parallax effect
  useEffect(() => {
    const panel = panelRef.current;
    const fan = fanRef.current;
    if (!panel || !fan) return;

    let tx = 0;
    let cx = 0;
    let raf = null;

    const handlePointerMove = (e) => {
      const r = panel.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    };

    const handlePointerLeave = () => {
      tx = 0;
    };

    panel.addEventListener("pointermove", handlePointerMove);
    panel.addEventListener("pointerleave", handlePointerLeave);

    const loop = () => {
      cx += (tx - cx) * 0.06;
      if (fan) {
        fan.style.setProperty("--mx", cx.toFixed(3));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      panel.removeEventListener("pointermove", handlePointerMove);
      panel.removeEventListener("pointerleave", handlePointerLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = useCallback((idx) => {
    tokenRef.current++;
    setIsOut(true);
    setTimeout(() => {
      setNoTransition(true);
      setCurrent(idx);
      setTimeout(() => {
        setNoTransition(false);
        setIsOut(false);
      }, 50);
    }, EXIT + 100);
  }, []);

  // Compute rank and rotation for each card
  const getCardStyle = (i) => {
    const rank = (i - current + 6) % 6;
    const angle = ANG[rank];
    return {
      "--rank": rank,
      "--a": angle,
      zIndex: 10 - rank,
      transform: isOut
        ? rank === 0
          ? "translate(-48%, 150%) rotate(-38deg)"
          : `translate(0, 150%) rotate(${angle * 0.5}deg)`
        : `translate(0, 0) rotate(${angle * 1.05}deg)`,
      transition: noTransition
        ? "none"
        : isOut
        ? `transform 0.65s cubic-bezier(.55, .05, .85, .4) ${rank * 45}ms`
        : `transform 1.05s cubic-bezier(.2, 1.12, .3, 1) ${rank * 70}ms`,
    };
  };

  return (
    <div className={`kiosk-fan-wrapper ${compact ? "is-compact" : "is-full"}`}>
      <div
        className="kiosk-fan-panel"
        ref={panelRef}
        role="button"
        tabIndex={0}
        aria-label="Self-Ordering Kiosk Fan. Shuffles between interactive screens."
      >
        <div
          ref={fanRef}
          className={`kiosk-fan ${isOut ? "is-out" : ""} ${noTransition ? "no-t" : ""}`}
        >
          {/* Card 0: Welcome */}
          <div className="kiosk-fan-card" style={getCardStyle(0)} data-rank={(0 - current + 6) % 6}>
            <div className="kiosk-face c-welcome">
              <div className="kiosk-brand">
                <span className="kiosk-mark" />
                OneHubPOS
              </div>
              <p className="kiosk-h">Your delicious journey starts here</p>
              <div className="kiosk-btns">
                <span>Dine In</span>
                <span>Take Out</span>
              </div>
            </div>
          </div>

          {/* Card 1: Menu */}
          <div className="kiosk-fan-card" style={getCardStyle(1)} data-rank={(1 - current + 6) % 6}>
            <div className="kiosk-face c-menu">
              <span className="kiosk-tag">Menu</span>
              <svg viewBox="0 0 120 90" aria-hidden="true" className="kiosk-burger">
                <path d="M18 66h84a6 6 0 0 1-6 12H24a6 6 0 0 1-6-12z" fill="#E39A45" />
                <rect x="14" y="54" width="92" height="13" rx="6.5" fill="#6B3A1E" />
                <path d="M16 54h88l-8 8-10-6-10 8-10-8-10 6-10-8-10 6z" fill="#FFC83A" />
                <rect x="16" y="45" width="88" height="9" rx="4.5" fill="#E8412F" />
                <path d="M12 46q6-8 12 0t12 0 12 0 12 0 12 0 12 0 12 0 12 0v4H12z" fill="#7BC043" />
                <path d="M16 44c0-26 88-26 88 0z" fill="#F0B25E" />
                <g fill="#FFF1D0">
                  <ellipse cx="42" cy="28" rx="3" ry="1.6" transform="rotate(-20 42 28)" />
                  <ellipse cx="60" cy="21" rx="3" ry="1.6" />
                  <ellipse cx="78" cy="28" rx="3" ry="1.6" transform="rotate(20 78 28)" />
                  <ellipse cx="52" cy="35" rx="3" ry="1.6" transform="rotate(-8 52 35)" />
                  <ellipse cx="70" cy="35" rx="3" ry="1.6" transform="rotate(8 70 35)" />
                </g>
              </svg>
              <p className="kiosk-h">Cheese Burger</p>
              <span className="kiosk-pill">Add to order</span>
            </div>
          </div>

          {/* Card 2: Cart */}
          <div className="kiosk-fan-card" style={getCardStyle(2)} data-rank={(2 - current + 6) % 6}>
            <div className="kiosk-face c-cart">
              <span className="kiosk-tag">Cart</span>
              <p className="kiosk-h">Your order</p>
              <div className="kiosk-rows">
                <div><span>Cheese Burger</span><span>×1</span></div>
                <div><span>Fries</span><span>×1</span></div>
                <div><span>Cola</span><span>×2</span></div>
                <div className="total"><span>Total</span><span>4 items</span></div>
              </div>
              <span className="kiosk-pill">Pay now</span>
            </div>
          </div>

          {/* Card 3: Pay */}
          <div className="kiosk-fan-card" style={getCardStyle(3)} data-rank={(3 - current + 6) % 6}>
            <div className="kiosk-face c-pay">
              <svg className="kiosk-wave" viewBox="0 0 40 40" aria-hidden="true">
                <path d="M12 12c3 5 3 11 0 16" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                <path d="M18 8c5 8 5 16 0 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                <path d="M24 4c7 11 7 21 0 32" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span className="kiosk-chip" />
              <div>
                <p className="kiosk-h">Tap to pay</p>
                <p className="kiosk-p">Hold your card near the reader</p>
              </div>
            </div>
          </div>

          {/* Card 4: Receipt */}
          <div className="kiosk-fan-card" style={getCardStyle(4)} data-rank={(4 - current + 6) % 6}>
            <div className="kiosk-face c-receipt">
              <span className="kiosk-tag">Order ready</span>
              <p className="kiosk-num">#128</p>
              <div className="kiosk-dash" />
              <p className="kiosk-p">Collect at counter when called</p>
              <div className="kiosk-bar" />
            </div>
          </div>

          {/* Card 5: Scan */}
          <div className="kiosk-fan-card" style={getCardStyle(5)} data-rank={(5 - current + 6) % 6}>
            <div className="kiosk-face c-scan">
              <span className="kiosk-tag">Scan</span>
              <div className="kiosk-qr">
                <svg viewBox="0 0 11 11" aria-hidden="true">
                  {qrSvg.map((r) => (
                    <rect key={r.key} x={r.x} y={r.y} width="0.85" height="0.85" rx="0.15" fill="#fff" />
                  ))}
                  <rect x="0.2" y="0.2" width="3" height="3" rx="0.5" fill="none" stroke="#fff" strokeWidth="0.6" />
                  <rect x="1.2" y="1.2" width="1" height="1" fill="#F06C17" />
                  <rect x="7.8" y="0.2" width="3" height="3" rx="0.5" fill="none" stroke="#fff" strokeWidth="0.6" />
                  <rect x="8.8" y="1.2" width="1" height="1" fill="#F06C17" />
                  <rect x="0.2" y="7.8" width="3" height="3" rx="0.5" fill="none" stroke="#fff" strokeWidth="0.6" />
                  <rect x="1.2" y="8.8" width="1" height="1" fill="#F06C17" />
                </svg>
              </div>
              <p className="kiosk-h">Scan here</p>
            </div>
          </div>
        </div>

        {/* Ambient subtle vignette */}
        <div className="kiosk-fan-vignette" />
      </div>

      {showSteps && (
        <ol className="kiosk-fan-steps">
          {["Welcome", "Menu", "Cart", "Pay", "Receipt", "Scan"].map((step, idx) => (
            <li key={step}>
              <button
                type="button"
                aria-current={idx === current ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  goTo(idx);
                }}
              >
                {step}
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

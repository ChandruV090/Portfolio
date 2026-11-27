"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Icon } from "./Icons";

export default function PresentationStrip({ gallery = [], title = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const trackRef = useRef(null);
  const isUserScrolling = useRef(false);

  const total = gallery.length;

  const scrollToIndex = useCallback((index) => {
    if (!trackRef.current || total === 0) return;
    const boundedIndex = (index + total) % total;
    const track = trackRef.current;
    const slide = track.children[boundedIndex];
    if (slide) {
      slide.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setCurrentIndex(boundedIndex);
    }
  }, [total]);

  const handleNext = useCallback(() => {
    scrollToIndex(currentIndex + 1);
  }, [currentIndex, scrollToIndex]);

  const handlePrev = useCallback(() => {
    scrollToIndex(currentIndex - 1);
  }, [currentIndex, scrollToIndex]);

  // Handle manual scroll / swipe sync
  const handleScroll = () => {
    if (!trackRef.current || isUserScrolling.current) return;
    const track = trackRef.current;
    const scrollLeft = track.scrollLeft;
    const slideWidth = track.clientWidth;
    const newIndex = Math.round(scrollLeft / slideWidth);
    if (newIndex >= 0 && newIndex < total && newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  // Quick Screens: Auto-play animation cycling through screens
  useEffect(() => {
    if (!isPlaying || total <= 1) return;
    const timer = setInterval(() => {
      scrollToIndex(currentIndex + 1);
    }, 2400);

    return () => clearInterval(timer);
  }, [isPlaying, currentIndex, total, scrollToIndex]);

  // Keyboard navigation when strip is on screen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxSrc) {
        if (e.key === "Escape") setLightboxSrc(null);
        return;
      }
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, lightboxSrc]);

  if (!gallery.length) return null;

  return (
    <section className="case-gallery presentation-strip-section">
      <div className="gallery-header strip-header">
        <div>
          <span className="label">Full Presentation Strip</span>
          <h3>Design Artifacts &amp; Complete Workflow</h3>
        </div>

        <div className="strip-controls">
          <button
            type="button"
            className={`strip-play-btn ${isPlaying ? "active" : ""}`}
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Pause quick screens" : "Auto-play quick screens"}
          >
            <Icon name={isPlaying ? "pause" : "play"} size={13} />
            <span>{isPlaying ? "Pause" : "Quick Screens"}</span>
          </button>

          <span className="strip-counter">
            <strong>{String(currentIndex + 1).padStart(2, "0")}</strong> / {String(total).padStart(2, "0")}
          </span>

          <div className="strip-arrows">
            <button
              type="button"
              className="strip-nav-btn"
              onClick={handlePrev}
              aria-label="Previous screen"
            >
              <Icon name="arrow-left" size={15} />
            </button>
            <button
              type="button"
              className="strip-nav-btn"
              onClick={handleNext}
              aria-label="Next screen"
            >
              <Icon name="arrow-right" size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Swipeable Presentation Strip */}
      <div className="strip-viewport-wrap">
        <div
          ref={trackRef}
          className="strip-track"
          onScroll={handleScroll}
        >
          {gallery.map((src, idx) => (
            <div
              key={src}
              className={`strip-slide ${idx === currentIndex ? "is-active" : ""}`}
              onClick={() => setLightboxSrc(src)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${title} design screen ${idx + 1}`}
                loading={idx <= 2 ? "eager" : "lazy"}
                className="strip-img"
              />
              <div className="strip-slide-overlay">
                <span className="strip-zoom-pill">Click to inspect</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick floating left/right chevron arrows on screen */}
        <button
          type="button"
          className="strip-float-btn prev"
          onClick={handlePrev}
          aria-label="Previous screen"
        >
          <Icon name="arrow-left" size={18} />
        </button>
        <button
          type="button"
          className="strip-float-btn next"
          onClick={handleNext}
          aria-label="Next screen"
        >
          <Icon name="arrow-right" size={18} />
        </button>
      </div>

      {/* Quick Screens Thumbnail Timeline / Jump Bar */}
      <div className="strip-timeline">
        {gallery.map((src, idx) => (
          <button
            key={src}
            type="button"
            className={`strip-thumb-btn ${idx === currentIndex ? "active" : ""}`}
            onClick={() => scrollToIndex(idx)}
            title={`Jump to screen ${idx + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`Screen ${idx + 1}`} className="strip-thumb-img" />
            <span className="strip-thumb-num">{idx + 1}</span>
          </button>
        ))}
      </div>

      {/* Lightbox / Fullscreen Inspector */}
      {lightboxSrc ? (
        <div className="strip-lightbox" onClick={() => setLightboxSrc(null)}>
          <button
            type="button"
            className="strip-lightbox-close"
            onClick={() => setLightboxSrc(null)}
          >
            ✕ Close
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightboxSrc}
            alt="Full design preview"
            className="strip-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </section>
  );
}

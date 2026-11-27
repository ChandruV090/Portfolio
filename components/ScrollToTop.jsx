"use client";

import { useEffect, useState } from "react";
import { site } from "../data/site";
import { Icon } from "./Icons";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past 260px
      if (window.scrollY > 260) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`scroll-top-pill ${visible ? "is-visible" : ""}`}
      aria-label="Scroll to top"
      title="Back to top"
    >
      {site.avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={site.avatar}
          alt={site.name}
          className="scroll-top-avatar"
        />
      ) : null}
      <span className="scroll-top-name">{site.name.split(" ")[0]}</span>
      <span className="scroll-top-btn" aria-hidden="true">
        <Icon name="arrow-up" size={15} />
      </span>
    </button>
  );
}

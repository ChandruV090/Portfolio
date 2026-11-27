"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      textAlign: "center",
      background: "#141210",
      color: "#ede8e1",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <h2 style={{ fontSize: "24px", marginBottom: "12px", fontWeight: 600 }}>
        Something went wrong
      </h2>
      <p style={{ color: "#a1a09b", maxWidth: "420px", marginBottom: "24px", fontSize: "15px", lineHeight: 1.5 }}>
        An unexpected error occurred while loading this page.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: "10px 24px",
          borderRadius: "999px",
          background: "#f7f2ec",
          color: "#181716",
          border: "none",
          fontWeight: 600,
          cursor: "pointer",
          fontSize: "14px"
        }}
      >
        Try again
      </button>
    </div>
  );
}

"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{
        margin: 0,
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
          Application Error
        </h2>
        <p style={{ color: "#a1a09b", maxWidth: "420px", marginBottom: "24px", fontSize: "15px", lineHeight: 1.5 }}>
          A critical error occurred. Please try reloading the page.
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
      </body>
    </html>
  );
}

import Link from "next/link";

export default function NotFound() {
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
      <h2 style={{ fontSize: "28px", marginBottom: "12px", fontWeight: 600 }}>
        Page Not Found
      </h2>
      <p style={{ color: "#a1a09b", maxWidth: "420px", marginBottom: "24px", fontSize: "15px", lineHeight: 1.5 }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          padding: "10px 24px",
          borderRadius: "999px",
          background: "#f7f2ec",
          color: "#181716",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "14px"
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}

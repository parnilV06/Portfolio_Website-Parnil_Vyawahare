import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "404: Page Not Found — Parnil Vyawahare";
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        color: "#ffffff",
        padding: "24px",
        fontFamily: "'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "480px", width: "100%" }}>
        <p
          style={{
            color: "var(--accent, #00FFF5)",
            fontFamily: "monospace",
            fontSize: "0.85rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          // Error 404
        </p>
        <h1
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "clamp(3rem, 8vw, 4.5rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            margin: "0 0 16px",
          }}
        >
          Page not found.
        </h1>
        <p
          style={{
            color: "rgba(255, 255, 255, 0.65)",
            fontSize: "1rem",
            lineHeight: 1.6,
            marginBottom: "32px",
          }}
        >
          The page you are looking for doesn't exist, was moved, or is temporarily unavailable.
        </p>
        <a
          href="/"
          className="cursor-can-hover"
          data-cursor-kind="small"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            backgroundColor: "#171717",
            color: "#ffffff",
            borderRadius: "6px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: 500,
            transition: "all 0.2s ease",
          }}
        >
          <span aria-hidden="true">←</span>
          <span>Return to Portfolio</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;

export default function ErrorPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        background: "#f3f2ef",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          textAlign: "center",
          maxWidth: "420px",
        }}
      >
        <h1
          style={{ fontSize: "28px", marginBottom: "10px", color: "#1d2226" }}
        >
          Page not found
        </h1>

        <p style={{ color: "#5e5e5e", marginBottom: "20px" }}>
          The page you are looking for doesn’t exist or may have been moved.
        </p>

        <a
          href="/"
          style={{
            background: "#0a66c2",
            color: "white",
            padding: "10px 18px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Go to homepage
        </a>
      </div>
    </div>
  );
}

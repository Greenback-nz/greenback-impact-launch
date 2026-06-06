import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#0a0f0d" }}
    >
      <div className="text-center">
        <h1
          className="text-6xl font-semibold mb-4"
          style={{ color: "#a3e635", letterSpacing: "-0.04em" }}
        >
          404
        </h1>
        <p className="text-lg mb-6" style={{ color: "#8a948c" }}>
          Page not found
        </p>
        <a
          href="/"
          className="font-dm-mono text-sm no-underline"
          style={{
            color: "#a3e635",
            borderBottom: "1px solid rgba(163, 230, 53, 0.3)",
            paddingBottom: "2px",
          }}
        >
          &larr; Return home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

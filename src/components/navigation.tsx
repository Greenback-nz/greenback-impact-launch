import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useState(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
  });

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10, 15, 13, 0.95)" : "rgba(10, 15, 13, 0.6)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${scrolled ? "rgba(163, 230, 53, 0.08)" : "transparent"}`,
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <img src="/logo.png" alt="Greenback" className="h-7 w-7" />
          <span
            className="font-dm-mono text-sm"
            style={{ color: "#a3e635", letterSpacing: "0.12em" }}
          >
            greenback<span style={{ color: "#a3e635" }}>.</span>solutions
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="font-dm-mono text-xs tracking-wider no-underline transition-colors duration-300"
              style={{
                color: isActive(item.path) ? "#a3e635" : "#8a948c",
                letterSpacing: "0.08em",
              }}
            >
              {item.label}
            </Link>
          ))}
          <span
            className="w-px h-4"
            style={{ background: "rgba(163, 230, 53, 0.15)" }}
          />
          <Link
            to="/solutions"
            className="font-dm-mono text-xs tracking-wider no-underline transition-colors duration-300"
            style={{
              color: location.pathname === "/solutions" ? "#a3e635" : "#8a948c",
              letterSpacing: "0.08em",
            }}
          >
            Solutions
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          style={{ color: "#f3f5f1" }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          className="md:hidden py-4 px-6"
          style={{
            borderTop: "1px solid rgba(163, 230, 53, 0.08)",
            background: "rgba(10, 15, 13, 0.98)",
          }}
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="font-dm-mono text-sm no-underline transition-colors duration-300"
                style={{
                  color: isActive(item.path) ? "#a3e635" : "#8a948c",
                  letterSpacing: "0.08em",
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/solutions"
              onClick={() => setIsOpen(false)}
              className="font-dm-mono text-sm no-underline transition-colors duration-300"
              style={{
                color: location.pathname === "/solutions" ? "#a3e635" : "#8a948c",
                letterSpacing: "0.08em",
              }}
            >
              Solutions
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

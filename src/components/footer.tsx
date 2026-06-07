import { Link } from "react-router-dom";
import { Linkedin, Github, Mail } from "lucide-react";

const footerLinks = [
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Solutions", path: "/solutions" },
];

export const Footer = () => {
  return (
    <footer
      className="py-12"
      style={{
        background: "#0f1714",
        borderTop: "1px solid #1f2a25",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/logo.png"
                alt="Greenback"
                className="h-7 w-7"
              />
              <span
                className="font-dm-mono text-sm"
                style={{ color: "#a3e635", letterSpacing: "0.12em" }}
              >
                greenback.solutions
              </span>
            </div>
            <p
              className="text-sm"
              style={{ color: "#8a948c" }}
            >
              Verification infrastructure for ecosystem services
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="font-dm-mono text-xs tracking-widest uppercase mb-4"
              style={{ color: "#a3e635", letterSpacing: "0.15em" }}
            >
              Links
            </h4>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm no-underline transition-colors duration-300 hover:opacity-100"
                  style={{ color: "#8a948c" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-dm-mono text-xs tracking-widest uppercase mb-4"
              style={{ color: "#a3e635", letterSpacing: "0.15em" }}
            >
              Get in Touch
            </h4>
            <a
              href="mailto:hello@greenback.solutions"
              className="flex items-center gap-2 text-sm no-underline mb-4 transition-colors duration-300"
              style={{ color: "#8a948c" }}
            >
              <Mail className="h-4 w-4" />
              hello@greenback.solutions
            </a>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/felicityroberts/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300"
                style={{ color: "#8a948c" }}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300"
                style={{ color: "#8a948c" }}
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div
          className="pt-6"
          style={{ borderTop: "1px solid #1f2a25" }}
        >
          <p
            className="text-center font-dm-mono text-xs"
            style={{ color: "rgba(138, 148, 140, 0.5)" }}
          >
            &copy; {new Date().getFullYear()} Greenback Ltd. Bay of Plenty, NZ &middot; NZBN registered
          </p>
        </div>
      </div>
    </footer>
  );
};

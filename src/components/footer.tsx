import { Link } from "react-router-dom";
import { Linkedin, Github, Mail } from "lucide-react";

const footerLinks = [
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const Footer = () => {
  return (
    <footer className="bg-forest text-forest-foreground py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/lovable-uploads/ce85fb2f-a254-43d3-9953-15556cb15361.png" 
                alt="Greenback Logo" 
                className="h-10 w-10"
              />
              <span className="text-xl font-semibold">Greenback</span>
            </div>
            <p className="text-forest-foreground/70 text-sm">
              MVP support for founders
            </p>
          </div>
          
          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-forest-foreground/70 hover:text-ochre transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <a 
              href="mailto:hello.greenback@gmail.com" 
              className="flex items-center gap-2 text-forest-foreground/70 hover:text-ochre transition-colors text-sm mb-4"
            >
              <Mail className="h-4 w-4" />
              hello.greenback@gmail.com
            </a>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/in/felicityroberts/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-forest-foreground/70 hover:text-ochre transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-forest-foreground/70 hover:text-ochre transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-forest-foreground/20 pt-6">
          <p className="text-center text-sm text-forest-foreground/60">
            © {new Date().getFullYear()} Greenback Ltd. Based in Aotearoa New Zealand.
          </p>
        </div>
      </div>
    </footer>
  );
};

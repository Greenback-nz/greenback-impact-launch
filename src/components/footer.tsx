import { Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-forest text-forest-foreground py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/ce85fb2f-a254-43d3-9953-15556cb15361.png" 
              alt="Greenback Logo" 
              className="h-8 w-8"
            />
            <span className="text-lg font-semibold">Greenback</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="mailto:hello.greenback@gmail.com" 
              className="flex items-center hover:text-coral transition-colors"
            >
              <Mail className="h-4 w-4 mr-2" />
              hello.greenback@gmail.com
            </a>
            <a 
              href="https://www.linkedin.com/in/felicityroberts/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:text-coral transition-colors"
            >
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </a>
            <a 
              href="https://www.humiint.com/u/6879b526-c863-491a-aeca-98d7e2cc1f1a" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-coral transition-colors"
            >
              Humiint Profile
            </a>
          </div>
        </div>
        
        <div className="border-t border-forest-foreground/20 mt-6 pt-4 text-center">
          <p className="text-sm text-forest-foreground/80">
            © {new Date().getFullYear()} Greenback Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
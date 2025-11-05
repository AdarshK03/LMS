import { BookOpen, Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary rounded-lg">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-heading text-xl font-bold">SmartLibrary AI</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Making academic libraries intelligent, personalized, and accessible for every student.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-smooth">
                  Home
                </a>
              </li>
              <li>
                <a href="#search" className="text-muted-foreground hover:text-primary transition-smooth">
                  Search
                </a>
              </li>
              <li>
                <a href="#recommendations" className="text-muted-foreground hover:text-primary transition-smooth">
                  Recommendations
                </a>
              </li>
              <li>
                <a href="#my-library" className="text-muted-foreground hover:text-primary transition-smooth">
                  My Library
                </a>
              </li>
              <li>
                <a href="#profile" className="text-muted-foreground hover:text-primary transition-smooth">
                  Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 bg-card hover:bg-primary rounded-lg transition-smooth group shadow-soft hover:shadow-elevated"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-foreground group-hover:text-primary-foreground transition-smooth" />
              </a>
              <a
                href="#"
                className="p-2 bg-card hover:bg-primary rounded-lg transition-smooth group shadow-soft hover:shadow-elevated"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-foreground group-hover:text-primary-foreground transition-smooth" />
              </a>
              <a
                href="#"
                className="p-2 bg-card hover:bg-primary rounded-lg transition-smooth group shadow-soft hover:shadow-elevated"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-foreground group-hover:text-primary-foreground transition-smooth" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2025 SmartLibrary AI. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            Powered by <span className="font-semibold text-foreground">IBM Granite AI</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

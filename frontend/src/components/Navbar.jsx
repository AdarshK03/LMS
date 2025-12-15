import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";



const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="p-2 bg-primary rounded-lg transition-smooth group-hover:shadow-glow">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold">SmartLibrary AI</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-12">
            <a href="#home" className="text-foreground hover:text-primary transition-smooth">
              Home
            </a>
           <button 
           onClick={() => navigate("/search")}
           className="text-foreground hover:text-primary transition-smooth">
              Search
            </button>
            <a href="#recommendations" className="text-foreground hover:text-primary transition-smooth">
              Recommendations
            </a>
            <a href="#my-library" className="text-foreground hover:text-primary transition-smooth">
              My Library
            </a>
            <button 
            onClick={() => navigate("/profile")}
            className="text-foreground hover:text-primary transition-smooth">
              Profile
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

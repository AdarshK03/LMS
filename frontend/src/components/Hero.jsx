import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 gradient-hero opacity-95" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* IBM Granite Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/60 backdrop-blur-sm rounded-full shadow-soft mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Powered by IBM Granite AI
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
            Find the Right Book,{" "}
            <span className="text-primary">Instantly.</span>
          </h1>

          {/* Subtext */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            SmartLibrary AI analyzes your course topics and recommends the most relevant books — powered by IBM Granite AI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Button 
              size="lg" 
              className="w-full sm:w-auto shadow-elevated hover:shadow-glow transition-smooth group"
            >
              <Search className="mr-2 h-5 w-5 group-hover:rotate-12 transition-smooth" />
              Start Searching
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              className="w-full sm:w-auto shadow-soft hover:shadow-elevated transition-smooth"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Get AI Recommendations
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;

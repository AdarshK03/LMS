import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import heroBg from "@/assets/lib.jpg";
import { useNavigate } from "react-router-dom";



const Hero = () => {
  const navigate = useNavigate();
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      {/* <div 
        className="absolute inset-0 z-0 opacity-75"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      > */}
        
      {/* </div> */}

      {/* Content */}
      <div className="container mx-auto  px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* IBM Granite Badge */}
          <div className="inline-flex  gap-2 px-4 py-2 bg-card/60 backdrop-blur-sm rounded-full shadow-soft mb-8 animate-fade-in">
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

          {/* CTA Buttons */}
          <div className="bg-white/50 rounded-xl p-6 max-w-2xl mx-auto flex flex-col items-center gap-4">
              {/* Title */}
              <h2 className="text-lg font-semibold text-gray-800 text-center">
                AI recommendations
              </h2>

              {/* Search input */}
              <input
                type="text"
                placeholder="search lib catalog"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Button (half width of input) */}
              <button
                className="w-1/2 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                get AI
              </button>
            </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;

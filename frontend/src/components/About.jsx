import { Target } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-card rounded-3xl p-10 sm:p-16 shadow-elevated text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-8 shadow-glow">
              <Target className="h-8 w-8 text-primary-foreground" />
            </div>

            {/* Heading */}
            <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
              Our Vision
            </h2>

            {/* Description */}
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              Our goal is to make academic libraries intelligent, personalized, and accessible for every student. We believe that finding the right resources should be effortless, allowing students to focus on what matters most — learning and growing.
            </p>

            {/* Stats or Additional Info */}
            <div className="grid sm:grid-cols-3 gap-8 mt-12">
              <div className="animate-fade-in">
                <div className="font-heading text-4xl font-bold text-primary mb-2">10K+</div>
                <p className="text-muted-foreground">Books Analyzed</p>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="font-heading text-4xl font-bold text-primary mb-2">5K+</div>
                <p className="text-muted-foreground">Active Students</p>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="font-heading text-4xl font-bold text-primary mb-2">98%</div>
                <p className="text-muted-foreground">Recommendation Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

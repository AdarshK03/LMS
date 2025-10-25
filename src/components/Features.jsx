import { Sparkles, Clock, BookmarkCheck, LayoutDashboard } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Book Suggestions",
    description: "Our advanced AI analyzes your coursework and learning goals to recommend the most relevant and impactful books for your studies.",
  },
  {
    icon: Clock,
    title: "Real-Time Availability Check",
    description: "Instantly see which books are available in your library, saving you time and ensuring you can access resources when you need them.",
  },
  {
    icon: BookmarkCheck,
    title: "Smart Reservation System",
    description: "Reserve books with a single click and get notified when they're ready for pickup. Never miss out on essential reading materials.",
  },
  {
    icon: LayoutDashboard,
    title: "Personalized Learning Dashboard",
    description: "Track your reading progress, manage reservations, and discover new recommendations tailored to your academic journey.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
            Powerful Features for{" "}
            <span className="text-primary">Smarter Learning</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to maximize your library experience and accelerate your academic success
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <div
                key={feature.title}
                className="gradient-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-smooth group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary mb-6 shadow-soft group-hover:shadow-glow transition-smooth">
                  <FeatureIcon className="h-7 w-7 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="font-heading text-2xl font-semibold mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;

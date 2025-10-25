import { FileText, Brain, BookmarkCheck } from "lucide-react";

const steps = [
  {
    icon: FileText,
    number: "01",
    title: "Enter your topic or syllabus",
    description: "Simply input your course topic, subject area, or upload your syllabus to get started.",
  },
  {
    icon: Brain,
    number: "02",
    title: "SmartLibrary AI finds the best books",
    description: "Our AI analyzes millions of books and academic resources to find the perfect matches for your studies.",
  },
  {
    icon: BookmarkCheck,
    number: "03",
    title: "Reserve instantly from your library",
    description: "Check real-time availability and reserve books directly from your institution's library system.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to discover the perfect books for your academic journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div
                key={step.number}
                className="relative group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="gradient-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-smooth h-full">
                  {/* Step Number */}
                  <div className="text-6xl font-heading font-bold text-primary/10 mb-4">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-smooth">
                    <StepIcon className="h-8 w-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="font-heading text-xl font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Connecting Line (hidden on mobile and last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-border" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

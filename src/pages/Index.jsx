import Navbar from "@/components/Navbar.jsx";
import Hero from "@/components/Hero.jsx";
import HowItWorks from "@/components/HowItWorks.jsx";
import Features from "@/components/Features.jsx";
import About from "@/components/About.jsx";
import Footer from "@/components/Footer.jsx";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

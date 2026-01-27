// import Navbar from "@/components/Navbar.jsx";
// import Hero from "@/components/Hero.jsx";
// import HowItWorks from "@/components/HowItWorks.jsx";
// import Features from "@/components/Features.jsx";
// import About from "@/components/About.jsx";
// import Footer from "@/components/Footer.jsx";

// const Index = () => {
//   return (
//     <div className="min-h-screen">
//       <Navbar />
//       <main>
//         <Hero />
//         <HowItWorks />
//         <Features />
//         <About />
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Index;


import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero.jsx";
import HowItWorks from "@/components/HowItWorks.jsx";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#eef2ec] text-gray-900">
      <Navbar />

      
      <section className="relative h-screen pt-28 pb-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')",
          }}
        />
       <Hero /> 
      </section>

      <HowItWorks />

      {/* FEATURES */}
      <section className="py-24 bg-[#f7f9f6]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-serif text-center mb-12">
            Built for Academic Focus
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "AI-Powered Recommendations",
                desc: "Books selected based on your coursework and academic needs.",
              },
              {
                title: "Real-Time Availability",
                desc: "Know instantly which books are accessible in your library.",
              },
              {
                title: "Smart Reservations",
                desc: "Reserve books without manual searching or delays.",
              },
              {
                title: "Personal Dashboard",
                desc: "Track reading history and saved recommendations.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif mb-6">Our Vision</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            SmartLibrary AI exists to make academic knowledge easier to discover,
            more relevant, and accessible — allowing students to focus on learning,
            not searching.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Timeline from "./components/Timeline";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Awards from "./components/Awards";
import Certificates from "./components/Certificates";
import Gallery from "./components/Gallery";
import FunFacts from "./components/Funfacts";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

const texts = [
  "SIPUNK", 
  "シパンク",
  "시푼크",
  "Сипунк",
  "Σιπουνκ",
  "सिपंक",
  "סיפונק",
];

  useEffect(() => {
    if (showIntro) {
      const interval = setInterval(() => {
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, 350);

      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [showIntro]);

  return (
    <>
      {showIntro ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black text-white text-6xl font-extrabold transition-all duration-700 animate-fadeOut z-50">
          <span className="animate-pulse">{texts[textIndex]}</span>
        </div>
      ) : (
        <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-500">
          <Header />
          <Hero />
          <Projects />
          <About />
          <Skills />
          <Services />
          <Timeline />
          <Testimonials />
          <FAQ />
          <Awards />
          <Certificates />
          <Gallery />
          <FunFacts />
          <CTA />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;

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
  // import Blog from "./components/Blog";
  import Certificates from "./components/Certificates";
  import Gallery from "./components/Gallery";
  import FunFacts from "./components/Funfacts";
  import CTA from "./components/CTA";
  import Footer from "./components/Footer";

  function App() {
    return (
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
        {/* <Blog /> */}
        <Certificates />
        <Gallery />
        <FunFacts />
        <CTA />
        <Footer />
      </div>
    );
  }

  export default App;
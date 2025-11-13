import React from "react";
import Kece from "../assets/images/Kece.jpg";

function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black"
    >
      <div className="absolute inset-0">
        <div className="absolute w-[1000px] h-[1000px] bg-purple-900/15 rounded-full blur-[160px] -top-40 -left-40"></div>
        <div className="absolute w-[800px] h-[800px] bg-purple-800/10 rounded-full blur-[160px] -bottom-40 -right-20"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-6 mx-auto">
        <div className="text-white text-left md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
            Halo, saya{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">
              Tsani
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-md">
            Seorang{" "}
            <span className="text-purple-300 font-semibold">
              Frontend Developer
            </span>{" "}
            &{" "}
            <span className="text-purple-200 font-semibold">UI Designer</span>{" "}
            yang suka bikin tampilan web modern dan elegan.
          </p>

          <a
            href="#projects"
            className="inline-block px-8 py-3 bg-purple-600/80 hover:bg-purple-700 rounded-full font-semibold text-lg shadow-md hover:shadow-purple-500/30 transition duration-300 transform hover:scale-105"
          >
            🚀 Lihat Proyek
          </a>
        </div>

        <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center relative">
          <div className="absolute -z-10 w-[550px] h-[550px] bg-purple-700/20 blur-[140px] rounded-full"></div>
          <img
            src={Kece}
            alt="Tsani"
            className="w-[520px] md:w-[600px] rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.25)] hover:shadow-[0_0_80px_rgba(168,85,247,0.4)] transition-all duration-500 transform hover:scale-105 border border-purple-600/30"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;

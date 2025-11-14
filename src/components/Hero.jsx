function Hero({ language }) {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute w-[700px] h-[700px] bg-purple-900/10 rounded-full blur-[160px] -top-32 -left-32"></div>
        <div className="absolute w-[600px] h-[600px] bg-purple-800/5 rounded-full blur-[160px] -bottom-32 -right-20"></div>
      </div>

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 text-center px-6 max-w-3xl space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">
          {language === "EN" ? "Hello, I'm Tsani" : "Halo, saya Tsani"}
        </h1>

        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          {language === "EN" ? (
            <>
              A <span className="text-purple-300 font-semibold">Frontend Developer</span> &{" "}
              <span className="text-purple-200 font-semibold">UI Designer</span> who loves
              creating modern and elegant web designs.
            </>
          ) : (
            <>
              Seorang <span className="text-purple-300 font-semibold">Frontend Developer</span>{" "}
              & <span className="text-purple-200 font-semibold">UI Designer</span> yang suka
              bikin tampilan web modern dan elegan.
            </>
          )}
        </p>

        <a
          href="#projects"
          className="inline-block px-8 py-3 bg-purple-600/80 hover:bg-purple-700 rounded-full font-semibold text-lg shadow-md hover:shadow-purple-500/20 transition duration-300 transform hover:scale-105"
        >
          {language === "EN" ? "View Projects" : "Lihat Proyek"}
        </a>
      </div>
    </section>
  );
}

export default Hero;

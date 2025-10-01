function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center text-center bg-black overflow-hidden"
    >
      {/* Stars layer */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static twinkling stars */}
        {[...Array(200)].map((_, i) => (
          <span
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full animate-starTwinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random(),
              animationDuration: `${2 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          ></span>
        ))}

        {/* Shooting stars down */}
        {[...Array(8)].map((_, i) => (
          <span
            key={`shoot-${i}`}
            className="absolute w-[3px] h-[140px] bg-gradient-to-b from-white via-purple-400 to-transparent opacity-80 animate-shootingStarDown"
            style={{
              top: `${Math.random() * 20}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 12}s`,
            }}
          ></span>
        ))}

        {/* Rare meteor (big comet) */}
        <span className="absolute w-[6px] h-[250px] bg-gradient-to-b from-pink-200 via-purple-400 to-transparent opacity-90 animate-bigMeteor blur-sm"
          style={{
            top: "0%",
            left: "50%",
            animationDuration: "15s",
            animationDelay: "5s"
          }}
        ></span>
      </div>

      {/* Nebula Glow */}
      <div className="absolute inset-0">
        <div className="absolute w-[1200px] h-[1200px] bg-purple-900/20 rounded-full blur-[150px] animate-nebula1"></div>
        <div className="absolute w-[900px] h-[900px] bg-blue-900/20 rounded-full blur-[150px] animate-nebula2"></div>
      </div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>

      {/* Content */}
      <div className="relative z-10 text-white px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-2xl">
          Halo, saya{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-pulse">
            Tsani
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Saya adalah{" "}
          <span className="text-purple-300 font-semibold">Frontend Developer</span> &{" "}
          <span className="text-pink-300 font-semibold">UI Designer</span>.
        </p>
        <a
          href="#projects"
          className="mt-8 inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold text-lg shadow-lg hover:shadow-purple-500/40 transition duration-300 transform hover:scale-110"
        >
          🚀 Lihat Proyek
        </a>
      </div>
    </section>
  );
}

export default Hero;

import { motion } from "framer-motion";

function Hero({ language }) {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2 }}
          className="absolute w-[700px] h-[700px] bg-purple-900/10 rounded-full blur-[160px] -top-32 -left-32"
        ></motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute w-[600px] h-[600px] bg-purple-800/5 rounded-full blur-[160px] -bottom-32 -right-20"
        ></motion.div>
      </div>

      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl space-y-6">
        
        {/* Heading Animation */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200"
        >
          {language === "EN" ? "Hello, I'm Tsani" : "Halo, saya Tsani"}
        </motion.h1>

        {/* Paragraph Animation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 leading-relaxed"
        >
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
        </motion.p>

        <motion.a
          href="#projects"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-3 bg-purple-600/80 hover:bg-purple-700 rounded-full font-semibold text-lg shadow-md hover:shadow-purple-500/20 transition duration-300"
        >
          {language === "EN" ? "View Projects" : "Lihat Proyek"}
        </motion.a>
      </div>
    </section>
  );
}

export default Hero;

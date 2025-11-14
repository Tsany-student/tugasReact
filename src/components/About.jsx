import React from "react";
import { motion } from "framer-motion";
import kece from "../assets/images/Kece.jpg";

function About({ language }) {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src={kece}
            alt={language === "EN" ? "About Me" : "Tentang Saya"}
            className="rounded-lg shadow-lg"
          />
        </motion.div>

        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">
            {language === "EN" ? "About Me" : "Tentang Saya"}
          </h2>

          <p className="text-lg leading-relaxed mb-4">
            {language === "EN"
              ? "Hi! I'm Tsani, a Frontend Developer & UI Designer focused on building modern, interactive, and responsive websites."
              : "Halo! Saya Tsani, seorang Frontend Developer & UI Designer yang fokus membangun website modern, interaktif, dan responsif."}
          </p>

          <p className="text-lg leading-relaxed">
            {language === "EN"
              ? "I enjoy turning creative ideas into real applications with attractive designs and fast performance."
              : "Saya suka mengubah ide kreatif menjadi aplikasi nyata dengan desain yang menarik dan performa cepat."}
          </p>
        </motion.div>

      </div>
    </section>
  );
}

export default About;

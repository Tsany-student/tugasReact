"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { WorkSection } from "@/components/work-section";
import { ContactSection } from "@/components/contact-section";
import { LoadingScreen } from "@/components/loading-screen";
import { CustomCursor } from "@/components/custom-cursor";
import { SmoothScroll } from "@/components/smooth-scroll";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScroll>
      <LoadingScreen />
      <CustomCursor />
      <Navigation />
      
      <AnimatePresence>
        {isLoaded && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="cursor-none md:cursor-none"
          >
            <HeroSection />
            <AboutSection />
            <WorkSection />
            <ContactSection />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Minimal Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 0.5 }}
        className="bg-primary text-primary-foreground py-10 px-6 md:px-12"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <span className="text-sm font-medium">CREATIVE</span>
            <span className="text-primary-foreground/40 text-xs">®</span>
          </motion.div>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xs text-primary-foreground/40 font-mono"
          >
            © 2026 — ALL RIGHTS RESERVED
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-xs text-primary-foreground/40"
          >
            <span>MADE WITH</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ♥
            </motion.span>
            <span>IN JAKARTA</span>
          </motion.div>
        </div>
      </motion.footer>
    </SmoothScroll>
  );
}

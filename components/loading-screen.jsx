"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Speed counter khas v0 portfolio
    const duration = 1500; 
    const intervalTime = 16; 
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const ratio = currentStep / steps;
      
      // Menggunakan kurva eksponensial halus
      const eased = 1 - Math.pow(1 - ratio, 4);
      setProgress(Math.min(Math.round(eased * 100), 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
        }, 150); // Jeda konstan saat menyentuh 100
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%", // Reveal panel geser ke atas penuh
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.76, 0, 0.24, 1] // Easing standar premium portfolio (smooth & snappy)
          }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] text-[#fff] flex flex-col justify-end p-6 md:p-16 select-none"
        >
          {/* Angka di pojok kiri bawah */}
          <div className="flex flex-col items-start origin-left">
            <motion.h1 
              className="text-[14vw] md:text-[10vw] font-bold tracking-tighter leading-none tabular-nums font-sans"
              animate={{ opacity: progress === 100 ? [1, 0.5, 1] : 1 }}
            >
              {progress}
            </motion.h1>
            
            {/* Indikator tambahan kecil di bawah angka jika dibutuhkan (bisa dihapus jika mau polosan) */}
            <span className="text-[10px] tracking-[0.2em] font-mono opacity-30 mt-2 uppercase">
              Loading Portfolio
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Text scramble effect hook
function useTextScramble(text, isActive, duration = 2000) {
  const [displayText, setDisplayText] = useState("");
  const chars = "!@#$%^&*()_+{}|:<>?~`-=[]\\;',./";

  useEffect(() => {
    if (!isActive) return;

    let frame = 0;
    const totalFrames = 60;
    const interval = duration / totalFrames;

    const scramble = setInterval(() => {
      const progress = frame / totalFrames;
      const revealed = Math.floor(text.length * progress);
      
      let result = "";
      for (let i = 0; i < text.length; i++) {
        if (i < revealed) {
          result += text[i];
        } else if (text[i] === " ") {
          result += " ";
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      setDisplayText(result);
      frame++;
      
      if (frame > totalFrames) {
        clearInterval(scramble);
        setDisplayText(text);
      }
    }, interval);

    return () => clearInterval(scramble);
  }, [isActive, text, duration]);

  return displayText;
}

// Glitch text component
function GlitchText({ text, className }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <span 
        className="absolute top-0 left-0 -translate-x-[2px] text-[#ff00ff] opacity-70 mix-blend-multiply"
        aria-hidden
      >
        {text}
      </span>
      <span 
        className="absolute top-0 left-0 translate-x-[2px] text-[#00ffff] opacity-70 mix-blend-multiply"
        aria-hidden
      >
        {text}
      </span>
    </span>
  );
}

// Morphing blob SVG
function MorphingBlob({ className }) {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={className}
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <defs>
        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#333333" />
        </linearGradient>
      </defs>
      <motion.path
        fill="url(#blobGradient)"
        initial={{
          d: "M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,89.1,-0.5C88.2,15.2,83.8,30.4,75.6,43.2C67.4,56,55.4,66.4,41.6,73.3C27.8,80.2,12.2,83.6,-2.6,87.9C-17.4,92.2,-31.2,97.4,-44.5,93.6C-57.8,89.8,-70.6,77,-77.8,61.8C-85,46.6,-86.6,29,-87.3,11.8C-88,-5.4,-87.8,-22.2,-81.7,-36.4C-75.6,-50.6,-63.6,-62.2,-49.6,-69.5C-35.6,-76.8,-19.6,-79.8,-2.4,-75.5C14.8,-71.2,30.6,-83.6,44.7,-76.4Z",
        }}
        animate={{
          d: [
            "M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,89.1,-0.5C88.2,15.2,83.8,30.4,75.6,43.2C67.4,56,55.4,66.4,41.6,73.3C27.8,80.2,12.2,83.6,-2.6,87.9C-17.4,92.2,-31.2,97.4,-44.5,93.6C-57.8,89.8,-70.6,77,-77.8,61.8C-85,46.6,-86.6,29,-87.3,11.8C-88,-5.4,-87.8,-22.2,-81.7,-36.4C-75.6,-50.6,-63.6,-62.2,-49.6,-69.5C-35.6,-76.8,-19.6,-79.8,-2.4,-75.5C14.8,-71.2,30.6,-83.6,44.7,-76.4Z",
            "M39.9,-67.4C52.1,-60.9,62.6,-50.7,71.2,-38.2C79.8,-25.7,86.5,-10.9,86.5,3.5C86.5,17.9,79.8,31.8,70.5,43.4C61.2,55,49.3,64.3,36,71.5C22.7,78.7,8,83.8,-6.9,83.4C-21.8,83,-36.9,77.1,-49.5,68C-62.1,58.9,-72.2,46.6,-78.6,32.3C-85,18,-87.7,1.7,-85.3,-13.8C-82.9,-29.3,-75.4,-44,-64.1,-54.9C-52.8,-65.8,-37.7,-72.9,-23,-76.2C-8.3,-79.5,6,-79,18.8,-74.6C31.6,-70.2,42.9,-61.9,52.1,-52.5C61.3,-43.1,68.5,-32.6,71.2,-21.1C73.9,-9.6,72.1,2.9,68.6,14.5C65.1,26.1,59.9,36.8,52.1,45.5C44.3,54.2,33.9,60.9,22.6,65.9C11.3,70.9,-0.9,74.2,-13.3,74.1C-25.7,74,-38.3,70.5,-48.4,63.4C-58.5,56.3,-66.1,45.6,-71.9,33.6C-77.7,21.6,-81.7,8.3,-81.1,-4.5C-80.5,-17.3,-75.3,-29.6,-67.4,-40.1C-59.5,-50.6,-48.9,-59.3,-37,-65.8C-25.1,-72.3,-12,-76.6,1.2,-78.8C14.4,-81,28.8,-81.1,39.9,-67.4Z",
            "M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,89.1,-0.5C88.2,15.2,83.8,30.4,75.6,43.2C67.4,56,55.4,66.4,41.6,73.3C27.8,80.2,12.2,83.6,-2.6,87.9C-17.4,92.2,-31.2,97.4,-44.5,93.6C-57.8,89.8,-70.6,77,-77.8,61.8C-85,46.6,-86.6,29,-87.3,11.8C-88,-5.4,-87.8,-22.2,-81.7,-36.4C-75.6,-50.6,-63.6,-62.2,-49.6,-69.5C-35.6,-76.8,-19.6,-79.8,-2.4,-75.5C14.8,-71.2,30.6,-83.6,44.7,-76.4Z",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "center" }}
      />
    </motion.svg>
  );
}

// Particle system
function ParticleSystem({ count = 50 }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary-foreground/20 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
          }}
          animate={{
            y: [null, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Animated counter
function AnimatedCounter({ value, className }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    const duration = 2000;
    const stepTime = duration / end;
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [value]);

  return <span className={className}>{count}</span>;
}

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState(0);
  
  const scrambledText = useTextScramble("CREATIVE", phase >= 1, 1500);

  useEffect(() => {
    const duration = 2500;
    const steps = 100;
    const stepTime = duration / steps;
    let currentStep = 0;

    setTimeout(() => setPhase(1), 500);

    const interval = setInterval(() => {
      currentStep++;
      const eased = 1 - Math.pow(1 - currentStep / steps, 4);
      setProgress(Math.round(eased * 100));

      if (currentStep >= steps) {
        clearInterval(interval);
        setPhase(2);
        setTimeout(() => setIsLoading(false), 600);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Particle system */}
          <ParticleSystem count={30} />

          {/* Morphing blob background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <MorphingBlob className="w-[600px] h-[600px]" />
          </div>

          {/* Grid lines animation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute h-px w-full bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent"
                style={{ top: `${(i + 1) * 10}%` }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ 
                  delay: i * 0.05, 
                  duration: 1.5, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
              />
            ))}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`v-${i}`}
                className="absolute w-px h-full bg-gradient-to-b from-transparent via-primary-foreground/10 to-transparent"
                style={{ left: `${(i + 1) * 10}%` }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ 
                  delay: i * 0.05 + 0.3, 
                  duration: 1.5, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center">
            {/* Glitch text logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12"
            >
              <GlitchText 
                text={scrambledText || "CREATIVE"}
                className="text-6xl md:text-8xl lg:text-9xl font-medium text-primary-foreground tracking-tighter"
              />
            </motion.div>

            {/* Animated progress ring */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-primary-foreground/20"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-primary-foreground"
                  strokeDasharray={283}
                  strokeDashoffset={283 - (283 * progress) / 100}
                  transition={{ duration: 0.1 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-mono text-primary-foreground">
                  {progress}
                </span>
              </div>
            </div>

            {/* Status text with typing effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-primary-foreground/50 text-xs tracking-[0.3em] font-mono"
            >
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                _
              </motion.span>
              <span>LOADING EXPERIENCE</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                _
              </motion.span>
            </motion.div>
          </div>

          {/* Corner decorations with animation */}
          {[
            { pos: "top-8 left-8", border: "border-l-2 border-t-2" },
            { pos: "top-8 right-8", border: "border-r-2 border-t-2" },
            { pos: "bottom-8 left-8", border: "border-l-2 border-b-2" },
            { pos: "bottom-8 right-8", border: "border-r-2 border-b-2" },
          ].map((corner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5, type: "spring" }}
              className={`absolute ${corner.pos} w-6 h-6 ${corner.border} border-primary-foreground/30`}
            />
          ))}

          {/* Bottom info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-8 text-xs text-primary-foreground/30 font-mono"
          >
            v2.0.26
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="absolute bottom-8 right-8 text-xs text-primary-foreground/30 font-mono"
          >
            JAKARTA, ID
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

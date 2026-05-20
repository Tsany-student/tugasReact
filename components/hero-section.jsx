"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

// Magnetic element hook
function useMagnetic(strength = 0.3) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 20, stiffness: 300 });
  const springY = useSpring(y, { damping: 20, stiffness: 300 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  }, [strength, x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, x: springX, y: springY, handleMouseMove, handleMouseLeave };
}

// Text reveal character by character
function RevealText({ text, className, delay = 0 }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <span ref={containerRef} className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={isVisible ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// Floating background shapes
function FloatingShapes() {
  const shapes = [
    { size: 300, x: "10%", y: "20%", delay: 0, color: "rgba(99, 102, 241, 0.08)" },
    { size: 400, x: "70%", y: "60%", delay: 2, color: "rgba(236, 72, 153, 0.06)" },
    { size: 250, x: "80%", y: "10%", delay: 4, color: "rgba(34, 211, 238, 0.06)" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            backgroundColor: shape.color,
          }}
          animate={{
            x: [0, 50, 0, -50, 0],
            y: [0, -30, 0, 30, 0],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated lines background
function AnimatedLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-primary-foreground/5 to-transparent"
          style={{
            width: "200%",
            left: "-50%",
            top: `${20 + i * 15}%`,
          }}
          animate={{
            x: ["0%", "50%"],
          }}
          transition={{
            duration: 30 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"]);

  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  // Scroll indicator magnetic effect
  const scrollMagnetic = useMagnetic(0.5);

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const letterAnimation = {
    hidden: { y: "120%", opacity: 0, rotateX: -80 },
    visible: (i) => ({
      y: "0%",
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: 2.5 + i * 0.04,
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const words = [
    { text: "Design", italic: false },
    { text: "is", italic: false },
    { text: "Creative", italic: true },
  ];

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen bg-primary text-primary-foreground overflow-hidden cursor-none"
    >
      {/* Animated background */}
      <FloatingShapes />
      <AnimatedLines />

      {/* Parallax background text */}
      <motion.div
        style={{ y: textY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.02 }}
          transition={{ delay: 3, duration: 1 }}
          className="text-[40vw] font-bold whitespace-nowrap"
        >
          DESIGN
        </motion.span>
      </motion.div>

      {/* Interactive background that follows mouse */}
      {mounted && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, rgba(255,255,255,0.03), transparent 40%)`,
          }}
        />
      )}

      <motion.div
        style={{ y: springY, scale: springScale, opacity }}
        className="relative z-10 min-h-screen flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20"
      >
        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.6 }}
          className="absolute top-8 left-6 md:left-12 lg:left-20 flex items-center gap-4"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-green-400 rounded-full"
          />
          <span className="text-xs tracking-widest text-primary-foreground/50 font-mono">
            AVAILABLE FOR WORK
          </span>
        </motion.div>

        {/* Main heading with 3D letter animation */}
        <div className="overflow-hidden perspective-1000">
          <h1 className="text-5xl md:text-7xl lg:text-[10rem] font-medium leading-[0.85] tracking-tighter">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="block overflow-hidden">
                <span className={word.italic ? "font-serif italic" : ""}>
                  {word.text.split("").map((letter, i) => {
                    const globalIndex = words
                      .slice(0, wordIndex)
                      .reduce((acc, w) => acc + w.text.length, 0) + i;
                    return (
                      <motion.span
                        key={`${wordIndex}-${i}`}
                        custom={globalIndex}
                        variants={letterAnimation}
                        initial="hidden"
                        animate="visible"
                        className="inline-block"
                        style={{
                          transformStyle: "preserve-3d",
                          fontStyle: word.italic ? "italic" : "normal",
                        }}
                        whileHover={{
                          y: -10,
                          color: "rgba(255,255,255,0.7)",
                          transition: { duration: 0.2 },
                        }}
                      >
                        {letter}
                      </motion.span>
                    );
                  })}
                </span>
                {wordIndex === 2 && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 3.5, duration: 0.6, type: "spring" }}
                    className="text-lg md:text-3xl align-top ml-2"
                  >
                    ®
                  </motion.span>
                )}
              </span>
            ))}
          </h1>
        </div>

        {/* Subtitle with stagger */}
        <div className="mt-10 max-w-xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.6, duration: 0.8 }}
            className="text-sm md:text-base text-primary-foreground/60 leading-relaxed"
          >
            <RevealText
              text="Crafting digital experiences through thoughtful design,"
              delay={3.7}
            />
            <br />
            <RevealText
              text="motion, and storytelling."
              delay={4}
            />
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.2, duration: 0.6 }}
          className="flex gap-12 mt-12"
        >
          {[
            { number: "8+", label: "Years Experience" },
            { number: "50+", label: "Projects Done" },
            { number: "30+", label: "Happy Clients" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.2 + i * 0.1 }}
              className="text-left"
            >
              <span className="text-2xl md:text-3xl font-medium">{stat.number}</span>
              <p className="text-xs text-primary-foreground/40 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 0.6 }}
        className="absolute bottom-6 right-6 md:right-12 text-sm text-primary-foreground/30 font-mono"
      >
        © 2026
      </motion.div>

      {/* Scroll Indicator with magnetic effect */}
      <motion.div
        ref={scrollMagnetic.ref}
        onMouseMove={scrollMagnetic.handleMouseMove}
        onMouseLeave={scrollMagnetic.handleMouseLeave}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 0.6 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 cursor-pointer"
      >
        <motion.div
          style={{ x: scrollMagnetic.x, y: scrollMagnetic.y }}
          className="flex flex-col items-center gap-3"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-6 h-10 border border-primary-foreground/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1 h-2 bg-primary-foreground/50 rounded-full"
            />
          </motion.div>
          <span className="text-[10px] tracking-[0.3em] text-primary-foreground/30">
            SCROLL
          </span>
        </motion.div>
      </motion.div>

      {/* Decorative corner elements */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.5, duration: 0.6 }}
        className="absolute top-1/2 left-6 md:left-12 -translate-y-1/2 hidden lg:block"
      >
        <div className="flex flex-col gap-3">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 3.5 + i * 0.1, duration: 0.4 }}
              className="w-8 h-px bg-primary-foreground/20 origin-left"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

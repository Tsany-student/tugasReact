"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const navItems = [
  { number: "01", label: "HEY", href: "#hero" },
  { number: "02", label: "ABOUT", href: "#about" },
  { number: "03", label: "WORK", href: "#work" },
  { number: "04", label: "CONTACT", href: "#contact" },
];

// Magnetic link component
function MagneticLink({ children, href, className, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

// Text scramble effect
function ScrambleText({ text, isHovered }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isHovered) {
      let iteration = 0;
      clearInterval(intervalRef.current);
      
      intervalRef.current = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(intervalRef.current);
        }

        iteration += 1 / 3;
      }, 30);
    } else {
      setDisplayText(text);
    }

    return () => clearInterval(intervalRef.current);
  }, [isHovered, text]);

  return <span>{displayText}</span>;
}

// Scroll progress indicator
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary-foreground/20 z-[60]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3 }}
    >
      <motion.div
        className="h-full bg-primary-foreground origin-left"
        style={{ scaleX: progress / 100 }}
      />
    </motion.div>
  );
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Update active section
      const sections = ["hero", "about", "work", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuVariants = {
    closed: {
      clipPath: "circle(0% at calc(100% - 32px) 32px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40,
      },
    },
    open: {
      clipPath: "circle(150% at calc(100% - 32px) 32px)",
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    },
  };

  const navItemVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.08 + 0.2,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    exit: (i) => ({
      x: 100,
      opacity: 0,
      transition: {
        delay: (navItems.length - i - 1) * 0.05,
        duration: 0.3,
      },
    }),
  };

  return (
    <>
      <ScrollProgress />

      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between px-8 py-6 transition-all duration-500 ${
          isScrolled ? "mix-blend-difference" : "mix-blend-difference"
        }`}
      >
        {/* Logo */}
        <MagneticLink href="#hero" className="relative group">
          <motion.div
            className="text-white font-medium text-sm tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative">
              CREATIVE
              <motion.span
                className="absolute -bottom-1 left-0 h-px bg-white origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </span>
            <span className="text-white/40 ml-1">®</span>
          </motion.div>
        </MagneticLink>

        {/* Nav links */}
        <div className="flex items-center gap-10">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <MagneticLink
                key={item.number}
                href={item.href}
                className="relative text-xs font-medium tracking-wider text-white group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className="flex items-center gap-2">
                  <span className={`transition-colors ${isActive ? "text-white" : "text-white/40"}`}>
                    {item.number}
                  </span>
                  <span className="text-white/20">/</span>
                  <span className="relative overflow-hidden h-4 flex items-center">
                    <ScrambleText 
                      text={item.label} 
                      isHovered={hoveredIndex === index}
                    />
                  </span>
                </span>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </MagneticLink>
            );
          })}
        </div>

        {/* Time/Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="text-xs text-white/40 font-mono flex items-center gap-2"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-3 h-3 border border-white/30 rounded-full flex items-center justify-center"
          >
            <div className="w-0.5 h-1 bg-white/30 origin-bottom" />
          </motion.div>
          <span>JAKARTA, ID</span>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-5 right-5 z-[70] md:hidden w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
          isOpen ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"
        }`}
        aria-label="Toggle menu"
      >
        <div className="relative w-5 h-4">
          <motion.span
            className="absolute left-0 w-full h-0.5 bg-current rounded-full"
            animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-current rounded-full"
            animate={isOpen ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="absolute left-0 bottom-0 w-full h-0.5 bg-current rounded-full"
            animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.button>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[60] bg-primary flex flex-col justify-center px-8 md:hidden"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px w-full bg-primary-foreground"
                  style={{ top: `${i * 10 + 5}%` }}
                />
              ))}
            </div>

            <div className="space-y-2">
              {navItems.map((item, index) => (
                <div key={item.number} className="overflow-hidden">
                  <motion.a
                    custom={index}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-baseline gap-4 py-3 group"
                  >
                    <span className="text-sm text-primary-foreground/30 font-mono">
                      {item.number}
                    </span>
                    <span className="text-5xl font-medium text-primary-foreground tracking-tight">
                      {item.label}
                    </span>
                    <motion.span
                      className="text-2xl text-primary-foreground/30"
                      initial={{ x: -10, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                </div>
              ))}
            </div>

            {/* Footer info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-8 left-8 right-8 flex justify-between text-xs text-primary-foreground/30"
            >
              <span>JAKARTA, ID</span>
              <span>© 2026</span>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.05 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute -bottom-20 -right-20 w-80 h-80 border border-primary-foreground rounded-full"
            />
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

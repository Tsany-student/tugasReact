"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const navItems = [
  { number: "01", label: "HEY", href: "#hero" },
  { number: "02", label: "ABOUT", href: "#about" },
  { number: "03", label: "WORK", href: "#work" },
  { number: "04", label: "CONTACT", href: "#contact" },
];

// Magnetic Link Component (Error Type Casting FIX & Optimized)
function MagneticLink({ children, href, className, onClick }) {
  const ref = useRef(null); // FIX: Menghapus tipe <HTMLAnchorElement>
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => { // FIX: Menghapus tipe React.MouseEvent
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
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

// Scroll Progress Indicator Minimalis (Anti-Lag Event Listener)
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          setProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/10 z-[60]">
      <motion.div
        className="h-full bg-white origin-left"
        style={{ scaleX: progress / 100 }}
      />
    </div>
  );
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ["hero", "about", "work", "contact"];
          const currentScroll = window.scrollY + 200;

          for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
              const top = el.offsetTop;
              const bottom = top + el.offsetHeight;
              if (currentScroll >= top && currentScroll <= bottom) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ScrollProgress />

      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between px-8 py-6 mix-blend-difference"
      >
        {/* LOGO */}
        <MagneticLink href="#hero" className="relative group text-white font-medium text-sm tracking-widest font-mono">
          <span>
            PORTOFOLIO
            <span className="text-white/40 ml-0.5">®</span>
          </span>
          <span className="absolute -bottom-1 left-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </MagneticLink>

        {/* Nav Links */}
        <div className="flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <MagneticLink
                key={item.number}
                href={item.href}
                className="relative text-xs font-medium tracking-wider text-white group py-1"
              >
                <span className="flex items-center gap-2 font-mono">
                  <span className={`transition-colors duration-300 ${isActive ? "text-white" : "text-white/40"}`}>
                    {item.number}
                  </span>
                  <span className="text-white/20">/</span>
                  <span className="relative overflow-hidden h-4 flex items-center group-hover:text-white/70 transition-colors duration-200">
                    {item.label}
                  </span>
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </MagneticLink>
            );
          })}
        </div>

        {/* Time/Location */}
        <div className="text-xs text-white/40 font-mono flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span>CISAUK, ID</span>
        </div>
      </motion.nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-5 right-5 z-[70] md:hidden w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
          isOpen ? "bg-white text-black" : "bg-black text-white border border-white/10"
        }`}
        aria-label="Toggle menu"
      >
        <div className="relative w-5 h-4">
          <span className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? "rotate-45 top-2" : "top-0"}`} />
          <span className={`absolute left-0 top-2 w-full h-0.5 bg-current transition-opacity duration-200 ${isOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? "-rotate-45 top-2" : "top-4"}`} />
        </div>
      </button>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black text-white flex flex-col justify-center px-8 md:hidden"
          >
            <div className="space-y-4">
              {navItems.map((item) => (
                <div key={item.number} className="overflow-hidden">
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-baseline gap-4 py-2 group"
                  >
                    <span className="text-sm text-white/30 font-mono">{item.number}</span>
                    <span className="text-4xl font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                      {item.label}
                    </span>
                  </a>
                </div>
              ))}
            </div>

            <div className="absolute bottom-8 left-8 right-8 flex justify-between text-xs text-white/30 font-mono">
              <span>JAKARTA, ID</span>
              <span>© 2026</span>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";

const socialLinks = [
  { label: "LINKEDIN", href: "#" },
  { label: "DRIBBBLE", href: "#" },
  { label: "BEHANCE", href: "#" },
  { label: "INSTAGRAM", href: "#" },
  { label: "TWITTER", href: "#" },
];

// Magnetic button with smooth spring
function MagneticButton({ children, className, strength = 0.3 }) {
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
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated text reveal on hover
function RevealLink({ children, href }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative inline-block overflow-hidden py-1"
    >
      <motion.span
        className="block"
        animate={{ y: isHovered ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute top-full left-0 block"
        animate={{ y: isHovered ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </motion.a>
  );
}

// Floating 3D sphere
function FloatingSphere() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, type: "spring" }}
      className="relative"
    >
      <motion.div
        animate={{ 
          y: [-15, 15, -15],
          rotateY: [0, 360],
          rotateX: [0, 15, 0],
        }}
        transition={{ 
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative w-36 h-36 md:w-48 md:h-48"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Gradient sphere */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-rose-400 via-fuchsia-400 to-violet-500 shadow-2xl flex items-center justify-center">
          <span className="text-5xl md:text-6xl select-none">:)</span>
        </div>
        
        {/* Glow effects */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-400 via-fuchsia-400 to-violet-500 blur-3xl opacity-30 -z-10 scale-150" />
        
        {/* Orbiting rings */}
        <motion.div
          animate={{ rotateX: 75, rotateY: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-white/20 rounded-full"
          style={{ transformStyle: "preserve-3d" }}
        />
        <motion.div
          animate={{ rotateX: 75, rotateY: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-20px] border border-white/10 rounded-full"
          style={{ transformStyle: "preserve-3d" }}
        />
      </motion.div>
    </motion.div>
  );
}

// Animated rotating text badge
function RotatingBadge() {
  return (
    <MagneticButton strength={0.5}>
      <div className="relative w-32 h-32 md:w-40 md:h-40 cursor-pointer">
        <motion.svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <path
              id="circlePath"
              d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              fill="none"
            />
          </defs>
          <text className="text-[7px] tracking-[0.3em] fill-foreground uppercase font-medium">
            <textPath href="#circlePath">
              THE CREATIVE SHOP • LET&apos;S WORK TOGETHER •{" "}
            </textPath>
          </text>
        </motion.svg>
        
        {/* Center icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          whileHover={{ scale: 1.3, rotate: 180 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          <span className="text-3xl">✦</span>
        </motion.div>
      </div>
    </MagneticButton>
  );
}

// Email link with hover animation
function EmailLink() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MagneticButton strength={0.2}>
      <a
        href="mailto:hello@creativestudio.co"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group inline-flex flex-col"
      >
        <span className="text-sm text-muted-foreground mb-3">
          {"Let's create something amazing"}
        </span>
        
        <div className="relative overflow-hidden">
          <motion.span
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium block"
            animate={{ y: isHovered ? "-100%" : "0%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            hello@creativestudio.co
          </motion.span>
          <motion.span
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium absolute top-full left-0"
            animate={{ y: isHovered ? "-100%" : "0%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            hello@creativestudio.co
          </motion.span>
        </div>
        
        {/* Animated underline */}
        <motion.div
          className="h-[2px] bg-foreground mt-2 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
        
        <motion.div
          className="flex items-center gap-2 mt-4 text-muted-foreground"
          animate={{ x: isHovered ? 10 : 0 }}
        >
          <span className="text-sm">Send me an email</span>
          <motion.span
            animate={{ x: isHovered ? 5 : 0, rotate: isHovered ? -45 : 0 }}
            className="text-xl"
          >
            →
          </motion.span>
        </motion.div>
      </a>
    </MagneticButton>
  );
}

// Social link with reveal animation
function SocialLink({ link, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 + index * 0.08 }}
    >
      <motion.a
        href={link.href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative text-xs md:text-sm tracking-[0.2em] inline-block overflow-hidden"
      >
        {/* Background fill */}
        <motion.span
          className="absolute inset-0 bg-foreground -z-10"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "0%" : "-100%" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        
        {/* Text with color transition */}
        <motion.span
          className="relative z-10 block px-3 py-1.5"
          animate={{ color: isHovered ? "var(--background)" : "var(--foreground)" }}
          transition={{ duration: 0.2 }}
        >
          {link.label}
        </motion.span>
      </motion.a>
    </motion.div>
  );
}

export function ContactSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative bg-background text-foreground px-6 md:px-12 lg:px-20 py-24 md:py-40 overflow-hidden"
    >
      {/* Parallax background text */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="text-[25vw] font-bold text-foreground/[0.02] tracking-tighter">
          HELLO
        </span>
      </motion.div>

      {/* Grid background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }} />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-4 mb-20"
      >
        <motion.span 
          className="text-xs tracking-widest text-muted-foreground font-mono"
          whileHover={{ letterSpacing: "0.3em" }}
        >
          04
        </motion.span>
        <motion.div 
          className="h-px bg-border"
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <span className="text-xs tracking-widest text-muted-foreground">
          GET IN TOUCH
        </span>
      </motion.div>

      {/* Main content grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 items-center min-h-[50vh]">
        {/* Left - Rotating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex justify-center lg:justify-start"
        >
          <RotatingBadge />
        </motion.div>

        {/* Center - Floating Sphere */}
        <div className="flex justify-center">
          <FloatingSphere />
        </div>

        {/* Right - Email CTA */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <EmailLink />
        </motion.div>
      </div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-32 pt-10 border-t border-border"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-wrap gap-4 md:gap-6">
            {socialLinks.map((link, i) => (
              <SocialLink key={link.label} link={link} index={i} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="text-xs text-muted-foreground font-mono"
          >
            © 2026 Creative® — All rights reserved
          </motion.p>
        </div>
      </motion.div>

      {/* Footer decoration */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-20 text-center"
      >
        <p className="text-xs text-muted-foreground/50 tracking-widest">
          DESIGNED & BUILT WITH PASSION
        </p>
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-4 text-2xl"
        >
          ♥
        </motion.div>
      </motion.div>

      {/* Decorative circles */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.05, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute bottom-20 left-10 w-64 h-64 rounded-full border border-foreground"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.03, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-40 right-20 w-40 h-40 rounded-full border border-foreground"
      />
    </section>
  );
}

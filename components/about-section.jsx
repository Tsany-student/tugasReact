"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from "framer-motion";

// Split text animation with smooth reveal
function SplitTextReveal({ text, className, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", rotateX: -80 }}
            animate={isInView ? { y: "0%", rotateX: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformOrigin: "bottom" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Highlight text with animated underline
function HighlightText({ children, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-[2px] bg-foreground"
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : {}}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </span>
  );
}

// Animated counter
function Counter({ value, duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const target = parseInt(value);
    const step = target / (duration * 60);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

// Floating skill tag
function SkillTag({ skill, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 20, stiffness: 300 });
  const springY = useSpring(y, { damping: 20, stiffness: 300 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      <motion.span
        whileHover={{ 
          scale: 1.1, 
          backgroundColor: "var(--foreground)", 
          color: "var(--background)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
        }}
        transition={{ duration: 0.3 }}
        className="inline-block px-5 py-2.5 border border-border text-sm cursor-default"
      >
        {skill}
      </motion.span>
    </motion.div>
  );
}

// 3D rotating cube decoration
function RotatingCube() {
  return (
    <motion.div
      animate={{ rotateX: 360, rotateY: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="w-20 h-20 relative"
      style={{ transformStyle: "preserve-3d" }}
    >
      {[
        { rotateY: 0, translateZ: 40 },
        { rotateY: 180, translateZ: 40 },
        { rotateY: -90, translateZ: 40 },
        { rotateY: 90, translateZ: 40 },
        { rotateX: 90, translateZ: 40 },
        { rotateX: -90, translateZ: 40 },
      ].map((face, i) => (
        <div
          key={i}
          className="absolute inset-0 border border-foreground/10"
          style={{
            transform: `rotateX(${face.rotateX || 0}deg) rotateY(${face.rotateY || 0}deg) translateZ(${face.translateZ}px)`,
          }}
        />
      ))}
    </motion.div>
  );
}

export function AboutSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const skills = [
    "UX Design",
    "Visual Design", 
    "Motion Design",
    "Brand Identity",
    "Design Systems",
    "Interaction Design",
    "Prototyping",
    "User Research",
  ];

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen bg-background text-foreground px-6 md:px-12 lg:px-20 py-24 md:py-40 overflow-hidden"
    >
      {/* Parallax background text */}
      <motion.div
        style={{ x }}
        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[20vw] font-bold text-foreground/[0.02] pointer-events-none select-none"
      >
        ABOUT — ABOUT — ABOUT — ABOUT —
      </motion.div>

      {/* Floating decoration */}
      <motion.div
        style={{ y, rotate }}
        className="hidden lg:block absolute right-20 top-40"
      >
        <RotatingCube />
      </motion.div>

      <div className="relative z-10 max-w-5xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <motion.span 
            className="text-xs tracking-widest text-muted-foreground font-mono"
            whileHover={{ letterSpacing: "0.3em" }}
          >
            02
          </motion.span>
          <motion.div 
            className="h-px bg-border origin-left"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.span 
            className="text-xs tracking-widest text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            ABOUT
          </motion.span>
        </motion.div>

        {/* Main heading with rich animations */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium leading-[1.4] mb-20">
          <SplitTextReveal text="Creative® is the design work of" delay={0} />
          {" "}
          <motion.span
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-muted-foreground"
          >
            John
          </motion.span>{" "}
          <motion.em
            initial={{ opacity: 0, rotateY: 90 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-serif italic not-italic"
            style={{ fontStyle: "italic" }}
          >
            Doe
          </motion.em>
          <SplitTextReveal 
            text=", a passionate designer based in" 
            delay={0.3}
          />
          {" "}
          <HighlightText>Jakarta, Indonesia</HighlightText>
          <SplitTextReveal 
            text=". Currently crafting digital experiences @" 
            delay={0.5}
          />
          {" "}
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="relative inline-block group"
            whileHover={{ scale: 1.05 }}
          >
            <span className="underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-all">
              TechCorp
            </span>
            <motion.span
              className="absolute -right-4 top-0 text-lg"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ↗
            </motion.span>
          </motion.a>
          .
        </h2>

        {/* Stats with animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 py-12 border-y border-border"
        >
          {[
            { number: "8", suffix: "+", label: "Years of Experience" },
            { number: "50", suffix: "+", label: "Projects Completed" },
            { number: "30", suffix: "+", label: "Happy Clients" },
            { number: "15", suffix: "", label: "Awards Won" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-medium mb-2">
                <Counter value={stat.number} />
                <span>{stat.suffix}</span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Description paragraphs */}
        <div className="space-y-8 text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mb-16">
          {[
            "With 8 years of experience in the design industry, I have had the opportunity to work with both industry leaders like Google, Tokopedia, Gojek and more, as well as innovative startups.",
            "I have been fortunate to have my work recognised with awards such as Awwwards Site of the Day, CSS Design Awards, and FWA of the Day.",
            "I am passionate about pushing the boundaries of Design, and breaking the rules when needed. Creating experiences that are both beautiful and functional.",
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="leading-relaxed"
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Skills/Expertise with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xs tracking-[0.3em] text-muted-foreground mb-8">
            EXPERTISE
          </h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <SkillTag key={skill} skill={skill} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Pronunciation note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-border"
        >
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground">*</span> Doe (ˈdoʊ) from the English
            means{" "}
            <em className="font-serif italic">an anonymous person, unknown identity</em>.
          </p>
        </motion.div>
      </div>

      {/* Decorative animated circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: "spring" }}
        className="hidden xl:block absolute right-32 bottom-40"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="relative w-40 h-40"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              id="circlePath2"
              d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
              fill="none"
            />
            <text className="text-[6px] tracking-[0.2em] fill-foreground/20 uppercase">
              <textPath href="#circlePath2">
                DESIGNER • CREATOR • INNOVATOR • THINKER •{" "}
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 bg-foreground/20 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

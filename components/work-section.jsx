"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

const projects = [
  {
    title: "React JS",
    tags: ["Frontend", "Component Architecture", "SPA"],
    type: "Library",
    year: "2026",
    color: "#61DAFB",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
  },
  {
    title: "JavaScript",
    tags: ["ES6+", "Asynchronous", "Core Engine"],
    type: "Programming Language",
    year: "2026",
    color: "#F7DF1E",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&q=80",
  },
  {
    title: "Tailwind CSS",
    tags: ["Utility-First", "Responsive Design", "UI/UX"],
    type: "CSS Framework",
    year: "2025",
    color: "#38BDF8",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&q=80",
  },
  {
    title: "HTML & CSS",
    tags: ["Semantic Web", "Layouts", "SEO Friendly"],
    type: "Web Basics",
    year: "2025",
    color: "#E34F26",
    image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=600&q=80",
  },
  {
    title: "Web Development",
    tags: ["Fullstack", "Performance", "Security"],
    type: "Ecosystem",
    year: "2024",
    color: "#a855f7",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    title: "Next.js",
    tags: ["SSR", "App Router", "Optimization"],
    type: "React Framework",
    year: "2024",
    color: "#ffffff",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&q=80",
  },
];

// Project item with 3D hover effect & Performance Optimization
function ProjectItem({ project, index }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-8deg", "8deg"]);

  // Optimized Mouse Move using CSS Variables to avoid Framer state re-render lag
  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
    
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;
    
    el.style.setProperty("--mouse-x", `${mX}px`);
    el.style.setProperty("--mouse-y", `${mY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="border-b border-border group"
      style={{ perspective: 1000 }}
    >
      <motion.a
        href="#"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative flex flex-col md:flex-row md:items-center justify-between py-8 md:py-10 lg:py-12 px-4 -mx-4 overflow-hidden"
      >
        {/* Animated background gradient driven by high-performance CSS variables */}
        <div
          className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(500px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${project.color}12, transparent 50%)`,
          }}
        />

        {/* Color accent line */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 origin-top"
          style={{ backgroundColor: project.color }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Project number and title */}
        <div className="flex items-center gap-4 md:gap-8 mb-4 md:mb-0">
          <motion.span
            className="text-xs text-muted-foreground font-mono w-8"
            animate={{ 
              x: isHovered ? 10 : 0,
              color: isHovered ? project.color : undefined,
            }}
            transition={{ duration: 0.3 }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>

          <div className="overflow-hidden">
            <motion.h3
              className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-medium tracking-tight"
              animate={{ x: isHovered ? 20 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="relative inline-block">
                {project.title.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    animate={{
                      y: isHovered ? [0, -4, 0] : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.015,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
                
                {/* Animated underline */}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px]"
                  style={{ backgroundColor: project.color }}
                  initial={{ width: 0 }}
                  animate={{ width: isHovered ? "100%" : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </motion.h3>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 lg:gap-12 ml-12 md:ml-0">
          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2"
            animate={{ x: isHovered ? -10 : 0, opacity: isHovered ? 0.7 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {project.tags.map((tag, tagIndex) => (
              <span key={tag} className="text-xs md:text-sm text-muted-foreground">
                {tag}
                {tagIndex < project.tags.length - 1 && (
                  <span className="mx-2 text-muted-foreground/30">/</span>
                )}
              </span>
            ))}
          </motion.div>

          {/* Type & Year */}
          <div className="flex items-center gap-6 md:gap-8">
            <span className="text-xs md:text-sm text-muted-foreground min-w-[100px] md:min-w-[140px]">
              {project.type}
            </span>
            <motion.span
              className="text-xs font-mono"
              animate={{ 
                opacity: isHovered ? 1 : 0.5,
                color: isHovered ? project.color : undefined,
              }}
            >
              {project.year}
            </motion.span>
          </div>

          {/* Arrow with rotation */}
          <motion.div
            className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full border border-border"
            animate={{ 
              x: isHovered ? 10 : 0,
              rotate: isHovered ? -45 : 0,
              borderColor: isHovered ? project.color : undefined,
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 14L14 4M14 4H7M14 4V11" />
            </svg>
          </motion.div>
        </div>

        {/* Hover preview image */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              transition={{ duration: 0.25 }}
              className="absolute right-20 top-1/2 -translate-y-1/2 w-48 h-32 rounded-lg overflow-hidden shadow-2xl pointer-events-none hidden xl:block"
              style={{ 
                transformStyle: "preserve-3d",
                transform: "translateZ(50px)",
                willChange: "transform, opacity"
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
              <div 
                className="absolute inset-0 mix-blend-overlay opacity-20"
                style={{ backgroundColor: project.color }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.a>
    </motion.li>
  );
}

// Animated view all button
function ViewAllButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href="#"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileTap={{ scale: 0.98 }}
      className="relative inline-flex items-center gap-4 px-10 py-5 border border-foreground text-sm tracking-[0.2em] overflow-hidden group"
    >
      {/* Background fill animation */}
      <motion.div
        className="absolute inset-0 bg-foreground -z-10"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "0%" : "-100%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
      
      <motion.span
        animate={{ color: isHovered ? "var(--background)" : "var(--foreground)" }}
        transition={{ duration: 0.25 }}
      >
        VIEW ALL PROJECTS
      </motion.span>
      
      <motion.span
        animate={{ 
          x: isHovered ? 5 : 0,
          color: isHovered ? "var(--background)" : "var(--foreground)",
        }}
        transition={{ duration: 0.25 }}
        className="text-lg"
      >
        →
      </motion.span>

      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-l border-t border-foreground" />
      <span className="absolute top-0 right-0 w-2 h-2 border-r border-t border-foreground" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-foreground" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-foreground" />
    </motion.a>
  );
}

export function WorkSection() {
  return (
    <section
      id="work"
      className="bg-background text-foreground px-6 md:px-12 lg:px-20 py-24 md:py-40 overflow-hidden"
    >
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <motion.span 
              className="text-xs tracking-widest text-muted-foreground font-mono"
              whileHover={{ letterSpacing: "0.3em" }}
            >
              03
            </motion.span>
            <motion.div 
              className="h-px bg-border"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
            <span className="text-xs tracking-widest text-muted-foreground">
              SELECTED WORK
            </span>
          </div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight"
          >
            Featured Projects
          </motion.h2>
        </div>

        <span className="text-sm text-muted-foreground font-mono">
          {projects.length} PROJECTS
        </span>
      </div>

      {/* Projects list */}
      <ul className="border-t border-border mb-16">
        {projects.map((project, index) => (
          <ProjectItem key={project.title} project={project} index={index} />
        ))}
      </ul>

      {/* View all button */}
      <div className="flex justify-center">
        <ViewAllButton />
      </div>
    </section>
  );
}
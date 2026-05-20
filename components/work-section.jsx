"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

const projects = [
  {
    title: "Synthetic Studio",
    tags: ["Creative Direction", "Visual", "Motion"],
    type: "Website",
    year: "2026",
    color: "#FF6B6B",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
  },
  {
    title: "MindFlow",
    tags: ["UX", "Visual", "Design System"],
    type: "Website Design",
    year: "2025",
    color: "#4ECDC4",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&q=80",
  },
  {
    title: "TechVenture",
    tags: ["UX", "Visual", "Motion"],
    type: "Mobile App",
    year: "2025",
    color: "#FFE66D",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&q=80",
  },
  {
    title: "Artisan",
    tags: ["UX", "Visual", "Brand"],
    type: "Mobile App",
    year: "2024",
    color: "#95E1D3",
    image: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=600&q=80",
  },
  {
    title: "Web3 Collective",
    tags: ["Art Direction", "Visual", "Motion"],
    type: "App/Website",
    year: "2024",
    color: "#DDA0DD",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&q=80",
  },
  {
    title: "BrandCo",
    tags: ["UX", "Visual", "Brand"],
    type: "Brand Identity",
    year: "2023",
    color: "#F38181",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&q=80",
  },
];

// Project item with 3D hover effect
function ProjectItem({ project, index }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
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
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, ${project.color}15, transparent 40%)`,
          }}
        />

        {/* Color accent line */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 origin-top"
          style={{ backgroundColor: project.color }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Project number and title */}
        <div className="flex items-center gap-4 md:gap-8 mb-4 md:mb-0">
          <motion.span
            className="text-xs text-muted-foreground font-mono w-8"
            animate={{ 
              x: isHovered ? 15 : 0,
              color: isHovered ? project.color : undefined,
            }}
            transition={{ duration: 0.4 }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>

          <div className="overflow-hidden">
            <motion.h3
              className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-medium tracking-tight"
              animate={{ x: isHovered ? 30 : 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="relative inline-block">
                {project.title.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    animate={{
                      y: isHovered ? [0, -5, 0] : 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.02,
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
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
            animate={{ x: isHovered ? -15 : 0, opacity: isHovered ? 0.7 : 1 }}
            transition={{ duration: 0.4 }}
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
              x: isHovered ? 15 : 0,
              rotate: isHovered ? -45 : 0,
              borderColor: isHovered ? project.color : undefined,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.4 }}
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
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute right-20 top-1/2 -translate-y-1/2 w-48 h-32 rounded-lg overflow-hidden shadow-2xl pointer-events-none hidden xl:block"
              style={{ 
                transformStyle: "preserve-3d",
                transform: "translateZ(50px)",
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
              <div 
                className="absolute inset-0 mix-blend-overlay opacity-30"
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileTap={{ scale: 0.95 }}
      className="relative inline-flex items-center gap-4 px-10 py-5 border border-foreground text-sm tracking-[0.2em] overflow-hidden group"
    >
      {/* Background fill animation */}
      <motion.div
        className="absolute inset-0 bg-foreground -z-10"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "0%" : "-100%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
      
      <motion.span
        animate={{ color: isHovered ? "var(--background)" : "var(--foreground)" }}
        transition={{ duration: 0.3 }}
      >
        VIEW ALL PROJECTS
      </motion.span>
      
      <motion.span
        animate={{ 
          x: isHovered ? 5 : 0,
          color: isHovered ? "var(--background)" : "var(--foreground)",
        }}
        transition={{ duration: 0.3 }}
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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20"
      >
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
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <span className="text-xs tracking-widest text-muted-foreground">
              SELECTED WORK
            </span>
          </div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight"
          >
            Featured Projects
          </motion.h2>
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-sm text-muted-foreground font-mono"
        >
          {projects.length} PROJECTS
        </motion.span>
      </motion.div>

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

"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState([]);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 400 };
  const smoothConfig = { damping: 50, stiffness: 300 };
  
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const ringXSpring = useSpring(cursorX, smoothConfig);
  const ringYSpring = useSpring(cursorY, smoothConfig);

  useEffect(() => {
    setMounted(true);
    
    // Trail effect
    const trailPositions = [];
    
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Add to trail
      trailPositions.push({ x: e.clientX, y: e.clientY, id: Date.now() });
      if (trailPositions.length > 8) {
        trailPositions.shift();
      }
      setTrail([...trailPositions]);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      const isLink = target.tagName === "A" || target.closest("a");
      const isButton = target.tagName === "BUTTON" || target.closest("button");
      const hasHoverText = target.dataset?.cursorText;
      
      if (isLink || isButton || target.classList.contains("cursor-pointer")) {
        setIsHovering(true);
        setHoverText(hasHoverText || (isLink ? "VIEW" : "CLICK"));
      } else {
        setIsHovering(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <>
      {/* Trail effect */}
      {trail.map((point, i) => (
        <motion.div
          key={point.id}
          className="fixed top-0 left-0 w-1 h-1 bg-foreground/20 rounded-full pointer-events-none z-[9998] hidden md:block"
          style={{
            x: point.x - 2,
            y: point.y - 2,
          }}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, delay: i * 0.02 }}
        />
      ))}

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          className="bg-white rounded-full"
          animate={{
            width: isHovering ? 8 : 12,
            height: isHovering ? 8 : 12,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="border border-white/80 rounded-full flex items-center justify-center"
          animate={{
            width: isHovering ? 80 : 40,
            height: isHovering ? 80 : 40,
            borderWidth: isHovering ? 2 : 1,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence>
            {isHovering && hoverText && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-[10px] font-medium tracking-wider text-white"
              >
                {hoverText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}

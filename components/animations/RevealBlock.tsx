"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface RevealBlockProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
}

const getVariants = (direction: RevealBlockProps["direction"], distance = 40): Variants => {
  const getInitial = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: distance };
      case "down": return { opacity: 0, y: -distance };
      case "left": return { opacity: 0, x: distance };
      case "right": return { opacity: 0, x: -distance };
      case "none": return { opacity: 0 };
      default: return { opacity: 0, y: distance };
    }
  };

  return {
    hidden: getInitial(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };
};

export function RevealBlock({
  children,
  delay = 0,
  duration = 0.8,
  direction = "up",
  className = "",
  once = true,
}: RevealBlockProps) {
  const variants = getVariants(direction);

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      variants={{
        hidden: variants.hidden,
        visible: {
          ...(variants.visible as object),
          transition: {
            duration,
            delay,
            ease: [0.23, 1, 0.32, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealStagger({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  className = "",
}: {
  children: ReactNode[];
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
}) {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={containerVariants}
    >
      {Array.isArray(children) &&
        children.map((child, i) => (
          <motion.div key={i} variants={itemVariants}>
            {child}
          </motion.div>
        ))}
    </motion.div>
  );
}

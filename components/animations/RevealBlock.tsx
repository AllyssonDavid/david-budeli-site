"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { premiumEase } from "@/components/experience/motionPresets";

interface RevealBlockProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  className?: string;
  once?: boolean;
}

const getVariants = (direction: RevealBlockProps["direction"], distance = 40): Variants => {
  const getInitial = () => {
    const base = {
      opacity: 0,
      scale: 0.985,
      filter: "blur(10px)",
    };

    switch (direction) {
      case "up": return { ...base, y: distance };
      case "down": return { ...base, y: -distance };
      case "left": return { ...base, x: distance };
      case "right": return { ...base, x: -distance };
      case "none": return base;
      default: return { ...base, y: distance };
    }
  };

  return {
    hidden: getInitial(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: premiumEase,
      },
    },
  };
};

export function RevealBlock({
  children,
  delay = 0,
  duration = 0.8,
  direction = "up",
  distance = 40,
  className = "",
  once = true,
}: RevealBlockProps) {
  const variants = getVariants(direction, distance);

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
            ease: premiumEase,
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
      transition: { duration: 0.7, ease: premiumEase },
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

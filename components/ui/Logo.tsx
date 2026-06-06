"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export function Logo({ className, onClick }: LogoProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative w-11 h-11 flex items-center justify-center group cursor-pointer",
        "focus:outline-none focus-visible:ring-1 focus-visible:ring-accent",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      aria-label="David Budeli - Topo"
    >
      {/* Hexagon border */}
      <motion.div
        className="absolute inset-0 border border-accent/30"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
        whileHover={{ borderColor: "rgba(59,130,246,0.7)" }}
        transition={{ duration: 0.3 }}
      />

      {/* Glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: "rgba(59,130,246,0.08)",
          filter: "blur(4px)",
        }}
      />

      {/* D Letter */}
      <span
        className="relative z-10 font-display font-extrabold text-lg leading-none"
        style={{
          background:
            "linear-gradient(135deg, #fff 0%, #60A5FA 50%, #8B5CF6 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.02em",
        }}
      >
        D
      </span>
    </motion.button>
  );
}

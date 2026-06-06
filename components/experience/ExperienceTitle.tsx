"use client";

import { ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ExperienceTitleProps {
  children: ReactNode;
  className?: string;
  progress?: MotionValue<number>;
}

export function ExperienceTitle({
  children,
  className,
  progress,
}: ExperienceTitleProps) {
  const localRef = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const localScroll = useScroll({
    target: localRef,
    offset: ["start 86%", "end 28%"],
  });
  const source = progress ?? localScroll.scrollYProgress;

  const y = useTransform(source, [0, 0.44, 1], [28, 0, -18]);
  const scale = useTransform(source, [0, 0.5, 1], [0.985, 1, 0.992]);
  const opacity = useTransform(source, [0, 0.28, 1], [0.08, 1, 0.88]);
  const blur = useTransform(source, [0, 0.34, 1], [
    "blur(8px)",
    "blur(0px)",
    "blur(0px)",
  ]);

  return (
    <motion.h2
      ref={localRef}
      className={cn(
        "font-display mb-10 max-w-full text-[1.98rem] font-extrabold leading-[1.03] tracking-normal min-[375px]:text-[2.08rem] sm:text-[3.1rem] md:mb-16 lg:text-[4rem]",
        className
      )}
      style={{
        y: reduced ? 0 : y,
        scale: reduced ? 1 : scale,
        opacity,
        filter: reduced ? "none" : blur,
        willChange: "transform, opacity, filter",
      }}
    >
      {children}
    </motion.h2>
  );
}

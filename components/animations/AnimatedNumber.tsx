"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedNumber({
  value,
  suffix = "",
  duration = 900,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView || reduced) {
      setCurrent(value);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setCurrent(Math.round(value * eased));
      if (elapsed < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, inView, reduced, value]);

  return (
    <span ref={ref} className={className}>
      {current}
      {suffix}
    </span>
  );
}

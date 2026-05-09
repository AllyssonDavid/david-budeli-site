"use client";

import { useEffect, useRef, useState } from "react";

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px 0px -60px 0px", once = true } =
    options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

export function useRevealStagger<T extends HTMLElement = HTMLDivElement>(
  count: number,
  options: UseRevealOptions = {}
) {
  const { threshold = 0.05, rootMargin = "0px 0px -40px 0px" } = options;
  const containerRef = useRef<T>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(count).fill(false)
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // stagger reveal
          Array.from({ length: count }).forEach((_, i) => {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 100);
          });
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [count, threshold, rootMargin]);

  return { containerRef, visibleItems };
}

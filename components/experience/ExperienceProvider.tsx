"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_EXPERIENCE_SECTION,
  EXPERIENCE_SECTIONS,
  type ExperienceSectionId,
  type ExperienceTone,
  getExperienceSection,
} from "./config";

interface ExperienceContextValue {
  activeSectionId: ExperienceSectionId;
  activeIndex: number;
  activeTone: ExperienceTone;
  setActiveSection: (id: ExperienceSectionId) => void;
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [activeSectionId, setActiveSectionId] =
    useState<ExperienceSectionId>(DEFAULT_EXPERIENCE_SECTION.id);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scores = new Map<string, number>();
    const thresholds = [0, 0.08, 0.16, 0.24, 0.36, 0.48, 0.6, 0.72, 0.84, 1];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.experienceSection;
          if (!id) return;

          scores.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let nextId: ExperienceSectionId | null = null;
        let bestScore = 0;

        EXPERIENCE_SECTIONS.forEach((section) => {
          const score = scores.get(section.id) ?? 0;
          if (score > bestScore) {
            bestScore = score;
            nextId = section.id;
          }
        });

        if (nextId && bestScore > 0.06) {
          setActiveSectionId(nextId);
        }
      },
      {
        root: null,
        rootMargin: "-16% 0px -30% 0px",
        threshold: thresholds,
      }
    );

    const nodes = document.querySelectorAll<HTMLElement>(
      "[data-experience-section]"
    );
    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  const value = useMemo<ExperienceContextValue>(() => {
    const activeSection =
      getExperienceSection(activeSectionId) ?? DEFAULT_EXPERIENCE_SECTION;
    const activeIndex = EXPERIENCE_SECTIONS.findIndex(
      (section) => section.id === activeSection.id
    );

    return {
      activeSectionId,
      activeIndex: Math.max(activeIndex, 0),
      activeTone: activeSection.tone,
      setActiveSection: setActiveSectionId,
    };
  }, [activeSectionId]);

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const context = useContext(ExperienceContext);

  if (!context) {
    throw new Error("useExperience must be used inside ExperienceProvider");
  }

  return context;
}

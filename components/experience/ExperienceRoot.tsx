"use client";

import { ReactNode } from "react";
import { ParticlesBackground } from "@/components/background/ParticlesBackground";
import { ExperienceBackdrop } from "./ExperienceBackdrop";
import { ExperienceProvider } from "./ExperienceProvider";
import { ScrollProgressRail } from "./ScrollProgressRail";

export function ExperienceRoot({ children }: { children: ReactNode }) {
  return (
    <ExperienceProvider>
      <main className="relative min-h-screen">
        <ExperienceBackdrop />
        <ParticlesBackground />
        <ScrollProgressRail />
        {children}
      </main>
    </ExperienceProvider>
  );
}

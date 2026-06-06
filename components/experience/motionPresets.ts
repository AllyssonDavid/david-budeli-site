import type { ExperienceTone } from "./config";

export const premiumEase: [number, number, number, number] = [
  0.23, 1, 0.32, 1,
];

export const experienceTones: Record<
  ExperienceTone,
  {
    glow: string;
    glowSoft: string;
    line: string;
    backdropA: string;
    backdropB: string;
    text: string;
  }
> = {
  blue: {
    glow: "rgba(59,130,246,0.15)",
    glowSoft: "rgba(96,165,250,0.07)",
    line: "rgba(96,165,250,0.68)",
    backdropA: "rgba(59,130,246,0.13)",
    backdropB: "rgba(139,92,246,0.08)",
    text: "#60A5FA",
  },
  violet: {
    glow: "rgba(139,92,246,0.14)",
    glowSoft: "rgba(99,102,241,0.07)",
    line: "rgba(167,139,250,0.62)",
    backdropA: "rgba(139,92,246,0.13)",
    backdropB: "rgba(59,130,246,0.08)",
    text: "#A78BFA",
  },
  green: {
    glow: "rgba(34,197,94,0.1)",
    glowSoft: "rgba(59,130,246,0.05)",
    line: "rgba(74,222,128,0.5)",
    backdropA: "rgba(34,197,94,0.085)",
    backdropB: "rgba(59,130,246,0.08)",
    text: "#4ADE80",
  },
};

export const tactileFeedback = {
  whileTap: {
    scale: 0.985,
    transition: { duration: 0.16, ease: premiumEase },
  },
};

"use client";

import { motion } from "framer-motion";
import { Github, Globe, Instagram, Mail, MessageCircle } from "lucide-react";
import { CONTACT_DATA } from "@/lib/constants";
import { premiumEase, tactileFeedback } from "@/components/experience/motionPresets";

const iconMap = {
  whatsapp: MessageCircle,
  instagram: Instagram,
  github: Github,
  website: Globe,
  email: Mail,
} as const;

export function FloatingContactDock() {
  return (
    <aside
      className="pointer-events-none fixed bottom-6 right-6 z-40 hidden justify-end md:flex"
      aria-label="Contatos rapidos"
    >
      <motion.div
        className="pointer-events-auto flex max-w-full items-center gap-1 border border-white/[0.08] bg-bg-0/70 p-1.5 shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.35, duration: 0.7, ease: premiumEase }}
      >
        {CONTACT_DATA.map((item) => {
          const Icon = iconMap[item.type as keyof typeof iconMap] ?? Mail;

          return (
            <motion.a
              key={item.type}
              href={item.href}
              target={item.type === "email" ? undefined : "_blank"}
              rel={item.type === "email" ? undefined : "noopener noreferrer"}
              aria-label={item.label}
              className="group flex h-10 w-10 items-center justify-center border border-white/[0.06] bg-white/[0.025] text-muted transition-colors duration-300 hover:border-accent/45 hover:bg-accent/10 hover:text-accent-bright min-[390px]:h-11 min-[390px]:w-11"
              whileHover={{ y: -2 }}
              whileTap={tactileFeedback.whileTap}
            >
              <Icon size={17} />
              <span className="pointer-events-none absolute bottom-full mb-2 hidden whitespace-nowrap border border-white/[0.08] bg-bg-0 px-2 py-1 font-mono-custom text-[0.55rem] uppercase tracking-[0.12em] text-muted opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-opacity group-hover:opacity-100 md:block">
                {item.label}
              </span>
            </motion.a>
          );
        })}
      </motion.div>
    </aside>
  );
}

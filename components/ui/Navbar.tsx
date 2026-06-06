"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { X, Menu } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        className={cn(
          "fixed left-0 top-0 z-[100] h-16 w-[100dvw] max-w-full px-4 sm:px-6 md:h-[72px] md:px-[5vw]",
          "flex items-center justify-between",
          "transition-colors duration-300",
          scrolled ? "border-b border-accent/15" : "border-b border-white/[0.04]"
        )}
        style={{
          background: "rgba(5,5,5,0.72)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Logo */}
        <Logo onClick={scrollToTop} />

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => scrollTo(item.href)}
                className={cn(
                  "relative font-body text-[0.82rem] font-medium tracking-[0.06em] uppercase",
                  "text-muted hover:text-ice transition-colors duration-300",
                  "group focus:outline-none"
                )}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.button
          onClick={() => scrollTo("#contato")}
          className={cn(
            "hidden md:flex items-center gap-2",
            "px-5 py-2 border border-accent/40 rounded-[3px]",
            "font-body text-[0.82rem] font-medium tracking-[0.06em] text-accent-bright",
            "hover:bg-accent/10 hover:border-accent hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]",
            "transition-all duration-300 focus:outline-none"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Conectar
        </motion.button>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex h-11 w-11 items-center justify-center border border-white/[0.08] text-ice focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-24 md:hidden"
            style={{
              background: "rgba(5,5,5,0.98)",
              backdropFilter: "blur(20px)",
            }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="absolute inset-0 grid-bg opacity-70 pointer-events-none" />
            <div className="relative flex flex-1 flex-col justify-center gap-3">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="group flex items-center justify-between border-b border-white/[0.06] py-5 text-left font-display text-[1.55rem] font-extrabold leading-none text-ice transition-colors hover:text-accent-bright"
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055 }}
                >
                  <span>{item.label}</span>
                  <span className="font-mono-custom text-[0.62rem] text-accent/40">
                    0{i + 1}
                  </span>
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={() => scrollTo("#contato")}
              className="relative mt-8 h-14 w-full border border-accent/45 bg-accent text-sm font-medium uppercase tracking-[0.12em] text-white transition-all hover:bg-accent-bright"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              Conectar
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

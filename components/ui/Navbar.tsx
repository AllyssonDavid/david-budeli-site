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
          "fixed top-0 left-0 right-0 z-[100] px-[5vw] h-[72px]",
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
          className="md:hidden text-ice p-1 focus:outline-none"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed top-[72px] left-0 right-0 z-[99] px-5 py-8 flex flex-col gap-6"
            style={{
              background: "rgba(5,5,5,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-left font-body text-lg font-medium tracking-wider uppercase text-muted hover:text-ice transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => scrollTo("#contato")}
              className="mt-2 px-5 py-3 border border-accent/40 text-accent-bright text-sm font-medium tracking-widest uppercase hover:bg-accent/10 transition-all"
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

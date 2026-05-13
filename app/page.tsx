"use client";

import { Navbar } from "@/components/ui/Navbar";
import HeroSection from "@/components/sections/hero/HeroSection";
import { SobreSection } from "@/components/sections/SobreSection";
import { EcossistemaSection } from "@/components/sections/EcossistemaSection";
import { MatrizSection } from "@/components/sections/MatrizSection";
import { ArquiteturasSection } from "@/components/sections/ArquiteturasSection";
import { StackSection } from "@/components/sections/StackSection";
import { ContatoSection } from "@/components/sections/ContatoSection";
import { Footer } from "@/components/ui/Footer";
import { ParticlesBackground } from "@/components/background/ParticlesBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ParticlesBackground />
      <Navbar />
      <HeroSection />
      <SobreSection />
      <EcossistemaSection />
      <MatrizSection />
      <ArquiteturasSection />
      <StackSection />
      <ContatoSection />
      <Footer />
    </main>
  );
}

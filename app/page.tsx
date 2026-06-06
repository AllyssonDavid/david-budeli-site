import { ExperienceRoot } from "@/components/experience/ExperienceRoot";
import { Navbar } from "@/components/ui/Navbar";
import HeroSection from "@/components/sections/hero/HeroSection";
import { SobreSection } from "@/components/sections/SobreSection";
import { EcossistemaSection } from "@/components/sections/EcossistemaSection";
import { MatrizSection } from "@/components/sections/MatrizSection";
import { ArquiteturasSection } from "@/components/sections/ArquiteturasSection";
import { StackSection } from "@/components/sections/StackSection";
import { ContatoSection } from "@/components/sections/ContatoSection";
import { Footer } from "@/components/ui/Footer";
import { FloatingContactDock } from "@/components/ui/FloatingContactDock";

export default function Home() {
  return (
    <ExperienceRoot>
      <Navbar />
      <HeroSection />
      <SobreSection />
      <EcossistemaSection />
      <MatrizSection />
      <ArquiteturasSection />
      <StackSection />
      <ContatoSection />
      <Footer />
      <FloatingContactDock />
    </ExperienceRoot>
  );
}

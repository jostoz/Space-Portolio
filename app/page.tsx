"use client";
import Encryption from "@/components/main/Encryption";
import Hero from "@/components/main/Hero";
import DynamicCarousel from "@/components/portfolio/DynamicCarousel";
import AnimatedSkills from "@/components/main/AnimatedSkills";
import ProfessionalHighlights from "@/components/main/ProfessionalHighlights";
import Achievements from "@/components/main/Achievements";
import Contact from "@/components/main/Contact";
import SectionTransition from "@/components/layout/SectionTransition";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col">
        <Hero />
        
        <SectionTransition>
          <AnimatedSkills />
        </SectionTransition>
        
        <SectionTransition>
          <Encryption />
        </SectionTransition>
        
        <SectionTransition>
          <DynamicCarousel />
        </SectionTransition>
        
        <SectionTransition>
          <ProfessionalHighlights />
        </SectionTransition>
        
        <SectionTransition>
          <Achievements />
        </SectionTransition>
        
        <SectionTransition>
          <Contact />
        </SectionTransition>
      </div>
    </main>
  );
}

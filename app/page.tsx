"use client";
import Encryption from "@/components/main/Encryption";
import Hero from "@/components/main/Hero";
import Portfolio from "@/components/main/Portfolio";
import Skills from "@/components/main/Skills";
import ProfessionalHighlights from "@/components/main/ProfessionalHighlights";
import Achievements from "@/components/main/Achievements";
import Contact from "@/components/main/Contact";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <Encryption />
        <Portfolio />
        <ProfessionalHighlights />
        <Achievements />
        <Contact />
      </div>
    </main>
  );
}

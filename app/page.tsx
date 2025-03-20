import Encryption from "@/components/main/Encryption";
import Hero from "@/components/main/Hero";
import Projects from "@/components/main/Projects";
import Skills from "@/components/main/Skills";
import WhyFXperto from "@/components/main/WhyFXperto";
import Contact from "@/components/main/Contact";
import Image from "next/image";
import StarBackground from "@/components/main/StarBackground";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <Encryption />
        <Projects />
        <WhyFXperto />
        <Contact />
      </div>
    </main>
  );
}

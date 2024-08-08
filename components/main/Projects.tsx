import React from "react";
import ProjectCard from "../sub/ProjectCard";

const Projects = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="projects"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        Tattoo Art Portfolio
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
        <ProjectCard
          src="/NextWebsite.png"
          title="Custom Tattoo Designs"
          description="Explore unique and personalized tattoo designs tailored to your style."
        />
        <ProjectCard
          src="/CardImage.png"
          title="Tattoo Artistry"
          description="Discover the art of tattooing and the process of creating a custom piece."
        />
        <ProjectCard
          src="/SpaceWebsite.png"
          title="Tattoo Culture"
          description="Delve into the world of tattoo culture and its significance in modern society."
        />
      </div>
    </div>
  );
};

export default Projects;

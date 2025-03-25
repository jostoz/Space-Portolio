import React from "react";
import { 
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  PhotoIcon
} from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <div className="w-full h-full bg-transparent text-gray-200 shadow-lg p-[15px]">
      <div className="w-full flex flex-col items-center justify-center m-auto">
        <div className="w-full h-full flex flex-row items-center justify-around flex-wrap">
          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <div className="font-bold text-[16px]">Comunidad</div>
            <a href="https://discord.gg/" target="_blank" className="flex flex-row items-center my-[15px] cursor-pointer">
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
              <span className="text-[15px] ml-[6px]">Discord</span>
            </a>
          </div>
          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <div className="font-bold text-[16px]">Desarrollo</div>
            <a href="https://github.com/" target="_blank" className="flex flex-row items-center my-[15px] cursor-pointer">
              <CodeBracketIcon className="h-6 w-6" />
              <span className="text-[15px] ml-[6px]">GitHub</span>
            </a>
          </div>
          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <div className="font-bold text-[16px]">Social</div>
            <a href="https://instagram.com/" target="_blank" className="flex flex-row items-center my-[15px] cursor-pointer">
              <PhotoIcon className="h-6 w-6" />
              <span className="text-[15px] ml-[6px]">Instagram</span>
            </a>
          </div>
        </div>
        
        <div className="mb-[20px] text-[15px] text-center">
          &copy; TutorAI 2024. Todos los derechos reservados.
        </div>
      </div>
    </div>
  );
};

export default Footer;

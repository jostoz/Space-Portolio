import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        <a
          href="#home"
          className="h-auto w-auto flex flex-row items-center"
        >
          <span className="font-bold text-2xl text-white">
            FXperto
          </span>
        </a>

        <div className="w-[500px] h-full flex flex-row items-center justify-between md:mr-20">
          <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
            <a href="#home" className="cursor-pointer">
              Inicio
            </a>
            <a href="#features" className="cursor-pointer">
              Características
            </a>
            <a href="#why-fxperto" className="cursor-pointer">
              ¿Por qué FXperto?
            </a>
            <a href="#contact" className="cursor-pointer">
              Contacto
            </a>
          </div>
        </div>

        <div className="flex flex-row gap-5">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all">
            Iniciar Sesión
          </button>
          <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-2 px-4 rounded-full transition-all">
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

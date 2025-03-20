"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#030014] text-white">
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-4">
        Algo salió mal
      </h1>
      <p className="text-gray-400 text-lg mb-8">
        Lo sentimos, ha ocurrido un error inesperado.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity"
      >
        Intentar de nuevo
      </button>
    </div>
  );
} 
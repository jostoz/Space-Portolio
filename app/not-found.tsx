export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#030014] text-white">
      <div className="text-center">
        <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-4">
          404 - Página no encontrada
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Lo sentimos, la página que buscas no existe.
        </p>
        <a
          href="/"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
} 
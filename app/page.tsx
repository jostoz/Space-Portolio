import Image from "next/image";
import StarBackground from "@/components/main/StarBackground";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative">
      <StarBackground />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            FXperto
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-4">
            Domina el mercado de divisas con datos en tiempo real y estrategias probadas
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            La plataforma que transforma la gestión de divisas empresariales, reduciendo riesgos y maximizando oportunidades
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all">
              Comienza Gratis
            </button>
            <button className="border-2 border-blue-600 text-blue-400 hover:bg-blue-600/10 font-bold py-3 px-8 rounded-full transition-all">
              Ver Demo
            </button>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section id="features" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Potencia tu Estrategia Cambiaria</h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-2xl mx-auto">
            Herramientas avanzadas diseñadas para optimizar cada operación de divisas
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "📊",
                title: "Análisis en Tiempo Real",
                description: "Toma decisiones informadas con datos actualizados al segundo y análisis técnico avanzado."
              },
              {
                icon: "🚨",
                title: "Alertas Inteligentes",
                description: "Nunca pierdas una oportunidad con alertas personalizadas basadas en tus objetivos."
              },
              {
                icon: "📅",
                title: "Planificación Estratégica",
                description: "Identifica los mejores momentos para operar con análisis predictivo y tendencias de mercado."
              },
              {
                icon: "🔎",
                title: "Asesoría Experta",
                description: "Accede a consultoría especializada para desarrollar estrategias de cobertura efectivas."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl hover:transform hover:scale-105 transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why FXperto */}
      <section id="why-fxperto" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">¿Por qué elegir FXperto?</h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-2xl mx-auto">
            La plataforma preferida por profesionales financieros para la gestión de divisas
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: "✅",
                title: "Ventaja Competitiva",
                description: "Accede a información privilegiada y análisis de mercado antes que la competencia."
              },
              {
                icon: "✅",
                title: "Decisiones Basadas en Datos",
                description: "Elimina la especulación con análisis fundamentado y métricas probadas."
              },
              {
                icon: "✅",
                title: "Transparencia Total",
                description: "Sin comisiones ocultas ni conflictos de interés. Tu éxito es nuestra prioridad."
              },
              {
                icon: "✅",
                title: "Innovación Continua",
                description: "Actualizaciones constantes con las últimas tecnologías y tendencias del mercado."
              }
            ].map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4 bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl">
                <div className="text-2xl">{benefit.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Transforma tu Gestión de Divisas Hoy</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a miles de profesionales que ya optimizan sus operaciones con FXperto
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all">
              Prueba Gratis
            </button>
            <button className="border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-full transition-all">
              Agenda una Demo
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

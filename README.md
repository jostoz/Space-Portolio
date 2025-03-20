# FXperto - Plataforma de Gestión de Divisas

## Descripción
FXperto es una plataforma moderna para la gestión de divisas empresariales, ofreciendo herramientas avanzadas de análisis y seguimiento de mercados financieros.

## Requisitos Previos
- Node.js 18.0.0 o superior
- npm (viene con Node.js)
- Git

## Instalación Local

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/fxperto.git
cd fxperto
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo .env.local:
```bash
cp .env.example .env.local
```

4. Ejecutar en desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## Despliegue en Vercel

1. Crear una cuenta en [Vercel](https://vercel.com)
2. Conectar con el repositorio de GitHub
3. Configurar las variables de entorno en el panel de Vercel
4. Desplegar

El despliegue se realizará automáticamente con cada push a la rama principal.

## Estructura del Proyecto

```
fxperto/
├── app/               # Páginas y componentes de la aplicación
├── components/        # Componentes reutilizables
├── public/           # Archivos estáticos
├── utils/            # Utilidades y funciones auxiliares
└── ...
```

## Tecnologías Utilizadas

- Next.js 13
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Heroicons

## Características

- ⚡️ Desarrollo rápido con Next.js
- 🎨 Diseño moderno con Tailwind CSS
- 🔄 Animaciones suaves con Framer Motion
- 📱 Diseño responsive
- 🌐 SEO optimizado
- 🔒 Seguridad mejorada

## Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

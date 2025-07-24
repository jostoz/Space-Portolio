# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev       # Start development server on http://localhost:3000
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
```

### Git Workflow
```bash
# Main branch is 'main' (not master)
git checkout main
git pull origin main
```

## Architecture

This is a Next.js 13+ application using the App Router pattern with TypeScript and Tailwind CSS.

### Key Technologies
- **Framework**: Next.js 13.5.6 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom animations
- **Animation**: Framer Motion for complex animations
- **3D Graphics**: Three.js via @react-three/fiber

### Project Structure
- `app/` - Next.js 13 App Router pages and layouts
- `components/main/` - Major page sections (Hero, Skills, Projects, etc.)
- `components/sub/` - Reusable sub-components
- `constants/` - Data constants and configuration
- `utils/` - Utility functions (animation variants, etc.)

### Important Patterns
1. **Client Components**: Use `"use client"` directive for interactive components
2. **Path Aliases**: Use `@/` for imports (e.g., `@/components/main/Hero`)
3. **Metadata**: Use Next.js Metadata API in page.tsx files
4. **Animation**: Framer Motion variants are defined in `utils/motion.ts`
5. **TypeScript**: Strict mode is enabled - ensure proper typing

### Component Architecture
- Main components handle full sections and are composed in pages
- Sub components are smaller, reusable pieces
- All interactive components must have `"use client"` directive
- StarBackground component provides the animated background effect

### Build Configuration
- TypeScript errors are ignored during build (`ignoreBuildErrors: true`)
- ESLint errors are ignored during build (`ignoreDuringBuilds: true`)
- Images are unoptimized (`unoptimized: true`)
- React Strict Mode is enabled

### Development Tips
- The project uses Node 18+ features
- No test framework is configured
- Tailwind classes use custom animations defined in `tailwind.config.js`
- The project was originally a portfolio template adapted for FXperto (financial services)
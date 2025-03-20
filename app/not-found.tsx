import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - No encontrado',
}

export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#030014',
      color: 'white',
      textAlign: 'center'
    }}>
      <h2 style={{
        fontSize: '40px',
        background: 'linear-gradient(to right, #9333ea, #06b6d4)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>404 - Página no encontrada</h2>
      <p style={{
        color: '#9ca3af',
        marginBottom: '2rem'
      }}>Lo sentimos, la página que buscas no existe.</p>
      <a
        href="/"
        style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '9999px',
          background: 'linear-gradient(to right, #9333ea, #06b6d4)',
          color: 'white',
          fontWeight: '500'
        }}
      >
        Volver al inicio
      </a>
    </div>
  )
} 
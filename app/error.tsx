"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
      }}>Algo salió mal</h2>
      <p style={{
        color: '#9ca3af',
        marginBottom: '2rem'
      }}>Lo sentimos, ha ocurrido un error.</p>
      <button
        onClick={() => reset()}
        style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '9999px',
          background: 'linear-gradient(to right, #9333ea, #06b6d4)',
          color: 'white',
          fontWeight: '500',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Intentar de nuevo
      </button>
    </div>
  )
} 
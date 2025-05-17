import React, { useState, useEffect } from 'react';

function App() {
  const [showCalendly, setShowCalendly] = useState(false);
  
  // Cargar script de Calendly
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
  // Estilos en línea para evitar problemas con PostCSS
  const styles = {
    container: {
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    video: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: -1
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      zIndex: 0
    },
    content: {
      textAlign: 'center',
      color: 'white',
      zIndex: 1,
      position: 'relative'
    },
    title: {
      fontSize: '5rem',
      marginBottom: '2rem',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      fontFamily: 'Arial, sans-serif' // Solo cambiamos la fuente del título a Arial
    },
    button: {
      padding: '1rem 2.5rem',
      fontSize: '1.2rem',
      backgroundColor: '#d63384',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      // Mantenemos la fuente original para el botón
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '10px',
      width: '90%',
      maxWidth: '800px',
      height: '80%',
      position: 'relative',
      overflow: 'hidden'
    },
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      fontSize: '24px',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#333',
      cursor: 'pointer',
      zIndex: 1001
    }
  };
  
  return (
    <div style={styles.container}>
      {/* Video de fondo */}
      <video 
        style={styles.video}
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="/video1.mp4" type="video/mp4" />
        Tu navegador no soporta el tag de video.
      </video>
      
      {/* Overlay */}
      <div style={styles.overlay}></div>
      
      {/* Contenido */}
      <div style={styles.content}>
        <h1 style={styles.title}>Salon Hair Fashion</h1>
        <button 
          style={styles.button}
          onClick={() => setShowCalendly(true)}
        >
          Appointments
        </button>
      </div>
      
      {/* Modal de Calendly */}
      {showCalendly && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <button 
              style={styles.closeButton}
              onClick={() => setShowCalendly(false)}
            >
              ×
            </button>
            <div 
              className="calendly-inline-widget"
              data-url="https://calendly.com/tu-usuario/servicio-salon-hair"
              style={{ minWidth: '320px', height: '100%' }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
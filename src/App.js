import React, { useState, useEffect } from 'react';

function App() {
  const [showCalendly, setShowCalendly] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Cargar el script de Calendly cuando se abra el modal
  useEffect(() => {
    if (showCalendly && !calendlyLoaded) {
      if (!document.querySelector('script[src*="calendly"]')) {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        script.onload = () => {
          setCalendlyLoaded(true);
          console.log('Calendly script loaded');
          setTimeout(() => {
            initializeCalendlyWidget();
          }, 200);
        };
        document.head.appendChild(script);
      } else {
        setCalendlyLoaded(true);
        setTimeout(() => {
          initializeCalendlyWidget();
        }, 200);
      }
    }
  }, [showCalendly, calendlyLoaded]);

  const initializeCalendlyWidget = () => {
    const widgetEl = document.querySelector('.calendly-inline-widget');
    if (widgetEl && window.Calendly) {
      console.log('Inicializando Calendly widget');
      widgetEl.innerHTML = '';
      
      if (window.Calendly.initInlineWidget) {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/hibyeworld/virtual-shop-visit',
          parentElement: widgetEl
        });
      }
    } else {
      console.log('Widget element o Calendly no disponible');
    }
  };

  useEffect(() => {
    if (showCalendly && calendlyLoaded) {
      setTimeout(() => {
        initializeCalendlyWidget();
      }, 300);
    }
  }, [windowWidth, showCalendly, calendlyLoaded]);

  // Manejar errores de video - LIMPIO sin botón
  const handleVideoError = (e) => {
    console.log('Error loading video:', e);
    console.log('Error code:', e.target.error?.code);
    console.log('Error message:', e.target.error?.message);
    setVideoError(true);
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    setVideoLoaded(true);
    setVideoError(false);
    
    // Intentar reproducir automáticamente
    const video = document.querySelector('video');
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('Video playing automatically');
        }).catch(error => {
          console.log('Autoplay prevented (normal in iOS):', error);
        });
      }
    }
  };
  
  const isMobile = windowWidth <= 768;
  
  const styles = {
    container: {
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '1rem' : '0',
      backgroundColor: '#1a1a1a' // Fallback si no carga el video
    },
    video: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 1,
      opacity: videoLoaded && !videoError ? 1 : 0,
      transition: 'opacity 0.5s ease'
    },
    fallbackBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      zIndex: -2
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      zIndex: 2
    },
    content: {
      textAlign: 'center',
      color: 'white',
      zIndex: 3,
      position: 'relative',
      width: '100%',
      maxWidth: isMobile ? '100%' : '80%',
      padding: isMobile ? '1rem' : '2rem'
    },
    title: {
      fontSize: isMobile ? '2.5rem' : '5rem',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      fontFamily: 'Arial, sans-serif',
      lineHeight: 1.1
    },
    button: {
      padding: isMobile ? '0.8rem 2rem' : '1rem 2.5rem',
      fontSize: isMobile ? '1rem' : '1.4rem',
      backgroundColor: 'rgb(64, 214, 51)',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      touchAction: 'manipulation'
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
      zIndex: 1000,
      padding: isMobile ? '0.5rem' : '1rem'
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: isMobile ? '8px' : '10px',
      width: '100%',
      maxWidth: isMobile ? '100%' : '900px',
      height: isMobile ? '98%' : '85%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    },
    modalHeader: {
      padding: isMobile ? '0.8rem' : '1rem',
      borderBottom: '1px solid #eee',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      borderRadius: isMobile ? '8px 8px 0 0' : '10px 10px 0 0'
    },
    modalTitle: {
      margin: 0,
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      color: '#333',
      fontFamily: 'Arial, sans-serif'
    },
    closeButton: {
      fontSize: isMobile ? '28px' : '24px',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#666',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '50%',
      width: isMobile ? '44px' : '40px',
      height: isMobile ? '44px' : '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.2s',
      touchAction: 'manipulation'
    },
    calendlyContainer: {
      flex: 1,
      padding: isMobile ? '0.5rem' : '1rem',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: isMobile ? '400px' : '600px'
    },
    loadingMessage: {
      textAlign: 'center',
      color: '#666',
      fontSize: '1.1rem',
      fontFamily: 'Arial, sans-serif'
    }
  };
  
  return (
    <div style={styles.container}>
      {/* Fondo de respaldo si el video no carga */}
      <div style={styles.fallbackBackground}></div>
      
      <video 
        style={styles.video}
        autoPlay
        muted 
        loop 
        playsInline
        webkit-playsinline="true"
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        preload="metadata"
      >
        {/* Versión combinada - probará iOS-compatible primero, luego normal */}
        <source src="/video1-ios-compatible.mp4" type="video/mp4; codecs=avc1.42E01E,mp4a.40.2" />
        <source src="/video1.mp4" type="video/mp4" />
        Tu navegador no soporta el tag de video.
      </video>
      
      <div style={styles.overlay}></div>
      
      <div style={styles.content}>
        <h1 style={styles.title}>Servicio Hair Fashion</h1>
        <button 
          style={styles.button}
          onClick={() => setShowCalendly(true)}
        >
          Appointments
        </button>
      </div>
      
      {showCalendly && (
        <div style={styles.modal} onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowCalendly(false);
          }
        }}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {isMobile ? 'Reserva tu cita' : 'Reserva tu cita - Virtual Shop Visit'}
              </h2>
              <button 
                style={styles.closeButton}
                onClick={() => setShowCalendly(false)}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                ×
              </button>
            </div>
            <div style={styles.calendlyContainer}>
              {calendlyLoaded ? (
                <div 
                  className="calendly-inline-widget" 
                  data-url="https://calendly.com/hibyeworld/virtual-shop-visit"
                  style={{ 
                    minWidth: isMobile ? '280px' : '320px', 
                    height: isMobile ? '500px' : '600px', 
                    width: '100%' 
                  }}
                ></div>
              ) : (
                <div style={styles.loadingMessage}>
                  Cargando calendario... Por favor espera un momento.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
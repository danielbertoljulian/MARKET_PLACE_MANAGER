'use client';

import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(window.innerWidth <= 768);
    const handler = () => setMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const openWhatsApp = () => {
    window.open('https://wa.me/5551981090966?text=Olá! Gostaria de mais informações sobre o Market Place Manager.', '_blank');
  };

  return (
    <section id="home" style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '80px',
      background: 'radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.05) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(124, 58, 237, 0.05) 0%, transparent 40%)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        zIndex: 2
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div className="float" style={{ 
            display: 'inline-block', 
            background: 'var(--gradient-primary)', 
            color: 'white', 
            padding: '0.4rem 1.2rem', 
            borderRadius: '99px', 
            fontSize: '0.85rem', 
            fontWeight: 700,
            marginBottom: '1.5rem',
            boxShadow: '0 4px 15px rgba(37, 99, 235, 0.2)'
          }}>
            Descubra o que está em alta.
          </div>

          <h1 style={{
            fontSize: mobile ? '2.5rem' : '4.5rem',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            color: 'var(--color-text-main)',
            fontWeight: 800
          }}>
            Descubra produtos que <span className="text-gradient">facilitam sua vida.</span>
          </h1>
          
          <p style={{
            fontSize: mobile ? '1.1rem' : '1.25rem',
            color: 'var(--color-text-muted)',
            marginBottom: '3rem',
            fontWeight: 400,
            maxWidth: '600px',
            margin: '0 auto 3rem auto'
          }}>
            Moda, beleza, utilidades, ferramentas e muito mais. Tudo em um só lugar. Os produtos mais desejados, reunidos para você.
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#produtos" className="btn-premium" style={{ textDecoration: 'none', display: 'inline-block' }}>Explorar Produtos</a>
            <button onClick={openWhatsApp} style={{
              background: 'white',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-main)',
              padding: '0.8rem 2.5rem',
              borderRadius: '99px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'var(--transition-smooth)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-brand)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >Falar no Whats</button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div style={{
        position: 'absolute', top: '15%', right: '5%', width: '120px', height: '120px',
        background: 'var(--gradient-primary)', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        filter: 'blur(60px)', opacity: 0.15, zIndex: 1
      }}></div>
      <div style={{
        position: 'absolute', bottom: '15%', left: '5%', width: '150px', height: '150px',
        background: 'var(--color-brand-purple)', borderRadius: '50%',
        filter: 'blur(80px)', opacity: 0.1, zIndex: 1
      }}></div>
    </section>
  );
};

export default Hero;

'use client';

import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [mobile, setMobile] = useState(false);
  
  useEffect(() => {
    setMobile(window.innerWidth <= 768);
    const handler = () => setMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const openWhatsApp = (msg) => {
    window.open(`https://wa.me/5551981090966?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="contato" className="section-padding" style={{ background: 'var(--color-white)' }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'minmax(300px, 450px) 1fr',
        gap: mobile ? '3rem' : '5rem'
      }}>
        <div>
          <h2 className="section-title" style={{ textAlign: mobile ? 'center' : 'left', marginBottom: '2rem' }}>
            <span>Fale Conosco</span>
            Dúvidas ou Sugestões?
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', textAlign: mobile ? 'center' : 'left', fontSize: '1.1rem' }}>
            Nossa equipe está pronta para te ajudar. Seja sobre um pedido, um produto ou apenas para dar um oi.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: mobile ? 'center' : 'flex-start' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gradient-primary)', color: 'white', fontSize: '1.5rem', boxShadow: '0 8px 16px rgba(37, 99, 235, 0.2)' }}>
                📍
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', color: 'var(--color-text-main)' }}>Centro de Distribuição</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Av. das Tendências, 100 — Log Box — São Paulo/SP</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gradient-primary)', color: 'white', fontSize: '1.5rem', boxShadow: '0 8px 16px rgba(37, 99, 235, 0.2)' }}>
                📱
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', color: 'var(--color-text-main)' }}>WhatsApp TrendBox</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', cursor: 'pointer' }}
                  onClick={() => openWhatsApp('Olá! Tenho uma dúvida sobre a TrendBox.')}>
                  (11) 99999-8888
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ 
          background: 'var(--color-bg-soft)', 
          padding: mobile ? '2rem' : '3rem', 
          borderRadius: '24px',
          border: '1px solid var(--color-border)'
        }}>
          <form onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.target);
            const nome = data.get('nome') || '--';
            const email = data.get('email') || '--';
            const mensagem = data.get('mensagem') || '--';
            const texto = `Olá! Vim pelo site TrendBox.%0A%0A*Nome:* ${nome}%0A*E-mail:* ${email}%0A*Mensagem:* ${mensagem}`;
            window.open(`https://wa.me/5551981090966?text=${texto}`, '_blank');
          }} style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
              <input name="nome" type="text" placeholder="Seu Nome" required style={{
                background: 'white',
                border: '1px solid var(--color-border)',
                padding: '1rem',
                color: 'var(--color-text-main)',
                borderRadius: '12px',
                outline: 'none',
                fontSize: '0.9rem'
              }} />
              <input name="email" type="email" placeholder="Seu melhor e-mail" required style={{
                background: 'white',
                border: '1px solid var(--color-border)',
                padding: '1rem',
                color: 'var(--color-text-main)',
                borderRadius: '12px',
                outline: 'none',
                fontSize: '0.9rem'
              }} />
            </div>
            <textarea name="mensagem" placeholder="Como podemos te ajudar hoje?" rows="4" required style={{
              background: 'white',
              border: '1px solid var(--color-border)',
              padding: '1rem',
              color: 'var(--color-text-main)',
              borderRadius: '12px',
              outline: 'none',
              resize: 'none',
              fontSize: '0.9rem'
            }}></textarea>
            <button type="submit" className="btn-premium" style={{ width: '100%', padding: '1rem' }}>Enviar Mensagem</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

'use client';

import React, { useState, useEffect } from 'react';

const Navbar = ({ cartCount, onCartClick }) => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setMobile(mq.matches);
    const handler = (e) => setMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const CartButton = () => (
    <button onClick={onCartClick} style={{
      background: 'transparent', border: '1px solid var(--color-brand)',
      color: 'var(--color-brand)', padding: mobile ? '0.33rem 0.55rem' : '0.66rem 1.32rem',
      borderRadius: '8px', fontWeight: 700, cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: '0.3rem',
      position: 'relative', fontSize: mobile ? '1.1rem' : '0.99rem', flexShrink: 0,
      lineHeight: 1,
      transition: 'all 0.3s ease'
    }}>
      🛒
      {cartCount > 0 && (
        <span style={{
          background: '#ef4444', color: 'white', borderRadius: '50%',
          width: mobile ? '18px' : '22px', height: mobile ? '18px' : '22px',
          fontSize: mobile ? '0.6rem' : '0.77rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700
        }}>{cartCount}</span>
      )}
    </button>
  );

  return (
    <nav className="glass" style={{
      position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
      padding: mobile ? '0.5rem 0' : '1rem 0', transition: 'var(--transition-smooth)',
      background: 'rgba(255, 255, 255, 0.95)',
      overflowX: mobile ? 'hidden' : 'visible',
      borderBottom: '1px solid var(--color-border)'
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: mobile ? '0.5rem' : '2rem',
        maxWidth: mobile ? '100%' : '1200px',
        margin: '0 auto',
        padding: mobile ? '0 1rem' : '0 2rem',
        boxSizing: 'border-box'
      }}>

        {mobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0, width: '100%', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div style={{
                background: 'var(--gradient-primary)',
                width: '32px', height: '32px', borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 800, fontSize: '1.2rem'
              }}>T</div>
              <div style={{
                display: 'flex', fontSize: '1.2rem', fontWeight: 800,
                fontFamily: 'var(--font-heading)', letterSpacing: '-0.5px'
              }}>
                <span style={{ color: 'var(--color-brand)' }}>Trend</span>
                <span style={{ color: 'var(--color-text-main)' }}>Box</span>
              </div>
            </div>
            <CartButton />
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexShrink: 0, cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div style={{
                background: 'var(--gradient-primary)',
                width: '40px', height: '40px', borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 800, fontSize: '1.5rem',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
              }}>T</div>
              <div style={{
                display: 'flex', fontSize: '1.8rem', fontWeight: 800,
                fontFamily: 'var(--font-heading)', letterSpacing: '-1px'
              }}>
                <span style={{ color: 'var(--color-brand)' }}>Trend</span>
                <span style={{ color: 'var(--color-text-main)' }}>Box</span>
              </div>
            </div>
            <ul style={{
              display: 'flex', gap: '2rem', listStyle: 'none',
              fontSize: '0.9rem', fontWeight: 600,
              margin: 0, padding: 0, whiteSpace: 'nowrap', marginLeft: 'auto'
            }}>
              {[
                { href: 'home', label: 'Início' },
                { href: 'produtos', label: 'E-commerce' },
                { href: 'categorias', label: 'Departamentos' },
                { href: 'contato', label: 'Suporte' },
              ].map(item => (
                <li key={item.href}>
                  <a href={`#${item.href}`} className="nav-link" style={{ color: 'var(--color-text-main)' }}>{item.label}</a>
                </li>
              ))}
            </ul>
            <CartButton />
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;

'use client';

import React, { useState, useEffect } from 'react';

function getFirstImage(p) {
  if (p.images) {
    try { const arr = JSON.parse(p.images); if (Array.isArray(arr) && arr.length > 0) return arr[0]; } catch { }
  }
  return p.image || '';
}

const CartModal = ({ cart, onClose, onRemove, onClear, addToCart, decrementCart }) => {
  const [mobile, setMobile] = useState(false);
  
  useEffect(() => {
    setMobile(window.innerWidth <= 768);
    const handler = () => setMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflowY = 'hidden';
    return () => {
      document.documentElement.style.overflowY = '';
    };
  }, []);

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  const handleConsultation = () => {
    const lines = cart.map((item, idx) =>
      `${idx + 1}. ${item.product.name} — ${item.product.brand || ''} (${item.quantity} unid.)`
    );
    const msg = encodeURIComponent(
      `Olá! Tenho interesse nos seguintes itens da TrendBox:\n\n${lines.join('\n')}\n`
    );
    window.open(`https://wa.me/5551981090966?text=${msg}`, '_blank');
    onClear();
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(15, 23, 42, 0.4)', zIndex: 2000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
      backdropFilter: 'blur(8px)'
    }} onClick={onClose}>
      <div style={{
        maxWidth: '550px', width: '100%', borderRadius: '24px', background: 'white',
        padding: mobile ? '1.5rem' : '2.5rem', position: 'relative', maxHeight: '85vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 30px 60px rgba(0,0,0,0.15)', border: '1px solid var(--color-border)'
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '1.5rem', right: '1.5rem',
          background: 'var(--color-bg-soft)', border: 'none', color: 'var(--color-text-main)',
          fontSize: '1.2rem', cursor: 'pointer', width: '36px', height: '36px',
          borderRadius: '50%', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>×</button>

        <h2 style={{ color: 'var(--color-text-main)', marginBottom: '1.5rem', fontSize: '1.6rem', fontWeight: 800 }}>Meu Carrinho ({totalItems})</h2>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
             <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛍️</div>
             <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Seu carrinho está vazio.</p>
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '2rem' }}>
            {cart.map(item => (
              <div key={item.product.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem 0', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '12px', background: 'var(--color-bg-soft)', flexShrink: 0, overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                    <img src={getFirstImage(item.product)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ color: 'var(--color-text-main)', fontSize: '0.95rem', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.product.name}</strong>
                  <small style={{ color: 'var(--color-brand)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>{item.product.brand || 'Premium'}</small>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-bg-soft)', borderRadius: '99px', padding: '0.2rem' }}>
                  <button onClick={() => decrementCart(item.product)} style={{ background: 'none', border: 'none', color: 'var(--color-text-main)', fontSize: '1.1rem', cursor: 'pointer', width: '2rem', height: '2rem' }}>−</button>
                  <span style={{ minWidth: '1.2rem', textAlign: 'center', fontWeight: 800, fontSize: '0.9rem' }}>{item.quantity}</span>
                  <button onClick={() => addToCart(item.product)} style={{ background: 'none', border: 'none', color: 'var(--color-text-main)', fontSize: '1.1rem', cursor: 'pointer', width: '2rem', height: '2rem' }}>+</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', flexDirection: mobile ? 'column' : 'row' }}>
          <button onClick={onClose}
            style={{ flex: 1, background: 'white', border: '1px solid var(--color-border)', color: 'var(--color-text-main)', padding: '1rem', borderRadius: '14px', fontWeight: 700, cursor: 'pointer', transition: '0.3s' }}>
            Continuar Compras
          </button>
          <button className="btn-premium" onClick={handleConsultation} disabled={cart.length === 0} style={{ flex: 1, borderRadius: '14px' }}>
            Finalizar via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;

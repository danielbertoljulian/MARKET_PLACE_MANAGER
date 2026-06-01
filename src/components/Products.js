'use client';

import React, { useState, useEffect, useRef } from 'react';

function getImageList(p) {
  if (p.images) {
    try {
      const arr = JSON.parse(p.images);
      if (Array.isArray(arr) && arr.length > 0) return arr;
    } catch {}
  }
  return p.image ? [p.image] : [];
}

function getFirstImage(p) {
  const list = getImageList(p);
  return list[0] || '';
}

function isValidSrc(src) {
  if (!src) return false;
  return src.startsWith('data:image/') || src.startsWith('http') || src.startsWith('/');
}

const Products = ({ onSelectProduct, filterCategory, addToCart }) => {
  const [mobile, setMobile] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(filterCategory || 'all');
  const [brand, setBrand] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [copiedId, setCopiedId] = useState(null);
  const fetched = useRef(false);
  const cardRefs = useRef({});
  
  useEffect(() => {
    setMobile(window.innerWidth <= 768);
    const handler = () => setMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const brandList = [...new Set(products.map(p => p.brand))];
  const perPage = 12;
  const filtered = products
    .filter(p => {
      const catMatch = category === 'all' || (p.categories || '').includes(category);
      const brandMatch = !brand || p.brand === brand;
      const searchMatch = p.name.toLowerCase().includes(search.toLowerCase());
      return catMatch && brandMatch && searchMatch;
    });
  
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetch('/api/products')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data && data.length) setProducts(data); })
      .catch(err => console.error('Erro ao carregar produtos:', err));
  }, []);

  const handleCategoryChange = (cat) => { setCategory(cat); setPage(1); };
  const handleBrandChange = (e) => { setBrand(e.target.value); setPage(1); };
  const handleSearch = (e) => { setSearch(e.target.value); setPage(1); };

  return (
    <section id="produtos" className="section-padding">
      <div className="container">
        <h2 className="section-title"><span>Descubra as</span>Novidades em Alta</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {Object.entries({ 
              all: 'Todos', 
              beleza: 'Beleza', 
              moda: 'Moda', 
              casa: 'Casa', 
              ferramentas: 'Ferramentas',
              gadgets: 'Gadgets',
              ofertas: 'Ofertas'
            }).map(([key, label]) => (
              <button key={key} onClick={() => handleCategoryChange(key)}
                className={category === key ? 'btn-premium' : ''}
                style={category !== key ? { background: 'white', border: '1px solid var(--color-border)', color: 'var(--color-text-main)', padding: '0.6rem 1.4rem', borderRadius: '99px', cursor: 'pointer', fontSize: '0.85rem', transition: 'var(--transition-smooth)', fontWeight: 600 } : { padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}
              >{label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            <select value={brand} onChange={handleBrandChange} style={{ background: 'white', border: '1px solid var(--color-border)', padding: '0.6rem 1rem', color: 'var(--color-text-main)', borderRadius: '12px', fontSize: '0.85rem', outline: 'none' }}>
              <option value="">Todas as Marcas</option>
              {brandList.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <input type="text" placeholder="O que você está buscando?" value={search} onChange={handleSearch} style={{ background: 'white', border: '1px solid var(--color-border)', padding: '0.6rem 1rem', color: 'var(--color-text-main)', borderRadius: '12px', fontSize: '0.85rem', minWidth: '280px', outline: 'none' }} />
          </div>
        </div>
        
        {paginated.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Estamos preparando novidades incríveis para este departamento.</p>
          </div>
        )}
        
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {paginated.map(product => (
            <div key={product.id} className="card" onClick={() => onSelectProduct(product)}
              style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ height: '240px', overflow: 'hidden', background: '#f1f5f9', position: 'relative' }}>
                {(() => {
                  const src = getFirstImage(product);
                  return isValidSrc(src)
                    ? <img src={src} alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        loading="lazy"
                      />
                    : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2e8f0', color: '#94a3b8', fontSize: '2rem' }}>TrendBox</div>;
                })()}
                {product.off && parseInt(product.off) > 0 && (
                  <span style={{ position: 'absolute', top: '15px', left: '15px', background: '#ef4444', color: 'white', padding: '4px 12px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 800, boxShadow: '0 4px 10px rgba(239, 68, 68, 0.2)' }}>{product.off}% OFF</span>
                )}
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ flex: 1 }}>
                  <small style={{ color: 'var(--color-brand)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>{product.brand || 'Premium'}</small>
                  <h3 style={{ fontSize: '1.15rem', margin: '0.5rem 0', color: 'var(--color-text-main)', fontWeight: 600, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.name}</h3>
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                   <div style={{ display: 'flex', flexDirection: 'column' }}>
                     <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-main)' }}>{product.price ? `R$ ${product.price}` : 'Carrinhos'}</span>
                   </div>
                   <button className="btn-premium" style={{ width: '40px', height: '40px', borderRadius: '50%', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '4rem', flexWrap: 'wrap' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={p === page ? 'btn-premium' : ''}
                style={p !== page ? { background: 'white', border: '1px solid var(--color-border)', color: 'var(--color-text-main)', width: '45px', height: '45px', borderRadius: '12px', cursor: 'pointer', transition: 'var(--transition-smooth)', fontWeight: 600 } : { width: '45px', height: '45px', borderRadius: '12px' }}
              >{p}</button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;

'use client';

import React from 'react';

const categories = [
  { 
    id: 1, 
    name: 'Beleza & Cosméticos', 
    key: 'beleza',
    desc: 'Cuide de você com o que há de melhor.', 
    count: 'Skin care & Make-up',
    icon: '🧴'
  },
  { 
    id: 2, 
    name: 'Moda & Acessórios', 
    key: 'moda',
    desc: 'Estilo que transforma seu visual.', 
    count: 'Tendências Globais',
    icon: '👗'
  },
  { 
    id: 3, 
    name: 'Casa & Utilidades', 
    key: 'casa',
    desc: 'Praticidade para cada canto do lar.', 
    count: 'Decoração e Cozinha',
    icon: '🏠'
  },
  { 
    id: 4, 
    name: 'Ferramentas', 
    key: 'ferramentas',
    desc: 'Sua caixa de ferramentas completa.', 
    count: 'Manutenção e Hobby',
    icon: '🔧'
  },
  { 
    id: 5, 
    name: 'Gadgets Inteligentes', 
    key: 'gadgets',
    desc: 'Tecnologia que facilita sua rotina.', 
    count: 'Smart Home & Tech',
    icon: '💡'
  },
  { 
    id: 6, 
    name: 'Ofertas do Dia', 
    key: 'ofertas',
    desc: 'Preços imperdíveis em itens selecionados.', 
    count: 'Tempo Limitado',
    icon: '🎁'
  }
];

const Categories = ({ onCategoryClick }) => {
  const handleClick = (key) => {
    onCategoryClick(key);
    const target = document.querySelector('#produtos');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categorias" className="section-padding">
      <div className="container">
        <h2 className="section-title">
          <span>O que você procura?</span>
          Nossos Departamentos
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {categories.map(cat => (
            <div key={cat.id} className="card" style={{
              cursor: 'pointer',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '3rem 2rem'
            }} onClick={() => handleClick(cat.key)}>
              <div style={{ 
                fontSize: '3.5rem', 
                marginBottom: '1.5rem',
                filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))'
              }}>{cat.icon}</div>
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--color-text-main)', fontSize: '1.25rem' }}>{cat.name}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{cat.desc}</p>
              <span style={{ 
                color: 'var(--color-brand)', 
                fontSize: '0.75rem', 
                fontWeight: 800, 
                letterSpacing: '1px', 
                textTransform: 'uppercase',
                background: 'rgba(37, 99, 235, 0.05)',
                padding: '0.4rem 1rem',
                borderRadius: '99px'
              }}>{cat.count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

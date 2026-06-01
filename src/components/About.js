import React from 'react';

const About = () => {
  return (
    <section id="sobre" className="section-padding" style={{ background: 'var(--color-bg-soft)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
        <h2 className="section-title">
          <span>Nossa História</span>
          Por que TrendBox?
        </h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: '2.5rem' }}>
          A TrendBox nasceu para ser a sua curadoria definitiva de tendências. Em um mundo com infinitas opções, nossa missão é filtrar o ruído e entregar apenas o que realmente importa: novidades, estilo e praticidade.
        </p>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
          Mais do que uma loja, somos um ecossistema de descoberta. Selecionamos produtos que transformam sua rotina, desde o item de decoração que faltava até a ferramenta tecnológica que você nem sabia que precisava.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginTop: '4rem' }}>
            <div className="card" style={{ padding: '2rem' }}>
                <div style={{ fontSize: '2.5rem', color: 'var(--color-brand)', fontWeight: 800 }}>100%</div>
                <div style={{ color: 'var(--color-text-main)', fontWeight: 600, marginTop: '0.5rem' }}>Curadoria Especializada</div>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
                <div style={{ fontSize: '2.5rem', color: 'var(--color-brand)', fontWeight: 800 }}>Gratis</div>
                <div style={{ color: 'var(--color-text-main)', fontWeight: 600, marginTop: '0.5rem' }}>Frete em Selecionados</div>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
                <div style={{ fontSize: '2.5rem', color: 'var(--color-brand)', fontWeight: 800 }}>24/7</div>
                <div style={{ color: 'var(--color-text-main)', fontWeight: 600, marginTop: '0.5rem' }}>Suporte ao Cliente</div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: 'white',
      padding: '5rem 0 2rem',
      borderTop: '1px solid var(--color-border)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '4rem',
          marginBottom: '4rem'
        }}>
          <div>
            <h4 style={{ marginBottom: '1.5rem', color: 'var(--color-brand)' }}>TrendBox</h4>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              <li><a href="#home">Início</a></li>
              <li><a href="#produtos">E-commerce</a></li>
              <li><a href="#categorias">Departamentos</a></li>
              <li><a href="#contato">Suporte</a></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1.5rem', color: 'var(--color-brand)' }}>Departamentos</h4>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              <li>Beleza & Cosméticos</li>
              <li>Moda & Acessórios</li>
              <li>Casa & Utilidades</li>
              <li>Ferramentas</li>
              <li>Gadgets Inteligentes</li>
              <li>Ofertas do Dia</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1.5rem', color: 'var(--color-brand)' }}>Institucional</h4>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              <li>Termos de Uso</li>
              <li>Privacidade</li>
              <li>Trocas e Devoluções</li>
              <li>Minha Conta</li>
              <li>Acompanhar Pedido</li>
            </ul>
          </div>
        </div>
        
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid var(--color-border)',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--color-text-muted)'
        }}>
          <p>© 2026 TrendBox. Descubra o que está em alta. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

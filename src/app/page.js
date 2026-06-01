'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Categories from '@/components/Categories';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CartModal from '@/components/CartModal';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('mpm_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('mpm_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.product.id === product.id);
      if (exists) return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { product, quantity: 1 }];
    });
    setShowCart(true); // Open cart when adding item
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(i => i.product.id !== productId));
  };

  const decrementCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.product.id === product.id);
      if (!exists) return prev;
      if (exists.quantity <= 1) return prev.filter(i => i.product.id !== product.id);
      return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity - 1 } : i);
    });
  };

  const clearCart = () => setCart([]);

  return (
    <div className="App">
      <Navbar cartCount={cart.reduce((s, i) => s + i.quantity, 0)} onCartClick={() => setShowCart(true)} />
      
      <main>
        <Hero />
        <Categories onCategoryClick={setFilterCategory} />
        
        <div id="produtos">
          <Products 
            onSelectProduct={setSelectedProduct} 
            filterCategory={filterCategory} 
            addToCart={addToCart} 
          />
        </div>

        <About />
        <Contact />
      </main>

      <Footer />

      {showCart && (
        <CartModal 
          cart={cart} 
          onClose={() => setShowCart(false)} 
          onRemove={removeFromCart} 
          onClear={clearCart} 
          addToCart={addToCart} 
          decrementCart={decrementCart} 
        />
      )}

      {/* Floating WhatsApp Action (Icon) */}
       <a href="https://wa.me/5551981090966" target="_blank" rel="noopener noreferrer"
        style={{
          position: 'fixed', bottom: '30px', right: '30px', background: '#25D366',
          color: 'white', width: '60px', height: '60px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', zIndex: 1001,
          transition: 'var(--transition-smooth)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        💬
      </a>
    </div>
  );
}

import React, { useMemo, useState } from "react";
import { 
  ShoppingCart, 
  Leaf, 
  Sprout, 
  Bug, 
  Search, 
  Minus, 
  Plus, 
  X,
  Camera 
} from "lucide-react";
import './AgriCommerce.css';

// Import category sections
import SeedsSection from './components/SeedsSection';
import PesticidesSection from './components/PesticidesSection';
import FertilizersSection from './components/FertilizersSection';

// --- Demo Product Data ---
const ALL_PRODUCTS = [
  {
    id: "seed-1",
    name: "Hybrid Tomato Seeds (F1)",
    category: "seeds",
    price: 199,
    unit: "50 seeds",
    rating: 4.6,
    stock: 120,
    image:
      "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1200&auto=format&fit=crop",
    highlights: ["High yield", "Heat tolerant", "Early maturity"],
  },
  {
    id: "seed-2",
    name: "Basmati Paddy Seeds",
    category: "seeds",
    price: 349,
    unit: "1 kg",
    rating: 4.4,
    stock: 80,
    image:
      "https://images.unsplash.com/photo-1543363136-1bf61a79c5e1?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Aroma rich", "Pest tolerant", "PAN India suitable"],
  },
  {
    id: "seed-3",
    name: "Okra (Lady Finger) Seeds",
    category: "seeds",
    price: 129,
    unit: "100 g",
    rating: 4.2,
    stock: 150,
    image:
      "https://images.unsplash.com/photo-1597266023824-8caf18b40a3a?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Tender pods", "Disease resistance"],
  },
  {
    id: "pest-1",
    name: "Neem Oil Bio-Pesticide",
    category: "pesticides",
    price: 259,
    unit: "500 ml",
    rating: 4.5,
    stock: 200,
    image:
      "https://images.unsplash.com/photo-1615485747335-65c3ac97a7bd?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Organic", "Wide-spectrum control", "Safe interval 3-4 days"],
  },
  {
    id: "pest-2",
    name: "Cypermethrin 25% EC",
    category: "pesticides",
    price: 449,
    unit: "1 L",
    rating: 4.1,
    stock: 50,
    image:
      "https://images.unsplash.com/photo-1505575967455-40e256f73376?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Contact insecticide", "Fast knockdown"],
  },
  {
    id: "pest-3",
    name: "Glyphosate 41% SL (Weed Control)",
    category: "pesticides",
    price: 529,
    unit: "1 L",
    rating: 4.0,
    stock: 65,
    image:
      "https://images.unsplash.com/photo-1510693206972-df098062cb71?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Systemic herbicide", "Non-selective"],
  },
  // New Products - Add your products here
  {
    id: "seed-4",
    name: "Organic Cucumber Seeds",
    category: "seeds",
    price: 159,
    unit: "25 seeds",
    rating: 4.3,
    stock: 95,
    image:
      "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?q=80&w=1200&auto=format&fit=crop",
    highlights: ["Disease resistant", "High yielding", "Early maturity"],
  },
  {
    id: "fert-1",
    name: "Organic Vermicompost",
    category: "fertilizers",
    price: 399,
    unit: "5 kg",
    rating: 4.7,
    stock: 120,
    image:
      "https://images.unsplash.com/photo-1589211548263-d3c229d952dd?q=80&w=1200&auto=format&fit=crop",
    highlights: ["100% organic", "Improves soil health", "Eco-friendly"],
  },
];

// Format price in Indian Rupees
function formatINR(n) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function AgriCommerce() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState({}); // { [id]: { product, qty } }
  const [checkout, setCheckout] = useState(false);
  const [payment, setPayment] = useState("cod");
  const [placing, setPlacing] = useState(false);
  
  // Open checkout dialog
  function openCheckout() {
    setCheckout(true);
    // Close cart when opening checkout
    setCartOpen(false);
  }

  // Filter products by category and search query
  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_PRODUCTS.filter((p) => {
      const catOk = category === "all" ? true : p.category === category;
      const qOk = !q || p.name.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [query, category]);

  // Calculate cart total
  const total = useMemo(() => {
    return Object.values(cart).reduce((sum, { product, qty }) => sum + product.price * qty, 0);
  }, [cart]);

  // Add product to cart
  function addToCart(product) {
    setCart((prev) => {
      const existing = prev[product.id]?.qty || 0;
      return {
        ...prev,
        [product.id]: { product, qty: existing + 1 },
      };
    });
  }

  // Update product quantity in cart
  function updateQty(id, delta) {
    setCart((prev) => {
      const curr = prev[id];
      if (!curr) return prev;
      const nextQty = Math.max(0, curr.qty + delta);
      const copy = { ...prev };
      if (nextQty === 0) delete copy[id];
      else copy[id] = { ...curr, qty: nextQty };
      return copy;
    });
  }

  // Remove product from cart
  function removeItem(id) {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  }

  // Handle order placement
  function placeOrder(e) {
    e.preventDefault();
    if (!Object.keys(cart).length) return alert("Your cart is empty");
    setPlacing(true);
    // Simulate network call
    setTimeout(() => {
      setPlacing(false);
      alert("Order placed successfully! We'll contact you soon.");
      setCart({});
      setCheckout(false);
      setCartOpen(false);
    }, 900);
  }

  // Cart item count
  const itemCount = Object.values(cart).reduce((n, c) => n + c.qty, 0);

  return (
    <>
      {/* Top Bar */}
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">
            <div className="brand-logo">
              <Leaf size={20} />
            </div>
            <div className="brand-text">
              <h1>KisanKart</h1>
              <p>Seeds • Pesticides • Farm Care</p>
            </div>
          </div>

          <div className="search-bar">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search seeds, pesticides..."
            />
            <button 
              className="search-camera-btn"
              onClick={() => alert("Camera functionality coming soon!")}
            >
              <Camera size={16} />
            </button>
          </div>

          <button className="btn btn-primary" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="badge">{itemCount}</span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <h2>Quality Seeds & Pesticides for Indian Farms</h2>
              <p>
                Boost yield with vetted varieties and trusted crop protection. Fast shipping, farmer-friendly prices, and expert support.
              </p>
              <div className="hero-badges">
                <span className="badge">Free advice on WhatsApp</span>
                <span className="badge">PAN India delivery</span>
              </div>
              <div className="hero-buttons">
                <a href="#shop" className="btn btn-primary">Shop Now</a>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1400&auto=format&fit=crop"
                alt="Farmer field"
              />
              <div className="hero-float">
                <Sprout size={18} className="hero-float-icon" />
                <p>Germination guarantee on select seeds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Sections */}
      <section id="shop" className="product-sections">
        <div className="container">
          <div className="catalog-header">
            <div className="catalog-title">
              <h3>Products</h3>
              <p>Browse our categories to find what you need</p>
            </div>
            <div className="category-nav">
              <a href="#seeds-section" className="category-nav-link">
                <Sprout size={16} className="nav-icon" /> Seeds
              </a>
              <a href="#pesticides-section" className="category-nav-link">
                <Bug size={16} className="nav-icon" /> Pesticides
              </a>
              <a href="#fertilizers-section" className="category-nav-link">
                <Leaf size={16} className="nav-icon" /> Fertilizers
              </a>
            </div>
          </div>
        </div>
        
        {/* Seeds Section */}
        <section id="seeds-section" className="category-section seeds-section">
          <SeedsSection products={ALL_PRODUCTS} addToCart={addToCart} />
        </section>
        
        {/* Pesticides Section */}
        <section id="pesticides-section" className="category-section pesticides-section">
          <PesticidesSection products={ALL_PRODUCTS} addToCart={addToCart} />
        </section>
        
        {/* Fertilizers Section */}
        <section id="fertilizers-section" className="category-section fertilizers-section">
          <FertilizersSection products={ALL_PRODUCTS} addToCart={addToCart} />
        </section>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <h5 className="feature-title">Genuine & Fresh Stock</h5>
              <p className="feature-desc">
                All products are sourced directly from manufacturers or authorized distributors.
              </p>
            </div>
            <div className="feature-card">
              <h5 className="feature-title">Expert Support</h5>
              <p className="feature-desc">
                Message us with crop, area, and problem—get a recommendation within 24 hrs.
              </p>
            </div>
            <div className="feature-card">
              <h5 className="feature-title">Secure Payments</h5>
              <p className="feature-desc">
                COD, UPI, and card options available during checkout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                <div className="footer-logo">
                  <Leaf size={16} />
                </div>
                <span className="footer-brand-text">KisanKart</span>
              </div>
              <p className="footer-desc">
                Your trusted partner for seeds and crop protection inputs.
              </p>
            </div>
            <div>
              <h6 className="footer-heading">Quick Links</h6>
              <ul className="footer-links">
                <li><a href="#shop">Shop</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Shipping & Returns</a></li>
              </ul>
            </div>
            <div>
              <h6 className="footer-heading">Contact</h6>
              <ul className="footer-links">
                <li>📞 +91 99999 99999</li>
                <li>📧 support@kisankart.in</li>
                <li>
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noreferrer"
                  >
                    💬 WhatsApp Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} KisanKart. All rights reserved.
        </div>
      </footer>

      {/* Cart Sheet */}
      {cartOpen && (
        <>
          <div className="dialog-overlay" onClick={() => setCartOpen(false)}></div>
          <div className="cart-sheet">
            <div className="cart-header">
              <div className="flex items-center justify-between">
                <h2 className="cart-title">Your Cart</h2>
                <button 
                  className="btn btn-icon btn-outline" 
                  onClick={() => setCartOpen(false)}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            
            <div className="cart-items">
              {Object.keys(cart).length === 0 ? (
                <p className="cart-empty">Your cart is empty.</p>
              ) : (
                Object.values(cart).map(({ product, qty }) => (
                  <div key={product.id} className="cart-item">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-content">
                      <p className="cart-item-title">{product.name}</p>
                      <p className="cart-item-meta">{product.unit}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="cart-item-price">{formatINR(product.price)}</div>
                        <div className="cart-item-controls">
                          <button 
                            className="cart-quantity-btn" 
                            onClick={() => updateQty(product.id, -1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="cart-quantity">{qty}</span>
                          <button 
                            className="cart-quantity-btn" 
                            onClick={() => updateQty(product.id, 1)}
                          >
                            <Plus size={14} />
                          </button>
                          <button 
                            className="cart-item-remove" 
                            onClick={() => removeItem(product.id)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="cart-footer">
              <div className="cart-total">
                <span className="cart-total-label">Subtotal</span>
                <span className="cart-total-value">{formatINR(total)}</span>
              </div>
              
              <button 
                className="btn btn-primary checkout-button" 
                disabled={!Object.keys(cart).length} 
                onClick={openCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}

      {/* Checkout Dialog */}
      {checkout && (
        <>
          <div className="dialog-overlay checkout-overlay" onClick={(e) => e.target === e.currentTarget && setCheckout(false)}>
            <div className="dialog-content">
              <div className="dialog-header">
                <h2 className="dialog-title">Checkout</h2>
                <button 
                  className="btn btn-icon btn-outline" 
                  onClick={() => setCheckout(false)}
                >
                  <X size={16} />
                </button>
              </div>
              
              <form className="checkout-form" onSubmit={placeOrder}>
                <div className="form-grid">
                  <div className="form-field">
                    <label className="form-label" htmlFor="name">Full Name</label>
                    <input id="name" className="form-input" required />
                  </div>
                  
                  <div className="form-field">
                    <label className="form-label" htmlFor="phone">Phone</label>
                    <input id="phone" type="tel" className="form-input" required />
                  </div>
                  
                  <div className="form-field form-field-full">
                    <label className="form-label" htmlFor="address">Delivery Address</label>
                    <textarea id="address" className="form-textarea" required rows={3}></textarea>
                  </div>
                  
                  <div className="form-field">
                    <label className="form-label">Payment</label>
                    <select 
                      className="form-select" 
                      value={payment} 
                      onChange={(e) => setPayment(e.target.value)}
                    >
                      <option value="cod">Cash on Delivery</option>
                      <option value="upi">UPI</option>
                      <option value="card">Card</option>
                    </select>
                  </div>
                  
                  <div className="form-field">
                    <label className="form-label">Order Total</label>
                    <div className="form-display">{formatINR(total)}</div>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary mt-4" 
                  disabled={placing}
                >
                  {placing ? "Placing order..." : "Place Order"}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

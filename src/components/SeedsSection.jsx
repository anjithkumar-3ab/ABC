import React from "react";
import { Sprout } from "lucide-react";

// Filter products to only include seeds
function SeedsSection({ products, addToCart }) {
  const seedProducts = products.filter(product => product.category === "seeds");

  // Format price in Indian Rupees
  function formatINR(n) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);
  }

  return (
    <section className="category-section">
      <div className="container">
        <div className="section-header">
          <div className="section-icon">
            <Sprout size={20} />
          </div>
          <div className="section-title">
            <h3>Seeds Collection</h3>
            <p>Quality seeds for high yield and better crop protection</p>
          </div>
        </div>

        <div className="product-grid">
          {seedProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-badge">
                  Seeds
                </div>
              </div>
              <div className="product-content">
                <h3 className="product-title">{product.name}</h3>
                <div className="product-meta">
                  Pack: {product.unit} • ⭐ {product.rating}
                </div>
                <ul className="product-highlights">
                  {product.highlights.map((highlight, i) => (
                    <li key={i}>• {highlight}</li>
                  ))}
                </ul>
                <div className="product-footer">
                  <div>
                    <div className="product-price">{formatINR(product.price)}</div>
                    <div className="product-stock">In stock: {product.stock}</div>
                  </div>
                  <button className="btn btn-primary" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SeedsSection;

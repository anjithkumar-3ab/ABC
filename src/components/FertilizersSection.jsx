import React from "react";
import { Leaf } from "lucide-react";

// Filter products to only include fertilizers
function FertilizersSection({ products, addToCart }) {
  const fertilizerProducts = products.filter(product => product.category === "fertilizers");

  // Format price in Indian Rupees
  function formatINR(n) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);
  }

  return (
    <section className="category-section fertilizers-section">
      <div className="container">
        <div className="section-header">
          <div className="section-icon">
            <Leaf size={20} />
          </div>
          <div className="section-title">
            <h3>Fertilizers Collection</h3>
            <p>Essential nutrients for healthy soil and better yield</p>
          </div>
        </div>

        <div className="product-grid">
          {fertilizerProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-badge">
                  Fertilizer
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

export default FertilizersSection;

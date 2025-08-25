import React, { useState, useMemo } from 'react';
import { Search, Camera } from 'lucide-react';

// Sample product data
const PRODUCTS = [
  {
    id: "seed-1",
    name: "Hybrid Tomato Seeds (F1)",
    category: "seeds",
    price: 199,
    image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "seed-2",
    name: "Basmati Paddy Seeds",
    category: "seeds",
    price: 349,
    image: "https://images.unsplash.com/photo-1543363136-1bf61a79c5e1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "pest-1",
    name: "Neem Oil Bio-Pesticide",
    category: "pesticides",
    price: 259,
    image: "https://images.unsplash.com/photo-1615485747335-65c3ac97a7bd?q=80&w=1200&auto=format&fit=crop",
  },
];

// Format price in INR
function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export default function AgriCommerce() {
  const [cart, setCart] = useState({});
  const [category, setCategory] = useState("all");
  
  // Filter products by category
  const filteredProducts = useMemo(() => {
    return category === "all" 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === category);
  }, [category]);
  
  // Calculate cart total
  const cartTotal = useMemo(() => {
    return Object.values(cart).reduce(
      (sum, item) => sum + item.price * item.quantity, 
      0
    );
  }, [cart]);
  
  // Add product to cart
  function addToCart(product) {
    setCart(prev => {
      const existing = prev[product.id];
      return {
        ...prev,
        [product.id]: {
          ...product,
          quantity: existing ? existing.quantity + 1 : 1
        }
      };
    });
  }
  
  // Remove product from cart
  function removeFromCart(productId) {
    setCart(prev => {
      const newCart = {...prev};
      delete newCart[productId];
      return newCart;
    });
  }
  
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">KisanKart</h1>
        <p className="text-gray-600">Quality Seeds & Pesticides for Indian Farms</p>
        
        <div className="mt-4 relative w-full max-w-md">
          <div className="relative flex items-center">
            <Search className="absolute left-3 text-gray-400" size={16} />
            <input
              type="text"
              className="w-full px-10 py-2 border rounded-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
            />
            <button 
              className="absolute right-3 text-green-600 hover:text-green-700"
              onClick={() => alert("Camera functionality coming soon!")}
            >
              <Camera size={16} />
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex gap-4">
          <button 
            className={`px-4 py-2 rounded ${category === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setCategory('all')}
          >
            All Products
          </button>
          <button 
            className={`px-4 py-2 rounded ${category === 'seeds' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setCategory('seeds')}
          >
            Seeds
          </button>
          <button 
            className={`px-4 py-2 rounded ${category === 'pesticides' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setCategory('pesticides')}
          >
            Pesticides
          </button>
        </div>
      </header>
      
      <div className="flex flex-col md-flex-row gap-8">
        {/* Product listing */}
        <div className="md-w-2-3">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <div className="grid md-grid-cols-2 gap-4">
            {filteredProducts.map(product => (
              <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">{formatINR(product.price)}</span>
                    <button 
                      className="bg-green-600 text-white px-3 py-1 rounded"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Shopping cart */}
        <div className="md-w-1-3">
          <div className="border rounded-lg p-4 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            
            {Object.keys(cart).length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <>
                {Object.values(cart).map(item => (
                  <div key={item.id} className="flex gap-3 border-b py-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="flex justify-between mt-1">
                        <span>
                          {item.quantity} × {formatINR(item.price)}
                        </span>
                        <button 
                          className="text-red-600"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-4 pt-2 border-t">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>{formatINR(cartTotal)}</span>
                  </div>
                  <button 
                    className="w-full bg-green-600 text-white py-2 rounded mt-4"
                    onClick={() => alert("Thank you for your order!")}
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

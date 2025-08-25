import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Leaf,
  Sprout,
  Bug,
  Search,
  Minus,
  Plus,
  Trash2,
  Camera,
} from "lucide-react";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "./components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./components/ui/select";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";

// --- Demo Product Data (replace with your backend later) ---
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
];

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
  const [payment, setPayment] = useState("cod");
  const [placing, setPlacing] = useState(false);

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_PRODUCTS.filter((p) => {
      const catOk = category === "all" ? true : p.category === category;
      const qOk = !q || p.name.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [query, category]);

  const total = useMemo(() => {
    return Object.values(cart).reduce((sum, { product, qty }) => sum + product.price * qty, 0);
  }, [cart]);

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev[product.id]?.qty || 0;
      return {
        ...prev,
        [product.id]: { product, qty: existing + 1 },
      };
    });
  }

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

  function removeItem(id) {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  }

  async function placeOrder(e) {
    e.preventDefault();
    if (!Object.keys(cart).length) return alert("Your cart is empty");
    setPlacing(true);
    // Simulate network call
    setTimeout(() => {
      setPlacing(false);
      alert("Order placed successfully! We'll contact you soon.");
      setCart({});
      setCartOpen(false);
    }, 900);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white text-slate-800">
      {/* Top Bar */}
      {/* ...existing code... */}
    </div>
  );
}

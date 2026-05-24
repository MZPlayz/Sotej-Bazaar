"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Star,
  Plus,
  Minus,
  Check,
  ChevronDown,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles
} from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/ProductCard";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product, relatedProducts }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<string | null>("story");
  const [addedNotification, setAddedNotification] = useState(false);

  const isSaved = isInWishlist(product.id);

  const handleQtyDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleQtyIncrease = () => {
    setQuantity((prev) => Math.min(product.stockCount, prev + 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedNotification(true);
    setTimeout(() => {
      setAddedNotification(false);
    }, 3000);
  };

  const toggleTab = (tabName: string) => {
    setActiveTab((prev) => (prev === tabName ? null : tabName));
  };

  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      {/* Breadcrumbs */}
      <div style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "30px", display: "flex", gap: "8px", fontWeight: "500" }}>
        <Link href="/" className="breadcrumb-link">Home</Link>
        <span>/</span>
        <Link href="/shop" className="breadcrumb-link">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="breadcrumb-link">{product.category}</Link>
        <span>/</span>
        <span style={{ color: "var(--text-main)", fontWeight: "700" }}>{product.name}</span>
      </div>

      {/* Main product display */}
      <div className="product-detail-layout animate-fade-in">
        {/* Left Side Gallery */}
        <div className="product-gallery-box animate-slide-up">
          <img src={product.image} alt={product.name} className="gallery-main-img" />
        </div>

        {/* Right Side Specs & Purchase panel */}
        <div className="product-info-box animate-slide-up">
          {product.isOrganic && (
            <span className="badge-green-outline">
              <ShieldCheck size={14} />
              <span>Certified Organic - {product.certification}</span>
            </span>
          )}

          <h1 className="detail-name">{product.name}</h1>

          <div className="detail-rating-meta">
            <div className="stars-rating-bar">
              <Star size={16} fill="var(--accent-yellow)" />
              <span>{product.rating}</span>
            </div>
            <span className="detail-review-count">({product.reviewsCount} customer ratings)</span>
            <span style={{ borderLeft: "1px solid var(--border-light)", paddingLeft: "16px", color: product.inStock ? "var(--primary)" : "var(--accent-red)", fontWeight: "700" }}>
              {product.inStock ? "✓ Freshly In Stock" : "✗ Out of Stock"}
            </span>
          </div>

          <div className="detail-price-box">
            <span className="detail-price">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="detail-old-price">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>

          <p className="detail-description">{product.longDescription}</p>

          {/* Quick Specs Cards */}
          <div className="detail-quick-specs">
            <div className="spec-item">
              📦 WEIGHT / UNIT
              <strong>{product.weight} ({product.unit})</strong>
            </div>
            <div className="spec-item">
              🌱 FARM SOURCE
              <strong>Chittagong Organic Co-Op</strong>
            </div>
            <div className="spec-item">
              🍎 CERTIFICATION
              <strong>{product.certification}</strong>
            </div>
            <div className="spec-item">
              ⏱ SHELF LIFE
              <strong>5-7 Days (Fresh)</strong>
            </div>
          </div>

          {/* Purchase Controls */}
          {product.inStock && (
            <div className="detail-actions-group">
              <div className="quantity-selector-box">
                <button onClick={handleQtyDecrease} className="qty-selector-btn" aria-label="Decrease quantity">
                  <Minus size={14} />
                </button>
                <span className="qty-selector-val">{quantity}</span>
                <button onClick={handleQtyIncrease} className="qty-selector-btn" disabled={quantity >= product.stockCount} aria-label="Increase quantity">
                  <Plus size={14} />
                </button>
              </div>

              <button onClick={handleAddToCart} className="btn btn-primary" style={{ flexGrow: 1, padding: "16px" }}>
                <ShoppingBag size={18} />
                Add Fresh Harvest to Cart
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`action-wishlist-btn ${isSaved ? "saved" : ""}`}
                aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={20} fill={isSaved ? "var(--accent-red)" : "transparent"} />
              </button>
            </div>
          )}

          {/* Inline alert notification */}
          {addedNotification && (
            <div className="animate-fade-in" style={{ backgroundColor: "var(--primary-light)", border: "1.5px solid var(--accent-mint)", color: "var(--primary-dark)", padding: "12px 18px", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", fontWeight: "600", fontSize: "14px" }}>
              <Sparkles size={18} style={{ color: "var(--accent-mint)" }} />
              <span>Sotej Basket updated! Added {quantity}x {product.name}. Check your cart slider.</span>
            </div>
          )}

          {/* Extra Accordions */}
          <div className="detail-extra-info-tabs">
            {/* Story Tab */}
            <div className="accordion-tab">
              <button onClick={() => toggleTab("story")} className="accordion-trigger">
                <span>🌾 Farm Story & Agronomic Integrity</span>
                <ChevronDown size={16} style={{ transform: activeTab === "story" ? "rotate(180deg)" : "none", transition: "var(--transition-snappy)" }} />
              </button>
              {activeTab === "story" && (
                <div className="accordion-content">
                  <p>Our produce travels directly from rich, biological-compost soils under modern crop rotation structures. We preserve native bees and avoid monocultures to stimulate microbial density in soils. You are eating food designed by soil wisdom.</p>
                  <ul style={{ marginTop: "10px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    {product.features.map((feat, index) => (
                      <li key={index} style={{ listStyleType: "square" }}>{feat}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Nutrition Tab */}
            <div className="accordion-tab">
              <button onClick={() => toggleTab("nutrition")} className="accordion-trigger">
                <span>🧪 Certified Nutritional Content</span>
                <ChevronDown size={16} style={{ transform: activeTab === "nutrition" ? "rotate(180deg)" : "none", transition: "var(--transition-snappy)" }} />
              </button>
              {activeTab === "nutrition" && (
                <div className="accordion-content">
                  <p>Analyzed macro-nutrient distribution based on a standard laboratory serving size:</p>
                  <div className="nutrition-grid">
                    <div className="nutrition-item">
                      <span className="nutrition-val">{product.nutrition.calories}</span>
                      <span className="nutrition-label">Energy</span>
                    </div>
                    <div className="nutrition-item">
                      <span className="nutrition-val">{product.nutrition.protein}</span>
                      <span className="nutrition-label">Protein</span>
                    </div>
                    <div className="nutrition-item">
                      <span className="nutrition-val">{product.nutrition.carbs}</span>
                      <span className="nutrition-label">Carbohydrate</span>
                    </div>
                    <div className="nutrition-item">
                      <span className="nutrition-val">{product.nutrition.fat}</span>
                      <span className="nutrition-label">Lipid Fat</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Carousel Section */}
      {relatedProducts.length > 0 && (
        <section style={{ marginTop: "80px" }}>
          <div className="section-heading-group">
            <div>
              <h2 className="section-title">Related Fresh Harvest</h2>
              <p className="section-subtitle">Specially curated fresh accompaniments matching this taste profile</p>
            </div>
          </div>
          <div className="products-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

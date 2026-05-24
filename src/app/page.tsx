"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Leaf, ShieldAlert, Award, Star, Compass } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All Products") {
      return PRODUCTS.slice(0, 8); // Display first 8 products as featured
    }
    return PRODUCTS.filter((p) => p.category === selectedCategory).slice(0, 8);
  }, [selectedCategory]);

  return (
    <div className="container animate-fade-in">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-subtitle">
            <Leaf size={16} />
            <span>100% Certified Pure Farm-to-Table E-Boutique</span>
          </div>
          <h1 className="hero-title">
            Pure Organic <br />
            Freshness, <span>As Nature Intended.</span>
          </h1>
          <p className="hero-description">
            Welcome to Sotej Bazaar. Discover premium hand-selected fruits, vegetables, artisan dairy,
            and small-batch pantry staples. Free pesticide-free express delivery directly to your home.
          </p>
          <div className="hero-cta">
            <Link href="/shop" className="btn btn-primary">
              Shop Fresh Catalog <ArrowRight size={18} />
            </Link>
            <Link href="/shop?category=Herbs%20%26%20Drinks" className="btn btn-secondary">
              Explore Herbal Elixirs
            </Link>
          </div>
        </div>

        <div className="hero-media">
          <div className="hero-floating-bubble bubble-1">
            <div className="bubble-icon-box">
              <Star className="bubble-icon" size={18} fill="var(--primary)" />
            </div>
            <div className="bubble-info">
              <h5>4.98 Quality Rating</h5>
              <p>Trusted by 5,000+ families</p>
            </div>
          </div>

          <div className="hero-floating-bubble bubble-2">
            <div className="bubble-icon-box">
              <Leaf className="bubble-icon" size={18} />
            </div>
            <div className="bubble-info">
              <h5>100% Pesticide-Free</h5>
              <p>Hydroponic & Soil certified</p>
            </div>
          </div>

          <div className="hero-image-container">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80"
              alt="Fresh organic market basket"
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* 2. Shop by Category Bubbles Section */}
      <section className="categories-preview-section">
        <div className="section-heading-group">
          <div>
            <h2 className="section-title">Cultivated Categories</h2>
            <p className="section-subtitle">Select a category below to filter our daily harvested selection in real-time</p>
          </div>
          <Link href="/shop" className="btn btn-secondary btn-sm">
            View All Catalog
          </Link>
        </div>

        <div className="category-bubbles-grid">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <div
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-bubble-card ${isActive ? "active" : ""}`}
              >
                <div className="category-bubble-icon-box">
                  <Compass className="category-bubble-icon" size={24} />
                </div>
                <h4>{cat}</h4>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Promo Banner Grid */}
      <section className="promo-grid">
        <div
          className="promo-banner"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=800&auto=format&fit=crop&q=80')`,
          }}
        >
          <div className="promo-banner-content">
            <span className="promo-tag">LIMITED SPECIAL</span>
            <h3 className="promo-title">Crimson Strawberry Harvest</h3>
            <p className="promo-desc">
              Get an extra 15% discount on our freshly gathered strawberries this morning. Use code at cart:
            </p>
            <div style={{ marginBottom: "20px" }}>
              <code style={{ background: "white", color: "var(--primary-dark)", padding: "6px 12px", borderRadius: "4px", fontWeight: "bold", fontSize: "14px" }}>
                SOTEJ15
              </code>
            </div>
            <Link href="/shop?category=Fruits" className="promo-btn">
              Claim Offer Now <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div
          className="promo-banner"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80')`,
          }}
        >
          <div className="promo-banner-content">
            <span className="promo-tag">FARM EXCLUSIVE</span>
            <h3 className="promo-title">Hass Avocado Butter</h3>
            <p className="promo-desc">
              Creamy, volcanic-soil grown avocados packed with heart-healthy lipids. Get 20% off with code:
            </p>
            <div style={{ marginBottom: "20px" }}>
              <code style={{ background: "white", color: "var(--primary-dark)", padding: "6px 12px", borderRadius: "4px", fontWeight: "bold", fontSize: "14px" }}>
                FRESH20
              </code>
            </div>
            <Link href="/shop?category=Fruits" className="promo-btn">
              Secure Avocados <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Dynamic Featured Products Grid */}
      <section className="featured-products-section">
        <div className="section-heading-group">
          <div>
            <h2 className="section-title">Fresh Harvest Featured</h2>
            <p className="section-subtitle">
              Showing active premium items for <strong>{selectedCategory}</strong>
            </p>
          </div>
          <span style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: "500" }}>
            Showing {filteredProducts.length} items
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-products-found" style={{ margin: "20px 0" }}>
            <h3>No Products Found</h3>
            <p>Our farmers are busy restocking this fresh segment. Check back shortly!</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 5. Values / Certification Banner */}
      <section className="organic-values-banner" style={{ background: "white", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)", padding: "50px", marginBottom: "60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "40px", textAlign: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ background: "var(--primary-light)", width: "60px", height: "60px", borderRadius: "50%", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              <Leaf style={{ color: "var(--primary)" }} size={28} />
            </div>
            <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "18px", marginBottom: "8px" }}>Pure Organics Only</h4>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.6" }}>Every single item is sourced from farms complying strictly with environmental biodiversity rules.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ background: "var(--primary-light)", width: "60px", height: "60px", borderRadius: "50%", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              <ShieldAlert style={{ color: "var(--primary)" }} size={28} />
            </div>
            <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "18px", marginBottom: "8px" }}>Pesticide Guaranteed Free</h4>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.6" }}>We conduct weekly independent chemical analysis on crop batches to ensure absolute chemical-free status.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ background: "var(--primary-light)", width: "60px", height: "60px", borderRadius: "50%", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", marginBottom: "20px" }}>
              <Award style={{ color: "var(--primary)" }} size={28} />
            </div>
            <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "18px", marginBottom: "8px" }}>Zero-Cold-Storage Shipping</h4>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.6" }}>We do not warehouse. Products move straight from the vine/farm to our eco-crates and your dinner table.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

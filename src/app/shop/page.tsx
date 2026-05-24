"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Filter, SlidersHorizontal, RotateCcw, X, Search } from "lucide-react";
import { PRODUCTS, CATEGORIES, Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search, Category, and Sorting URL Sync
  const initialCategory = searchParams.get("category") || "All Products";
  const initialSearch = searchParams.get("search") || "";

  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [maxPrice, setMaxPrice] = useState(30);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  // Sync state if searchParams change (e.g. user clicks header categories)
  useEffect(() => {
    setCategoryFilter(searchParams.get("category") || "All Products");
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  // Compute category counts for sidebar indicators
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "All Products": PRODUCTS.length };
    CATEGORIES.slice(1).forEach((cat) => {
      counts[cat] = PRODUCTS.filter((p) => p.category === cat).length;
    });
    return counts;
  }, []);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Category Filter
      if (categoryFilter !== "All Products" && product.category !== categoryFilter) {
        return false;
      }
      // 2. Search Keyword Filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      // 3. Price Filter
      if (product.price > maxPrice) {
        return false;
      }
      // 4. Organic Filter
      if (organicOnly && !product.isOrganic) {
        return false;
      }
      return true;
    });
  }, [categoryFilter, searchQuery, maxPrice, organicOnly]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const productsCopy = [...filteredProducts];
    switch (sortBy) {
      case "price-asc":
        return productsCopy.sort((a, b) => a.price - b.price);
      case "price-desc":
        return productsCopy.sort((a, b) => b.price - a.price);
      case "rating":
        return productsCopy.sort((a, b) => b.rating - a.rating);
      case "popularity":
        return productsCopy.sort((a, b) => b.reviewsCount - a.reviewsCount);
      default:
        return productsCopy; // default database sorting
    }
  }, [filteredProducts, sortBy]);

  const handleResetFilters = () => {
    setCategoryFilter("All Products");
    setSearchQuery("");
    setMaxPrice(30);
    setOrganicOnly(false);
    setSortBy("default");
    router.push("/shop"); // Clear search params in URL
  };

  const handleCategoryClick = (cat: string) => {
    setCategoryFilter(cat);
    const paramCategory = cat === "All Products" ? "" : cat;
    if (paramCategory) {
      router.push(`/shop?category=${encodeURIComponent(paramCategory)}`);
    } else {
      router.push("/shop");
    }
  };

  return (
    <div className="container shop-page-wrapper animate-fade-in">
      {/* Search status header */}
      {(searchQuery || categoryFilter !== "All Products") && (
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px", alignItems: "center" }}>
          <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-muted)" }}>Active Filters:</span>
          {categoryFilter !== "All Products" && (
            <span style={{ background: "var(--primary-light)", color: "var(--primary)", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px", fontWeight: "bold" }}>
              Category: {categoryFilter}
              <X size={12} style={{ cursor: "pointer" }} onClick={() => handleCategoryClick("All Products")} />
            </span>
          )}
          {searchQuery && (
            <span style={{ background: "var(--primary-light)", color: "var(--primary)", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px", fontWeight: "bold" }}>
              Search: &quot;{searchQuery}&quot;
              <X size={12} style={{ cursor: "pointer" }} onClick={() => setSearchQuery("")} />
            </span>
          )}
        </div>
      )}

      <div className="shop-main-layout">
        {/* Left Sidebar Filters */}
        <aside className="filters-sidebar animate-slide-up">
          <div className="filter-group">
            <div className="filter-title">
              <span>Filter Categories</span>
              <button onClick={handleResetFilters} className="reset-filter-btn">
                <RotateCcw size={12} style={{ marginRight: "4px" }} /> Reset
              </button>
            </div>
            <ul className="category-list">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className={`category-item-btn ${categoryFilter === cat ? "active" : ""}`}
                  >
                    <span>{cat}</span>
                    <span className="cat-count">{categoryCounts[cat] || 0}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <div className="filter-title">
              <span>Max Price Range</span>
            </div>
            <div className="price-range-slider">
              <input
                type="range"
                min="2"
                max="30"
                step="0.5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                className="price-slider-input"
              />
              <div className="price-labels">
                <span>$2.00</span>
                <span>
                  Max: <strong>${maxPrice.toFixed(2)}</strong>
                </span>
                <span>$30.00</span>
              </div>
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-title">
              <span>Certifications</span>
            </div>
            <label className="certified-label">
              <input
                type="checkbox"
                checked={organicOnly}
                onChange={(e) => setOrganicOnly(e.target.checked)}
              />
              <span>100% USDA Organic</span>
            </label>
          </div>
        </aside>

        {/* Right Product Grid Catalog */}
        <div style={{ flexGrow: 1 }}>
          {/* Catalog Top Control Header */}
          <div className="catalog-header">
            <div className="catalog-info">
              Showing <strong>{sortedProducts.length}</strong> of <strong>{PRODUCTS.length}</strong> fresh organic items
            </div>
            <div className="catalog-actions">
              <SlidersHorizontal size={16} style={{ color: "var(--primary)" }} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
                aria-label="Sort products"
              >
                <option value="default">Default Harvest Sorting</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Certified Rating</option>
                <option value="popularity">Most Customer Reviews</option>
              </select>
            </div>
          </div>

          {/* Catalog Products List */}
          {sortedProducts.length === 0 ? (
            <div className="no-products-found animate-slide-up">
              <h3>No Fresh Products Match</h3>
              <p>Try widening your search terms, raising the max price, or resetting the filters.</p>
              <button onClick={handleResetFilters} className="btn btn-primary btn-sm">
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="products-grid animate-slide-up">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense
      fallback={
        <div className="container" style={{ padding: "100px 24px", textAlign: "center" }}>
          <h2>Harvesting Sotej Bazaar Catalog...</h2>
          <div style={{ marginTop: "20px", display: "inline-block", width: "50px", height: "50px", border: "5px dashed var(--primary)", borderRadius: "50%", animation: "float 2s linear infinite" }}></div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}

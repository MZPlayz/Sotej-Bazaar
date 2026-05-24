"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  Menu,
  Leaf,
  ChevronDown
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { CATEGORIES } from "@/data/products";

export const Header: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartCount,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    couponCode,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { wishlist, toggleWishlist } = useWishlist();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);

  // Sync search input with URL search params
  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearchQuery(query);
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/shop");
    }
  };

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess(false);

    if (!couponInput.trim()) return;

    const success = applyCoupon(couponInput);
    if (success) {
      setCouponSuccess(true);
      setCouponInput("");
    } else {
      setCouponError("Invalid coupon. Try 'SOTEJ15' or 'FRESH20'!");
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <>
      <header className="site-header">
        <div className="header-container">
          {/* Logo */}
          <Link href="/" className="logo">
            <Leaf className="logo-icon" />
            <span className="logo-text">
              Sotej <span className="logo-sub">Bazaar</span>
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="search-bar-form">
            <input
              type="text"
              placeholder="Search fresh organic produce..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button" aria-label="Search">
              <Search size={18} />
            </button>
          </form>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <div className="nav-dropdown-wrapper">
              <Link href="/shop" className="nav-link">
                Shop <ChevronDown size={14} className="dropdown-caret" />
              </Link>
              <div className="category-dropdown-content">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    href={`/shop?category=${encodeURIComponent(cat === "All Products" ? "" : cat)}`}
                    className="dropdown-item"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/shop?category=Fruits" className="nav-link">
              Fruits
            </Link>
            <Link href="/shop?category=Vegetables" className="nav-link">
              Vegetables
            </Link>
          </nav>

          {/* Icons Action Group */}
          <div className="header-actions">
            {/* User Dashboard */}
            <Link href="/dashboard" className="action-btn" title="My Account" aria-label="Dashboard">
              <User size={22} />
            </Link>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="action-btn wishlist-btn"
              title="Wishlist"
              aria-label="Open wishlist"
            >
              <Heart size={22} />
              {wishlist.length > 0 && <span className="badge badge-wishlist">{wishlist.length}</span>}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="action-btn cart-btn-trigger"
              title="Shopping Cart"
              aria-label="Open cart"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && <span className="badge badge-cart">{cartCount}</span>}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="action-btn mobile-menu-btn"
              aria-label="Toggle mobile menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Search & Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-drawer animate-fade-in">
            <div className="mobile-drawer-header">
              <span className="logo-text text-sm">Sotej Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="close-btn" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="mobile-search-form">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mobile-search-input"
              />
              <button type="submit" className="mobile-search-btn">
                <Search size={16} />
              </button>
            </form>
            <nav className="mobile-nav-links">
              <Link href="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/shop" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                All Products
              </Link>
              {CATEGORIES.slice(1).map((cat) => (
                <Link
                  key={cat}
                  href={`/shop?category=${encodeURIComponent(cat)}`}
                  className="mobile-nav-link sub-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {cat}
                </Link>
              ))}
              <Link href="/dashboard" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                My Account
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Slider Overlay */}
      {isCartOpen && (
        <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="drawer cart-drawer animate-slide-left" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-title-group">
                <ShoppingBag size={20} className="header-icon" />
                <h2>Your Fresh Cart</h2>
                <span className="drawer-items-count">({cartCount} items)</span>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="close-btn" aria-label="Close cart">
                <X size={24} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="drawer-empty">
                <ShoppingBag size={64} className="empty-icon" />
                <h3>Your cart is empty</h3>
                <p>Add fresh, organic produce from our store to start healthy living!</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push("/shop");
                  }}
                  className="btn btn-primary"
                >
                  Shop Fresh Produce
                </button>
              </div>
            ) : (
              <>
                <div className="drawer-content cart-items-list">
                  {cart.map((item) => (
                    <div key={item.product.id} className="cart-item-card">
                      <div className="cart-item-img-wrapper">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="cart-item-img"
                        />
                      </div>
                      <div className="cart-item-details">
                        <div className="cart-item-meta">
                          <Link
                            href={`/product/${item.product.id}`}
                            className="cart-item-name"
                            onClick={() => setIsCartOpen(false)}
                          >
                            {item.product.name}
                          </Link>
                          <span className="cart-item-weight">
                            {item.product.weight} / {item.product.unit}
                          </span>
                        </div>
                        <div className="cart-item-price-qty">
                          <span className="cart-item-price">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <div className="quantity-control-small">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="qty-btn"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="qty-val">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="qty-btn"
                              disabled={item.quantity >= item.product.stockCount}
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="cart-item-remove-btn"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="drawer-footer">
                  {/* Coupon Area */}
                  <div className="coupon-section">
                    {couponCode ? (
                      <div className="active-coupon-badge">
                        <Tag size={14} className="coupon-tag-icon" />
                        <span>
                          Applied: <strong>{couponCode}</strong>
                        </span>
                        <button onClick={removeCoupon} className="remove-coupon-btn" aria-label="Remove coupon">
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleCouponSubmit} className="coupon-form">
                        <input
                          type="text"
                          placeholder="Promo code (e.g. SOTEJ15)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="coupon-input"
                        />
                        <button type="submit" className="coupon-btn">
                          Apply
                        </button>
                      </form>
                    )}
                    {couponError && <p className="coupon-msg error-msg">{couponError}</p>}
                    {couponSuccess && (
                      <p className="coupon-msg success-msg">Awesome! Coupon code applied successfully.</p>
                    )}
                  </div>

                  {/* Summary Pricing */}
                  <div className="cart-summary-breakdown">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>${cartSubtotal.toFixed(2)}</span>
                    </div>
                    {cartDiscount > 0 && (
                      <div className="summary-row discount-row">
                        <span>Discount</span>
                        <span>-${cartDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="summary-row total-row">
                      <span>Total Est.</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button onClick={handleCheckoutClick} className="btn btn-primary btn-checkout w-full">
                    Proceed to Secure Checkout
                    <ChevronDown size={16} className="arrow-right-rotated" />
                  </button>

                  <p className="shipping-hint-text">
                    🎉 Free premium organic shipping on orders over $50.00!
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Wishlist Drawer Overlay */}
      {isWishlistOpen && (
        <div className="drawer-overlay" onClick={() => setIsWishlistOpen(false)}>
          <div className="drawer wishlist-drawer animate-slide-left" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-title-group">
                <Heart size={20} className="header-icon heart-red" />
                <h2>Saved Fresh Items</h2>
                <span className="drawer-items-count">({wishlist.length})</span>
              </div>
              <button onClick={() => setIsWishlistOpen(false)} className="close-btn" aria-label="Close wishlist">
                <X size={24} />
              </button>
            </div>

            {wishlist.length === 0 ? (
              <div className="drawer-empty">
                <Heart size={64} className="empty-icon heart-muted" />
                <h3>Your wishlist is empty</h3>
                <p>Tap the heart icon on any product to save it for later!</p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    router.push("/shop");
                  }}
                  className="btn btn-secondary"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              <div className="drawer-content wishlist-items-list">
                {wishlist.map((product) => (
                  <div key={product.id} className="wishlist-item-card">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="wishlist-item-img"
                    />
                    <div className="wishlist-item-details">
                      <Link
                        href={`/product/${product.id}`}
                        className="wishlist-item-name"
                        onClick={() => setIsWishlistOpen(false)}
                      >
                        {product.name}
                      </Link>
                      <span className="wishlist-item-price">${product.price.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="wishlist-item-remove-btn"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

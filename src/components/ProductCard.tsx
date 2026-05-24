"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="product-card">
      {/* Card Header Media */}
      <Link href={`/product/${product.id}`} className="product-card-media-link">
        <div className="product-card-media">
          <img src={product.image} alt={product.name} className="product-card-img" />

          {/* Organic Label */}
          {product.isOrganic && (
            <span className="organic-tag-badge">Organic</span>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`card-wishlist-toggle ${isSaved ? "saved" : ""}`}
            aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={16} fill={isSaved ? "var(--accent-red)" : "transparent"} />
          </button>
        </div>
      </Link>

      {/* Card Info */}
      <div className="product-card-info">
        <div className="card-category-rating">
          <span className="card-category">{product.category}</span>
          <div className="card-rating">
            <Star className="star-icon" size={12} fill="var(--accent-yellow)" />
            <span>{product.rating}</span>
          </div>
        </div>

        <h3 className="product-card-title">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <p className="product-card-weight">
          {product.weight} / {product.unit}
        </p>

        {/* Pricing & Add to Cart */}
        <div className="product-card-footer">
          <div className="price-box">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="old-price">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="card-add-btn"
            disabled={!product.inStock}
            title={product.inStock ? "Add to Cart" : "Out of Stock"}
            aria-label="Add to Cart"
          >
            <ShoppingBag size={16} />
            <span className="add-btn-text">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

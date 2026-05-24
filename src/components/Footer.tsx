"use client";

import React from "react";
import Link from "next/link";
import { Leaf, ShieldCheck, Truck, RefreshCw, Star } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      {/* Values Banner */}
      <div className="footer-values-banner">
        <div className="value-item">
          <Truck className="value-icon" />
          <div className="value-text">
            <h4>Free Premium Delivery</h4>
            <p>On orders above $50.00</p>
          </div>
        </div>
        <div className="value-item">
          <ShieldCheck className="value-icon" />
          <div className="value-text">
            <h4>100% Certified Organic</h4>
            <p>Direct farm-to-table source</p>
          </div>
        </div>
        <div className="value-item">
          <RefreshCw className="value-icon" />
          <div className="value-text">
            <h4>Instant Replacement</h4>
            <p>No questions asked guarantee</p>
          </div>
        </div>
        <div className="value-item">
          <Star className="value-icon" />
          <div className="value-text">
            <h4>Award-Winning Taste</h4>
            <p>Curated premium quality</p>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <Link href="/" className="logo">
              <Leaf className="logo-icon" />
              <span className="logo-text text-white">
                Sotej <span className="logo-sub text-green">Bazaar</span>
              </span>
            </Link>
            <p className="brand-description">
              Sotej Bazaar is an ultra-premium organic grocery boutique bringing you the freshest,
              healthiest, and most flavorful field-to-table produce. Experience pure taste as nature intended.
            </p>
            <div className="social-links">
              <span className="social-icon">FB</span>
              <span className="social-icon">IG</span>
              <span className="social-icon">TW</span>
              <span className="social-icon">YT</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3>Explore Sotej</h3>
            <ul className="footer-links">
              <li>
                <Link href="/shop">All Products</Link>
              </li>
              <li>
                <Link href="/shop?category=Fruits">Fresh Fruits</Link>
              </li>
              <li>
                <Link href="/shop?category=Vegetables">Crisp Vegetables</Link>
              </li>
              <li>
                <Link href="/shop?category=Dairy%20%26%20Eggs">Dairy & Free-Range Eggs</Link>
              </li>
              <li>
                <Link href="/shop?category=Pantry%20%26%20Groceries">Organic Pantry</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-col">
            <h3>Customer Care</h3>
            <ul className="footer-links">
              <li>
                <Link href="/dashboard">My Account</Link>
              </li>
              <li>
                <Link href="/checkout">Secure Checkout</Link>
              </li>
              <li>
                <a href="#shipping-policy">Shipping & Freshness Guarantee</a>
              </li>
              <li>
                <a href="#faqs">Frequently Asked Questions</a>
              </li>
              <li>
                <a href="#contact">Get in Touch</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col contact-col">
            <h3>Sotej HQ</h3>
            <p className="contact-item">
              <strong>Location:</strong> Gulshan 2, Dhaka, Bangladesh
            </p>
            <p className="contact-item">
              <strong>Support Email:</strong> fresh@sotejbazaar.com
            </p>
            <p className="contact-item">
              <strong>Hotline:</strong> +880 1700 SOTEJ (76835)
            </p>
            <div className="newsletter-box">
              <h4>Fresh Updates</h4>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email..." className="newsletter-input" required />
                <button type="submit" className="newsletter-btn">
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            © {new Date().getFullYear()} Sotej Bazaar. Created with 💚 for Premium Healthy Living.
          </p>
          <div className="payment-gateways">
            <span className="payment-badge">Visa</span>
            <span className="payment-badge">Mastercard</span>
            <span className="payment-badge">Amex</span>
            <span className="payment-badge">Bkash</span>
            <span className="payment-badge">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

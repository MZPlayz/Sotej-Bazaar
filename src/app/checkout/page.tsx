"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle,
  Clock,
  ArrowLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Checkout() {
  const { cart, cartSubtotal, cartDiscount, cartTotal, clearCart } = useCart();

  // Checkout Multi-Step States
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");
  
  // Billing Form Fields
  const [form, setForm] = useState({
    firstName: "Meskat",
    lastName: "Rahman",
    email: "fresh@meskat.me",
    phone: "+880 1712 345678",
    address: "House 45, Road 12, Block G, Gulshan 2",
    city: "Dhaka",
    zipCode: "1212",
    cardNumber: "4111 2222 3333 4444",
    cardExpiry: "12/28",
    cardCvc: "385"
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderSummary, setPlacedOrderSummary] = useState<any>(null);

  const shippingCost = useMemo(() => {
    if (shippingMethod === "express") return 9.99;
    return cartSubtotal >= 50 ? 0 : 4.99;
  }, [shippingMethod, cartSubtotal]);

  const finalTotal = useMemo(() => {
    return cartTotal + shippingCost;
  }, [cartTotal, shippingCost]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!form.firstName.trim()) errors.firstName = "First name required";
    if (!form.lastName.trim()) errors.lastName = "Last name required";
    if (!form.email.trim() || !form.email.includes("@")) errors.email = "Valid email required";
    if (!form.phone.trim()) errors.phone = "Phone contact required";
    if (!form.address.trim()) errors.address = "Delivery address required";
    if (!form.city.trim()) errors.city = "City required";
    
    if (paymentMethod === "card") {
      if (!form.cardNumber.trim()) errors.cardNumber = "Card digits required";
      if (!form.cardExpiry.trim()) errors.cardExpiry = "Expiry date required";
      if (!form.cardCvc.trim()) errors.cardCvc = "CVC code required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate order placement API latency
    setTimeout(() => {
      setIsSubmitting(false);
      setPlacedOrderSummary({
        items: [...cart],
        subtotal: cartSubtotal,
        discount: cartDiscount,
        shipping: shippingCost,
        total: finalTotal,
        address: `${form.address}, ${form.city} - ${form.zipCode}`,
        email: form.email,
        phone: form.phone,
        invoiceId: `SB-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      });
      setOrderPlaced(true);
      clearCart(); // Wipe active basket
    }, 1500);
  };

  // If order is completed successfully, render Order Confirmation View
  if (orderPlaced && placedOrderSummary) {
    return (
      <div className="container animate-fade-in" style={{ padding: "40px 0" }}>
        <div className="confirmation-container animate-slide-up">
          <div className="confirmation-icon-box">
            <CheckCircle size={44} />
          </div>
          
          <h1 className="confirmation-title">Fresh Harvest Ordered!</h1>
          <p className="confirmation-desc">
            Your transaction has settled. Invoice <strong>#{placedOrderSummary.invoiceId}</strong> has been sent to <strong>{placedOrderSummary.email}</strong>.
          </p>

          {/* Delivery Tracker Simulation */}
          <div className="delivery-tracker-box">
            <div className="delivery-tracker-header">
              <span>🚚 SOTEJ TRACKER</span>
              <span>Est. Delivery: <strong>Today within 3 hours</strong></span>
            </div>
            
            <div className="tracker-timeline">
              <div className="tracker-timeline-fill"></div>
              
              <div className="tracker-node active">
                <div className="tracker-dot">
                  <CheckCircle size={14} />
                </div>
                <span className="tracker-label">Harvested</span>
              </div>

              <div className="tracker-node active">
                <div className="tracker-dot">
                  <Clock size={14} />
                </div>
                <span className="tracker-label">Sanitizing</span>
              </div>

              <div className="tracker-node active">
                <div className="tracker-dot">
                  <Truck size={14} />
                </div>
                <span className="tracker-label">Eco-Courier</span>
              </div>

              <div className="tracker-node">
                <div className="tracker-dot">
                  <ShieldCheck size={14} />
                </div>
                <span className="tracker-label">At Table</span>
              </div>
            </div>
          </div>

          {/* Invoice summary table */}
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: "800", marginBottom: "16px", textAlign: "left" }}>Invoice Details</h3>
          <table className="invoice-summary-table">
            <tbody>
              <tr className="invoice-row">
                <th>Order Date</th>
                <td>{placedOrderSummary.date}</td>
              </tr>
              <tr className="invoice-row">
                <th>Delivery Address</th>
                <td style={{ maxWidth: "250px", wordBreak: "break-all" }}>{placedOrderSummary.address}</td>
              </tr>
              <tr className="invoice-row">
                <th>Phone Contact</th>
                <td>{placedOrderSummary.phone}</td>
              </tr>
              <tr className="invoice-row">
                <th>Subtotal</th>
                <td>${placedOrderSummary.subtotal.toFixed(2)}</td>
              </tr>
              {placedOrderSummary.discount > 0 && (
                <tr className="invoice-row" style={{ color: "var(--accent-mint)" }}>
                  <th>Active Promo Discount</th>
                  <td>-${placedOrderSummary.discount.toFixed(2)}</td>
                </tr>
              )}
              <tr className="invoice-row">
                <th>Eco-Shipping</th>
                <td>{placedOrderSummary.shipping === 0 ? "FREE" : `$${placedOrderSummary.shipping.toFixed(2)}`}</td>
              </tr>
              <tr className="invoice-row invoice-total-row">
                <th>Total Paid</th>
                <td>${placedOrderSummary.total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <Link href="/shop" className="btn btn-primary">
              Continue Healthy Shopping
            </Link>
            <Link href="/dashboard" className="btn btn-secondary">
              View Order History
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty during checkout
  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: "100px 24px", textAlign: "center" }}>
        <ShoppingBag size={64} className="empty-icon" style={{ margin: "0 auto 20px auto", color: "var(--border-light)" }} />
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "28px", marginBottom: "10px" }}>Your checkout basket is empty</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "30px" }}>You cannot checkout without adding fresh organic harvests first.</p>
        <Link href="/shop" className="btn btn-primary">
          Explore Organic Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      <div style={{ marginBottom: "30px" }}>
        <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "600", color: "var(--primary)" }}>
          <ArrowLeft size={16} /> Return to catalog
        </Link>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "36px", fontWeight: "800", marginTop: "12px", color: "var(--primary-dark)" }}>Secure Checkout</h1>
      </div>

      <div className="checkout-page-grid">
        {/* Left billing & payment form */}
        <form onSubmit={handlePlaceOrder} className="checkout-steps-box animate-slide-up">
          {/* Step 1: Address Details */}
          <div className="checkout-step-header">
            <span className="step-num-badge">1</span>
            <h3>Organic Shipping Coordinates</h3>
          </div>

          <div className="billing-form-grid">
            <div className="form-label-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleInputChange}
                className="form-input"
              />
              {formErrors.firstName && <span className="error-msg" style={{ fontSize: "11px" }}>{formErrors.firstName}</span>}
            </div>

            <div className="form-label-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleInputChange}
                className="form-input"
              />
              {formErrors.lastName && <span className="error-msg" style={{ fontSize: "11px" }}>{formErrors.lastName}</span>}
            </div>

            <div className="form-label-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className="form-input"
              />
              {formErrors.email && <span className="error-msg" style={{ fontSize: "11px" }}>{formErrors.email}</span>}
            </div>

            <div className="form-label-group">
              <label htmlFor="phone">Phone Hotline</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                className="form-input"
              />
              {formErrors.phone && <span className="error-msg" style={{ fontSize: "11px" }}>{formErrors.phone}</span>}
            </div>

            <div className="form-label-group col-span-2">
              <label htmlFor="address">Full Delivery Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={form.address}
                onChange={handleInputChange}
                className="form-input"
              />
              {formErrors.address && <span className="error-msg" style={{ fontSize: "11px" }}>{formErrors.address}</span>}
            </div>

            <div className="form-label-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={form.city}
                onChange={handleInputChange}
                className="form-input"
              />
              {formErrors.city && <span className="error-msg" style={{ fontSize: "11px" }}>{formErrors.city}</span>}
            </div>

            <div className="form-label-group">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={form.zipCode}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          {/* Step 2: Shipping Options */}
          <div className="checkout-step-header" style={{ marginTop: "40px" }}>
            <span className="step-num-badge">2</span>
            <h3>Sotej Fresh-Crate Courier Mode</h3>
          </div>

          <div className="shipping-options-list">
            <div
              onClick={() => setShippingMethod("standard")}
              className={`shipping-option-card ${shippingMethod === "standard" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="shipping"
                checked={shippingMethod === "standard"}
                onChange={() => setShippingMethod("standard")}
                aria-label="Eco-Friendly Ground Standard Courier"
              />
              <div className="shipping-option-meta">
                <h4>Eco-Friendly Ground Standard Courier</h4>
                <p>Delivered inside ventilated paper baskets in 3-5 hours.</p>
              </div>
              <span className="shipping-price">{cartSubtotal >= 50 ? "FREE" : "$4.99"}</span>
            </div>

            <div
              onClick={() => setShippingMethod("express")}
              className={`shipping-option-card ${shippingMethod === "express" ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="shipping"
                checked={shippingMethod === "express"}
                onChange={() => setShippingMethod("express")}
                aria-label="Direct Express Hydro-Pack Air Courier"
              />
              <div className="shipping-option-meta">
                <h4>Direct Express Hydro-Pack Air Courier</h4>
                <p>Delivered inside high-humidity organic cooling crates in under 90 minutes.</p>
              </div>
              <span className="shipping-price">$9.99</span>
            </div>
          </div>

          {/* Step 3: Payment */}
          <div className="checkout-step-header" style={{ marginTop: "40px" }}>
            <span className="step-num-badge">3</span>
            <h3>Boutique Settlement Gate</h3>
          </div>

          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`btn btn-secondary ${paymentMethod === "card" ? "active" : ""}`}
              style={{ flexGrow: 1, padding: "12px", display: "flex", gap: "8px", justifyContent: "center" }}
            >
              <CreditCard size={18} /> Credit or Debit Card
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("cod")}
              className={`btn btn-secondary ${paymentMethod === "cod" ? "active" : ""}`}
              style={{ flexGrow: 1, padding: "12px", display: "flex", gap: "8px", justifyContent: "center" }}
            >
              🚚 Cash on Delivery (COD)
            </button>
          </div>

          {paymentMethod === "card" ? (
            <div className="payment-card-input-box animate-slide-up">
              <div className="form-label-group col-span-2">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="4111 2222 3333 4444"
                />
                {formErrors.cardNumber && <span className="error-msg" style={{ fontSize: "11px" }}>{formErrors.cardNumber}</span>}
              </div>
              <div className="form-label-group">
                <label htmlFor="cardExpiry">Expiration MM/YY</label>
                <input
                  type="text"
                  id="cardExpiry"
                  name="cardExpiry"
                  value={form.cardExpiry}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="MM/YY"
                />
                {formErrors.cardExpiry && <span className="error-msg" style={{ fontSize: "11px" }}>{formErrors.cardExpiry}</span>}
              </div>
              <div className="form-label-group">
                <label htmlFor="cardCvc">CVC Security Code</label>
                <input
                  type="text"
                  id="cardCvc"
                  name="cardCvc"
                  value={form.cardCvc}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="3-digit"
                />
                {formErrors.cardCvc && <span className="error-msg" style={{ fontSize: "11px" }}>{formErrors.cardCvc}</span>}
              </div>
            </div>
          ) : (
            <div className="payment-card-input-box animate-slide-up" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Truck style={{ color: "var(--primary)" }} />
              <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>Great choice. You will pay our eco-courier agent directly in Cash or Mobile BKash once you inspect the crop freshness at your doorstep.</span>
            </div>
          )}
        </form>

        {/* Right order summary panel */}
        <aside className="order-summary-sidebar animate-slide-up">
          <h3>Your Organic Harvest</h3>
          
          <div className="summary-items-list">
            {cart.map((item) => (
              <div key={item.product.id} className="summary-item-row">
                <img src={item.product.image} alt={item.product.name} className="summary-item-img" />
                <div className="summary-item-name-qty">
                  <span className="summary-item-name">{item.product.name}</span>
                  <span className="summary-item-qty">{item.quantity}x {item.product.weight}</span>
                </div>
                <span className="summary-item-price">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", backgroundColor: "var(--primary-light)", padding: "16px", borderRadius: "var(--radius-sm)", marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: "600" }}>${cartSubtotal.toFixed(2)}</span>
            </div>
            {cartDiscount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--accent-mint)" }}>
                <span>Applied Coupon discount</span>
                <span style={{ fontWeight: "700" }}>-${cartDiscount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
              <span>Sotej Eco-Shipping</span>
              <span style={{ fontWeight: "600" }}>{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "800", color: "var(--primary)", borderTop: "1px dashed var(--border-light)", paddingTop: "10px", marginTop: "6px" }}>
              <span>Total Bill</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            className="btn btn-primary w-full"
            style={{ padding: "16px" }}
          >
            {isSubmitting ? (
              <span>Settling Eco Transaction...</span>
            ) : (
              <>
                Confirm secure organic order <ChevronRight size={16} />
              </>
            )}
          </button>

          <p style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "var(--text-muted)", marginTop: "14px" }}>
            <ShieldCheck size={14} style={{ color: "var(--accent-mint)" }} /> 256-bit Bank-Level Cryptographic Security
          </p>
        </aside>
      </div>
    </div>
  );
}

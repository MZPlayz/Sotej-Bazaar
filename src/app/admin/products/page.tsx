"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Check,
  X,
  Star,
  Layers,
  ChevronDown,
  Sparkles,
  ArrowUpDown,
  ShoppingBag,
} from "lucide-react";
import { PRODUCTS, CATEGORIES, Product } from "@/data/products";

export default function AdminProducts() {
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);

  // Filter products
  const filteredProducts = productsList.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Products" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this premium product?")) {
      setProductsList(productsList.filter((p) => p.id !== id));
    }
  };

  const handleEditClick = (product: Product) => {
    setCurrentProduct({ ...product });
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleCreateClick = () => {
    setCurrentProduct({
      id: "p" + (productsList.length + 1),
      name: "",
      category: "Fruits",
      price: 0,
      oldPrice: undefined,
      rating: 5.0,
      reviewsCount: 1,
      weight: "1 kg",
      unit: "bag",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80",
      description: "",
      longDescription: "",
      isOrganic: true,
      certification: "USDA Organic",
      inStock: true,
      stockCount: 10,
      nutrition: {
        calories: "0 kcal",
        protein: "0g",
        carbs: "0g",
        fat: "0g"
      },
      features: []
    });
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;

    if (isCreating) {
      setProductsList([currentProduct as Product, ...productsList]);
    } else {
      setProductsList(productsList.map((p) => (p.id === currentProduct.id ? (currentProduct as Product) : p)));
    }
    
    setIsEditing(false);
    setIsCreating(false);
    setCurrentProduct(null);
  };

  const handleNutritionChange = (key: string, value: string) => {
    if (!currentProduct) return;
    setCurrentProduct({
      ...currentProduct,
      nutrition: {
        ...(currentProduct.nutrition || { calories: "0 kcal", protein: "0g", carbs: "0g", fat: "0g" }),
        [key]: value
      }
    });
  };

  return (
    <div className="products-admin-container">
      {/* Header action */}
      <div className="products-admin-header">
        <div>
          <h1 className="admin-title">Boutique Inventory Catalog</h1>
          <p className="admin-subtitle">Sustainably source, curate, and configure the farm-to-table organic catalog.</p>
        </div>
        <button className="admin-btn-primary" onClick={handleCreateClick}>
          <Plus size={18} /> New Master Catalog Entry
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="catalog-filters-bar">
        <div className="search-box-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search catalog by name, category, or ID key..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-select-wrapper">
          <Filter size={16} className="filter-icon" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="select-arrow" />
        </div>
      </div>

      {/* Products Catalog Table */}
      <div className="dashboard-card-panel">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Retail Billing</th>
                <th>Unit Weight</th>
                <th>Stock Availability</th>
                <th>Eco Rating</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                    No products matched your organic search coordinates.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="table-product-cell">
                        <div className="table-product-image">
                          <img src={product.image} alt={product.name} />
                          {product.isOrganic && <span className="organic-indicator">Organic</span>}
                        </div>
                        <div className="table-product-info">
                          <span className="prod-name-bold">{product.name}</span>
                          <span className="prod-id-sub">{product.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="category-tag">{product.category}</span>
                    </td>
                    <td>
                      <div className="price-tag-cell">
                        <span className="retail-price">${product.price.toFixed(2)}</span>
                        {product.oldPrice && <span className="slash-price">${product.oldPrice.toFixed(2)}</span>}
                      </div>
                    </td>
                    <td>
                      <span className="weight-cell">{product.weight} / {product.unit}</span>
                    </td>
                    <td>
                      <div className="stock-health-cell">
                        <span className={`stock-status ${product.stockCount <= 12 ? "critical" : "healthy"}`}>
                          {product.stockCount} in reserves
                        </span>
                        <div className="stock-meter">
                          <div 
                            className={`stock-meter-fill ${product.stockCount <= 12 ? "critical" : "healthy"}`}
                            style={{ width: `${Math.min(100, (product.stockCount / 50) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="rating-bubble-cell">
                        <Star size={12} className="star-gold" />
                        <span>{product.rating.toFixed(2)} ({product.reviewsCount})</span>
                      </div>
                    </td>
                    <td>
                      <div className="actions-wrapper-cell">
                        <button className="icon-action-btn edit" onClick={() => handleEditClick(product)}>
                          <Edit2 size={14} />
                        </button>
                        <button className="icon-action-btn delete" onClick={() => handleDelete(product.id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal Overlays */}
      {(isEditing || isCreating) && currentProduct && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box animate-scale-up">
            <div className="modal-header">
              <div className="modal-title-group">
                <Sparkles size={20} className="modal-glow-spark" />
                <h3>{isCreating ? "Add Organic Boutique Asset" : `Configure Catalog Entry: ${currentProduct.id}`}</h3>
              </div>
              <button className="modal-close" onClick={() => { setIsEditing(false); setIsCreating(false); }}>
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="modal-scroll-form">
              <div className="form-sections-grid">
                {/* General Info */}
                <div className="form-section col-span-2">
                  <h4 className="form-section-title"><Layers size={14} /> Master Details</h4>
                  
                  <div className="form-label-group">
                    <label>Premium Product Name</label>
                    <input
                      type="text"
                      required
                      value={currentProduct.name || ""}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                      placeholder="e.g. Sotej Premium Heirloom Mangoes"
                    />
                  </div>

                  <div className="form-row-3">
                    <div className="form-label-group">
                      <label>Category Group</label>
                      <select
                        value={currentProduct.category || "Fruits"}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                      >
                        {CATEGORIES.filter(c => c !== "All Products").map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-label-group">
                      <label>Retail Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={currentProduct.price || 0}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })}
                      />
                    </div>

                    <div className="form-label-group">
                      <label>Original Price ($) - Optional</label>
                      <input
                        type="number"
                        step="0.01"
                        value={currentProduct.oldPrice || ""}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, oldPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                        placeholder="Discount anchor"
                      />
                    </div>
                  </div>
                </div>

                {/* Packaging info */}
                <div className="form-section">
                  <h4 className="form-section-title"><Layers size={14} /> Logistics Weight</h4>
                  <div className="form-row-2">
                    <div className="form-label-group">
                      <label>Standard Weight</label>
                      <input
                        type="text"
                        required
                        value={currentProduct.weight || ""}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, weight: e.target.value })}
                        placeholder="e.g. 500g"
                      />
                    </div>
                    <div className="form-label-group">
                      <label>Packaging Unit</label>
                      <input
                        type="text"
                        required
                        value={currentProduct.unit || ""}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, unit: e.target.value })}
                        placeholder="e.g. glass jar, clamshell"
                      />
                    </div>
                  </div>
                </div>

                {/* Stock Controls */}
                <div className="form-section">
                  <h4 className="form-section-title"><Layers size={14} /> Warehouse Stock</h4>
                  <div className="form-row-2">
                    <div className="form-label-group">
                      <label>Available Count</label>
                      <input
                        type="number"
                        required
                        value={currentProduct.stockCount || 0}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, stockCount: parseInt(e.target.value), inStock: parseInt(e.target.value) > 0 })}
                      />
                    </div>
                    <div className="form-label-group" style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "20px" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          checked={currentProduct.isOrganic ?? true}
                          onChange={(e) => setCurrentProduct({ ...currentProduct, isOrganic: e.target.checked })}
                          style={{ width: "16px", height: "16px" }}
                        />
                        Organic Certified
                      </label>
                    </div>
                  </div>
                </div>

                {/* Description & URLs */}
                <div className="form-section col-span-2">
                  <h4 className="form-section-title"><Layers size={14} /> Media Assets & Narratives</h4>
                  
                  <div className="form-label-group">
                    <label>Premium Asset Image Link (Unsplash/CDN)</label>
                    <input
                      type="url"
                      required
                      value={currentProduct.image || ""}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
                    />
                  </div>

                  <div className="form-label-group">
                    <label>Short Description (Under card view)</label>
                    <textarea
                      rows={2}
                      required
                      value={currentProduct.description || ""}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                    />
                  </div>

                  <div className="form-label-group">
                    <label>Full Story-Telling Long Description (Main Product Details page)</label>
                    <textarea
                      rows={4}
                      required
                      value={currentProduct.longDescription || ""}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, longDescription: e.target.value })}
                    />
                  </div>
                </div>

                {/* Nutrition Card */}
                <div className="form-section col-span-2">
                  <h4 className="form-section-title"><Layers size={14} /> Certification & Hydro-Nutrition Coordinates</h4>
                  <div className="form-row-2">
                    <div className="form-label-group">
                      <label>Official Certification Signature</label>
                      <input
                        type="text"
                        value={currentProduct.certification || ""}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, certification: e.target.value })}
                        placeholder="e.g. USDA Organic & Fair Trade"
                      />
                    </div>
                    <div className="form-row-4">
                      <div className="form-label-group">
                        <label>Calories</label>
                        <input
                          type="text"
                          value={currentProduct.nutrition?.calories || ""}
                          onChange={(e) => handleNutritionChange("calories", e.target.value)}
                        />
                      </div>
                      <div className="form-label-group">
                        <label>Protein</label>
                        <input
                          type="text"
                          value={currentProduct.nutrition?.protein || ""}
                          onChange={(e) => handleNutritionChange("protein", e.target.value)}
                        />
                      </div>
                      <div className="form-label-group">
                        <label>Carbs</label>
                        <input
                          type="text"
                          value={currentProduct.nutrition?.carbs || ""}
                          onChange={(e) => handleNutritionChange("carbs", e.target.value)}
                        />
                      </div>
                      <div className="form-label-group">
                        <label>Fat</label>
                        <input
                          type="text"
                          value={currentProduct.nutrition?.fat || ""}
                          onChange={(e) => handleNutritionChange("fat", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="modal-actions-footer">
                <button type="button" className="btn-cancel" onClick={() => { setIsEditing(false); setIsCreating(false); }}>
                  Discard
                </button>
                <button type="submit" className="btn-submit">
                  Deploy to Sotej Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .products-admin-container {
          display: flex;
          flex-direction: column;
          gap: 28px;
          animation: fadeIn 0.4s ease-out;
        }

        .products-admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .admin-title {
          font-family: 'Outfit', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #f1f5f9;
          margin-bottom: 4px;
        }

        .admin-subtitle {
          font-size: 14px;
          color: #94a3b8;
        }

        .admin-btn-primary {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        }

        .admin-btn-primary:hover {
          transform: translateY(-1.5px);
          box-shadow: 0 6px 16px rgba(34, 197, 94, 0.4);
        }

        /* Filter bar */
        .catalog-filters-bar {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .search-box-wrapper {
          flex-grow: 1;
          position: relative;
          min-width: 280px;
        }

        .search-box-wrapper input {
          width: 100%;
          background: #131720;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 12px 16px 12px 44px;
          color: #f1f5f9;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }

        .search-box-wrapper input:focus {
          border-color: #22c55e;
          box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.15);
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #475569;
        }

        .category-select-wrapper {
          position: relative;
          width: 220px;
        }

        .category-select-wrapper select {
          width: 100%;
          background: #131720;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 12px 36px 12px 40px;
          color: #f1f5f9;
          font-size: 14px;
          outline: none;
          cursor: pointer;
          appearance: none;
          transition: all 0.2s;
        }

        .category-select-wrapper select:focus {
          border-color: #22c55e;
        }

        .filter-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #475569;
        }

        .select-arrow {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #475569;
          pointer-events: none;
        }

        /* Table custom designs */
        .table-product-cell {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .table-product-image {
          position: relative;
          width: 50px;
          height: 50px;
          border-radius: 8px;
          overflow: hidden;
          background: #000;
          flex-shrink: 0;
        }

        .table-product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .organic-indicator {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: #22c55e;
          color: white;
          font-size: 8px;
          font-weight: 800;
          text-align: center;
          padding: 1px 0;
          text-transform: uppercase;
        }

        .prod-name-bold {
          display: block;
          font-weight: 600;
          color: #f1f5f9;
          font-size: 14px;
        }

        .prod-id-sub {
          display: block;
          font-size: 11px;
          color: #475569;
        }

        .category-tag {
          background: rgba(255,255,255,0.04);
          color: #94a3b8;
          font-size: 12px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.04);
        }

        .price-tag-cell {
          display: flex;
          flex-direction: column;
        }

        .retail-price {
          font-weight: 700;
          color: #4ade80;
          font-size: 15px;
        }

        .slash-price {
          font-size: 11px;
          color: #475569;
          text-decoration: line-through;
        }

        .weight-cell {
          font-size: 13px;
          color: #94a3b8;
        }

        .stock-health-cell {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 120px;
        }

        .stock-status {
          font-size: 11px;
          font-weight: 600;
        }

        .stock-status.healthy { color: #4ade80; }
        .stock-status.critical { color: #f87171; }

        .stock-meter {
          height: 4px;
          background: rgba(255,255,255,0.08);
          border-radius: 99px;
          overflow: hidden;
        }

        .stock-meter-fill {
          height: 100%;
          border-radius: 99px;
        }

        .stock-meter-fill.healthy { background: #22c55e; }
        .stock-meter-fill.critical { background: #ef4444; }

        .rating-bubble-cell {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 258, 0, 0.04);
          border: 1px solid rgba(251, 191, 36, 0.15);
          color: #fbbf24;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 8px;
        }

        .star-gold {
          fill: #fbbf24;
        }

        .actions-wrapper-cell {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }

        .icon-action-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.06);
          background: transparent;
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .icon-action-btn.edit:hover {
          background: rgba(34, 197, 94, 0.1);
          color: #4ade80;
          border-color: rgba(34, 197, 94, 0.3);
        }

        .icon-action-btn.delete:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
          border-color: rgba(239, 68, 68, 0.3);
        }

        /* Modal Overlay design */
        .admin-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .admin-modal-box {
          background: #131720;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          overflow: hidden;
        }

        .modal-header {
          padding: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .modal-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .modal-glow-spark {
          color: #4ade80;
        }

        .modal-title-group h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #f1f5f9;
        }

        .modal-close {
          background: transparent;
          border: none;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
        }

        .modal-close:hover {
          color: #f87171;
        }

        .modal-scroll-form {
          flex-grow: 1;
          overflow-y: auto;
          padding: 32px;
        }

        .form-sections-grid {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .form-section {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-section-title {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #4ade80;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
        }

        .form-label-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label-group label {
          font-size: 12px;
          font-weight: 600;
          color: #94a3b8;
        }

        .form-label-group input, 
        .form-label-group select, 
        .form-label-group textarea {
          background: #0f1117;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          padding: 10px 14px;
          color: #f1f5f9;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }

        .form-label-group input:focus, 
        .form-label-group select:focus, 
        .form-label-group textarea:focus {
          border-color: #22c55e;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-row-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
        }

        .form-row-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .modal-actions-footer {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 24px;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          background: #11141c;
        }

        .btn-cancel {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          color: #94a3b8;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-cancel:hover {
          background: rgba(255,255,255,0.05);
          color: white;
        }

        .btn-submit {
          background: #22c55e;
          border: none;
          color: white;
          padding: 12px 28px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-submit:hover {
          background: #16a34a;
        }

        @media (max-width: 600px) {
          .form-row-2, .form-row-3, .form-row-4 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

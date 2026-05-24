import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) {
    return {
      title: "Product Not Found - Sotej Bazaar",
    };
  }
  return {
    title: `${product.name} - Sotej Bazaar Premium Organics`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container" style={{ padding: "100px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "32px", marginBottom: "16px" }}>Organic Product Not Found</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "30px" }}>The fresh crop segment you are searching for is either out of season or has a different index ID.</p>
        <Link href="/shop" className="btn btn-primary">
          Back to Fresh Catalog
        </Link>
      </div>
    );
  }

  // Curate related products: items matching the same category, excluding the current one, capped at 4
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}

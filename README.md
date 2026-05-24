# 🌿 Sotej Bazaar - Premium Organic E-Boutique

Welcome to **Sotej Bazaar** (Bengali: সতেজ বাজার, meaning *"Fresh Market"*), an ultra-premium, high-fidelity farm-to-table organic e-commerce experience. Built on Next.js 15, React 19, and TypeScript, this platform is meticulously crafted to showcase pure taste as nature intended.

The design utilizes a rich, custom HSL-tailored forest green and mint aesthetic, micro-animations, glassmorphic layout models, and premium workflows that provide a stunning first impression.

---

## ✨ Features at a Glance

### 1. 🌿 Premium Organic Design & Aesthetics
- **HSL Curated System**: Designed with forest greens (`hsl(142, 72%, 29%)`), vibrant mints (`hsl(146, 75%, 48%)`), glowing golds, and deep slate/charcoals.
- **Micro-Interactions**: Hover scales, elegant floating icons, elastic sliders, and fluid tab transitions.
- **Vanilla CSS Core**: Free of bulky tailwind configs. Complete layouts, cards, and tables designed using premium responsive grid sheets (`globals.css`).

### 2. 🌾 High-Fidelity Organic Marketplace (Shop Catalog)
- **Daily Fresh Harvests**: Featuring premium organic fruits, heirloom veggies, artisanal goat cheeses, and Japanese ceremonial matchas.
- **Multidimensional Filters**: Sidebar filtering by category (with real-time crop counts), an elastic price range slider, and an "Organic-Only" USDA toggle.
- **Advanced Sorting**: Sort instantly by price (ascending/descending), organic customer ratings, or review counts.
- **Dynamic Search Syncing**: Instant site-wide search matching titles, descriptors, and crop categories.

### 3. 🛍 Real-Time Sliding Basements (Drawers)
- **Sotej Interactive Drawer**: Slide-out shopping cart drawer showing active selections, subtotal estimates, custom shipping counters, and live item quantity adjusters.
- **Active Promotional Coupons**: Interactive inputs that apply organic promo codes:
  - `SOTEJ15`: Claims an instant **15% off** subtotal discount.
  - `FRESH20`: Claims an instant **20% off** subtotal discount.
- **S Saved-Items Drawer**: Slide-out wishlist storage allowing customers to bookmark seasonal harvests and move them instantly into the cart.

### 4. 🛒 Dynamic Purchase & Dynamic Detail Pages
- **Certifications SPEC Blocks**: Showing organic stamps, regional farm source co-ops, and expected shelf-lives.
- **Interactive tabbed Accordions**: Accordions exploring soil biology integrity and laboratory-tested macro-nutrients (energy, protein, carbohydrates, lipids).
- **Curated Accompaniments**: Carousel displaying related crop selections in matching taste categories.

### 5. 💳 Complete Multi-Step Checkout Flow
- **Interactive Validation Form**: In-browser billing, address coordinates, and email receipt captures.
- **Sotej Courier Crates**: Selection between free Ground Courier or Express Air Cooling Crates (humidity-controlled).
- **Secure Transaction Screen**: A gorgeous order confirmation screen immediately showing invoices and a live order delivery tracker timeline.

### 6. 🏆 Carbon-Impact Customer Dashboard
- **Carbon-Offset Stats**: Stat grids summarizing total carbon-emission offsets, saved trees, and supported local co-ops.
- **Order Log Table**: Chronological log of orders showing invoice numbers, courier styles, and green status badges.
- **Coordinates Modifier**: Interactive form to edit registered names, telephone hotlines, and addresses.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Logic**: [React 19](https://react.dev/) (Hooks, Client Components, Server-side meta boundaries)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type matrices)
- **State Architecture**: React Context API with LocalStorage persistence (`CartContext`, `WishlistContext`)
- **Iconography**: [Lucide React](https://lucide.dev/) (SVG vectors)
- **Styling**: Vanilla CSS Variables and Modern Typography System (Google Fonts *Outfit* & *Inter*)

---

## 📂 Codebase Architecture

```text
Sotej Bazaar/
├── src/
│   ├── app/
│   │   ├── globals.css           # Premium HSL Design Tokens, Layouts, & Animations
│   │   ├── layout.tsx            # Root Layout, Metadata, & Core Context Providers
│   │   ├── page.tsx              # Home Page (Hero, real-time Category preview, Promo Banners)
│   │   ├── shop/
│   │   │   └── page.tsx          # Shop page catalog with Sidebar filters & Suspense safety
│   │   ├── product/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Dynamic Server Routing and product lookup
│   │   ├── checkout/
│   │   │   └── page.tsx          # Multi-step checkout & Live Delivery progress tracking
│   │   └── dashboard/
│   │       └── page.tsx          # Customer Dashboard & carbon offset metrics
│   ├── components/
│   │   ├── Header.tsx            # Navigation, Live Cart drawer, & Promo validations
│   │   ├── Footer.tsx            # Brand bio, quick links, and farm guarantees
│   │   ├── ProductCard.tsx       # Hover-scale card, wishlist toggle, and add controls
│   │   └── ProductDetailClient.tsx # Multi-spec page with tabs and accordion animations
│   ├── context/
│   │   ├── CartContext.tsx       # Core Cart State & LocalStorage sync
│   │   └── WishlistContext.tsx   # Core Saved-Items & bookmarking states
│   └── data/
│       └── products.ts           # Unified static organic products database
├── package.json                  # Next.js dependencies and runscripts
├── tsconfig.json                 # Typecompiler settings
├── next.config.ts                # Next.js optimization rules
├── next-env.d.ts                 # TS Environment declarations
└── .gitignore                    # Version control exclusion rules
```

---

## 🚀 Running Locally

To get Sotej Bazaar up and running on your machine:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open the browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to experience **Sotej Bazaar**!

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 💡 Organic Coupon Codes to Test
Open your sliding cart drawer and type the following codes:
- **`SOTEJ15`** - Claim **15% off** on your cart total.
- **`FRESH20`** - Claim **20% off** on your cart total.

---

Created with 💚 for Premium Healthy Living. Enjoy the fresh experience!

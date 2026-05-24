export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  weight: string;
  unit: string;
  image: string;
  description: string;
  longDescription: string;
  isOrganic: boolean;
  certification: string;
  inStock: boolean;
  stockCount: number;
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
  features: string[];
}

export const CATEGORIES = [
  "All Products",
  "Fruits",
  "Vegetables",
  "Dairy & Eggs",
  "Pantry & Groceries",
  "Herbs & Drinks"
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Fresh Organic Strawberries",
    category: "Fruits",
    price: 6.99,
    oldPrice: 8.50,
    rating: 4.9,
    reviewsCount: 142,
    weight: "450g",
    unit: "clamshell",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80",
    description: "Ultra-sweet, juicy strawberries harvested at peak ripeness from certified organic farms.",
    longDescription: "Our premium Sotej Organic Strawberries are grown with extreme care on local family-owned farms. Never exposed to chemical fertilizers or synthetic pesticides, these strawberries represent the pure taste of nature. Every single berry is hand-picked at sunrise when the natural sugar content is at its highest, providing you with a succulent, nutrient-rich explosion of flavor.",
    isOrganic: true,
    certification: "USDA Organic & Fair Trade",
    inStock: true,
    stockCount: 18,
    nutrition: {
      calories: "144 kcal",
      protein: "3.2g",
      carbs: "34.6g",
      fat: "1.4g"
    },
    features: [
      "100% Certified Organic",
      "Hand-picked daily at sunrise",
      "Rich in Vitamin C and natural antioxidants",
      "Sustainably packaged in biodegradable clamshells"
    ]
  },
  {
    id: "p2",
    name: "Premium Hass Avocados",
    category: "Fruits",
    price: 7.49,
    rating: 4.8,
    reviewsCount: 98,
    weight: "4 pcs",
    unit: "pack",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",
    description: "Creamy, buttery, and packed with healthy fats. Perfect for gourmet guacamole or artisanal toast.",
    longDescription: "Sourced from high-altitude volcanic soils, our organic Hass Avocados are famous for their rich, buttery texture and signature nutty flavor. Picked just before fully ripening, they will arrive at your doorstep in perfect condition, ready to eat within 1-2 days. Exceptional source of heart-healthy monounsaturated fats and essential minerals.",
    isOrganic: true,
    certification: "GlobalG.A.P Organic",
    inStock: true,
    stockCount: 25,
    nutrition: {
      calories: "320 kcal (per avocado)",
      protein: "4.0g",
      carbs: "17.0g",
      fat: "29.0g"
    },
    features: [
      "Rich in monounsaturated heart-healthy fats",
      "Perfect creamy texture for spreads and salads",
      "High potassium and dietary fiber content",
      "Naturally pesticide-free skin"
    ]
  },
  {
    id: "p3",
    name: "Sotej Raw Wildflower Honey",
    category: "Pantry & Groceries",
    price: 14.99,
    oldPrice: 18.00,
    rating: 4.98,
    reviewsCount: 215,
    weight: "500g",
    unit: "glass jar",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80",
    description: "100% pure, unfiltered raw honey harvested from wild forest blossoms. Rich in enzymes.",
    longDescription: "Our signature Sotej Wildflower Honey is a masterpiece of nature. Gathered from deep forest wildflowers, it is extracted directly from the hives without any heating, ultra-filtration, or blending. This preserves all the beneficial pollen, live enzymes, and complex floral aromas that make raw honey a true healing elixir. Every jar tells the story of thousands of wildflowers.",
    isOrganic: true,
    certification: "Non-GMO & Organic Certified",
    inStock: true,
    stockCount: 12,
    nutrition: {
      calories: "304 kcal (per 100g)",
      protein: "0.3g",
      carbs: "82.0g",
      fat: "0.0g"
    },
    features: [
      "Unpasteurized and raw, retaining all active enzymes",
      "Deep amber color with complex botanical undertones",
      "Natural antibiotic and immune-supporting qualities",
      "Collected by ethically managed beekeeping cooperatives"
    ]
  },
  {
    id: "p4",
    name: "Crisp Organic Romaine Lettuce",
    category: "Vegetables",
    price: 3.49,
    rating: 4.7,
    reviewsCount: 76,
    weight: "1 head",
    unit: "piece",
    image: "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=600&auto=format&fit=crop&q=80",
    description: "Crunchy, deeply hydrated leaves grown hydrophilically with natural nutrients.",
    longDescription: "This crisp Romaine Lettuce is cultivated using advanced horizontal aquaponic methods, resulting in beautiful, pesticide-free, densely packed leaves that are constantly hydrated with nutrient-rich water. Expect supreme crunchiness and clean, refreshing minerals in every bite. Perfectly suited for classic Caesar salads or fresh healthy wraps.",
    isOrganic: true,
    certification: "Hydro-Organic Certified",
    inStock: true,
    stockCount: 30,
    nutrition: {
      calories: "17 kcal",
      protein: "1.2g",
      carbs: "3.3g",
      fat: "0.3g"
    },
    features: [
      "Aquaponically grown with 90% less water usage",
      "Remarkably crisp, long shelf-life",
      "Thoroughly pre-washed with purified water",
      "Zero chemical residue or heavy metals"
    ]
  },
  {
    id: "p5",
    name: "Premium Heirloom Tomatoes",
    category: "Vegetables",
    price: 5.99,
    oldPrice: 6.99,
    rating: 4.9,
    reviewsCount: 110,
    weight: "1 kg",
    unit: "bag",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",
    description: "Stunning, multi-colored legacy tomatoes with rich, sweet, and complex acidic notes.",
    longDescription: "Our Heirloom Tomatoes are legacy varieties passed down through generations for their unmatched flavor, rather than shelf-life. Grown in sunny open fields, these beautiful, colorful, and irregularly shaped tomatoes offer a symphony of sweetness, acidity, and umami. They represent what tomatoes are supposed to taste like before industrial farming.",
    isOrganic: true,
    certification: "USDA Organic",
    inStock: true,
    stockCount: 15,
    nutrition: {
      calories: "18 kcal (per 100g)",
      protein: "0.9g",
      carbs: "3.9g",
      fat: "0.2g"
    },
    features: [
      "Grown from legacy, non-hybridized seeds",
      "Extraordinarily flavorful and succulent texture",
      "Superb source of Lycopene and Vitamin A",
      "Perfect for classic Caprese salads or fresh pasta sauces"
    ]
  },
  {
    id: "p6",
    name: "Farm-Fresh Free-Range Eggs",
    category: "Dairy & Eggs",
    price: 5.49,
    rating: 4.95,
    reviewsCount: 312,
    weight: "12 pcs",
    unit: "carton",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=600&auto=format&fit=crop&q=80",
    description: "Deep orange yolks, thick whites, gathered from pasture-raised hens with organic feed.",
    longDescription: "Our chickens are not just cage-free; they live outdoors on lush green pastures, grazing on grass, seeds, and insects. This rich natural diet produces eggs with structurally superior thick whites and beautiful, deep-golden orange yolks that are brimming with Omega-3 fatty acids and Vitamin D. You will notice the rich, creamy difference instantly.",
    isOrganic: true,
    certification: "Certified Humane & Pasture-Raised",
    inStock: true,
    stockCount: 40,
    nutrition: {
      calories: "70 kcal (per egg)",
      protein: "6.0g",
      carbs: "0.6g",
      fat: "5.0g"
    },
    features: [
      "Pasture-raised on certified pesticide-free pastures",
      "No antibiotics, hormones, or animal by-products used",
      "Contains 3x more Vitamin E and 2x more Omega-3 than standard eggs",
      "Collected fresh daily and hand-sorted"
    ]
  },
  {
    id: "p7",
    name: "Ceremonial Grade Matcha Powder",
    category: "Herbs & Drinks",
    price: 24.99,
    oldPrice: 29.99,
    rating: 4.92,
    reviewsCount: 128,
    weight: "50g",
    unit: "tin",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80",
    description: "Shade-grown, stone-ground ceremonial green tea leaves imported from Uji, Kyoto.",
    longDescription: "Directly imported from the historical mist-shrouded fields of Uji, Kyoto, our ceremonial grade matcha is produced from first-harvest Tencha leaves. Shaded for 4 weeks before harvesting to boost chlorophyll and L-theanine levels, these leaves are then gently stone-ground into a vibrant, brilliant green powder. It delivers a incredibly smooth, umami-rich drink with zero bitterness.",
    isOrganic: true,
    certification: "JAS Certified Organic",
    inStock: true,
    stockCount: 10,
    nutrition: {
      calories: "3 kcal (per serving)",
      protein: "0.5g",
      carbs: "0.4g",
      fat: "0.0g"
    },
    features: [
      "100% Ceremonial Grade, first spring harvest",
      "Vibrant electric-green color signaling high chlorophyll",
      "Rich in L-theanine for calm, sustained focus without jitters",
      "Finely stone-ground in traditional granite mills"
    ]
  },
  {
    id: "p8",
    name: "Artisanal Goat Cheese Log",
    category: "Dairy & Eggs",
    price: 8.99,
    rating: 4.86,
    reviewsCount: 65,
    weight: "200g",
    unit: "roll",
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=600&auto=format&fit=crop&q=80",
    description: "Creamy, slightly tangy goat cheese hand-rolled and infused with organic herbs.",
    longDescription: "Our artisanal goat cheese is handcrafted in small batches using 100% grass-fed goat's milk from a local boutique dairy. Naturally pasteurized and cultured, it is rolled by hand and lightly dusted with sea salt and organic herbs (rosemary, thyme, and oregano). Exceptionally smooth, spreadable, and easy to digest, with a wonderfully clean and tangy finish.",
    isOrganic: true,
    certification: "Local Sustainable Organic",
    inStock: true,
    stockCount: 8,
    nutrition: {
      calories: "160 kcal (per 50g)",
      protein: "10.0g",
      carbs: "1.0g",
      fat: "13.0g"
    },
    features: [
      "100% Grass-Fed Goat Milk from pasture-raised goats",
      "No artificial preservatives, stabilizers, or thickeners",
      "A2 dairy protein structure for extremely easy digestion",
      "Infused with locally gathered organic field herbs"
    ]
  },
  {
    id: "p9",
    name: "Organic Fresh Sweet Mint",
    category: "Herbs & Drinks",
    price: 2.49,
    rating: 4.75,
    reviewsCount: 43,
    weight: "100g",
    unit: "bunch",
    image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&auto=format&fit=crop&q=80",
    description: "Intensely aromatic, freshly cut mint leaves. Perfect for infusions, cooking, or mocktails.",
    longDescription: "Our organic Mint is harvested daily from rich compost-nourished greenhouse soils. The leaves are picked young when the essential menthol oils are highly concentrated, creating a sweet, robustly cool, and aromatic herb. Ideal for fresh herbal tea infusions, culinary accents, or making standard refreshing cucumber-mint coolers.",
    isOrganic: true,
    certification: "USDA Organic",
    inStock: true,
    stockCount: 50,
    nutrition: {
      calories: "4 kcal",
      protein: "0.2g",
      carbs: "0.8g",
      fat: "0.1g"
    },
    features: [
      "Cut fresh every morning to preserve hydration",
      "Intense menthol and aromatic oil concentration",
      "Completely organic, grown without synthetic sprays",
      "Delivered in protective ventilated paper packaging"
    ]
  },
  {
    id: "p10",
    name: "Cold-Pressed Extra Virgin Olive Oil",
    category: "Pantry & Groceries",
    price: 19.99,
    oldPrice: 24.00,
    rating: 4.97,
    reviewsCount: 185,
    weight: "750ml",
    unit: "bottle",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80",
    description: "Premium single-estate Koroneiki olives cold-pressed within hours of harvest.",
    longDescription: "This rare single-estate extra virgin olive oil is pressed exclusively from early-harvest Koroneiki olives, renowned for their incredible antioxidant density. Ground and cold-pressed mechanically at temperatures below 22°C, the result is a beautiful bright golden-green elixir with a vibrant grassy aroma, complex notes of green tomato, and a signature peppery antioxidant finish.",
    isOrganic: true,
    certification: "PDO Protected & Certified Organic",
    inStock: true,
    stockCount: 14,
    nutrition: {
      calories: "824 kcal (per 100ml)",
      protein: "0.0g",
      carbs: "0.0g",
      fat: "91.6g"
    },
    features: [
      "First cold mechanical extraction only (unrefined)",
      "Extremely low acidity (typically <0.3%)",
      "Rich in polyphenols and monounsaturated oleic acids",
      "UV-protected dark green glass bottle to preserve flavor profile"
    ]
  }
];

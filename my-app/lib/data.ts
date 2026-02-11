import { Product, Category } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 349,
    description: "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and plush memory foam ear cushions for all-day comfort.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    category: "Audio",
    features: ["Active Noise Cancellation", "30-hour battery", "Bluetooth 5.2", "Premium leather"],
    inStock: true,
  },
  {
    id: "2",
    name: "Minimalist Leather Watch",
    price: 299,
    description: "A timeless piece crafted from genuine Italian leather and surgical grade stainless steel. Water-resistant up to 50 meters with sapphire crystal glass.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    category: "Accessories",
    features: ["Italian leather strap", "Sapphire crystal", "Water resistant", "Swiss movement"],
    inStock: true,
  },
  {
    id: "3",
    name: "Smart Home Speaker",
    price: 199,
    description: "Fill your home with rich, immersive sound. Voice-controlled with built-in smart assistant. Seamlessly connects with your smart home ecosystem.",
    image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&q=80",
    category: "Audio",
    features: ["360° sound", "Voice control", "Multi-room audio", "Smart home hub"],
    inStock: true,
  },
  {
    id: "4",
    name: "Designer Sunglasses",
    price: 189,
    description: "Handcrafted acetate frames with polarized lenses. UV400 protection with anti-reflective coating. Includes premium leather case.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
    category: "Accessories",
    features: ["Polarized lenses", "UV400 protection", "Handcrafted acetate", "Premium case"],
    inStock: true,
  },
  {
    id: "5",
    name: "Mechanical Keyboard",
    price: 249,
    description: "Premium mechanical keyboard with hot-swappable switches. Aircraft-grade aluminum frame with customizable RGB backlighting.",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80",
    category: "Tech",
    features: ["Hot-swappable switches", "RGB backlighting", "Aluminum frame", "USB-C"],
    inStock: true,
  },
  {
    id: "6",
    name: "Leather Messenger Bag",
    price: 399,
    description: "Handcrafted full-grain leather messenger bag with laptop compartment. Ages beautifully with a unique patina over time.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    category: "Bags",
    features: ["Full-grain leather", "Laptop compartment", "Brass hardware", "Adjustable strap"],
    inStock: true,
  },
  {
    id: "7",
    name: "Wireless Charging Pad",
    price: 79,
    description: "Fast wireless charging with premium aluminum construction. LED indicator and foreign object detection for safety.",
    image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=800&q=80",
    category: "Tech",
    features: ["15W fast charging", "Aluminum build", "LED indicator", "Case compatible"],
    inStock: true,
  },
  {
    id: "8",
    name: "Ceramic Coffee Set",
    price: 129,
    description: "Artisan-crafted ceramic coffee set including pour-over dripper and two mugs. Microwave and dishwasher safe.",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&q=80",
    category: "Home",
    features: ["Handcrafted ceramic", "Pour-over style", "Dishwasher safe", "Set of 3"],
    inStock: true,
  },
  {
    id: "9",
    name: "Premium Notebook",
    price: 49,
    description: "Lay-flat binding with 240 pages of premium 100gsm paper. Leather cover with ribbon bookmark and elastic closure.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
    category: "Stationery",
    features: ["Lay-flat binding", "100gsm paper", "Leather cover", "Ribbon bookmark"],
    inStock: true,
  },
  {
    id: "10",
    name: "Smart Fitness Tracker",
    price: 159,
    description: "Advanced fitness tracking with heart rate monitoring and sleep analysis. 7-day battery life with water resistance.",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80",
    category: "Tech",
    features: ["Heart rate monitor", "Sleep tracking", "7-day battery", "Water resistant"],
    inStock: true,
  },
  {
    id: "11",
    name: "Minimalist Desk Lamp",
    price: 119,
    description: "Adjustable LED desk lamp with touch controls and USB charging port. Eye-care technology with 5 color temperatures.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    category: "Home",
    features: ["LED technology", "Touch controls", "USB charging", "5 color modes"],
    inStock: true,
  },
  {
    id: "12",
    name: "Canvas Backpack",
    price: 179,
    description: "Waxed canvas backpack with leather trim. Padded laptop sleeve and multiple compartments for organization.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    category: "Bags",
    features: ["Waxed canvas", "Leather trim", "Laptop sleeve", "Water resistant"],
    inStock: true,
  },
];

export const categories: Category[] = [
  {
    id: "audio",
    name: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    productCount: 2,
  },
  {
    id: "tech",
    name: "Tech",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600&q=80",
    productCount: 3,
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    productCount: 2,
  },
  {
    id: "bags",
    name: "Bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    productCount: 2,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
}

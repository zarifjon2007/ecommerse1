import { Hero } from "@/components/home/Hero";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { ProductGrid } from "@/components/home/ProductGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <ProductGrid />
    </>
  );
}

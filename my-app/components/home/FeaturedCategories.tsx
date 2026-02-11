import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { categories } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export function FeaturedCategories() {
  return (
    <section id="categories" className="py-16 md:py-24 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Shop by Category
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our carefully curated collections designed for modern living
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/#products`}
              className="group relative overflow-hidden rounded-xl aspect-[4/5] bg-slate-100"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-semibold text-white">
                  {category.name}
                </h3>
                <p className="mt-1 text-sm text-slate-300">
                  {category.productCount} Products
                </p>
                <div className="mt-3 flex items-center text-sm font-medium text-white opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Shop Now
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Container } from "@/components/layout/Container";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductGrid() {
  return (
    <section id="products" className="py-16 md:py-24 bg-slate-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Handpicked items that combine exceptional quality with modern aesthetics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}

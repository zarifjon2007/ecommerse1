import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export function Hero() {
  return (
    <section className="relative w-full bg-slate-50">
      <Container>
        <div className="flex flex-col lg:flex-row items-center py-16 md:py-24 lg:py-32 gap-12 lg:gap-16">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
              Elevate Your
              <span className="block text-indigo-600">Everyday</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0">
              Discover our curated collection of premium products designed for those who appreciate quality craftsmanship and timeless design.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/#products">
                <Button size="lg" className="group">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/#categories">
                <Button variant="outline" size="lg">
                  Explore Categories
                </Button>
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8 text-sm text-slate-500">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-slate-900">12k+</span>
                <span>Happy Customers</span>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-slate-900">50+</span>
                <span>Premium Products</span>
              </div>
              <div className="h-10 w-px bg-slate-200 hidden sm:block" />
              <div className="flex flex-col items-center lg:items-start hidden sm:flex">
                <span className="text-2xl font-bold text-slate-900">Free</span>
                <span>Shipping</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
                alt="Premium lifestyle products"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

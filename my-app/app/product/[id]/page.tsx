import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Truck, Shield, RotateCcw } from "lucide-react";
import { getProductById, products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export function generateMetadata({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }
  
  return {
    title: `${product.name} | LUXE`,
    description: product.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  // Get related products (same category, excluding current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const benefits = [
    { icon: Truck, text: "Free shipping on orders over $100" },
    { icon: Shield, text: "2-year warranty included" },
    { icon: RotateCcw, text: "30-day return policy" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Container>
        {/* Breadcrumb */}
        <div className="py-6">
          <Link
            href="/#products"
            className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 py-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <Badge variant="secondary" className="w-fit mb-4">
              {product.category}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              {product.name}
            </h1>
            
            <p className="mt-4 text-3xl font-semibold text-indigo-600">
              {formatPrice(product.price)}
            </p>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                  Key Features
                </h3>
                <ul className="mt-4 space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-600 mr-3 flex-shrink-0" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add to Cart */}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <AddToCartButton product={product} />
            </div>

            {/* Benefits */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <benefit.icon className="h-5 w-5 text-slate-400" />
                  <span className="text-sm text-slate-600">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="py-16 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

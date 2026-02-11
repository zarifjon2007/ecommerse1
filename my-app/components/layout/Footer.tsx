import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: "All Products", href: "/#products" },
      { label: "Categories", href: "/#categories" },
      { label: "New Arrivals", href: "/" },
      { label: "Best Sellers", href: "/" },
    ],
    support: [
      { label: "Contact Us", href: "/" },
      { label: "FAQs", href: "/" },
      { label: "Shipping", href: "/" },
      { label: "Returns", href: "/" },
    ],
    company: [
      { label: "About Us", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Press", href: "/" },
      { label: "Sustainability", href: "/" },
    ],
  };

  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="text-xl font-bold text-slate-900 tracking-tight">
                LUXE
              </Link>
              <p className="mt-4 text-sm text-slate-500 max-w-xs">
                Curated luxury products for the modern lifestyle. Quality craftsmanship meets timeless design.
              </p>
            </div>

            {/* Shop Links */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Shop</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Support</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Company</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-slate-400">
              {currentYear} LUXE. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

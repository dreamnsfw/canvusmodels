import Link from "next/link";
import { Sparkles } from "lucide-react";

const footerLinks = {
  Product: [
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
  Resources: [
    { href: "/blog", label: "Documentation" },
    { href: "/contact", label: "Support" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-bg-deep overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <Sparkles size={20} className="text-accent-400" />
              <span>CanvasModels</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-secondary)' }}>
              Generate stunning AI images and videos with a simple credit system. One platform, infinite creativity.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-3">
              <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-accent-400"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm" style={{ borderColor: 'var(--border-default)', color: 'var(--text-tertiary)' }}>
          &copy; {new Date().getFullYear()} CanvasModels. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

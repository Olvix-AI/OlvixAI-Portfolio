"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedWave } from "./animated-wave";

// `badge` is optional and currently unused — the "Hiring" pill came out with the Careers
// link. Typing it here rather than inferring keeps the badge rendering below valid for
// when there is something true to put in it.
type FooterLink = { name: string; href: string; badge?: string };

// Section anchors are prefixed with "/" so they resolve from /portfolio and /contact,
// not just from the landing page.
const footerLinks: Record<string, FooterLink[]> = {
  Services: [
    { name: "New builds", href: "/#services" },
    { name: "AI integration", href: "/#services" },
    { name: "How we work", href: "/#how-we-work" },
    { name: "Capabilities", href: "/#stack" },
  ],
  Work: [
    { name: "All work", href: "/portfolio" },
    { name: "PowerUp", href: "/portfolio/powerup" },
    { name: "Agentic Decks", href: "/portfolio/agentic-decks" },
    { name: "HRXpert", href: "/portfolio/hrxpert" },
    { name: "KairosAI", href: "/portfolio/kairosai" },
  ],
  Company: [
    { name: "Get a quote", href: "/contact" },
    { name: "FAQ", href: "/#faq" },
    { name: "hello@olvix.io", href: "mailto:hello@olvix.io" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Ownership", href: "/#ownership" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", href: "#" },
  { name: "GitHub", href: "#" },
  { name: "X", href: "#" },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function FooterSection() {
  return (
    <footer className="relative border-t border-foreground/10">
      {/* Animated wave background */}
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <Link href="/" className={`inline-flex items-center gap-2 mb-6 rounded-sm ${focusRing}`}>
                <span className="text-2xl font-display">OlvixAI</span>
                <span className="text-xs text-muted-foreground font-mono">.io</span>
              </Link>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
                AI products, built end to end. Four engineers covering AI, web, mobile and
                cloud &mdash; idea to production, one team.
              </p>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group rounded-sm ${focusRing}`}
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={`text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 rounded-sm ${focusRing}`}
                      >
                        {link.name}
                        {link.badge && (
                          <span className="text-xs px-2 py-0.5 bg-foreground text-background rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 OlvixAI. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Taking on new projects
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

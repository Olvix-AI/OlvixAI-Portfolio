import type { Metadata } from "next";

import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ContactSection } from "@/components/contact/contact-section";
import { ContactFaq } from "@/components/contact/contact-faq";

export const metadata: Metadata = {
  title: "Get a quote — OlvixAI",
  description:
    "Tell us what you're building. We'll come back within two working days with what it takes, what it costs, and whether we're the right team for it.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <ContactSection />
      <ContactFaq />
      {/* No CTA section here on purpose — a CTA on the contact page is a dead
          end. The page closes with the footer. */}
      <FooterSection />
    </main>
  );
}

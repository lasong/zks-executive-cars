import { MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us — ZKS Executive Cars",
  description: "Get in touch with ZKS Executive Cars.",
};

export default function ContactPage() {
  return (
    <div className="bg-background px-4 py-16 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-4xl text-foreground mb-3">Contact Us</h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-10">
          Have a question about an upcoming journey, or want to discuss a
          booking? We&apos;d love to hear from you.
        </p>

        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 mb-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 shrink-0 rounded-full bg-gold/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-display text-lg text-foreground mb-1">
                ZKS Executive Cars
              </h2>
              <address className="text-muted-foreground text-sm sm:text-base leading-relaxed not-italic">
                Kings House
                <br />
                St John&apos;s Square
                <br />
                Wolverhampton, WV2 4DT
              </address>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Ready to travel?{" "}
          <Link
            href="/#book"
            className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors"
          >
            Book your journey
          </Link>{" "}
          and we&apos;ll send your confirmation by SMS.
        </p>
      </div>
    </div>
  );
}

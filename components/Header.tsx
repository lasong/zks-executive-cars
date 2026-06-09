import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="ZKS Executive Cars"
            width={480}
            height={160}
            priority
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* CTA */}
        <a
          href="#book"
          className="bg-gold text-primary-foreground text-sm font-semibold px-5 py-2 rounded hover:bg-gold-light active:scale-95 transition-all"
        >
          Book Now
        </a>
      </div>
    </header>
  );
}

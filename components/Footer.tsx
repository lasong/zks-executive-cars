import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-luxury-black border-t border-luxury-dark py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-white/50 text-xs">
        <p>© {new Date().getFullYear()} ZKS Executive Cars. All rights reserved.</p>
        <nav className="flex items-center gap-5">
          <Link href="/contact" className="hover:text-gold transition-colors">
            Contact
          </Link>
          <Link href="/privacy-policy" className="hover:text-gold transition-colors">
            Privacy Policy
          </Link>
        </nav>
        <p className="text-gold/70">Your Journey. Our Priority.</p>
      </div>
    </footer>
  );
}

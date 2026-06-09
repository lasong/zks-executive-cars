import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-display text-8xl text-gold/20 font-bold mb-4">404</p>
        <h1 className="font-display text-3xl text-foreground mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-gold text-primary-foreground font-semibold px-6 py-3 rounded hover:bg-gold-light transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

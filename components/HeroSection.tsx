import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative bg-background pt-12 pb-20 px-4 sm:px-6 overflow-hidden border-b border-border">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none hero-glow" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center relative">
        {/* Text */}
        <div className="text-center md:text-left">
          <p className="text-gold text-xs font-semibold tracking-[0.35em] uppercase mb-5">
            Premium UK Car Hire
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-5">
            Your Journey.<br />
            <span className="text-gold">Our Priority.</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
            Arrive in style with ZKS Executive Cars. Professional chauffeurs, immaculate vehicles, and guaranteed punctuality across the UK.
          </p>
          <a
            href="#book"
            className="inline-block bg-gold text-primary-foreground font-bold px-8 py-4 rounded hover:bg-gold-light active:scale-95 transition-all text-base"
          >
            Book Your Journey
          </a>
        </div>

        {/* Hero image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/hero-image.png"
            alt="ZKS Executive Cars"
            width={930}
            height={930}
            priority
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}

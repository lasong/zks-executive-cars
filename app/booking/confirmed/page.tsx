import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;

  return (
    <div className="min-h-[80vh] bg-background flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-gold" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-display text-4xl text-foreground mb-3">
          Booking Confirmed
        </h1>
        <p className="text-muted-foreground text-base mb-8 max-w-xs mx-auto leading-relaxed">
          Your journey has been booked. We will contact you shortly with full pickup details.
        </p>

        {/* Reference box */}
        {ref && (
          <div className="bg-card border border-gold/25 rounded-xl p-5 mb-8">
            <p className="text-muted-foreground text-xs tracking-widest uppercase mb-2">
              Booking Reference
            </p>
            <p className="font-mono text-gold text-2xl tracking-[0.2em] font-semibold">
              {ref.slice(-8).toUpperCase()}
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              Save this reference — you may be asked for it.
            </p>
          </div>
        )}

        {/* SMS notice */}
        <p className="text-muted-foreground text-sm mb-8">
          An SMS confirmation has been sent to your mobile number.
        </p>

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
}

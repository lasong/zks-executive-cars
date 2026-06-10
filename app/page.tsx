import HeroSection from "@/components/HeroSection";
import PillarsSection from "@/components/PillarsSection";
import BookingForm from "@/components/BookingForm";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PillarsSection />

      {/* Booking section */}
      <section id="book" className="bg-background py-16 px-4 sm:px-6 border-b border-border">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              Ready to travel?
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-3">
              Book Your Journey
            </h2>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Fill in your details below and receive an instant SMS confirmation.
            </p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
}

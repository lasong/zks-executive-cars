import { Shield, UserCheck, Star, Clock } from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "Safe & Reliable",
    desc: "Every vehicle is fully insured, regularly serviced, and GPS-tracked for your peace of mind.",
  },
  {
    icon: UserCheck,
    title: "Professional Drivers",
    desc: "All drivers are DBS checked, licensed, and trained to the highest customer service standards.",
  },
  {
    icon: Star,
    title: "Premium Service",
    desc: "From meet-and-greet to complimentary bottled water — every detail matters to us.",
  },
  {
    icon: Clock,
    title: "Always On Time",
    desc: "We monitor traffic and flights in real time to ensure you are never kept waiting.",
  },
];

export default function PillarsSection() {
  return (
    <section className="bg-secondary py-16 px-4 sm:px-6 border-b border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-card border border-border hover:border-gold/50 rounded-xl p-6 transition-colors group shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                <Icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display text-foreground text-lg mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

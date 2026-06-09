import Image from "next/image";
import { cn } from "@/lib/utils";

interface VehicleCardProps {
  id: "executive-sedan" | "premium-mpv";
  label: string;
  description: string;
  passengers: string;
  selected: boolean;
  onSelect: () => void;
}

export default function VehicleCard({
  id,
  label,
  description,
  passengers,
  selected,
  onSelect,
}: VehicleCardProps) {
  const imageSrc = id === "executive-sedan" ? "/sedan.png" : "/mpv.png";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative w-full rounded-xl border-2 p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
        selected
          ? "border-gold bg-gold/5 shadow-[0_0_24px_rgba(212,175,55,0.15)]"
          : "border-border bg-background hover:border-gold/50 shadow-sm"
      )}
    >
      {/* Selected checkmark */}
      {selected && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gold flex items-center justify-center">
          <svg viewBox="0 0 10 10" className="w-3 h-3" aria-hidden="true">
            <polyline
              points="1.5,5 4,7.5 8.5,2.5"
              stroke="#0A0A0A"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Vehicle image */}
      <div className="flex justify-center mb-3 py-2">
        <Image
          src={imageSrc}
          alt={label}
          width={512}
          height={512}
          className="w-full max-w-[120px] h-auto object-contain"
        />
      </div>

      <p className="font-semibold text-foreground text-sm">{label}</p>
      <p className="text-muted-foreground text-xs mt-0.5">{description}</p>
      <p className="text-gold text-xs mt-1.5 font-medium">{passengers}</p>
    </button>
  );
}

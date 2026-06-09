"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, User, Mail, Phone, Loader2 } from "lucide-react";

import { createBooking, type BookingFormData } from "@/actions/bookings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import VehicleCard from "@/components/VehicleCard";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  pickupLocation: z.string().min(3, "Please enter a pickup location"),
  dropoffLocation: z.string().min(3, "Please enter a drop-off location"),
  vehicleClass: z.enum(["executive-sedan", "premium-mpv"]),
  passengerName: z.string().min(2, "Name must be at least 2 characters"),
  passengerEmail: z.string().email({ error: "Please enter a valid email address" }),
  passengerPhone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .refine((v) => /^[\d\s+()-]+$/.test(v), "Phone number contains invalid characters"),
});

type FormValues = z.infer<typeof formSchema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-destructive text-xs mt-1">{message}</p>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
      {children}
    </p>
  );
}

function InputWrapper({
  icon: Icon,
  error,
  children,
}: {
  icon: React.ElementType;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <div className="[&_input]:pl-9">{children}</div>
      </div>
      <FieldError message={error} />
    </div>
  );
}

export default function BookingForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleClass: "executive-sedan",
    },
  });

  const selectedVehicle = watch("vehicleClass");

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setServerError(null);

    const result = await createBooking(values as BookingFormData);

    if (result.success) {
      router.push(`/booking/confirmed?ref=${result.bookingId}`);
    } else {
      setServerError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
      noValidate
    >
      {/* — Route — */}
      <div>
        <SectionLabel>Your Route</SectionLabel>
        <div className="space-y-3">
          <InputWrapper icon={MapPin} error={errors.pickupLocation?.message}>
            <Input
              {...register("pickupLocation")}
              placeholder="Pickup location"
              className={cn(errors.pickupLocation && "border-destructive")}
              autoComplete="street-address"
            />
          </InputWrapper>
          <InputWrapper icon={MapPin} error={errors.dropoffLocation?.message}>
            <Input
              {...register("dropoffLocation")}
              placeholder="Drop-off location"
              className={cn(errors.dropoffLocation && "border-destructive")}
              autoComplete="street-address"
            />
          </InputWrapper>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* — Vehicle — */}
      <div>
        <SectionLabel>Choose Your Vehicle</SectionLabel>
        {errors.vehicleClass && (
          <FieldError message={errors.vehicleClass.message} />
        )}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <VehicleCard
            id="executive-sedan"
            label="Executive Sedan"
            description="Comfort & style for business and personal travel"
            passengers="Up to 3 passengers"
            selected={selectedVehicle === "executive-sedan"}
            onSelect={() => setValue("vehicleClass", "executive-sedan")}
          />
          <VehicleCard
            id="premium-mpv"
            label="Premium MPV"
            description="Spacious luxury for groups and families"
            passengers="Up to 7 passengers"
            selected={selectedVehicle === "premium-mpv"}
            onSelect={() => setValue("vehicleClass", "premium-mpv")}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* — Passenger Details — */}
      <div>
        <SectionLabel>Your Details</SectionLabel>
        <div className="space-y-3">
          <div>
            <Label htmlFor="passengerName" className="text-muted-foreground text-xs mb-1.5 block">
              Full Name
            </Label>
            <InputWrapper icon={User} error={errors.passengerName?.message}>
              <Input
                id="passengerName"
                {...register("passengerName")}
                placeholder="Full name"
                className={cn(errors.passengerName && "border-destructive")}
                autoComplete="name"
              />
            </InputWrapper>
          </div>

          <div>
            <Label htmlFor="passengerEmail" className="text-muted-foreground text-xs mb-1.5 block">
              Email Address
            </Label>
            <InputWrapper icon={Mail} error={errors.passengerEmail?.message}>
              <Input
                id="passengerEmail"
                type="email"
                {...register("passengerEmail")}
                placeholder="your@email.com"
                className={cn(errors.passengerEmail && "border-destructive")}
                autoComplete="email"
              />
            </InputWrapper>
          </div>

          <div>
            <Label htmlFor="passengerPhone" className="text-muted-foreground text-xs mb-1.5 block">
              Mobile Number
            </Label>
            <InputWrapper icon={Phone} error={errors.passengerPhone?.message}>
              <Input
                id="passengerPhone"
                type="tel"
                {...register("passengerPhone")}
                placeholder="+44 7700 900000"
                className={cn(errors.passengerPhone && "border-destructive")}
                autoComplete="tel"
              />
            </InputWrapper>
          </div>
        </div>
      </div>

      {/* Server error */}
      {serverError && (
        <p className="text-destructive text-sm text-center bg-destructive/10 rounded-lg py-3 px-4">
          {serverError}
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gold hover:bg-gold-light text-primary-foreground font-bold py-4 text-base h-auto transition-all active:scale-[0.98] disabled:opacity-60"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Booking your journey…
          </span>
        ) : (
          "Confirm Booking"
        )}
      </Button>

      <p className="text-muted-foreground text-xs text-center">
        You will receive an SMS confirmation immediately after booking.
      </p>
    </form>
  );
}

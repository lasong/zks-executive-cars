export interface BookingDetails {
  bookingId: string;
  passengerName: string;
  pickupLocation: string;
  dropoffLocation: string;
  vehicleClass: string;
  bookedAt: Date;
}

export async function sendBookingSMS(phone: string, details: BookingDetails) {
  const vehicleLabel =
    details.vehicleClass === "executive-sedan"
      ? "Executive Sedan"
      : "Premium MPV";

  const bookedAtStr = details.bookedAt.toLocaleString("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/London",
  });

  const message = [
    "ZKS Executive Cars — Booking Confirmed ✓",
    `Ref: ${details.bookingId.toUpperCase()}`,
    `Passenger: ${details.passengerName}`,
    `From: ${details.pickupLocation}`,
    `To:   ${details.dropoffLocation}`,
    `Vehicle: ${vehicleLabel}`,
    `Booked: ${bookedAtStr}`,
    "",
    "Our driver will contact you shortly with arrival details.",
    "Questions? Reply to this message or visit zksexecutivecars.co.uk",
  ].join("\n");

  // Replace the console.log below with twilio.messages.create() or Infobip equivalent
  console.log(`\n[SMS SERVICE] → ${phone}\n${"─".repeat(50)}\n${message}\n${"─".repeat(50)}\n`);
}

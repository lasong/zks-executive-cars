"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendBookingSMS } from "@/lib/sms";

const bookingSchema = z.object({
  passengerName: z.string().min(2, "Name must be at least 2 characters"),
  passengerEmail: z.string().email({ error: "Please enter a valid email address" }),
  passengerPhone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .refine((v) => /^[\d\s+()-]+$/.test(v), "Phone number contains invalid characters"),
  pickupLocation: z.string().min(3, "Please enter a pickup location"),
  dropoffLocation: z.string().min(3, "Please enter a drop-off location"),
  vehicleClass: z.enum(["executive-sedan", "premium-mpv"], {
    error: "Please select a vehicle class",
  }),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export type BookingActionResult =
  | { success: true; bookingId: string }
  | { success: false; errors: Partial<Record<keyof BookingFormData | "root", string>> };

export async function createBooking(
  data: BookingFormData
): Promise<BookingActionResult> {
  const parsed = bookingSchema.safeParse(data);

  if (!parsed.success) {
    const errors: Partial<Record<keyof BookingFormData, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof BookingFormData;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { success: false, errors };
  }

  const booking = await prisma.booking.create({
    data: parsed.data,
  });

  await sendBookingSMS(booking.passengerPhone, {
    bookingId: booking.id,
    passengerName: booking.passengerName,
    pickupLocation: booking.pickupLocation,
    dropoffLocation: booking.dropoffLocation,
    vehicleClass: booking.vehicleClass,
    bookedAt: booking.createdAt,
  });

  return { success: true, bookingId: booking.id };
}

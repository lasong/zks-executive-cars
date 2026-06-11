import { Client, SmsResource } from "@seven.io/client";

const SENDER_ID = "ZKSExecCars";

export interface BookingDetails {
  reference: string;
  passengerName: string;
  passengerPhone: string;
  pickupLocation: string;
  dropoffLocation: string;
  vehicleClass: string;
}

export async function sendBookingSMS(details: BookingDetails) {
  const driverPhone = process.env.DRIVER_PHONE_NUMBER;
  if (!driverPhone) {
    throw new Error("DRIVER_PHONE_NUMBER environment variable is not set");
  }

  const vehicleLabel =
    details.vehicleClass === "executive-sedan"
      ? "Executive Sedan"
      : "Premium MPV";

  const message = [
    `Ref: ${details.reference}`,
    `Passenger: ${details.passengerName}`,
    `Phone: ${details.passengerPhone}`,
    `From: ${details.pickupLocation}`,
    `To: ${details.dropoffLocation}`,
    `Vehicle: ${vehicleLabel}`,
  ].join("\n");

  const client = new Client({ apiKey: process.env.SEVEN_IO_API_KEY! });
  const sms = new SmsResource(client);

  await sms.dispatch({
    to: [driverPhone],
    text: message,
    from: SENDER_ID,
  });
}

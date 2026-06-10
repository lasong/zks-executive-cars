// The customer-facing booking reference is derived from the last 6
// characters of the booking ID. Used for both the SMS and the
// confirmation page so the two always match.
export function getBookingReference(bookingId: string): string {
  return bookingId.slice(-6).toUpperCase();
}

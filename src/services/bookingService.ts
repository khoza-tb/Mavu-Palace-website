import type { Booking, BookingStatus } from "../types";

const STORAGE_KEY = "thom_park_lodge_bookings";

function readAll(): Booking[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Booking[]) : [];
  } catch (error) {
    console.error("Failed to load bookings:", error);
    return [];
  }
}

function writeAll(bookings: Booking[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch (error) {
    console.error("Failed to save bookings:", error);
  }
}

export function getBookings(): Booking[] {
  return readAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getBookingsForRoom(roomId: string): Booking[] {
  return readAll().filter((b) => b.roomId === roomId);
}

export function saveBooking(booking: Booking): void {
  const bookings = readAll();
  bookings.push(booking);
  writeAll(bookings);
}

export function updateBooking(id: string, updates: Partial<Booking>): void {
  const bookings = readAll().map((b) =>
    b.id === id ? { ...b, ...updates } : b
  );
  writeAll(bookings);
}

export function updateBookingStatus(id: string, status: BookingStatus): void {
  updateBooking(id, { status });
}

export function deleteBooking(id: string): void {
  writeAll(readAll().filter((b) => b.id !== id));
}

export function clearBookings(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * True if the room has no non-cancelled booking overlapping the
 * given [checkInISO, checkOutISO) window.
 */
export function isRoomAvailable(
  roomId: string,
  checkInISO: string,
  checkOutISO: string,
  excludeBookingId?: string
): boolean {
  return !getConflictingBooking(roomId, checkInISO, checkOutISO, excludeBookingId);
}

export function getConflictingBooking(
  roomId: string,
  checkInISO: string,
  checkOutISO: string,
  excludeBookingId?: string
): Booking | undefined {
  const start = new Date(checkInISO).getTime();
  const end = new Date(checkOutISO).getTime();

  return readAll().find((b) => {
    if (b.roomId !== roomId) return false;
    if (b.status === "cancelled") return false;
    if (excludeBookingId && b.id === excludeBookingId) return false;

    const bStart = new Date(b.checkIn).getTime();
    const bEnd = new Date(b.checkOut).getTime();

    // Overlap test: two ranges [start,end) and [bStart,bEnd) overlap
    // whenever start < bEnd && bStart < end.
    return start < bEnd && bStart < end;
  });
}

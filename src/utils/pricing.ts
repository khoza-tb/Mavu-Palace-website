import type { DurationKey, Room } from "../types";

export const DURATION_ORDER: DurationKey[] = [
  "2h",
  "4h",
  "6h",
  "12h",
  "overnight",
];

export const DURATION_LABELS: Record<DurationKey, string> = {
  "2h": "2 Hours",
  "4h": "4 Hours",
  "6h": "6 Hours",
  "12h": "12 Hours",
  overnight: "Overnight",
};

// Fixed checkout clock-time used for overnight stays, regardless of
// what time the guest checks in (typical short-stay lodge convention).
export const OVERNIGHT_CHECKOUT_TIME = "10:00";

const DURATION_HOURS: Record<Exclude<DurationKey, "overnight">, number> = {
  "2h": 2,
  "4h": 4,
  "6h": 6,
  "12h": 12,
};

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export function getDurationPricing(room: Room, key: DurationKey) {
  return room.pricing.find((p) => p.key === key);
}

export function getPrice(room: Room, key: DurationKey): number {
  return getDurationPricing(room, key)?.price ?? 0;
}

export function getCheapestPrice(room: Room): DurationPricingSummary {
  const sorted = [...room.pricing].sort((a, b) => a.price - b.price);
  return { key: sorted[0].key, label: sorted[0].label, price: sorted[0].price };
}

interface DurationPricingSummary {
  key: DurationKey;
  label: string;
  price: number;
}

export interface ComputedSchedule {
  checkIn: string; // ISO
  checkOut: string; // ISO
  checkOutDate: string; // YYYY-MM-DD
  checkOutTime: string; // HH:MM
}

/**
 * Given a check-in date + time and a duration, work out the exact
 * checkout date/time. Overnight bookings always check out at
 * OVERNIGHT_CHECKOUT_TIME the following day.
 */
export function computeSchedule(
  dateStr: string,
  checkInTime: string,
  duration: DurationKey
): ComputedSchedule | null {
  if (!dateStr || !checkInTime) return null;

  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm] = checkInTime.split(":").map(Number);

  if ([y, m, d, hh, mm].some((n) => Number.isNaN(n))) return null;

  const checkInDate = new Date(y, m - 1, d, hh, mm, 0, 0);
  let checkOutDate: Date;

  if (duration === "overnight") {
    const [ch, cm] = OVERNIGHT_CHECKOUT_TIME.split(":").map(Number);
    checkOutDate = new Date(y, m - 1, d + 1, ch, cm, 0, 0);
  } else {
    const hours = DURATION_HOURS[duration];
    checkOutDate = new Date(checkInDate.getTime() + hours * 60 * 60 * 1000);
  }

  const fmtDate = (dt: Date) =>
    `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`;
  const fmtTime = (dt: Date) => `${pad(dt.getHours())}:${pad(dt.getMinutes())}`;

  return {
    checkIn: checkInDate.toISOString(),
    checkOut: checkOutDate.toISOString(),
    checkOutDate: fmtDate(checkOutDate),
    checkOutTime: fmtTime(checkOutDate),
  };
}

export function generateBookingReference(): string {
  const now = new Date();
  const datePart = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
    now.getDate()
  )}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `TPL-${datePart}-${rand}`;
}

export function formatMoney(amount: number): string {
  return `R${amount.toLocaleString("en-ZA")}`;
}

export function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString("en-ZA", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

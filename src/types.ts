export type DurationKey = "2h" | "4h" | "6h" | "12h" | "overnight";

export interface DurationPricing {
  key: DurationKey;
  label: string;
  hours: number;
  price: number;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  image: string;
  guests: number;
  bed: string;
  amenities: string[];
  badge?: string;
  pricing: DurationPricing[];
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "checked-in"
  | "completed"
  | "cancelled";

export interface Booking {
  id: string;
  reference: string;

  roomId: string;
  roomName: string;

  customerName: string;
  phone: string;
  email?: string;
  guests: number;
  specialRequests?: string;

  duration: DurationKey;
  durationLabel: string;

  date: string;
  checkInTime: string;
  checkIn: string;
  checkOut: string;
  checkOutDate: string;
  checkOutTime: string;

  totalPrice: number;

  status: BookingStatus;
  createdAt: string;
}

export const STATUS_LABELS: Record<BookingStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  "checked-in": "Checked In",
  completed: "Completed",
  cancelled: "Cancelled",
};

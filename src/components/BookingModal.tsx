
import { useMemo, useState, type FormEvent } from "react";
import { X, CheckCircle2, Clock3, MessageCircle, AlertTriangle } from "lucide-react";
import type { Booking, DurationKey, Room } from "../types";
import {
  DURATION_ORDER,
  DURATION_LABELS,
  computeSchedule,
  formatMoney,
  formatDisplayDate,
  generateBookingReference,
  getPrice,
} from "../utils/pricing";
import {
  getConflictingBooking,
  saveBooking,
} from "../services/bookingService";

const WHATSAPP_NUMBER = "27665283248";

type Props = {
  room: Room;
  initialDuration?: DurationKey;
  onClose: () => void;
};

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function BookingModal({ room, initialDuration, onClose }: Props) {
  const [duration, setDuration] = useState<DurationKey>(initialDuration ?? "2h");
  const [date, setDate] = useState(todayStr());
  const [checkInTime, setCheckInTime] = useState("14:00");
  const [guests, setGuests] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const schedule = useMemo(
    () => computeSchedule(date, checkInTime, duration),
    [date, checkInTime, duration]
  );

  const totalPrice = getPrice(room, duration);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!date) return setError("Please choose a check-in date.");
    if (!checkInTime) return setError("Please choose a check-in time.");
    if (!customerName.trim()) return setError("Please enter your full name.");
    if (!phone.trim()) return setError("Please enter your phone number.");
    if (guests < 1 || guests > room.guests) {
      return setError(`This room allows up to ${room.guests} guests.`);
    }
    if (!schedule) return setError("Please check your date and time.");

    const conflict = getConflictingBooking(room.id, schedule.checkIn, schedule.checkOut);
    if (conflict) {
      setError(
        `${room.name} is already booked from ${formatDisplayDate(
          conflict.date
        )} ${conflict.checkInTime} until ${conflict.checkOutTime} on ${formatDisplayDate(
          conflict.checkOutDate
        )}. Please pick a different time, duration or date.`
      );
      return;
    }

    const booking: Booking = {
      id: crypto.randomUUID(),
      reference: generateBookingReference(),

      roomId: room.id,
      roomName: room.name,

      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      guests,
      specialRequests: specialRequests.trim() || undefined,

      duration,
      durationLabel: DURATION_LABELS[duration],

      date,
      checkInTime,
      checkIn: schedule.checkIn,
      checkOut: schedule.checkOut,
      checkOutDate: schedule.checkOutDate,
      checkOutTime: schedule.checkOutTime,

      totalPrice,

      status: "pending",
      createdAt: new Date().toISOString(),
    };

    saveBooking(booking);
    setConfirmedBooking(booking);
  }

  function whatsappUrl(booking: Booking): string {
    const message = `
Hello Mavu Palace Guest House,

I've just submitted a booking request through your website.

Reference: ${booking.reference}
Room: ${booking.roomName}
Duration: ${booking.durationLabel}

Check-in: ${formatDisplayDate(booking.date)} at ${booking.checkInTime}
Check-out: ${formatDisplayDate(booking.checkOutDate)} at ${booking.checkOutTime}

Guest: ${booking.customerName}
Phone: ${booking.phone}
Guests: ${booking.guests}
${booking.specialRequests ? `Special requests: ${booking.specialRequests}` : ""}

Total: ${formatMoney(booking.totalPrice)}

Please confirm my booking. Thank you.
    `.trim();

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 bg-white/95 backdrop-blur px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
              Mavu Palace — Book
            </p>
            <h2 className="font-serif text-xl font-bold text-blue-950">
              {room.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-stone-100 hover:text-slate-900 transition"
          >
            <X size={20} />
          </button>
        </div>

        {confirmedBooking ? (
          <div className="px-5 py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 size={34} />
            </div>

            <h3 className="mt-5 font-serif text-2xl font-bold text-blue-950">
              Booking Request Submitted
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Your booking request has been saved and is awaiting confirmation
              from Mavu Palace Guest House. Please send your details via
              WhatsApp to follow up.
            </p>

            <div className="mt-6 rounded-xl border border-stone-200 bg-stone-50 p-5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  Reference
                </span>
                <span className="font-mono font-bold text-blue-950">
                  {confirmedBooking.reference}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-gray-500">Room</span>
                <span className="font-semibold">{confirmedBooking.roomName}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-gray-500">Duration</span>
                <span className="font-semibold">{confirmedBooking.durationLabel}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-gray-500">Check-in</span>
                <span className="font-semibold">
                  {formatDisplayDate(confirmedBooking.date)}, {confirmedBooking.checkInTime}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-gray-500">Check-out</span>
                <span className="font-semibold">
                  {formatDisplayDate(confirmedBooking.checkOutDate)}, {confirmedBooking.checkOutTime}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-stone-200 pt-3">
                <span className="font-bold text-blue-950">Total</span>
                <span className="text-xl font-bold text-blue-950">
                  {formatMoney(confirmedBooking.totalPrice)}
                </span>
              </div>
            </div>

            <p className="mt-3 text-xs font-semibold text-amber-700">
              Free swimming pool access included.
            </p>

            <a
              href={whatsappUrl(confirmedBooking)}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-bold text-white transition hover:bg-green-700"
            >
              <MessageCircle size={18} />
              Send Booking via WhatsApp
            </a>

            <button
              onClick={onClose}
              className="mt-3 w-full rounded-xl border border-stone-300 py-3 font-semibold text-slate-700 transition hover:bg-stone-50"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 px-5 py-5">
            {/* DURATION */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {DURATION_ORDER.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setDuration(key)}
                    className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-sm font-semibold transition ${
                      duration === key
                        ? "border-blue-950 bg-blue-950 text-white shadow-md"
                        : "border-stone-200 bg-white text-slate-700 hover:border-blue-300"
                    }`}
                  >
                    <Clock3 size={16} />
                    {DURATION_LABELS[key]}
                    <span
                      className={
                        duration === key ? "text-amber-300" : "text-blue-950"
                      }
                    >
                      {formatMoney(getPrice(room, key))}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* DATE / TIME */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-bold text-gray-700">
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={date}
                  min={todayStr()}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-gray-700">
                  Check-in Time
                </label>
                <input
                  type="time"
                  value={checkInTime}
                  onChange={(e) => setCheckInTime(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* AUTO CHECKOUT PREVIEW */}
            {schedule && (
              <div className="flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3 text-sm">
                <span className="font-semibold text-blue-950">
                  Checkout (automatic)
                </span>
                <span className="font-bold text-blue-900">
                  {formatDisplayDate(schedule.checkOutDate)}, {schedule.checkOutTime}
                </span>
              </div>
            )}

            {/* GUESTS */}
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">
                Number of Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: room.guests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>

            {/* CONTACT DETAILS */}
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-bold text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+27 82 123 4567"
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-gray-700">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">
                Special Requests (optional)
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={2}
                placeholder="Any special requirements..."
                className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* PRICE SUMMARY */}
            <div className="rounded-lg bg-stone-50 p-4">
              <div className="flex justify-between text-sm">
                <span>Room</span>
                <span className="font-bold">{room.name}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span>Duration</span>
                <span>{DURATION_LABELS[duration]}</span>
              </div>
              <div className="mt-3 flex justify-between border-t border-stone-200 pt-3">
                <span className="font-bold">Total</span>
                <span className="text-xl font-bold text-blue-950">
                  {formatMoney(totalPrice)}
                </span>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
              💳 Payment is made at the lodge. No card payment is required
              online. Free swimming pool access is included for guests.
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-950 py-3.5 font-bold text-white shadow-sm transition hover:bg-blue-900 hover:shadow-md"
            >
              Submit Booking Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

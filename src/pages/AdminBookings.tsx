import { useEffect, useMemo, useState } from "react";
import type { Booking, BookingStatus } from "../types";
import { STATUS_LABELS } from "../types";
import {
  deleteBooking,
  getBookings,
  updateBookingStatus,
} from "../services/bookingService";
import { formatDisplayDate, formatMoney } from "../utils/pricing";

const STATUS_STYLES: Record<BookingStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  "checked-in": "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const STATUS_FLOW: BookingStatus[] = [
  "pending",
  "confirmed",
  "checked-in",
  "completed",
  "cancelled",
];

const FILTER_TABS: { label: string; value: BookingStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Checked In", value: "checked-in" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [search, setSearch] = useState("");

  function loadBookings() {
    setBookings(getBookings());
  }

  useEffect(() => {
    loadBookings();
  }, []);

  function changeStatus(id: string, status: BookingStatus) {
    updateBookingStatus(id, status);
    loadBookings();
  }

  function removeBooking(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this booking?"
    );
    if (!confirmed) return;
    deleteBooking(id);
    loadBookings();
  }

  const counts = useMemo(() => {
    const base: Record<BookingStatus, number> = {
      pending: 0,
      confirmed: 0,
      "checked-in": 0,
      completed: 0,
      cancelled: 0,
    };
    bookings.forEach((b) => {
      base[b.status] += 1;
    });
    return base;
  }, [bookings]);

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      if (statusFilter !== "all" && b.status !== statusFilter) return false;

      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const haystack = `${b.reference} ${b.customerName} ${b.phone} ${b.roomName}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [bookings, statusFilter, search]);

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="bg-blue-950 text-white p-5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold font-serif">MAVU PALACE</h1>
          <p className="text-sm opacity-80 mt-1">Admin Booking Management</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {(Object.keys(STATUS_LABELS) as BookingStatus[]).map((status) => (
            <div key={status} className="bg-white rounded-xl shadow p-4">
              <p className="text-xs text-gray-500">{STATUS_LABELS[status]}</p>
              <p className="text-2xl font-bold text-blue-950 mt-1">
                {counts[status]}
              </p>
            </div>
          ))}
        </div>

        {/* TOOLBAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                  statusFilter === tab.value
                    ? "bg-blue-950 text-white"
                    : "bg-white text-gray-600 hover:bg-stone-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reference, guest, phone, room..."
            className="w-full md:w-72 border border-stone-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="font-bold text-lg">No bookings found</h3>
            <p className="text-gray-500 text-sm mt-1">
              {bookings.length === 0
                ? "New customer bookings will appear here."
                : "Try a different filter or search term."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow p-5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-bold text-lg">{booking.roomName}</h3>

                      <span
                        className={`text-xs px-2 py-1 rounded-full font-bold ${STATUS_STYLES[booking.status]}`}
                      >
                        {STATUS_LABELS[booking.status]}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mt-1 font-mono">
                      {booking.reference}
                    </p>
                  </div>

                  <p className="text-xl font-bold text-blue-950">
                    {formatMoney(booking.totalPrice)}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Guest</p>
                    <p className="font-bold">{booking.customerName}</p>
                    <p className="text-sm text-gray-600">{booking.phone}</p>
                    {booking.email && (
                      <p className="text-xs text-gray-500">{booking.email}</p>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Guests</p>
                    <p className="font-bold">{booking.guests}</p>
                    {booking.specialRequests && (
                      <p className="text-xs text-gray-500 mt-1">
                        {booking.specialRequests}
                      </p>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="font-bold">{booking.durationLabel}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Check-in / Check-out</p>
                    <p className="font-bold">
                      {formatDisplayDate(booking.date)}, {booking.checkInTime}
                    </p>
                    <p className="text-sm text-gray-600">
                      to {formatDisplayDate(booking.checkOutDate)},{" "}
                      {booking.checkOutTime}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-5">
                  {STATUS_FLOW.map((status) => (
                    <button
                      key={status}
                      disabled={booking.status === status}
                      onClick={() => changeStatus(booking.id, status)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                        booking.status === status
                          ? "bg-stone-200 text-gray-400 cursor-not-allowed"
                          : status === "cancelled"
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : status === "completed"
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-blue-950 hover:bg-blue-900 text-white"
                      }`}
                    >
                      {STATUS_LABELS[status]}
                    </button>
                  ))}

                  <button
                    onClick={() => removeBooking(booking.id)}
                    className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

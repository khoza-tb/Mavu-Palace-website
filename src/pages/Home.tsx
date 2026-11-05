
import { useState, type ElementType } from "react";
import { Link } from "react-router-dom";
import { Clock3, Sun, Moon, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import RoomCard from "../components/RoomCard";
import BookingModal from "../components/BookingModal";
import { rooms } from "../data/rooms";
import type { DurationKey, Room } from "../types";

const QUICK_TAGS: { label: string; icon: ElementType; duration: DurationKey }[] = [
  { label: "2 Hours - R150", icon: Clock3, duration: "2h" },
  { label: "3 Hours - R250", icon: Sun, duration: "3h" },
  { label: "1 Night - R500 to R850", icon: Moon, duration: "overnight" },
];

export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [initialDuration, setInitialDuration] = useState<DurationKey>("2h");

  function openBooking(room: Room, duration?: DurationKey) {
    if (duration) setInitialDuration(duration);
    setSelectedRoom(room);
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-blue-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(180,83,9,0.22),transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-400">
            Mavu Palace Guest House
          </p>

          <h1 className="mt-5 max-w-2xl font-serif text-4xl font-bold leading-tight md:text-6xl">
            Mavu Palace Guest House
          </h1>

          <p className="mt-2 text-xl font-semibold text-white/80 md:text-2xl">
            Feel at Home · Hourly · Overnight
          </p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Relax in comfort at Mavu Palace Guest House. Enjoy affordable
            accommodation with flexible hourly and overnight stays.
            Free swimming pool access for guests.
          </p>

          <p className="mt-4 text-sm font-semibold text-amber-400">
            OPENING SPECIAL · 2 NOVEMBER – 30 NOVEMBER 2026
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {QUICK_TAGS.map(({ label, icon: Icon, duration }) => (
              <a
                key={label}
                href="#available-rooms"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-blue-950"
                onClick={() => setInitialDuration(duration)}
              >
                <Icon size={18} />
                {label}
              </a>
            ))}
          </div>

          <p className="mt-6 text-base font-semibold text-white">
            <span className="text-amber-400">Free:</span> Swimming Pool Access for Guests
          </p>

          <p className="mt-4 text-sm font-semibold text-white/80">
            Book Now: 066 528 3248 | 073 919 1087
          </p>
        </div>
      </section>

      {/* AVAILABLE ROOMS */}
      <section id="available-rooms" className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">
              Opening Special
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-blue-950 md:text-4xl">
              Available Rooms
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              1 Night: R500 – R850
            </p>
          </div>

          <Link
            to="/rooms"
            className="hidden items-center gap-1 font-semibold text-blue-950 hover:text-amber-700 md:inline-flex"
          >
            View all rooms <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onBook={(r) => openBooking(r, initialDuration)}
            />
          ))}
        </div>
      </section>

      {/* BOOKING MODAL */}
      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          initialDuration={initialDuration}
          onClose={() => setSelectedRoom(null)}
        />
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10 text-center text-sm text-white/60">
          <p className="font-serif text-lg font-bold text-white">
            MAVU PALACE GUEST HOUSE
          </p>
          <p className="mt-2">
            Feel at Home · 066 528 3248 · 073 919 1087
          </p>
          <p className="mt-1 text-white/40">
            © {new Date().getFullYear()} Mavu Palace Guest House. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}


import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BedDouble,
  Users,
  Wifi,
  ArrowRight,
  Check,
  CalendarDays,
} from "lucide-react";
import Navbar from "../components/Navbar";
import BookingModal from "../components/BookingModal";
import { rooms } from "../data/rooms";
import type { Room } from "../types";
import { getCheapestPrice, getPrice } from "../utils/pricing";

export default function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* HERO */}
      <section className="relative bg-blue-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(180,83,9,0.18),transparent_40%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-28 text-center">
          <p className="uppercase tracking-[0.35em] text-amber-400 text-sm font-semibold">
            Mavu Palace Guest House
          </p>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mt-5">
            Our Rooms
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-white/75 text-lg md:text-xl leading-relaxed">
            Discover comfortable and affordable accommodation at
            Mavu Palace Guest House. Whether you need a short
            relaxation stay or overnight accommodation, we have
            options to suit your needs.
          </p>

          <p className="mt-5 text-amber-400 text-sm font-semibold">
            OPENING SPECIAL · 2 NOVEMBER – 30 NOVEMBER 2026
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="max-w-3xl">
          <p className="uppercase tracking-[0.25em] text-amber-700 text-xs font-bold">
            Feel At Home
          </p>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-blue-950 mt-3">
            Find the right room for your stay
          </h2>

          <p className="text-gray-600 mt-4 text-lg leading-relaxed">
            Whether you need a 2-hour stay, a 3-hour stay, or
            overnight accommodation, choose a room below and
            select the duration that suits you.
          </p>

          <p className="text-amber-700 font-semibold mt-4">
            2 Hours: R150 · 3 Hours: R250 · 1 Night: R500 – R850
          </p>

          <p className="text-gray-600 mt-2 text-sm">
            Enjoy free swimming pool access for guests.
          </p>
        </div>
      </section>

      {/* ROOMS */}
      <section
        id="available-rooms"
        className="max-w-7xl mx-auto px-6 py-12"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => {
            const cheapest = getCheapestPrice(room);
            const overnight = getPrice(room, "overnight");

            return (
              <article
                key={room.id}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                {/* IMAGE */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {room.badge && (
                    <div className="absolute left-5 bottom-5">
                      <span className="inline-block bg-white/95 backdrop-blur-sm text-blue-950 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                        {room.badge}
                      </span>
                    </div>
                  )}

                  <div className="absolute right-5 bottom-5 bg-blue-950 text-white px-4 py-3 rounded-xl shadow-lg text-right">
                    <span className="text-lg font-bold">
                      R{overnight}
                    </span>
                    <span className="block text-[11px] text-white/70">
                      per night
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-blue-950">
                    {room.name}
                  </h3>

                  <p className="text-gray-600 mt-4 leading-relaxed">
                    {room.description}
                  </p>

                  <p className="text-sm text-amber-700 font-semibold mt-3">
                    From R{cheapest.price} for {cheapest.label.toLowerCase()}
                  </p>

                  {/* FEATURES */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users size={17} className="text-amber-700" />
                      <span>
                        {room.guests} {room.guests === 1 ? "Guest" : "Guests"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BedDouble size={17} className="text-amber-700" />
                      <span>{room.bed}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Wifi size={17} className="text-amber-700" />
                      <span>Wi-Fi</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Check size={17} className="text-amber-700" />
                      <span>Clean & private</span>
                    </div>
                  </div>

                  {/* ACTION */}
                  <button
                    onClick={() => setSelectedRoom(room)}
                    className="mt-7 w-full inline-flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-white py-3.5 px-5 rounded-xl font-semibold transition-all duration-300"
                  >
                    Book This Room
                    <ArrowRight size={18} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* BOOKING MODAL */}
      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      )}

      {/* BOOKING CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20 pt-8">
        <div className="relative overflow-hidden rounded-3xl bg-blue-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(180,83,9,0.2),transparent_45%)]" />

          <div className="relative px-7 py-12 md:px-14 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="uppercase tracking-[0.25em] text-amber-400 text-xs font-bold">
                Opening Special
              </p>

              <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3">
                Ready to book your stay?
              </h2>

              <p className="text-white/70 mt-3 max-w-xl">
                Enjoy our opening special: 2 hours for R150,
                3 hours for R250, or overnight accommodation
                from R500 to R850. Free swimming pool access
                for guests.
              </p>
            </div>

            <a
              href="https://wa.me/27665283248?text=Hello%20Mavu%20Palace%20Guest%20House.%20I%20would%20like%20to%20make%20a%20booking."
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-600 text-white px-7 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg"
            >
              <CalendarDays size={19} />
              Book Now
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div>
              <p className="font-serif text-xl font-bold">
                MAVU PALACE GUEST HOUSE
              </p>

              <p className="text-white/50 text-sm mt-1">
                Feel at Home • Comfort • Hospitality
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-5 text-sm text-white/60">
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
              <Link to="/rooms" className="hover:text-white transition">
                Rooms
              </Link>
              <Link to="/gallery" className="hover:text-white transition">
                Gallery
              </Link>
              <Link to="/about" className="hover:text-white transition">
                About
              </Link>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </div>
          </div>

          <div className="mt-5 text-center text-sm text-white/60">
            066 528 3248 | 073 919 1087
          </div>

          <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-white/40">
            © {new Date().getFullYear()} Mavu Palace Guest House. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

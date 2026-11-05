
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Award,
  Heart,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* HERO */}
      <section className="relative bg-blue-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(180,83,9,0.18),transparent_40%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-28 text-center">
          <p className="uppercase tracking-[0.35em] text-amber-400 text-sm font-semibold">
            Welcome to Mavu Palace Guest House
          </p>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mt-5">
            About Us
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-white/75 text-lg md:text-xl leading-relaxed">
            Feel at home. A welcoming place to stay, relax and enjoy
            warm hospitality.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* IMAGE */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85"
                alt="Mavu Palace Guest House accommodation"
                className="w-full h-[420px] md:h-[520px] object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-amber-700 text-white rounded-2xl px-6 py-5 shadow-xl">
              <p className="font-serif text-2xl font-bold">
                Feel At Home
              </p>

              <p className="text-white/80 text-sm mt-1">
                With a personal touch
              </p>
            </div>
          </div>

          {/* TEXT */}
          <div>
            <p className="uppercase tracking-[0.25em] text-amber-700 text-xs font-bold">
              Our Story
            </p>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-blue-950 mt-3 leading-tight">
              A comfortable stay starts with feeling at home
            </h2>

            <p className="text-gray-600 mt-6 text-lg leading-relaxed">
              Mavu Palace Guest House is designed to provide guests with
              a comfortable and welcoming place to stay. Whether you
              need a few hours or a full night, our goal is to make
              your stay pleasant from arrival to departure.
            </p>

            <p className="text-gray-600 mt-5 leading-relaxed">
              We offer flexible stays of 2 hours, 3 hours or 1 night,
              and every guest enjoys free swimming pool access. It is
              about creating a peaceful environment, offering friendly
              service and giving guests a place where they can relax
              and feel comfortable.
            </p>

            <Link
              to="/rooms"
              className="inline-flex items-center justify-center mt-8 bg-blue-950 hover:bg-blue-900 text-white px-7 py-3.5 rounded-xl font-semibold transition"
            >
              Explore Our Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <p className="uppercase tracking-[0.25em] text-amber-700 text-xs font-bold">
              What Matters To Us
            </p>

            <h2 className="font-serif text-4xl font-bold text-blue-950 mt-3">
              Our Values
            </h2>

            <p className="text-gray-600 mt-4 leading-relaxed">
              We are committed to providing a welcoming and comfortable
              environment for our guests. Our values guide everything we
              do, from the way we interact with guests to the quality of
              our facilities and services.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-7">
              <div className="w-12 h-12 rounded-xl bg-blue-950 text-white flex items-center justify-center">
                <Heart size={23} />
              </div>

              <h3 className="font-serif text-xl font-bold text-blue-950 mt-5">
                Hospitality
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed text-sm">
                We aim to make every guest feel welcome and valued.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-7">
              <div className="w-12 h-12 rounded-xl bg-blue-950 text-white flex items-center justify-center">
                <ShieldCheck size={23} />
              </div>

              <h3 className="font-serif text-xl font-bold text-blue-950 mt-5">
                Comfort
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed text-sm">
                We provide a peaceful environment where guests can
                rest and recharge.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-7">
              <div className="w-12 h-12 rounded-xl bg-blue-950 text-white flex items-center justify-center">
                <Users size={23} />
              </div>

              <h3 className="font-serif text-xl font-bold text-blue-950 mt-5">
                Personal Service
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed text-sm">
                We focus on friendly service and creating a positive
                guest experience.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-7">
              <div className="w-12 h-12 rounded-xl bg-blue-950 text-white flex items-center justify-center">
                <Award size={23} />
              </div>

              <h3 className="font-serif text-xl font-bold text-blue-950 mt-5">
                Quality
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed text-sm">
                We strive to maintain a high standard throughout your
                stay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOOK NOW */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-blue-950 rounded-3xl overflow-hidden text-white">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-14">
              <Phone className="text-amber-400" size={32} />

              <p className="uppercase tracking-[0.25em] text-amber-400 text-xs font-bold mt-6">
                Book Now
              </p>

              <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3">
                Stay somewhere comfortable and affordable
              </h2>

              <p className="text-white/70 mt-5 leading-relaxed">
                Mavu Palace Guest House offers 1 night from R500 to
                R850, 2 hours for R150 and 3 hours for R250, with free
                swimming pool access for guests. Call 066 528 3248 or
                073 919 1087 to book.
              </p>

              <Link
                to="/contact"
                className="inline-flex items-center mt-7 bg-amber-700 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Contact Us
              </Link>
            </div>

            <div className="min-h-[320px]">
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=85"
                alt="Mavu Palace Guest House interior"
                className="w-full h-full object-cover"
              />
            </div>
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
                Feel At Home • 066 528 3248 • 073 919 1087
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-5 text-sm text-white/60">
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>

              <Link
                to="/rooms"
                className="hover:text-white transition"
              >
                Rooms
              </Link>

              <Link
                to="/why-choose-us"
                className="hover:text-white transition"
              >
                Why Choose Us
              </Link>

              <Link
                to="/gallery"
                className="hover:text-white transition"
              >
                Gallery
              </Link>

              <Link
                to="/about"
                className="hover:text-white transition"
              >
                About
              </Link>

              <Link
                to="/contact"
                className="hover:text-white transition"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-white/40">
            © {new Date().getFullYear()} Mavu Palace Guest House. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

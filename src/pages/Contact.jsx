
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

const WHATSAPP_NUMBER = "27769796577";

export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const checkIn = formData.get("checkIn")?.toString() || "Not specified";
    const checkOut = formData.get("checkOut")?.toString() || "Not specified";
    const message = formData.get("message")?.toString().trim() || "";

    // Validate booking dates
    if (checkIn !== "Not specified" && checkOut !== "Not specified") {
      if (new Date(checkOut) <= new Date(checkIn)) {
        alert("Check-out date must be after the check-in date.");
        return;
      }
    }

    const whatsappMessage = `
Hello Mavu Palace Guest House! 👋

I would like to make an enquiry.

*CUSTOMER DETAILS*
Full Name: ${name}
Phone Number: ${phone}
Email Address: ${email}

*BOOKING DETAILS*
Check-in Date: ${checkIn}
Check-out Date: ${checkOut}

*MESSAGE*
${message}

Thank you.
    `.trim();

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* HERO */}
      <section className="relative bg-blue-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(180,83,9,0.18),transparent_40%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-28 text-center">
          <p className="uppercase tracking-[0.35em] text-amber-400 text-sm font-semibold">
            Get In Touch
          </p>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mt-5">
            Contact Us
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-white/75 text-lg md:text-xl leading-relaxed">
            Have a question or ready to plan your stay? Get in touch
            with Mavu Palace Guest House and we will be happy to assist you.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-5 gap-10">

          {/* CONTACT DETAILS */}
          <div className="lg:col-span-2">
            <p className="uppercase tracking-[0.25em] text-amber-700 text-xs font-bold">
              Reach Us
            </p>

            <h2 className="font-serif text-4xl font-bold text-blue-950 mt-3">
              We would love to hear from you
            </h2>

            <p className="text-gray-600 mt-5 leading-relaxed">
              Whether you would like to make a booking, ask about our
              rooms or find out more about Mavu Palace Guest House,
              our team is here to help.
            </p>

            <div className="space-y-4 mt-8">

              {/* PHONE */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-950 text-white flex items-center justify-center">
                  <Phone size={20} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-amber-700">
                    Phone
                  </p>

                  <p className="text-blue-950 font-semibold mt-1">
                    <a href="tel:0665283248" className="hover:text-amber-700">
                      066 528 3248
                    </a>
                  </p>

                  <p className="text-blue-950 font-semibold mt-1">
                    <a href="tel:0739191087" className="hover:text-amber-700">
                      073 919 1087
                    </a>
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-950 text-white flex items-center justify-center">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-amber-700">
                    Email
                  </p>

                  <p className="text-blue-950 font-semibold mt-1">
                    Contact us for enquiries and bookings
                  </p>
                </div>
              </div>

              {/* LOCATION */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-950 text-white flex items-center justify-center">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-amber-700">
                    Location
                  </p>

                  <p className="text-blue-950 font-semibold mt-1">
                    Mavu Palace Guest House
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    Mzinti, Nkomazi, South Africa
                  </p>
                </div>
              </div>

              {/* ENQUIRIES */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-950 text-white flex items-center justify-center">
                  <Clock3 size={20} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-amber-700">
                    Enquiries
                  </p>

                  <p className="text-blue-950 font-semibold mt-1">
                    We are here to assist
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    Contact us for availability and bookings.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-7 md:p-9">
              <p className="uppercase tracking-[0.25em] text-amber-700 text-xs font-bold">
                Send An Enquiry
              </p>

              <h2 className="font-serif text-3xl font-bold text-blue-950 mt-3">
                Plan your stay
              </h2>

              <p className="text-gray-600 mt-3">
                Fill in your details and tell us how we can assist you.
              </p>

              <form
                className="mt-8 space-y-5"
                onSubmit={handleSubmit}
              >
                {/* NAME AND PHONE */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-blue-950 mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      autoComplete="name"
                      required
                      className="w-full border border-stone-300 rounded-xl px-4 py-3.5 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-700/10 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-blue-950 mb-2">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your phone number"
                      autoComplete="tel"
                      required
                      className="w-full border border-stone-300 rounded-xl px-4 py-3.5 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-700/10 transition"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-semibold text-blue-950 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="w-full border border-stone-300 rounded-xl px-4 py-3.5 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-700/10 transition"
                  />
                </div>

                {/* BOOKING DATES */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-blue-950 mb-2">
                      Check-in Date
                    </label>

                    <input
                      type="date"
                      name="checkIn"
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full border border-stone-300 rounded-xl px-4 py-3.5 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-700/10 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-blue-950 mb-2">
                      Check-out Date
                    </label>

                    <input
                      type="date"
                      name="checkOut"
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full border border-stone-300 rounded-xl px-4 py-3.5 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-700/10 transition"
                    />
                  </div>
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="block text-sm font-semibold text-blue-950 mb-2">
                    Message
                  </label>

                  <textarea
                    rows={5}
                    name="message"
                    placeholder="Tell us about your booking or enquiry..."
                    required
                    className="w-full border border-stone-300 rounded-xl px-4 py-3.5 outline-none resize-none focus:border-amber-700 focus:ring-2 focus:ring-amber-700/10 transition"
                  />
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-white px-7 py-3.5 rounded-xl font-semibold transition"
                >
                  Send Enquiry via WhatsApp
                  <MessageCircle size={18} />
                </button>

                <p className="text-xs text-gray-500">
                  Your enquiry will open in WhatsApp, where you can review
                  and send your message directly to Mavu Palace Guest House.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-blue-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(180,83,9,0.2),transparent_45%)]" />

          <div className="relative px-7 py-12 md:px-14 md:py-14 text-center">
            <MessageCircle
              size={34}
              className="mx-auto text-amber-400"
            />

            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-5">
              Looking for accommodation?
            </h2>

            <p className="text-white/70 mt-3 max-w-xl mx-auto">
              Explore our rooms and find the accommodation that suits
              your stay.
            </p>

            <Link
              to="/rooms"
              className="inline-flex items-center justify-center gap-2 mt-7 bg-amber-700 hover:bg-amber-600 text-white px-7 py-3.5 rounded-xl font-bold transition"
            >
              View Our Rooms
              <ArrowRight size={18} />
            </Link>
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

              <Link to="/why-choose-us" className="hover:text-white transition">
                Why Choose Us
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
            © {new Date().getFullYear()} Mavu Palace Guest House. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

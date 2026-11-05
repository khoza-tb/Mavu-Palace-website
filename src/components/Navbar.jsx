
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  CalendarDays,
} from "lucide-react";

const navItems = [
  { name: "Home", path: "/", end: true },
  { name: "Our Rooms", path: "/rooms" },
  { name: "Why Choose Us", path: "/why-choose-us" },
  { name: "Gallery", path: "/gallery" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function NavItem({ item, mobile = false }) {
  return (
    <NavLink
      to={item.path}
      end={item.end}
      className={({ isActive }) =>
        `
        relative
        transition-all
        duration-300
        ${mobile ? "block px-4 py-3 rounded-lg" : "py-2"}
        ${
          isActive
            ? "text-amber-700"
            : "text-slate-700 hover:text-amber-700"
        }
        ${
          !mobile && isActive
            ? "after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-amber-700"
            : ""
        }
        `
      }
    >
      {item.name}
    </NavLink>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* TOP INFORMATION BAR */}
      <div className="hidden md:block bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-sm">
          <p className="text-white/80">
            Mavu Palace Guest House - Feel at Home
          </p>

          <div className="flex items-center gap-6 text-white/80">
            <a
              href="tel:0665283248"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <Phone size={15} />
              066 528 3248
            </a>

            <a
              href="tel:0739191087"
              className="hover:text-white transition"
            >
              073 919 1087
            </a>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">

            {/* LOGO */}
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 group"
            >
              <div className="w-11 h-11 rounded-full bg-blue-950 text-white flex items-center justify-center shadow-md group-hover:bg-amber-700 transition">
                <span className="font-serif text-lg">MP</span>
              </div>

              <div>
                <p className="font-serif text-xl font-bold tracking-wide text-blue-950 leading-none">
                  MAVU PALACE
                </p>

                <p className="text-[10px] tracking-[0.28em] text-amber-700 font-semibold mt-1">
                  GUEST HOUSE
                </p>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-7">
              {navItems.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </nav>

            {/* DESKTOP BOOK BUTTON */}
            <div className="hidden lg:flex items-center">
              <Link
                to="/rooms#available-rooms"
                className="inline-flex items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white px-6 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CalendarDays size={17} />
                Book Your Stay
              </Link>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-11 h-11 rounded-xl border border-stone-200 flex items-center justify-center text-blue-950 hover:bg-stone-100 transition"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white shadow-lg">
            <div className="px-5 py-5 space-y-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.path}
                  item={item}
                  mobile
                />
              ))}

              <Link
                to="/rooms#available-rooms"
                onClick={() => setMobileOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-5 py-3.5 rounded-xl font-semibold transition"
              >
                <CalendarDays size={18} />
                Book Your Stay
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

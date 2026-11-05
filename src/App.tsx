import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import WhyChooseUs from "./pages/WhyChooseUs";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminBookings from "./pages/AdminBookings";

function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-amber-700 uppercase tracking-[0.3em] text-sm font-bold">
          Mavu Palace Guest House
        </p>

        <h1 className="text-7xl md:text-8xl font-serif font-bold text-blue-950 mt-4">
          404
        </h1>

        <h2 className="text-2xl font-bold text-blue-950 mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 mt-3 max-w-md mx-auto">
          The page you are looking for may have been moved or no longer
          exists.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center mt-7 bg-blue-950 hover:bg-blue-900 text-white px-7 py-3 rounded-xl font-semibold transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MAIN WEBSITE */}
        <Route path="/" element={<Home />} />

        <Route path="/rooms" element={<Rooms />} />

        <Route
          path="/why-choose-us"
          element={<WhyChooseUs />}
        />

        <Route path="/gallery" element={<Gallery />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        {/* ADMIN */}
        <Route
          path="/admin/bookings"
          element={<AdminBookings />}
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
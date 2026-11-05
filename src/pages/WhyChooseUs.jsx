
import Navbar from "../components/Navbar";
import {
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  MapPin,
  Wifi,
  BedDouble,
} from "lucide-react";

const features = [
  {
    icon: BedDouble,
    title: "Comfortable Accommodation",
    text: "Enjoy comfortable and affordable accommodation at Mavu Palace Guest House, whether you are staying for a few hours or overnight.",
  },
  {
    icon: Sparkles,
    title: "Clean & Well Maintained",
    text: "We pay attention to cleanliness and the details that make your stay comfortable, relaxing and enjoyable.",
  },
  {
    icon: HeartHandshake,
    title: "Warm Hospitality",
    text: "At Mavu Palace Guest House, our goal is to make every guest feel welcome. Feel at home from arrival to departure.",
  },
  {
    icon: ShieldCheck,
    title: "Peace of Mind",
    text: "Enjoy a welcoming environment where you can relax, unwind and make the most of your stay.",
  },
  {
    icon: MapPin,
    title: "Convenient Location",
    text: "Located in Mzinti, Nkomazi, Mavu Palace Guest House offers convenient accommodation for visitors to the area.",
  },
  {
    icon: Wifi,
    title: "Essential Amenities",
    text: "Enjoy practical amenities and free swimming pool access for guests, adding more comfort and relaxation to your stay.",
  },
];

export default function WhyChooseUs() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      <section className="bg-blue-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="uppercase tracking-[0.3em] text-amber-400 text-sm font-semibold">
            The Mavu Palace Experience
          </p>

          <h1 className="font-serif text-5xl md:text-6xl font-bold mt-4">
            Why Choose Us
          </h1>

          <p className="max-w-2xl mx-auto mt-5 text-white/75 text-lg">
            Everything we do is focused on creating a comfortable,
            welcoming and memorable experience for our guests.
            At Mavu Palace Guest House, we make you feel at home.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="bg-white border border-stone-200 rounded-2xl p-7 hover:-translate-y-1 hover:shadow-lg transition duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-950 text-white flex items-center justify-center">
                  <Icon size={25} />
                </div>

                <h2 className="text-xl font-bold text-blue-950 mt-6">
                  {feature.title}
                </h2>

                <p className="text-gray-600 leading-relaxed mt-3">
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

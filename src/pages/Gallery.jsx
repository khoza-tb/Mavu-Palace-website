
import Navbar from "../components/Navbar";

const images = [
  {
    src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
    title: "Our Rooms",
  },
  {
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
    title: "Comfort & Style",
  },
  {
    src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85",
    title: "Relaxation",
  },
  {
    src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=85",
    title: "Guest Room",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    title: "Interior",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    title: "Mavu Palace Experience",
  },
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      <section className="bg-blue-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="uppercase tracking-[0.3em] text-amber-400 text-sm font-semibold">
            Explore Mavu Palace Guest House
          </p>

          <h1 className="font-serif text-5xl md:text-6xl font-bold mt-4">
            Gallery
          </h1>

          <p className="max-w-2xl mx-auto mt-5 text-white/75 text-lg">
            Take a look at the comfortable spaces and relaxing
            atmosphere that make Mavu Palace Guest House a
            welcoming place to stay. Feel at home with us.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {images.map((image) => (
            <div
              key={image.title}
              className="group relative h-80 overflow-hidden rounded-2xl"
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
                <h2 className="text-white font-semibold text-lg">
                  {image.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

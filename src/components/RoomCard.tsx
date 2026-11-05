
import { Users } from "lucide-react";
import type { Room } from "../types";
import { formatMoney, getCheapestPrice, getPrice } from "../utils/pricing";

type Props = {
  room: Room;
  onBook: (room: Room) => void;
};

export default function RoomCard({ room, onBook }: Props) {
  const cheapest = getCheapestPrice(room);
  const overnight = getPrice(room, "overnight");

  return (
    <div className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <img
          src={room.image}
          alt={`${room.name} at Mavu Palace Guest House`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {room.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-blue-950 px-3 py-1 text-xs font-bold text-white shadow">
            {room.badge}
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-serif text-lg font-bold text-blue-950">
          {room.name}
        </h3>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-xl font-bold text-blue-950">
            {formatMoney(overnight)}
          </span>
          <span className="text-sm text-gray-500">/ night</span>
        </div>

        <p className="text-xs text-gray-500">
          From {formatMoney(cheapest.price)} for {cheapest.label.toLowerCase()}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {room.amenities.map((a) => (
            <span
              key={a}
              className="rounded bg-stone-100 px-2 py-1 text-xs text-gray-700"
            >
              {a}
            </span>
          ))}
        </div>

        <p className="mt-3 text-xs font-semibold text-amber-700">
          Free swimming pool access included
        </p>

        <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
          <Users size={14} /> Up to {room.guests} guests · Pay at lodge
        </p>

        <button
          onClick={() => onBook(room)}
          className="mt-4 w-full rounded-lg bg-blue-950 py-2.5 font-bold text-white transition hover:bg-blue-900"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

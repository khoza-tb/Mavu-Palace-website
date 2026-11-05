

import type { Room } from "../types";

export const rooms: Room[] = [
  {
    id: "standard",
    name: "Standard Room",
    description:
      "A comfortable and peaceful room designed for a relaxing stay at Mavu Palace Guest House.",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85",
    guests: 2,
    bed: "Double Bed",
    amenities: ["Wi-Fi", "Ensuite Bathroom", "TV & AC"],
    badge: "Most Popular",
    pricing: [
      { key: "2h", label: "2 Hours", hours: 2, price: 150 },
      { key: "3h", label: "3 Hours", hours: 3, price: 250 },
      { key: "overnight", label: "1 Night", hours: 14, price: 500 },
    ],
  },
  {
    id: "family",
    name: "Family Room",
    description:
      "A spacious room with extra sleeping space, ideal for families or small groups travelling together.",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
    guests: 4,
    bed: "2 Queen Beds",
    amenities: ["Kitchenette", "Wi-Fi", "Parking"],
    badge: "Family Friendly",
    pricing: [
      { key: "2h", label: "2 Hours", hours: 2, price: 150 },
      { key: "3h", label: "3 Hours", hours: 3, price: 250 },
      { key: "overnight", label: "1 Night", hours: 14, price: 650 },
    ],
  },
  {
    id: "executive",
    name: "Executive Suite",
    description:
      "Our premium suite for guests looking for extra space, comfort and privacy.",
    image:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=85",
    guests: 2,
    bed: "King Bed",
    amenities: ["Private Patio", "Mini Bar & Lounge", "Smart TV"],
    badge: "Premium",
    pricing: [
      { key: "2h", label: "2 Hours", hours: 2, price: 150 },
      { key: "3h", label: "3 Hours", hours: 3, price: 250 },
      { key: "overnight", label: "1 Night", hours: 14, price: 850 },
    ],
  },
];

export function getRoomById(id: string): Room | undefined {
  return rooms.find((r) => r.id === id);
}

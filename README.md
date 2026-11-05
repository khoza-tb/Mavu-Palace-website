# Thom Park Lodge — Booking System

## Setup
```
npm install
npm run dev
```
Then open the printed local URL. Rooms are on `/rooms`, admin bookings on `/admin/bookings`.

**Before going live:** open `src/components/BookingModal.tsx` and replace
`WHATSAPP_NUMBER` with the lodge's real WhatsApp number (digits only,
country code first, e.g. `27821234567`).

## How the booking system works
- **Durations & pricing** live per room in `src/data/rooms.ts` — each room has
  its own price for 2 Hours, 4 Hours, 6 Hours, 12 Hours and Overnight.
- **Checkout is calculated automatically** in `src/utils/pricing.ts`
  (`computeSchedule`): hourly durations add hours to the check-in time;
  Overnight always checks out at 10:00 the next day.
- **Bookings are stored** in the browser's `localStorage` via
  `src/services/bookingService.ts` (booking reference, guest details, status,
  full check-in/out timestamps).
- **Double-booking is prevented**: before saving, the form checks
  `isRoomAvailable()` / `getConflictingBooking()`, which compares the new
  check-in/out window against every existing non-cancelled booking for that
  room and blocks overlapping times.
- **Admin (`/admin/bookings`)** lists every booking with search + status
  filters, and lets staff move a booking through Pending → Confirmed →
  Checked In → Completed, or Cancel it (cancelling frees the room back up).

## Note on data persistence
Bookings are currently stored in the browser's local storage, which is
enough to run and test the whole flow end-to-end. It means bookings are
per-browser/per-device (an admin on a different computer won't see them).
For a shared, always-available booking list across devices, this should be
swapped for a small backend/database (e.g. Firebase, Supabase, or a simple
Node API) — the `bookingService.ts` file is written so that swap only
touches one file.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

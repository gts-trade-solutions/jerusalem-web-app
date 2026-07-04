/** Formatting helpers. All deterministic to avoid hydration mismatches. */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTHS_SHORT = MONTHS.map((m) => m.slice(0, 3));
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Parse an ISO string into fixed UTC parts so server and client agree. */
function parts(iso: string) {
  const d = new Date(iso);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth(),
    day: d.getUTCDate(),
    weekday: d.getUTCDay(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
  };
}

export function formatDate(iso: string): string {
  const p = parts(iso);
  return `${MONTHS_SHORT[p.month]} ${p.day}, ${p.year}`;
}

export function formatDateLong(iso: string): string {
  const p = parts(iso);
  return `${DAYS[p.weekday]}, ${MONTHS[p.month]} ${p.day}`;
}

export function formatTime(iso: string): string {
  const p = parts(iso);
  const ampm = p.hour >= 12 ? "PM" : "AM";
  const h = p.hour % 12 === 0 ? 12 : p.hour % 12;
  const m = p.minute.toString().padStart(2, "0");
  return `${h}:${m} ${ampm}`;
}

/** Short calendar chip pieces, e.g. { mon: "JUL", day: "12" }. */
export function dateChip(iso: string): { mon: string; day: string; weekday: string } {
  const p = parts(iso);
  return {
    mon: MONTHS_SHORT[p.month].toUpperCase(),
    day: p.day.toString(),
    weekday: DAYS[p.weekday].slice(0, 3),
  };
}

export function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Relative-ish label from a fixed "now" so it never drifts between renders. */
const NOW = Date.parse("2026-07-04T12:00:00Z");
export function timeAgo(iso: string): string {
  const diff = NOW - Date.parse(iso);
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.round(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  return formatDate(iso);
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

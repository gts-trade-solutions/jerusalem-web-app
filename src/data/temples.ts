import type { Temple } from "@/types";

/** pin.x / pin.y are normalized 0..100 positions on the stylized world map. */
export const temples: Temple[] = [
  { id: "t-slc", name: "Salt Lake Temple", city: "Salt Lake City, Utah", lat: 40.77, lng: -111.89, pin: { x: 20, y: 34 }, dedicated: "1893", status: "operating" },
  { id: "t-provo", name: "Provo Utah Temple", city: "Provo, Utah", lat: 40.27, lng: -111.64, pin: { x: 21, y: 37 }, dedicated: "1972", status: "operating" },
  { id: "t-laie", name: "Laie Hawaii Temple", city: "Laie, Hawaii", lat: 21.64, lng: -157.92, pin: { x: 8, y: 48 }, dedicated: "1919", status: "operating" },
  { id: "t-accra", name: "Accra Ghana Temple", city: "Accra, Ghana", lat: 5.6, lng: -0.18, pin: { x: 49, y: 55 }, dedicated: "2004", status: "operating" },
  { id: "t-london", name: "London England Temple", city: "Newchapel, England", lat: 51.16, lng: -0.06, pin: { x: 47, y: 28 }, dedicated: "1958", status: "operating" },
  { id: "t-rome", name: "Rome Italy Temple", city: "Rome, Italy", lat: 41.9, lng: 12.5, pin: { x: 52, y: 32 }, dedicated: "2019", status: "operating" },
  { id: "t-manila", name: "Manila Philippines Temple", city: "Manila, Philippines", lat: 14.6, lng: 120.98, pin: { x: 82, y: 52 }, dedicated: "1984", status: "operating" },
  { id: "t-lindon", name: "Lindon Utah Temple", city: "Lindon, Utah", lat: 40.34, lng: -111.72, pin: { x: 22, y: 36 }, dedicated: "2026", status: "construction" },
];

// Small helpers shared by the seed builder and the app.
import type { Currency } from "./types";

export const H = 36e5, D = 864e5, MIN = 6e4;
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const p2 = (n: number) => String(n).padStart(2, "0");

/** "Oct 19, 2026" */
export const fD = (t: number) => { const d = new Date(t); return `${MON[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`; };
/** "Oct 19" */
export const fDs = (t: number) => { const d = new Date(t); return `${MON[d.getMonth()]} ${d.getDate()}`; };
/** 24-hour "14:32", as in the screenshots */
export const fT = (t: number) => { const d = new Date(t); return `${p2(d.getHours())}:${p2(d.getMinutes())}`; };
export const fDT = (t: number) => `${fD(t)} ${fT(t)}`;
/** "Oct 19, 14:12" (anomaly table) */
export const fDsT = (t: number) => `${fDs(t)}, ${fT(t)}`;
export function ago(t: number, now = Date.now()): string {
  const s = (now - t) / 1000;
  if (s < 60) return "just now"; if (s < 3600) return Math.round(s / 60) + "m ago";
  if (s < 86400) return Math.round(s / 3600) + "h ago"; return Math.round(s / 86400) + "d ago";
}
export const fN = (n: number, d = 0) => Number(n).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
/** decimals to show for a sensor value */
export const dec = (v: number) => (Math.abs(v) < 20 ? (Math.abs(v) < 10 ? 2 : 1) : 0);
export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/** mulberry32: deterministic random numbers so generated data is identical on every load */
export function rng(seed: number) {
  let a = seed;
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
export function hash(s: string): number { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }

/** Gulf currencies are pegged to the US dollar. Money is stored in USD. */
export const RATES: Record<Currency, number> = { USD: 1, QAR: 3.64, AED: 3.6725 };
export function money(usd: number, cur: Currency): string { const v = Math.round(usd * RATES[cur]); return cur === "USD" ? "$" + fN(v) : `${cur} ${fN(v)}`; }

/** Health bands: Healthy ≥80, At Risk 65–79, Degraded 50–64, Critical <50, Offline by status. */
export const hColor = (h: number) => (h >= 80 ? "#13a37f" : h >= 65 ? "#f2b52c" : h >= 50 ? "#f57c20" : "#e5383f");

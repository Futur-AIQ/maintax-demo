// Formatting helpers, ported from the prototype's core helpers (fN, fD, fT, ago, hash).

const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const p2 = (n: number) => String(n).padStart(2, "0");

/** 1,234 or 1,234.5 with a fixed number of decimals. */
export const fN = (n: number, dec = 0) =>
  Number(n).toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });

/** "Oct 19, 2026" */
export const fD = (t: number) => {
  const d = new Date(t);
  return `${MON[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

/** "14:32" */
export const fT = (t: number) => {
  const d = new Date(t);
  return `${p2(d.getHours())}:${p2(d.getMinutes())}`;
};

/** "just now", "5m ago", "2h ago", "3d ago" */
export function ago(t: number, now = Date.now()) {
  const s = (now - t) / 1000;
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.round(s / 60)}m ago`;
  if (s < 86400) return `${Math.round(s / 3600)}h ago`;
  return `${Math.round(s / 86400)}d ago`;
}

/** FNV-1a string hash, for stable per-name choices such as avatar colors. */
export function hash(s: string) {
  let h = 2166136261;
  for (const c of s) {
    h ^= c.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

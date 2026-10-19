import { create } from "zustand";

export type ToastType = "ok" | "info" | "warn" | "crit";

export interface ToastLink {
  label: string;
  href: string;
}

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  link?: ToastLink;
  leaving: boolean;
}

interface UiState {
  /**
   * The path the sidebar drawer (below 1024px) was opened on, or null when closed.
   * The drawer counts as open only while the path is unchanged, so navigating closes it.
   */
  drawerAt: string | null;
  toasts: ToastItem[];
  openDrawer: (path: string) => void;
  closeDrawer: () => void;
  dismissToast: (id: number) => void;
}

/** Transient UI state. Not persisted. */
export const useUi = create<UiState>((set) => ({
  drawerAt: null,
  toasts: [],
  openDrawer: (drawerAt) => set({ drawerAt }),
  closeDrawer: () => set({ drawerAt: null }),
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

const FADE_MS = 300;
let nextToastId = 1;

/**
 * Show a toast. Works from anywhere, including outside React.
 * `crit` (dark red) stays 5.2s, the others 3.6s. An optional link label navigates.
 */
export function toast(message: string, type: ToastType = "ok", link?: ToastLink) {
  const id = nextToastId++;
  const setToasts = (fn: (t: ToastItem[]) => ToastItem[]) => useUi.setState((s) => ({ toasts: fn(s.toasts) }));
  setToasts((t) => [...t, { id, message, type, link, leaving: false }]);
  window.setTimeout(
    () => {
      setToasts((t) => t.map((x) => (x.id === id ? { ...x, leaving: true } : x)));
      window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), FADE_MS);
    },
    type === "crit" ? 5200 : 3600,
  );
}

"use client";

import clsx from "clsx";
import { type ReactNode, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { useHydrated } from "@/lib/hooks";
import { IconButton } from "./Button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Shown left of the title, for example a Tile. */
  icon?: ReactNode;
  footer?: ReactNode;
  /** 900px instead of 620px. */
  wide?: boolean;
  /** Progress modals: no close button, Esc and backdrop do nothing. */
  locked?: boolean;
  children?: ReactNode;
}

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function Modal(props: ModalProps) {
  const hydrated = useHydrated();
  if (!hydrated || !props.open) return null;
  return createPortal(<ModalPanel {...props} />, document.body);
}

function ModalPanel({ onClose, title, subtitle, icon, footer, wide, locked, children }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Focus the first text field (or the dialog), lock page scroll, restore focus on close.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const dialog = ref.current;
    const field = dialog?.querySelector<HTMLElement>("input:not([type=checkbox]),textarea");
    const t = window.setTimeout(() => (field ?? dialog)?.focus({ preventScroll: true }), 40);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, []);

  // Esc closes; Tab stays inside the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (!locked) onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !ref.current) return;
      const items = [...ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (items.length === 0) return e.preventDefault();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [locked]);

  return (
    <div
      className="fixed inset-0 z-[90] grid animate-fade place-items-center bg-[rgba(6,20,43,.5)] p-5"
      onMouseDown={(e) => {
        if (!locked && e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={clsx(
          "flex max-h-[calc(100dvh-40px)] animate-[pop_.18s_ease] flex-col rounded-2xl bg-white shadow-pop focus:outline-none",
          wide ? "w-[min(900px,100%)]" : "w-[min(620px,100%)]",
        )}
      >
        <div className="flex items-start gap-3.5 px-[22px] pt-5 pb-3">
          {icon}
          <div className="min-w-0">
            <h2 id={titleId} className="text-[18px] font-bold">
              {title}
            </h2>
            {subtitle && <p className="mt-1 text-[13px] text-muted">{subtitle}</p>}
          </div>
          {!locked && <IconButton icon="x" aria-label="Close" onClick={onClose} className="ml-auto" />}
        </div>
        <div className="overflow-y-auto px-[22px] pt-1 pb-[18px]">{children}</div>
        {footer && (
          <div className="flex flex-wrap items-center gap-2.5 border-t border-line-2 px-[22px] py-3.5">{footer}</div>
        )}
      </div>
    </div>
  );
}

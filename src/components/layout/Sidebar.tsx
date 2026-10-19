"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonClass, toast } from "@/components/ui";
import { Icon, type IconName } from "@/lib/icons";
import { NAV, NAV2, type NavItem, routeOf } from "./nav";

interface ContextCard {
  /** Without a title the icon sits alone on the heading row, as in the prototype. */
  title?: string;
  icon: IconName;
  text: string;
  button: string;
  /** A path, or "picker" for the scenario picker. */
  to: string;
}

const DEFAULT_CTX: ContextCard = {
  title: "AI Assistant",
  icon: "spark",
  text: "Get instant insights, investigate anomalies, and get recommendations.",
  button: "Open AI Assistant",
  to: "/assistant",
};

const CTX: Record<string, ContextCard> = {
  equipment: {
    icon: "chartl",
    text: "Keep your operations running at peak performance with AI-powered insights.",
    button: "Explore AI Assistant",
    to: "/assistant",
  },
  admin: {
    icon: "users",
    text: "Manage users, teams, roles and access permissions across your organization.",
    button: "Go to Settings",
    to: "/security",
  },
  security: {
    icon: "users",
    text: "Manage users, teams, roles and access permissions across your organization.",
    button: "Go to Users",
    to: "/admin",
  },
  assistant: {
    title: "Presenter tip",
    icon: "spark",
    text: "Try a suggested question, or ask about any asset by its ID, for example P-104.",
    button: "Run a scenario",
    to: "picker",
  },
};

// Phase 2 connects these to badgeAn() and badgeAl().
const BADGES: Record<string, number> = { anomalies: 2, alerts: 4 };

export function Sidebar({ open }: { open: boolean }) {
  const active = routeOf(usePathname());
  const ctx = CTX[active] ?? DEFAULT_CTX;

  const item = ({ route, label, icon }: NavItem) => {
    const on = route === active;
    const badge = BADGES[route];
    return (
      <Link
        key={route}
        href={`/${route}`}
        aria-current={on ? "page" : undefined}
        className={clsx(
          "flex h-10 shrink-0 items-center gap-3 rounded-lg px-3 text-[14px] font-medium transition-colors duration-150",
          on ? "bg-blue text-white" : "text-sbt hover:bg-sb2",
        )}
      >
        <Icon name={icon} size={19} className="opacity-90" />
        <span>{label}</span>
        {badge ? (
          <span className="ml-auto grid h-[19px] min-w-[19px] place-items-center rounded-[10px] bg-red px-[5px] text-[11px] font-bold text-white">
            {badge}
            <span className="sr-only"> new</span>
          </span>
        ) : null}
      </Link>
    );
  };

  const ctxButton = (
    <>
      {ctx.button}
      <Icon name="arrow" size={15} />
    </>
  );

  return (
    <aside
      id="sidebar"
      className={clsx(
        "z-40 flex h-dvh flex-col overflow-y-auto bg-sb px-3 pb-3.5 text-sbt",
        "sticky top-0",
        "max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-[262px] max-lg:shadow-pop max-lg:transition-[transform,visibility] max-lg:duration-250 max-lg:ease-out",
        !open && "max-lg:invisible max-lg:-translate-x-[102%]",
      )}
    >
      <Link href="/dashboard" className="flex items-center gap-[11px] px-1.5 pt-[18px] pb-5">
        <span className="grid size-[38px] shrink-0 place-items-center rounded-[9px] bg-white p-[3px]">
          <Image src="/logo-mark.png" alt="Hansa Technologies" width={32} height={32} className="size-full" priority />
        </span>
        <span>
          <b className="block text-[22px] leading-[1.05] font-extrabold tracking-[-.02em] text-white">
            Mainta<i className="text-xblue not-italic">X</i>
          </b>
          <small className="mt-[3px] block text-[10.5px] tracking-[.01em] text-sbm">Predict. Prevent. Perform.</small>
        </span>
      </Link>

      <nav aria-label="Main" className="flex flex-col gap-0.5">
        {NAV.map(item)}
        <hr className="mx-1 my-3.5 border-0 border-t border-sbl" />
        {NAV2.map(item)}
      </nav>

      <div className="mt-[22px] rounded-card border border-sbl bg-sb2 px-3.5 pt-4 pb-3.5">
        <h4 className="flex items-center gap-[9px] text-[14px] font-semibold text-white">
          <Icon name={ctx.icon} size={ctx.title ? 18 : 20} className="text-xblue" />
          {ctx.title}
        </h4>
        <p className="mt-[9px] mb-[13px] text-[12.5px] leading-[1.55] text-sbt">{ctx.text}</p>
        {ctx.to === "picker" ? (
          <button
            type="button"
            className={buttonClass("primary", "md", "w-full")}
            onClick={() => toast("The scenario picker is not available yet.", "info")}
          >
            {ctxButton}
          </button>
        ) : (
          <Link href={ctx.to} className={buttonClass("primary", "md", "w-full")}>
            {ctxButton}
          </Link>
        )}
      </div>
    </aside>
  );
}

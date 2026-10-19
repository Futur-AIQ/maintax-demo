"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Avatar, Menu, MenuItem, MenuSeparator, Tile, toast, useMenuClose } from "@/components/ui";
import { ago } from "@/lib/format";
import { useHydrated } from "@/lib/hooks";
import { Icon } from "@/lib/icons";
import { sampleDB } from "@/lib/sample-db";
import { useUi } from "@/store/ui-store";
import { GlobalSearch } from "./GlobalSearch";
import { routeOf } from "./nav";
import { PlantSwitcher } from "./PlantSwitcher";

const USER = { name: "John Doe", role: "Operations Manager", email: "john.doe@gulfcrest.example", color: "#1b5fe8" };

export function Topbar({ drawerOpen }: { drawerOpen: boolean }) {
  const pathname = usePathname();
  const openDrawer = useUi((s) => s.openDrawer);
  const hydrated = useHydrated();
  // Phase 2 moves this into the persisted notifRead flag.
  const [notifRead, setNotifRead] = useState(false);
  const unread = hydrated && !notifRead && sampleDB().al.some((a) => a.state === "new");
  const dashboard = routeOf(pathname) === "dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white/97 px-[26px] backdrop-blur-sm max-lg:px-3.5">
      <button
        type="button"
        aria-label="Open menu"
        aria-controls="sidebar"
        aria-expanded={drawerOpen}
        onClick={() => openDrawer(pathname)}
        className="grid size-[38px] shrink-0 place-items-center rounded-[10px] border border-line lg:hidden"
      >
        <Icon name="menu" size={20} />
      </button>
      {dashboard && (
        <>
          <PlantSwitcher kind="overview" />
          <div className="flex-1 max-sm:hidden" />
        </>
      )}
      <GlobalSearch />
      {!dashboard && <div className="flex-1 max-sm:hidden" />}

      <Menu
        kind="dialog"
        width={340}
        aria-label="Notifications"
        trigger={(p) => (
          <button
            type="button"
            {...p}
            aria-label={unread ? "Notifications, unread" : "Notifications"}
            className="relative grid size-10 shrink-0 place-items-center rounded-[10px] text-ink-2 hover:bg-surface-2"
          >
            <Icon name="bell" size={20} />
            {unread && <i className="absolute top-[9px] right-2.5 size-2 rounded-full border-2 border-white bg-red" />}
          </button>
        )}
      >
        <Notifications read={notifRead} onReadAll={() => setNotifRead(true)} />
      </Menu>

      <Menu
        width={260}
        aria-label="Account"
        trigger={(p) => (
          <button
            type="button"
            {...p}
            className="flex shrink-0 items-center gap-2.5 rounded-[10px] px-1.5 py-1 text-left hover:bg-surface-2"
          >
            <Avatar name={USER.name} size={36} color={USER.color} />
            <span className="max-lg:sr-only">
              <b className="block text-[13px] font-semibold">{USER.name}</b>
              <small className="block text-[12px] text-muted">{USER.role}</small>
            </span>
            <Icon name="down" size={15} className="max-lg:hidden" />
          </button>
        )}
      >
        <div role="presentation" className="flex items-center gap-2.5 px-2.5 pt-2 pb-2.5">
          <Avatar name={USER.name} size={36} color={USER.color} />
          <div className="min-w-0">
            <b className="block text-[12.5px] font-semibold">{USER.name}</b>
            <span className="block truncate text-[11.5px] text-muted">{USER.email}</span>
          </div>
        </div>
        <MenuSeparator />
        <MenuItem icon="user" href="/admin">
          My profile
        </MenuItem>
        <MenuItem icon="sliders" onSelect={() => toast("Preferences are not available yet.", "info")}>
          Preferences
        </MenuItem>
        <MenuItem icon="zap" onSelect={() => toast("Presenter controls are not available yet.", "info")}>
          Presenter controls
        </MenuItem>
        <MenuItem icon="help" href="/assistant">
          Help
        </MenuItem>
        <MenuSeparator />
        <MenuItem icon="logout" danger onSelect={() => toast("Sign out is turned off in the demo.", "info")}>
          Sign out
        </MenuItem>
      </Menu>
    </header>
  );
}

const sevTone = { Critical: "red", High: "orange", Medium: "amber", Low: "amber" } as const;

/** The 5 latest alerts. Rendered only while the menu is open, so it runs in the browser. */
function Notifications({ read, onReadAll }: { read: boolean; onReadAll: () => void }) {
  const close = useMenuClose();
  const db = sampleDB();
  const names = new Map(db.eq.map((e) => [e.id, e.name]));
  const latest = [...db.al].sort((a, b) => b.t - a.t).slice(0, 5);
  return (
    <>
      <div className="flex items-center px-2.5 py-1.5">
        <b className="text-[12.5px] font-semibold">Notifications</b>
        <button
          type="button"
          onClick={() => {
            onReadAll();
            close();
          }}
          className="ml-auto text-[12.5px] font-medium whitespace-nowrap text-blue hover:underline"
        >
          Mark all as read
        </button>
      </div>
      {latest.map((a) => {
        const isNew = a.state === "new" && !read;
        return (
          <Link
            key={a.id}
            href={`/equipment/${a.eq}`}
            onClick={close}
            className="flex w-full items-start gap-2.5 rounded-lg px-2.5 py-[9px] text-left text-[13px] hover:bg-gray-50"
          >
            <Tile icon="alert" tone={sevTone[a.sev]} size={30} iconSize={15} />
            <span className="min-w-0 flex-1">
              <b className="block text-[13px] font-semibold">{a.title}</b>
              <span className="text-[11.5px] text-muted">
                {names.get(a.eq) ?? a.eq} · {ago(a.t)}
              </span>
            </span>
            <i className={clsx("mt-1.5 size-2 shrink-0 rounded-full", isNew ? "bg-blue" : "invisible")} aria-hidden />
            {isNew && <span className="sr-only">(unread)</span>}
          </Link>
        );
      })}
      <MenuSeparator />
      <Link href="/alerts" onClick={close} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] text-[13px] hover:bg-gray-50">
        <Icon name="bell" size={16} className="text-[#5b6788]" />
        View all alerts
      </Link>
    </>
  );
}

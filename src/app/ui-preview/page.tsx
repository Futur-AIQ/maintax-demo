"use client";

// Temporary: every UI primitive on one page (Phase 1.1). Remove once the real pages use them.

import { type ReactNode, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTabs,
  Checkbox,
  ConditionPill,
  ConfidenceBar,
  Delta,
  EmptyState,
  EquipmentCell,
  Field,
  HealthBar,
  IconButton,
  Input,
  Kpi,
  Menu,
  MenuHeading,
  MenuItem,
  MenuSeparator,
  Modal,
  Pager,
  Pill,
  PillTabs,
  ProbabilityBar,
  RiskPill,
  Segmented,
  SearchInput,
  Select,
  SeverityPill,
  StatusPill,
  Switch,
  Tabs,
  Textarea,
  Tile,
  Toaster,
  ViewAll,
  toast,
} from "@/components/ui";
import { ICONS, Icon, type IconName } from "@/lib/icons";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card>
      <CardHeader title={title} />
      <CardBody className="flex flex-wrap items-center gap-3">{children}</CardBody>
    </Card>
  );
}

const EQUIPMENT = [
  { name: "Compressor C-494", id: "C-494", type: "Compressor", health: 39, conf: 92, prob: 74 },
  { name: "Pump P-104", id: "P-104", type: "Pump", health: 62, conf: 88, prob: 51 },
  { name: "Heat Exchanger HX-2", id: "HX-2", type: "Heat exchanger", health: 71, conf: 81, prob: 38 },
  { name: "Motor M-12", id: "M-12", type: "Motor", health: 91, conf: 76, prob: 12 },
];

export default function UiPreview() {
  const [tab, setTab] = useState<"overview" | "sensors" | "history">("overview");
  const [cardTab, setCardTab] = useState<"live" | "trend">("live");
  const [cat, setCat] = useState<"all" | "pumps" | "motors" | "compressors">("all");
  const [seg, setSeg] = useState<"24h" | "7d" | "30d">("7d");
  const [segDark, setSegDark] = useState<"1" | "10" | "60">("10");
  const [on, setOn] = useState(true);
  const [checked, setChecked] = useState(true);
  const [page, setPage] = useState(1);
  const [range, setRange] = useState("Today");
  const [modal, setModal] = useState<"none" | "normal" | "wide" | "locked">("none");

  return (
    <main className="mx-auto flex max-w-[1240px] flex-col gap-4 px-7 py-[22px] max-sm:px-4">
      <div>
        <div className="mb-1.5 text-[11.5px] font-semibold tracking-[.06em] text-ink-2 uppercase">Phase 1.1 · temporary</div>
        <h1 className="text-[28px] leading-[1.15] font-bold tracking-[-.02em] max-sm:text-[23px]">UI preview</h1>
        <p className="mt-[5px] text-[14px] text-muted">Every primitive in src/components/ui, using the MaintaX tokens.</p>
      </div>

      <Section title="Buttons">
        <Button variant="primary" icon="spark">Primary</Button>
        <Button>Secondary</Button>
        <Button variant="outline-blue" icon="clip">Outline blue</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="amber" icon="ff">Amber</Button>
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary" size="lg">Large</Button>
        <Button disabled>Disabled</Button>
        <IconButton icon="gear" aria-label="Settings" />
        <IconButton icon="x" aria-label="Close" />
      </Section>

      <Section title="Pills">
        {["Critical", "High", "Medium", "Low"].map((s) => (
          <SeverityPill key={s} value={s} />
        ))}
        <span className="text-faint">|</span>
        {["Low", "Medium", "High"].map((s) => (
          <RiskPill key={s} value={s} />
        ))}
        <span className="text-faint">|</span>
        {["Active", "Investigating", "Resolved", "False positive", "Running", "Idle", "Maintenance", "Warning", "Offline",
          "Open", "Scheduled", "In Progress", "Completed", "Pending", "Inactive", "Healthy", "Training", "New", "Acknowledged"].map((s) => (
          <StatusPill key={s} value={s} />
        ))}
        <span className="text-faint">|</span>
        {["Good", "Fair", "Poor"].map((s) => (
          <ConditionPill key={s} value={s} />
        ))}
        <Pill tone="solid">Solid</Pill>
      </Section>

      <div className="grid grid-cols-4 gap-4 max-xl:grid-cols-2">
        <Kpi icon="bell" tone="red" label="Active Alerts" value={6} sub="Requires Attention" subColor="red" delta={<Delta value={2} goodUp={false} />} cmp="vs. last 24h" />
        <Kpi icon="bars" tone="blue" label="Production Status" value="94" unit="%" sub="On Track" subColor="green" delta={<Delta value={6} suffix="%" />} cmp="current output" />
        <Kpi icon="clock" tone="blue" label="Downtime Overview" value="2.4%" sub="Total Downtime" delta={<Delta value={-1.1} decimals={1} suffix="%" goodUp={false} />} cmp="vs. last week" />
        <Kpi icon="heart" tone="green" label="Overall Equipment Health">
          <div className="grid h-[72px] place-items-center rounded-lg border border-dashed border-line text-[12px] text-muted">
            Ring / gauge slot (children)
          </div>
        </Kpi>
      </div>

      <Section title="Tiles, deltas and avatars">
        {(["blue", "green", "red", "amber", "orange", "purple", "gray", "solid-blue"] as const).map((t) => (
          <Tile key={t} icon="cog" tone={t} />
        ))}
        <Delta value={3} suffix="%" />
        <Delta value={2} goodUp={false} />
        <Delta value={-1.1} decimals={1} suffix="%" goodUp={false} />
        <Delta value={0} />
        <Avatar name="John Doe" size={36} color="#1b5fe8" />
        <Avatar name="Sarah Wilson" />
        <Avatar name="Omar Al-Sulaiti" />
        <Avatar name="Rajesh Nair" size={28} />
      </Section>

      <Card>
        <CardHeader icon="cog" title="Critical Equipment" suffix="last 24 hours" right={<ViewAll href="/ui-preview" />} />
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                {["Equipment", "Health", "Stacked", "Confidence", "Probability"].map((h) => (
                  <th key={h} className="border-b border-line-2 bg-surface-2 px-3 py-[9px] text-left text-[12px] font-medium whitespace-nowrap text-muted">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EQUIPMENT.map((e, i) => (
                <tr key={e.id} className={i === 0 ? "animate-nw" : undefined}>
                  <td className="border-b border-line-2 px-3 py-2.5 whitespace-nowrap"><EquipmentCell name={e.name} id={e.id} type={e.type} /></td>
                  <td className="border-b border-line-2 px-3 py-2.5 whitespace-nowrap"><HealthBar value={e.health} colored /></td>
                  <td className="border-b border-line-2 px-3 py-2.5 whitespace-nowrap"><HealthBar value={e.health} stacked /></td>
                  <td className="border-b border-line-2 px-3 py-2.5 whitespace-nowrap"><ConfidenceBar value={e.conf} /></td>
                  <td className="border-b border-line-2 px-3 py-2.5 whitespace-nowrap"><ProbabilityBar value={e.prob} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager page={page} total={248} perPage={8} onChange={setPage} />
      </Card>

      <Card>
        <CardHeader title="Tabs" />
        <CardBody>
          <Tabs
            aria-label="Detail tabs"
            items={[
              { value: "overview", label: "Overview" },
              { value: "sensors", label: <>Sensors <Pill tone="gray">10</Pill></> },
              { value: "history", label: "History" },
            ]}
            value={tab}
            onChange={setTab}
          />
          <CardTabs
            aria-label="Card tabs"
            items={[
              { value: "live", label: "Live View" },
              { value: "trend", label: "Trend" },
            ]}
            value={cardTab}
            onChange={setCardTab}
          />
          <PillTabs
            aria-label="Equipment type"
            items={[
              { value: "all", label: "All Equipment" },
              { value: "pumps", label: "Pumps" },
              { value: "motors", label: "Motors" },
              { value: "compressors", label: "Compressors" },
            ]}
            value={cat}
            onChange={setCat}
          />
          <div className="flex flex-wrap items-center gap-3">
            <Segmented
              aria-label="Range"
              items={[
                { value: "24h", label: "24h" },
                { value: "7d", label: "7 days" },
                { value: "30d", label: "30 days" },
              ]}
              value={seg}
              onChange={setSeg}
            />
            <div className="rounded-lg bg-ink p-2">
              <Segmented
                dark
                aria-label="Speed"
                items={[
                  { value: "1", label: "1×" },
                  { value: "10", label: "10×" },
                  { value: "60", label: "60×" },
                ]}
                value={segDark}
                onChange={setSegDark}
              />
            </div>
            <Switch checked={on} onChange={setOn} aria-label="Email alerts" />
            <Checkbox checked={checked} onChange={setChecked} label="Notify technician" />
            <Checkbox checked={false} onChange={() => {}} label="Disabled" disabled />
          </div>
        </CardBody>
      </Card>

      <Section title="Inputs">
        <div className="grid w-full grid-cols-2 gap-3.5 max-sm:grid-cols-1">
          <Field label="Title" htmlFor="pv-title">
            <Input id="pv-title" placeholder="Replace bearing on P-104" />
          </Field>
          <Field label="Priority" htmlFor="pv-pri">
            <Select id="pv-pri" defaultValue="High">
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </Select>
          </Field>
          <Field label="Search" htmlFor="pv-search">
            <SearchInput id="pv-search" placeholder="Search equipment…" />
          </Field>
          <Field label="Disabled" htmlFor="pv-dis">
            <Input id="pv-dis" disabled value="Read only" />
          </Field>
          <Field label="Notes" htmlFor="pv-notes" className="col-span-full">
            <Textarea id="pv-notes" placeholder="Add a note for the technician" />
          </Field>
        </div>
      </Section>

      <Section title="Menus, modals and toasts">
        <Menu
          align="left"
          aria-label="Date range"
          trigger={(p) => (
            <Button {...p} icon="cal">
              {range}
              <Icon name="down" size={14} />
            </Button>
          )}
        >
          <MenuHeading>Range</MenuHeading>
          {["Today", "Last 7 days", "Last 30 days", "Last 90 days"].map((r) => (
            <MenuItem key={r} checked={r === range} onSelect={() => setRange(r)}>
              {r}
            </MenuItem>
          ))}
          <MenuSeparator />
          <p className="px-2.5 py-1.5 text-[11.5px] text-muted">Ranges are fixed in this demo.</p>
        </Menu>
        <Menu
          aria-label="User menu"
          trigger={(p) => (
            <Button {...p}>
              User menu (right)
              <Icon name="down" size={14} />
            </Button>
          )}
        >
          <MenuItem icon="user" href="/ui-preview">My profile</MenuItem>
          <MenuItem icon="sliders">Preferences</MenuItem>
          <MenuSeparator />
          <MenuItem icon="lock" danger onSelect={() => toast("Sign out is turned off in the demo.", "info")}>
            Sign out
          </MenuItem>
        </Menu>
        <Button onClick={() => setModal("normal")}>Modal</Button>
        <Button onClick={() => setModal("wide")}>Wide modal</Button>
        <Button onClick={() => setModal("locked")}>Locked modal</Button>
        <Button onClick={() => toast("Work order created.")}>Toast ok</Button>
        <Button onClick={() => toast("Preferences are saved in this browser only.", "info")}>Toast info</Button>
        <Button onClick={() => toast("Vibration rising on P-104.", "warn")}>Toast warn</Button>
        <Button onClick={() => toast("Critical anomaly on P-104.", "crit", { label: "View", href: "/ui-preview" })}>
          Toast crit + link
        </Button>
      </Section>

      <Card>
        <CardHeader title="Empty state" />
        <EmptyState icon="search" action={<Button size="sm">Clear filters</Button>}>
          No equipment matches these filters.
        </EmptyState>
      </Card>

      <Section title="Icons (lib/icons.ts)">
        <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(92px,1fr))] gap-2">
          {(Object.keys(ICONS) as IconName[]).map((n) => (
            <div key={n} className="flex flex-col items-center gap-1 rounded-lg border border-line-2 py-2 text-[11px] text-muted">
              <Icon name={n} className="text-ink-2" />
              {n}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Animations">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[.06em] text-red">
          <i className="size-[7px] animate-blink rounded-full bg-red" /> LIVE
        </span>
        <span className="size-6 animate-spin rounded-full border-2 border-blue border-t-transparent" />
        <span className="rounded-[10px] border border-[#f3a4a7] bg-[#fffafa] px-3 py-2 text-[12px] animate-glow">
          glow
        </span>
      </Section>

      <Modal
        open={modal !== "none"}
        onClose={() => setModal("none")}
        wide={modal === "wide"}
        locked={modal === "locked"}
        icon={<Tile icon="clip" tone="blue" />}
        title={modal === "locked" ? "Creating work order…" : "Create work order"}
        subtitle="P-104 · Pump · Production Line 2"
        footer={
          <>
            <span className="mr-auto text-[12px] text-muted">In this demo nothing is sent anywhere.</span>
            <Button onClick={() => setModal("none")}>{modal === "locked" ? "Finish" : "Cancel"}</Button>
            {modal !== "locked" && <Button variant="primary" onClick={() => setModal("none")}>Create</Button>}
          </>
        }
      >
        {modal === "locked" ? (
          <p className="text-[13.5px] text-ink-2">Locked: Esc and the backdrop do nothing. Use Finish.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1">
            <Field label="Title" htmlFor="m-title">
              <Input id="m-title" defaultValue="Replace drive-end bearing" />
            </Field>
            <Field label="Assignee" htmlFor="m-who">
              <Select id="m-who">
                <option>David Martinez</option>
                <option>Sarah Wilson</option>
              </Select>
            </Field>
          </div>
        )}
      </Modal>
      <Toaster />
    </main>
  );
}

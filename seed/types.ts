// Shared types for the MaintaX demo data. Copied to src/data/ in Phase 2.
// All timestamps are numbers (ms since epoch). Keys holding timestamps are named `t` or end in `At`,
// so the persistence layer can shift them when a saved session is reopened (see docs/specs/02-data.md).

export type PlantId = "MES" | "RLF" | "DOH";
export type PlantSel = PlantId | "ALL";
export type EqStatus = "Running" | "Idle" | "Maintenance" | "Warning" | "Critical" | "Offline";
export type Band = "Healthy" | "At Risk" | "Degraded" | "Critical" | "Offline";
export type Risk = "Low" | "Medium" | "High";
export type Severity = "Low" | "Medium" | "High" | "Critical";
export type Condition = "Good" | "Fair" | "Poor";
export type AnomalyType = "Sensor" | "Behavioral" | "Performance" | "Energy" | "Temperature" | "Vibration";
export type AnomalyStatus = "Active" | "Investigating" | "Resolved" | "False positive";
export type AlertState = "new" | "ack" | "resolved";
export type WoStatus = "Open" | "Scheduled" | "In Progress" | "Completed";
export type WoType = "Predictive" | "Preventive" | "Corrective" | "Inspection";
export type PredStatus = "Open" | "Scheduled" | "Mitigated";
export type Currency = "USD" | "QAR" | "AED";
export type Tone = "blue" | "green" | "red" | "amber" | "orange" | "purple" | "gray";

export interface Plant { id: PlantId; name: string; short: string; loc: string; unit: string; lines: string[]; count: number }

export interface Equipment {
  id: string; name: string; type: string; plant: PlantId; line: string; status: EqStatus;
  health: number; cond: Condition; rel: number; rul: number; risk: Risk;
  lastMaintAt: number; installedYr: number; make: string; desc?: string;
  /** set by the simulation while a failure is predicted */
  rulDays?: number | null;
  /** true once a scenario repair completed: sensors read their post-repair values */
  post?: boolean;
}

export interface RootCause { causes: [string, number][]; model: string; action: string; evidence?: string }

export interface LogEntry { t: number; a: string; by?: string }

export interface Anomaly {
  id: string; eq: string; plant: PlantId; type: AnomalyType; sev: Severity; conf: number; status: AnomalyStatus;
  detectedAt: number; metric: string; value: number; unit: string; lo: number; hi: number; base: number;
  isNew: boolean; rca: RootCause; comments: { t: number; text: string; by: string }[]; log: LogEntry[];
  woId?: string; scen?: boolean;
}

export interface Prediction {
  id: string; eq: string; plant: PlantId; mode: string; prob: number; win: string; rul: number; conf: number;
  action: string; status: PredStatus; createdAt: number; scen?: boolean;
}

export interface Alert { id: string; eq: string; plant: PlantId; sev: Severity; title: string; trigger: "AI" | "Rule"; t: number; state: AlertState }

export interface WorkOrder {
  id: string; title: string; eq: string; plant: PlantId; type: WoType; pri: Risk; status: WoStatus; dueAt: number;
  assignee: string; team: string; est: number; parts: [string, number][]; checklist: { t: string; done: boolean }[];
  source: "AI" | "Manual"; anomalyId: string | null; createdAt: number; doneAt: number | null; hours: number; log: LogEntry[];
}

export interface User { id: string; name: string; email: string; team: string; role: string; status: "Active" | "Pending" | "Inactive"; loginAt: number; added?: boolean }
export interface Activity { t: number; user: string; action: string; detail: string; icon: string }
export interface Model { id: string; family: string; ver: string; acc: number; drift: number; status: "Healthy" | "Training"; trainedAt: number; progress: number }
export interface Feedback { t: number; text: string; kind: "ok" | "fp" }
export interface Integration { id: string; name: string; kind: string; detail: string; on: boolean; icon: string; syncAt: number }
export interface Sensor { id: string; type: string; eq: string; plant: PlantId; status: "Online"; lastAt: number }
export interface Report { id: string; name: string; cat: string; scope: string; plant: PlantSel; t: number; gen?: boolean }
export interface DashInsight { icon: string; tone: Tone; title: string; text: string; t: number; scen?: boolean }
export interface ListInsight { text: string; icon: string; tone: Tone; t: number; scen?: boolean }

export interface DB {
  v: 1;
  eq: Equipment[]; an: Anomaly[]; pr: Prediction[]; al: Alert[]; wo: WorkOrder[];
  users: User[]; activity: Activity[]; audit: Activity[]; models: Model[]; feedback: Feedback[];
  integ: Integration[]; sensors: Sensor[]; reports: Report[];
  insDash: DashInsight[]; insAn: ListInsight[]; analysis: ListInsight[];
  detTypes: Record<AnomalyType, number>; detD: Record<AnomalyType, number>;
  avoided: Record<PlantId, number>;
  nextAn: number; nextAl: number; nextWo: number; nextPr: number; nextRep: number;
  completed: string[]; eqHist: Record<string, LogEntry[]>;
  rules?: Record<number, boolean>; perm?: Record<string, boolean>;
  sec?: { mfa: boolean; ip: boolean; timeout: string; ret: string }; keys?: [string, string, number][];
}

/** Sensor definition used for equipment detail cards and live scenarios. */
export interface SensorDef { key: string; name: string; unit: string; lo: number; hi: number; icon: string; base: number; post?: number }

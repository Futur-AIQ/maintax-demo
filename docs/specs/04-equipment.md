# Phase 4 — Equipment Monitoring and Equipment detail

**Targets:** `reference/03-equipment-monitoring.png`. Also, in `prototype/`: `04-equipment`, `05-equipment-production-lines`, `06-equipment-row-menu`, `07-equipment-detail-hx2`, `08-equipment-detail-sensors-tab`, `48-equipment-detail-p104-after-repair`.
**Prototype:** `ROUTES.equipment`, `eqFiltered`, `rulTxt`, `arcGauge`, `eqDetail`, `sensorCard`, `trendChart`, `liveChart`, `aiPanel`, `histFor`, `illFor`, `illPump`, `illMotor`, `illComp`, `spark`.

## 4.1 Equipment Monitoring (`/equipment`)

- **Header:** eyebrow "EQUIPMENT MONITORING", title "Equipment Monitoring", subtitle "Real-time visibility into your equipment health, status and performance." On the right: DatePill, Plant Online and PlantSwitcher (`prefs.plant`, default All Plants).
- **PillTabs:** All Equipment, Production Lines, Machines, Motors, Pumps, Compressors, Generators, HVAC, Industrial Assets. The category of each type comes from `TYPES[type].cat`. "Production Lines" shows everything sorted by line.
- **KPI row** (columns .8 / 1.5 / 1.35 / 1.5):
  - **Total Equipment:** the count, **248** for All Plants, ↑2%.
  - **Equipment Status:** donut and legend of the 6 statuses (182 / 28 / 14 / 12 / 8 / 4).
  - **Equipment Health:** ArcGauge with the plant preset average (All 87%) and "Avg. Health Score", ↑4%.
  - **AI Insights:** four rows with counts, each linking to its page:
    - Predicted Failures = `predWeek`
    - Anomalies Detected = `anActive`
    - Maintenance Recommendations = `maintDue`
    - Operational Risks = `critEq`
- **Main area** (2.25fr / 1fr):
  - **Left column**
    - **Equipment Overview** card, header controls: search ("Search equipment…"), Line select, Status select.
    - The table: Equipment, Line (muted), Status pill, Health Score (stacked bar), Condition pill, Reliability bar, Remaining Life ("2.4 yrs", or red "6.0 days" while a failure is predicted), Current Risk, row menu.
    - Row menu: View details, Create work order, Show anomalies.
    - 8 rows per page. The screenshot assets come first (P-104, C-203, M-12, F-3, CV-7, G-1, HVAC-01, P-207), then by ID.
    - Empty state: "No equipment matches these filters." with a Clear filters button.
    - **Equipment Health Trend** card: LineChart of `EQ_TREND` with 7D / 30D / 90D / 1Y toggles. To its right, a **Health Score Distribution** donut (65 / 18 / 10 / 5 / 2%) inside a light inner panel.
  - **Right column**
    - **Sensor Monitoring:** 10 tiles from `SENSOR_TYPES` (icon, name, "24 / 24"). A tile opens `/integrations` filtered to that sensor type.
    - **Real-Time Monitoring** list:
      - Live Sensor Data (Active): opens the live scenario asset, or the most critical asset.
      - Sensor Status (Normal)
      - Thresholds (Configured)
      - Sensor Anomalies: red count of active Sensor anomalies
      - Sensor History

## 4.2 Equipment detail (`/equipment/[id]`)

- **Header:** "← Equipment" link, the name with a status pill, and the subtitle "{desc · }{type} · {plant name} · {line}". Actions: Ask AI Assistant (Phase 9; navigate to `/assistant` for now) and **Create Work Order** (opens the modal in Phase 7; a placeholder toast is fine now). While a scenario runs on this asset, show a blinking red "LIVE · TIME-LAPSE" tag.
- **Summary strip card** (7 columns, wrapping on small screens):
  - asset illustration (pump, motor or compressor SVG; other types get a large icon tile)
  - Health score ring
  - Remaining useful life
  - Failure probability (7 days): the open prediction's probability, else `max(1, round((100 - health) / 6))`
  - Reliability
  - Risk
  - Last maintenance
- **Tabs:** Overview, Sensors, Maintenance History, Work Orders, Specifications.
  - **Overview** (2fr / 1fr):
    - **Live Sensors** grid: 3 columns, 2 on phones. Each card shows the icon and name, the value with unit (22px), "Normal lo–hi" and a sparkline.
    - An out-of-band card gets a red border, a red value and a one-time glow.
    - Clicking a card selects that sensor for the trend chart.
    - **Trend chart** card: the sensor name with its normal range. **LiveChart** shows a shaded green normal band with dashed edges, the line and area, and the last point red when out of band. Labels show the last 24 hours.
    - **Right column:**
      - **AI Analysis** card: anomaly score ring (0–1).
      - The prediction box, red (or green "No failure predicted").
      - Root cause bars, evidence and recommended action, from the active anomaly's `rca`.
      - **Anomaly History** list.
  - **Sensors:** a table of sensors (current value, range, status pill, 24h sparkline).
  - **Maintenance History:** a timeline from `histFor`.
  - **Work Orders:** a table, or an empty state with "Create Work Order".
  - **Specifications:** key-value pairs.
- **Unknown ID:** the not-found empty state.
- Build **LiveChart** with an x-domain (`x0`, `x1`), markers (`{x, label, color}`) and an `xfmt`, because Phase 6 feeds it time-lapse data.

## Done when

- [ ] `/equipment` matches `reference/03-equipment-monitoring.png`: 248 assets with the same status split, and the first 8 rows the same assets and values.
- [ ] Tabs, search, filters, pagination and the row menu all work.
- [ ] `/equipment/HX-2` matches `prototype/07-equipment-detail-hx2.png`.
- [ ] Build and lint pass.

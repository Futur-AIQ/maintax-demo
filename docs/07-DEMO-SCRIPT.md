# MaintaX — 5-Minute Demo Script

For the presenter. The talking points are suggestions; the actions in **bold** are what to click.

**Before the meeting**
- Open the demo, click **Demo · Sample data → Reset demo data**.
- In the presenter panel, set the currency to the prospect's (USD, QAR or AED) and the speed to **2×**.
- Start on **Dashboard**.

---

### 1. The plant at a glance (45 s)

*Screen: Plant Overview*

> "This is Gulf Crest's Mesaieed chemical plant: 142 monitored assets. MaintaX gives the operations manager one view: overall equipment health is 92%, production is on track, and the AI has already flagged a few things to look at."

- Point at **Equipment Health**, **AI Insights** and **Critical Equipment**.
- Point at **Production Impact**: "MaintaX also puts a number on it: downtime avoided this week, and the cost impact."

### 2. Start the live feed (30 s)

- Press **S** (or the presenter panel → **Pump P-104 bearing wear**) → **Start scenario**. The live view of Pump P-104 opens.

> "Let's watch one asset live. This is a feed pump on Line 1. We're running in time-lapse: every second is two hours of plant time. Everything is in its normal band."

### 3. Early warning (30 s)

*Vibration starts rising (about 10 s at 2×)*

> "See the vibration creeping up? It's still inside the normal limits. A traditional alarm wouldn't fire yet. But MaintaX's anomaly model has already noticed the pattern."

- Point at the **AI early warning** insight and the **anomaly score**.

### 4. Anomaly confirmed (30 s)

*At about 21 s: toast, badge, alert*

> "Now it's confirmed: 8.4 millimetres per second, 145% above baseline. MaintaX raises a critical anomaly, alerts the team, and updates every screen at once."

- Click **Anomalies** in the sidebar. P-104 is at the top. **Click the row** to show the details panel.

### 5. Prediction and root cause (45 s)

> "It doesn't stop at 'something is wrong'. It predicts a 68% chance of failure within five days, so the remaining useful life drops from 2.4 years to six days. It also tells you why: wear on the bearing's outer race, with 87% confidence, from the vibration signature. And it tells you what to do."

- Open the **AI Analysis** tab in the panel.

### 6. Turn it into action (45 s)

- Click **Create Work Order** (or press **W**).

> "One click turns the AI's recommendation into a work order: the task, the right bearing from stock, the technician, and the next planned stop on Line 1, so we repair it on our schedule, not when it breaks."

- Click **Create**. Show it under **Maintenance Due** on the Dashboard.

### 7. Repair and result (45 s)

- On the work order, click **Fast-forward to repair** (or press **F**). The checklist ticks, the pump restarts, and the outcome appears.

> "Bearing replaced in a 4.5-hour planned window. Without the warning, this pump would have failed mid-run: a seized bearing, a damaged seal, about 19 hours down. MaintaX avoided 14.6 hours of unplanned downtime and about QAR 36,000 on this one pump. The prediction is confirmed back to the model, so it keeps learning."

- Click **View on dashboard**: the downtime-avoided figure has gone up.

### 8. Close (30 s, pick what fits the audience)

| Audience | Show |
|---|---|
| Plant manager | **Downtime** (by equipment, line and failure type) or **Reports** (generate a report) |
| Engineering or IT | **Data & Integrations** (OPC UA, historian, SAP PM) and **AI & Models** (accuracy 92.4%, drift) |
| Management | **Administration** (roles, audit log) |
| Anyone | **AI Assistant** → "What needs my attention today?" |

> "That's MaintaX: predict, prevent, perform."

---

**Other scenarios** for a second run or a different audience:
- **Agitator motor overheating** (temperature, reactor batch at risk, avoids about 22 hrs and $31,500). Good for chemical batch plants.
- **Compressor seal leak** (pressure, Ras Laffan polymer plant, avoids about 11 hrs). Good for gas and polymer.

**If something goes wrong:** the presenter panel's **Reset demo data** restores everything in one click.

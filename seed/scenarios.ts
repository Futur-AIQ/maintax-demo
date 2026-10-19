// The three scripted failure scenarios (docs/05-SIMULATION-SPEC.md). Ported from the prototype.
// Sensor `pts` are [plantHour, value] key points; the engine interpolates them (see docs/specs/06-simulation.md).
import type { PlantId, AnomalyType } from "./types";

export interface ScenarioSensor { k: string; n: string; u: string; lo: number; hi: number; i: string; base: number; post: number; max: number; pts: [number, number][] }
export interface Scenario {
  id: string; eq: string; plant: PlantId; name: string; kind: string; tone: string; ill: string; primary: string; det: AnomalyType; story: string;
  start: { health: number; status: "Running"; risk: "Low"; cond: "Good"; rul: number }; post: { health: number; rul: number }; drop: number;
  sensors: ScenarioSensor[];
  anomaly: { type: AnomalyType; sev: "Critical"; conf: number; metric: string; unit: string; lo: number; hi: number; base: number; value: number };
  early: { text: string; dash: string }; confirmText: string; alert: string;
  pred: { mode: string; prob: number; win: string; rul: number; conf: number; action: string; dash: string };
  rca: { causes: [string, number][]; evidence: string; action: string; model: string; analysis: string };
  wo: { title: string; type: "Predictive"; pri: "High"; assignee: string; est: number; parts: [string, number][]; checklist: string[] };
  outcome: { lead: number; planned: number; unplanned: number; avoided: number; cost: number; rate: number; note: string; model: string; fb: string };
}

export const PHASES: {label:string}[] =[{label:'Monitoring'},{label:'Early warning'},{label:'Anomaly detected'},{label:'Predicting failure'},{label:'Action needed'},{label:'Work order scheduled'},{label:'Repair in progress'},{label:'Failure avoided'}];
export const SCEN: Record<string,Scenario> ={
 pump:{id:'pump',eq:'P-104',plant:'MES',name:'Pump P-104 bearing wear',kind:'Vibration',tone:'red',ill:'pump',primary:'vib',det:'Vibration',
  story:'The drive-end bearing outer race is wearing. Vibration rises first, then temperature and noise.',
  start:{health:92,status:'Running',risk:'Low',cond:'Good',rul:2.4},post:{health:96,rul:2.9},drop:62,
  sensors:[{k:'vib',n:'Vibration (DE bearing)',u:'mm/s',lo:3.4,hi:5.2,i:'pulse',base:3.43,post:2.9,max:8.9,pts:[[0,3.43],[24,3.6],[54,5.3],[72,6.7],[84,8.4],[96,8.6]]},
   {k:'temp',n:'Bearing temperature',u:'°C',lo:45,hi:75,i:'thermo',base:58,post:55,max:74,pts:[[0,58],[24,58],[54,62],[72,66],[84,71],[96,72]]},
   {k:'press',n:'Discharge pressure',u:'bar',lo:5.6,hi:6.8,i:'gauge',base:6.2,post:6.3,max:5.8,pts:[[0,6.2],[24,6.2],[54,6.1],[72,6.0],[84,5.9],[96,5.9]]},
   {k:'cur',n:'Motor current',u:'A',lo:36,hi:48,i:'amp',base:42,post:41,max:46,pts:[[0,42],[24,42],[54,43],[72,44],[84,45],[96,45.5]]},
   {k:'flow',n:'Flow rate',u:'m³/h',lo:105,hi:130,i:'flow',base:120,post:122,max:114,pts:[[0,120],[24,120],[54,119],[72,117],[84,116],[96,115]]},
   {k:'ac',n:'Acoustic level',u:'dB',lo:60,hi:80,i:'vol',base:72,post:70,max:83,pts:[[0,72],[24,72],[54,75],[72,78],[84,81],[96,82]]}],
  anomaly:{type:'Vibration',sev:'Critical',conf:96,metric:'Vibration (DE bearing)',unit:'mm/s',lo:3.4,hi:5.2,base:3.43,value:8.4},
  early:{text:'Early warning: vibration trending up on Pump P-104 (61% confidence).',dash:'Emerging Equipment Issue|Vibration trending up on Pump P-104 (early warning).'},
  confirmText:'Rising vibration levels detected in Pump P-104 (96% confidence).',alert:'Critical vibration on Pump P-104',
  pred:{mode:'Bearing failure (outer race)',prob:68,win:'≤ 5 days',rul:6,conf:96,action:'Replace DE bearing, check alignment',dash:'Pump P-104 failure probability at 68% (next 5 days).'},
  rca:{causes:[['Bearing wear (outer race)',87],['Shaft misalignment',9],['Lubrication degradation',4]],evidence:'Peaks at the bearing outer-race frequency (BPFO, 4.1× running speed) with harmonics; temperature rise follows vibration by about 12 h.',action:'Replace the DE bearing (SKF 6312), check alignment, regrease. Estimated 4.5 h during the Line 1 planned stop.',model:'AD-Vibration v3.0',analysis:'Root cause identified for Pump P-104 anomaly: bearing wear.'},
  wo:{title:'Replace DE bearing — Pump P-104',type:'Predictive',pri:'High',assignee:'David Martinez',est:4.5,parts:[['SKF 6312 bearing',1],['Lubricant (2 kg)',1],['Coupling insert',1]],checklist:['Isolate and lock out pump','Remove coupling guard and coupling','Replace DE bearing','Check shaft alignment (laser)','Regrease and refit coupling','Run test and record vibration']},
  outcome:{lead:5.0,planned:4.5,unplanned:19.1,avoided:14.6,cost:9940,rate:681,note:'bearing seizure → seal damage → pump rebuild',model:'RUL-Bearing v2.2',fb:'Prediction confirmed — P-104 bearing failure, lead time 5.0 days'}},
 motor:{id:'motor',eq:'M-301',plant:'MES',name:'Agitator motor M-301 overheating',kind:'Temperature',tone:'amber',ill:'motor',primary:'temp',det:'Temperature',
  story:'The motor cooling fan is clogging with process dust. If it trips mid-batch, the reactor batch is lost.',
  start:{health:90,status:'Running',risk:'Low',cond:'Good',rul:3.1},post:{health:95,rul:3.4},drop:58,
  sensors:[{k:'temp',n:'Winding temperature',u:'°C',lo:60,hi:100,i:'thermo',base:78,post:76,max:120,pts:[[0,78],[24,80],[56,101],[72,108],[84,114],[96,117]]},
   {k:'cur',n:'Motor current',u:'A',lo:50,hi:68,i:'amp',base:61,post:60,max:71,pts:[[0,61],[24,61],[56,65],[72,67],[84,69],[96,70]]},
   {k:'air',n:'Cooling airflow',u:'%',lo:80,hi:100,i:'wind',base:96,post:98,max:54,pts:[[0,96],[24,92],[56,79],[72,70],[84,61],[96,57]]},
   {k:'vib',n:'Vibration',u:'mm/s',lo:1.0,hi:3.5,i:'pulse',base:2.1,post:2.0,max:2.7,pts:[[0,2.1],[24,2.1],[56,2.3],[72,2.4],[84,2.5],[96,2.6]]},
   {k:'rpm',n:'Speed',u:'RPM',lo:1440,hi:1490,i:'gauge',base:1476,post:1477,max:1464,pts:[[0,1476],[24,1476],[56,1474],[72,1471],[84,1468],[96,1466]]}],
  anomaly:{type:'Temperature',sev:'Critical',conf:93,metric:'Winding temperature',unit:'°C',lo:60,hi:100,base:78,value:114},
  early:{text:'Early warning: winding temperature trending up on Motor M-301 (58% confidence).',dash:'Emerging Equipment Issue|Cooling airflow falling on Agitator Motor M-301.'},
  confirmText:'Overheating detected in Agitator Motor M-301 (93% confidence).',alert:'Winding over-temperature on Motor M-301',
  pred:{mode:'Winding insulation failure / thermal trip',prob:72,win:'≤ 4 days',rul:5,conf:93,action:'Clean or replace cooling fan',dash:'Motor M-301 thermal trip probability at 72% (next 4 days).'},
  rca:{causes:[['Cooling fan blockage',74],['Overload from batch viscosity',18],['Insulation ageing',8]],evidence:'Airflow fell 37% while load stayed steady; temperature rise tracks the airflow loss.',action:'Clean or replace the cooling fan and shroud, check load at the next batch change. Estimated 3.0 h.',model:'FP-Thermal v2.4',analysis:'Root cause identified for Motor M-301: cooling fan blockage.'},
  wo:{title:'Clean / replace cooling fan — Motor M-301',type:'Predictive',pri:'High',assignee:'Omar Al-Sulaiti',est:3.0,parts:[['Motor cooling fan 315 frame',1]],checklist:['Isolate and lock out motor','Remove fan cowl','Clean or replace cooling fan','Inspect winding insulation (IR test)','Refit cowl','Run test and record temperature']},
  outcome:{lead:4.0,planned:3.0,unplanned:25.0,avoided:22.0,cost:31500,rate:681,note:'mid-batch trip, batch loss and restart',model:'FP-Thermal v2.4',fb:'Prediction confirmed — M-301 thermal trip, lead time 4.0 days'}},
 comp:{id:'comp',eq:'C-110',plant:'RLF',name:'Compressor C-110 seal leak',kind:'Pressure',tone:'purple',ill:'comp',primary:'press',det:'Sensor',
  story:'The dry gas seal is leaking. Discharge pressure sags and seal vent flow climbs as the motor works harder.',
  start:{health:89,status:'Running',risk:'Low',cond:'Good',rul:2.8},post:{health:94,rul:3.0},drop:61,
  sensors:[{k:'press',n:'Discharge pressure',u:'bar',lo:8.0,hi:9.0,i:'gauge',base:8.5,post:8.6,max:6.8,pts:[[0,8.5],[24,8.5],[60,7.95],[76,7.5],[84,7.1],[96,6.9]]},
   {k:'vent',n:'Seal vent flow',u:'Nm³/h',lo:0.5,hi:2.5,i:'flow',base:1.2,post:1.0,max:5.6,pts:[[0,1.2],[24,1.4],[60,2.6],[76,3.9],[84,4.8],[96,5.3]]},
   {k:'pwr',n:'Motor power',u:'kW',lo:380,hi:430,i:'power',base:410,post:405,max:445,pts:[[0,410],[24,410],[60,424],[76,432],[84,439],[96,443]]},
   {k:'temp',n:'Discharge temperature',u:'°C',lo:85,hi:100,i:'thermo',base:94,post:93,max:103,pts:[[0,94],[24,94],[60,97],[76,99],[84,101],[96,102]]},
   {k:'vib',n:'Vibration',u:'mm/s',lo:1.5,hi:4.5,i:'pulse',base:2.8,post:2.7,max:3.2,pts:[[0,2.8],[24,2.8],[60,2.9],[76,3.0],[84,3.1],[96,3.1]]}],
  anomaly:{type:'Sensor',sev:'Critical',conf:91,metric:'Discharge pressure',unit:'bar',lo:8.0,hi:9.0,base:8.5,value:7.1},
  early:{text:'Early warning: seal vent flow rising on Compressor C-110 (57% confidence).',dash:'Emerging Equipment Issue|Seal vent flow rising on Compressor C-110.'},
  confirmText:'Pressure loss detected in Compressor C-110 (91% confidence).',alert:'Discharge pressure low on Compressor C-110',
  pred:{mode:'Dry gas seal failure',prob:61,win:'≤ 9 days',rul:10,conf:91,action:'Replace dry gas seal cartridge',dash:'Compressor C-110 seal failure probability at 61% (next 9 days).'},
  rca:{causes:[['Dry gas seal leak',81],['Suction valve wear',12],['Pressure transmitter drift',7]],evidence:'Vent flow up 4× while the pressure transmitter matches the redundant gauge.',action:'Replace the dry gas seal cartridge at the next Polymer Line A changeover. Estimated 6.0 h.',model:'AD-Multivariate v4.1',analysis:'Root cause identified for Compressor C-110: dry gas seal leak.'},
  wo:{title:'Replace dry gas seal — Compressor C-110',type:'Predictive',pri:'High',assignee:'Rajesh Nair',est:6.0,parts:[['Dry gas seal cartridge',1]],checklist:['Depressurize and purge','Isolate and lock out','Remove seal cartridge','Fit new dry gas seal','Leak test','Restart and record vent flow']},
  outcome:{lead:8.0,planned:6.0,unplanned:17.0,avoided:11.0,cost:14800,rate:1345,note:'seal failure, gas release and unplanned line stop',model:'AD-Multivariate v4.1',fb:'Prediction confirmed — C-110 dry gas seal, lead time 8.0 days'}}
};
export const T ={early:40,confirm:84,pred:88,rca:92,await:96};


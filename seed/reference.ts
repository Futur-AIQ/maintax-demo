// Reference data and presets (figures that would need months of history).
// Generated from the prototype (docs/prototype.html) so values match it exactly. See docs/04-DATA-SPEC.md.
import type { Plant, PlantId, PlantSel } from "./types";

/** Equipment types → sidebar tab category, ID prefix, icon name (map icon names to lucide in the app). */
export const TYPES: Record<string,{cat:string;pre:string;icon:string}> = {
 Pump:{cat:'Pumps',pre:'P',icon:'pump'},Motor:{cat:'Motors',pre:'M',icon:'cog'},Compressor:{cat:'Compressors',pre:'C',icon:'gauge'},
 Generator:{cat:'Generators',pre:'G',icon:'zap'},HVAC:{cat:'HVAC',pre:'HVAC',icon:'fan'},Fan:{cat:'HVAC',pre:'F',icon:'fan'},
 Furnace:{cat:'Machines',pre:'F',icon:'flame'},Conveyor:{cat:'Machines',pre:'CV',icon:'move'},Reactor:{cat:'Machines',pre:'R',icon:'cyl'},
 'Heat exchanger':{cat:'Industrial Assets',pre:'HX',icon:'waves'},Boiler:{cat:'Industrial Assets',pre:'B',icon:'flame'},Tank:{cat:'Industrial Assets',pre:'T',icon:'cyl'},
 Valve:{cat:'Industrial Assets',pre:'V',icon:'sliders'},'Cooling tower':{cat:'Industrial Assets',pre:'CT',icon:'wind'},Centrifuge:{cat:'Machines',pre:'CF',icon:'rot'},
 'Tablet press':{cat:'Machines',pre:'TP',icon:'pkg'},Coater:{cat:'Machines',pre:'CO',icon:'rot'},Blender:{cat:'Machines',pre:'BL',icon:'rot'},
 Gearbox:{cat:'Machines',pre:'GB',icon:'cog'},Blower:{cat:'Compressors',pre:'BW',icon:'wind'},AHU:{cat:'HVAC',pre:'AHU',icon:'fan'}
};

export const CATS: string[] = ['All Equipment','Production Lines','Machines','Motors','Pumps','Compressors','Generators','HVAC','Industrial Assets'];

export const PLANTS: Record<PlantId,Plant> = {
 MES:{id:'MES',name:'Mesaieed Chemical Plant',short:'Mesaieed',loc:'Mesaieed Industrial City, Qatar',unit:'kg',lines:['Production Line 1','Production Line 2','Production Line 3','Production Line 4','Production Line 5','Power Plant','Utilities'],count:142},
 RLF:{id:'RLF',name:'Ras Laffan Polymer Plant',short:'Ras Laffan',loc:'Ras Laffan Industrial City, Qatar',unit:'kg',lines:['Polymer Line A','Polymer Line B','Utilities'],count:64},
 DOH:{id:'DOH',name:'Doha Pharmaceutical Facility',short:'Doha Pharma',loc:'Doha, Qatar',unit:'units',lines:['Granulation','Compression','Coating & Packaging','Cleanroom HVAC','Utilities'],count:42}
};

export const PLANT_OPTS: [PlantSel,string][] = [['ALL','All Plants'],['MES',PLANTS.MES.name],['RLF',PLANTS.RLF.name],['DOH',PLANTS.DOH.name]];

export const LINE_COST: Record<string,number> = {'Production Line 1':681,'Production Line 2':540,'Production Line 3':720,'Production Line 4':410,'Production Line 5':380,'Polymer Line A':1345,'Polymer Line B':1180};

export const SENSOR_TYPES: [string,number,string][] = [['Temperature',24,'thermo'],['Vibration',18,'pulse'],['Pressure',16,'gauge'],['Humidity',12,'drop'],['Voltage',10,'zap'],['Current',10,'amp'],['RPM',8,'gauge'],['Flow Rate',8,'flow'],['Acoustic Data',6,'vol'],['Power Consumption',6,'power']];

export const PARTS: [string,number][] = [['SKF 6312 bearing',4],['Mechanical seal kit P-100 series',2],['Coupling insert',6],['Motor cooling fan 315 frame',1],['Dry gas seal cartridge',1],['Lubricant (2 kg)',12],['V-belt set B-68',5],['Thermocouple type K',8]];

export const TECHS: string[] = ['David Martinez','Sarah Wilson','Omar Al-Sulaiti','Rajesh Nair','Yusuf Qureshi','Thomas Mathew'];

/** Plant Overview presets per plant (data spec §7). */
export const OV: Record<PlantSel,{health:number;hd:number;prod:number;out:number;od:number;dt:number;dtd:number;impact:number;potential:number;avoided:number;cost:number;alD:number;crD:number;mdD:number;pfD:number}> = {
 MES:{health:92,hd:3,prod:94,out:120400,od:6,dt:2.4,dtd:-1.1,impact:-1.8,potential:6.5,avoided:18.2,cost:12400,alD:2,crD:-1,mdD:3,pfD:2},
 RLF:{health:86,hd:1,prod:91,out:58200,od:3,dt:3.1,dtd:-0.4,impact:-2.6,potential:4.1,avoided:7.4,cost:6900,alD:1,crD:0,mdD:1,pfD:1},
 DOH:{health:90,hd:2,prod:97,out:1840000,od:5,dt:1.2,dtd:-0.3,impact:-0.4,potential:1.3,avoided:3.0,cost:3100,alD:0,crD:0,mdD:-1,pfD:0},
 ALL:{health:87,hd:4,prod:93,out:0,od:5,dt:2.5,dtd:-0.8,impact:-1.9,potential:11.9,avoided:28.6,cost:22400,alD:3,crD:-1,mdD:3,pfD:3}
};

export const PROD_SERIES: {actual:number[];target:number[]} = {actual:[84,82,91,98,102,113,120.4],target:[90,96,100,106,112,118,125]};

export const ANOM_TRENDS: Record<string,number[]> = {Sensor:[18,20,19,24,22,26,30],Behavioral:[12,10,13,11,15,14,16],Performance:[8,10,9,12,10,13,14],Energy:[6,8,7,9,8,10,12],Temperature:[10,9,12,11,13,12,15],Vibration:[5,7,6,8,7,9,11]};

export const ANOM_TOTAL: number[] = [54,57,60,62,64,66,74];

export const EQ_TREND: Record<string,number[]> = {Healthy:[74,73,75,74,73,74,75],'At Risk':[61,60,58,59,58,59,60],Degraded:[46,45,47,44,45,44,45],Critical:[24,25,23,26,24,23,22],Offline:[5,6,5,5,4,5,5]};

/** Downtime presets, last 7 days at Mesaieed (data spec §8). 30D = ×4.1, 90D = ×12.6. */
export const DT = {total:48.6,un:32.4,pl:16.2,dTot:12,dUn:18,dPl:-8,
 byEq:[['Pump P-104',12.8,'#1b5fe8'],['Compressor C-203',10.4,'#13a37f'],['Motor M-112',8.7,'#f2b52c'],['Furnace F-3',6.2,'#d55ad0'],['Conveyor CV-7',5.1,'#8b5cf6'],['Other Equipment',5.4,'#b8c4d9']],
 byLine:{cats:['Line 1','Line 2','Line 3','Line 4','Line 5'],un:[12.1,9.0,6.6,4.6,3.4],pl:[4.3,2.8,2.0,1.6,2.2]},
 byType:[['Mechanical Failure',18.2,'#f0607a'],['Electrical Failure',11.6,'#f57c20'],['Thermal Failure',7.8,'#f2b52c'],['Hydraulic Failure',5.4,'#13a37f'],['Sensor Failure',3.2,'#1b5fe8'],['Other',2.4,'#8b5cf6']]};

/** Reliability presets (data spec §9). */
export const REL = {mtbf:412,mtbfD:6,mttr:3.8,mttrD:-9,avail:97.6,availD:0.4,fails:14,failsD:-3,trend:[352,358,365,361,372,380,377,389,396,401,407,412],
 byType:[['Pumps',5,'#1b5fe8'],['Motors',3,'#13a37f'],['Compressors',2,'#7c4ddb'],['Heat exchangers',2,'#f57c20'],['Conveyors',1,'#f2b52c'],['Other',1,'#9aa5bd']]};

/** Production presets (data spec §10). lines: [line, product, output, target, OEE, limiting asset id]. */
export const PROD = {oee:81.6,av:92.1,pf:91.4,q:96.9,lines:[['Production Line 1','Ammonia solution',38200,40000,83,'P-104'],['Production Line 2','Separated gases',29800,32000,79,'C-203'],['Production Line 3','Thermal processing',21600,24000,74,'F-3'],['Production Line 4','Drying & handling',17400,18000,86,''],['Production Line 5','Packaged product',13400,14000,88,'']]};

export const MODEL_TREND: Record<string,number[]> = {'Failure Prediction':[87,86,88,89,88,88,89],'Anomaly Detection':[90,91,90,92,91,91,92],RUL:[83,84,82,85,84,84,85],'Root Cause':[77,78,76,79,78,79,78],Reliability:[69,70,69,71,70,71,71]};

export const FAMC: Record<string,string> = {'Failure Prediction':'#7c4ddb','Anomaly Detection':'#1b9be8',RUL:'#13a37f','Root Cause':'#f0607a',Reliability:'#5b6cf0'};

export const BANDC: Record<string,string> = {Healthy:'#13a37f','At Risk':'#f2b52c',Degraded:'#f57c20',Critical:'#e5383f',Offline:'#9aa5bd'};

export const STC: Record<string,string> = {Running:'#13a37f',Idle:'#1b5fe8',Maintenance:'#7c4ddb',Warning:'#f57c20',Critical:'#e5383f',Offline:'#9aa5bd'};

export const TYPEC: Record<string,string> = {Sensor:'#5b6cf0',Behavioral:'#f2b52c',Performance:'#13a37f',Energy:'#f57c20',Temperature:'#a26bf5',Vibration:'#f0607a'};

/** Sensor templates for non-scenario assets: [key, name, unit, lo, hi, icon]. */
export const SENSOR_TPL: Record<string,[string,string,string,number,number,string][]> = {
 Pump:[['vib','Vibration (DE bearing)','mm/s',3.4,5.2,'pulse'],['temp','Bearing temperature','°C',45,75,'thermo'],['press','Discharge pressure','bar',5.6,6.8,'gauge'],['cur','Motor current','A',36,48,'amp']],
 Motor:[['temp','Winding temperature','°C',60,100,'thermo'],['cur','Motor current','A',50,68,'amp'],['vib','Vibration','mm/s',1.0,3.5,'pulse'],['rpm','Speed','RPM',1440,1490,'gauge']],
 Compressor:[['press','Discharge pressure','bar',8.0,9.0,'gauge'],['temp','Discharge temperature','°C',85,100,'thermo'],['vib','Vibration','mm/s',1.5,4.5,'pulse'],['pwr','Motor power','kW',380,430,'power']],
 default:[['temp','Temperature','°C',40,80,'thermo'],['vib','Vibration','mm/s',1.0,4.5,'pulse'],['press','Pressure','bar',2,6,'gauge'],['pwr','Power','kW',20,60,'power']]};

/** Report categories: [name, tone, icon, description, base count]. */
export const REPCATS: [string,string,string,string,number][] = [['Equipment','blue','cog','Equipment health, status, performance and utilization reports.',12],['Maintenance','green','wrench','Maintenance activities, work orders and cost analysis reports.',10],['Reliability','purple','shieldc','MTBF, MTTR, availability and reliability metrics reports.',8],['Downtime','amber','clock','Downtime analysis, causes and impact reports.',9],['Production','green','bars','Production performance, OEE and throughput reports.',7],['Failure','red','alert','Failure analysis, trends and root cause reports.',6]];

/** Roles: [name, description, icon]. */
export const ROLES: [string,string,string][] = [['System Administrator','Full system access','shieldc'],['Operations Manager','Operations & equipment access','build'],['Maintenance Lead','Maintenance & work orders','wrench'],['Engineer','Equipment & data access','cog'],['Data Analyst','Read-only analytics access','bars'],['Auditor','Read-only access','shield'],['Technician','Work order execution','wrench'],['IT Support','User and device support','cpu']];

export const TEAMC: Record<string,string> = {Operations:'#7c4ddb','Maintenance':'#1b5fe8',Engineering:'#13a37f','Quality & Safety':'#f57c20','IT & Admin':'#1b9be8'};

/** AI Assistant suggested questions. */
export const QS: string[] = ['What needs my attention today?','Why is Pump P-104 flagged?','Which assets are likely to fail this week?','What caused most downtime last week?','How much downtime has MaintaX helped avoid?','Show the health of Line 1.','How accurate are the AI models?','What maintenance is due this week?'];

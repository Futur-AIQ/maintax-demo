// Deterministic seed builder. Call once in the browser: buildDB(Date.now()).
// Ported from the prototype's buildDB (docs/prototype.html) — keep in sync; seed/verify.ts asserts the key counts.
/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-explicit-any */
// @ts-nocheck — internal generator ported 1:1 from the prototype. Its output is typed as DB and checked by seed/verify.ts.
import type { DB } from "./types";
import { D, H, MIN, rng, clamp, p2 } from "./util";
import { TYPES, PLANTS, SENSOR_TYPES, TECHS } from "./reference";

export function buildDB(now: number): DB {
 const r=rng(20261019);const pick=<T,>(a:T[]):T=>a[Math.floor(r()*a.length)];const between=(a,b)=>a+r()*(b-a);
 const eq=[];const used=new Set();
 const add=(o)=>{used.add(o.id);eq.push(o)};
 const mk=(id,name,type,plant,line,status,health,cond,rel,rul,risk)=>add({id,name,type,plant,line,status,health,cond,rel,rul,risk,
   lastMaintAt:now-Math.floor(between(12,160))*D,installedYr:2008+Math.floor(r()*14),make:pick(['KSB','Siemens','ABB','Flowserve','Sulzer','Atlas Copco','WEG','Alfa Laval'])});
 [['P-104','Pump P-104','Pump','MES','Production Line 1','Running',92,'Good',95,2.4,'Low'],
  ['C-203','Compressor C-203','Compressor','MES','Production Line 2','Warning',68,'Fair',78,1.2,'Medium'],
  ['M-12','Motor M-12','Motor','MES','Production Line 1','Running',71,'Fair',82,1.8,'Medium'],
  ['F-3','Furnace F-3','Furnace','MES','Production Line 3','Critical',54,'Poor',61,0.6,'High'],
  ['CV-7','Conveyor CV-7','Conveyor','MES','Production Line 2','Running',78,'Good',88,2.1,'Low'],
  ['G-1','Generator G-1','Generator','MES','Power Plant','Idle',85,'Good',90,3.2,'Low'],
  ['HVAC-01','HVAC-01','HVAC','MES','Utilities','Running',93,'Good',96,4.5,'Low'],
  ['P-207','Pump P-207','Pump','MES','Production Line 2','Maintenance',76,'Fair',84,1.5,'Medium'],
  ['F-08','Fan F-08','Fan','MES','Production Line 4','Running',81,'Good',89,2.6,'Low'],
  ['M-112','Motor M-112','Motor','MES','Production Line 3','Running',74,'Fair',83,1.9,'Medium'],
  ['HX-2','Heat Exchanger HX-2','Heat exchanger','MES','Production Line 3','Critical',47,'Poor',58,0.4,'High'],
  ['R-301','Reactor R-301','Reactor','MES','Production Line 1','Running',88,'Good',93,6.1,'Low'],
  ['M-301','Agitator Motor M-301','Motor','MES','Production Line 1','Running',90,'Good',94,3.1,'Low'],
  ['C-110','Compressor C-110','Compressor','RLF','Polymer Line A','Running',89,'Good',93,2.8,'Low'],
  ['B-2','Boiler B-2','Boiler','RLF','Utilities','Critical',49,'Poor',60,0.5,'High'],
  ['P-311','Pump P-311','Pump','RLF','Polymer Line B','Warning',66,'Fair',79,1.1,'Medium'],
  ['CF-2','Centrifuge CF-2','Centrifuge','DOH','Granulation','Warning',69,'Fair',81,1.4,'Medium'],
  ['TP-4','Tablet Press TP-4','Tablet press','DOH','Compression','Running',73,'Fair',85,2.0,'Medium'],
  ['AHU-04','Air Handling Unit AHU-04','AHU','DOH','Cleanroom HVAC','Running',86,'Good',92,3.6,'Low']
 ].forEach(a=>mk(...a));
 eq.find(e=>e.id==='P-104').desc='Feed pump';eq.find(e=>e.id==='M-301').desc='Drives Reactor R-301 agitator';eq.find(e=>e.id==='C-110').desc='Process gas compressor';
 const MIX={MES:[['Pump',22],['Motor',20],['Compressor',6],['Fan',8],['Conveyor',6],['Heat exchanger',6],['Valve',14],['Tank',10],['Gearbox',6],['Blower',4],['Cooling tower',3]],
  RLF:[['Pump',10],['Motor',9],['Compressor',4],['Valve',8],['Tank',6],['Heat exchanger',4],['Blower',3],['Gearbox',3],['Fan',3]],
  DOH:[['Tablet press',4],['Coater',3],['Blender',3],['AHU',6],['Pump',6],['Motor',6],['Centrifuge',2],['Valve',4],['Tank',3]]};
 const BANDS={MES:[['H',102],['R',13],['D',7],['C',4],['O',3]],RLF:[['H',47],['R',8],['D',4],['C',1],['O',1]],DOH:[['H',33],['R',4],['D',2],['C',0],['O',0]]};
 const gen=[];
 Object.keys(BANDS).forEach(pl=>{const bands=[];BANDS[pl].forEach(([b,n])=>{for(let i=0;i<n;i++)bands.push(b)});
  for(let i=bands.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[bands[i],bands[j]]=[bands[j],bands[i]]}
  const tw=MIX[pl].reduce((a,x)=>a+x[1],0);
  bands.forEach(b=>{let k=r()*tw,type='Pump';for(const [t,w] of MIX[pl]){if((k-=w)<0){type=t;break}}
   const pre=TYPES[type].pre;let id;do{id=`${pre}-${100+Math.floor(r()*400)}`}while(used.has(id));
   const lines=PLANTS[pl].lines;const line=type==='AHU'?'Cleanroom HVAC':(type==='Cooling tower'||type==='Tank'&&r()<.3)?'Utilities':lines[Math.floor(r()*lines.length)];
   const health=b==='H'?Math.round(between(82,98)):b==='R'?Math.round(between(65,79)):b==='D'?Math.round(between(50,64)):b==='C'?Math.round(between(38,49)):Math.round(between(45,70));
   const name=(type==='HVAC'||type==='AHU')?(type==='AHU'?'Air Handling Unit ':'')+id:`${type==='Heat exchanger'?'Heat Exchanger':type==='Cooling tower'?'Cooling Tower':type==='Tablet press'?'Tablet Press':type} ${id}`;
   const o={id,name,type,plant:pl,line,status:'Running',health,band:b};used.add(id);gen.push(o)})});
 // statuses: O->Offline, C->Critical, 9 Warning from R/D, 13 Maintenance, 27 Idle, rest Running
 gen.forEach(o=>{if(o.band==='O')o.status='Offline';if(o.band==='C')o.status='Critical'});
 const pool=gen.filter(o=>o.band==='R'||o.band==='D');for(let i=0;i<9;i++)pool.splice(Math.floor(r()*pool.length),1)[0].status='Warning';
 const rest=gen.filter(o=>o.status==='Running');const take=(n,st)=>{for(let i=0;i<n;i++){const k=Math.floor(r()*rest.length);rest.splice(k,1)[0].status=st}};take(13,'Maintenance');take(27,'Idle');
 gen.forEach(o=>{const h=o.health;delete o.band;Object.assign(o,{cond:h>=80?'Good':h>=65?'Fair':'Poor',rel:clamp(Math.round(h+between(-4,6)),40,99),rul:+(h>=80?between(2,6):h>=65?between(1,2.4):between(.3,1)).toFixed(1),risk:h>=80?'Low':h>=60?'Medium':'High',
  lastMaintAt:now-Math.floor(between(8,200))*D,installedYr:2006+Math.floor(r()*16),make:pick(['KSB','Siemens','ABB','Flowserve','Sulzer','Grundfos','WEG','Alfa Laval','Danfoss'])});eq.push(o)});

 const E=id=>eq.find(e=>e.id===id);
 // ---------- anomalies ----------
 const an=[];
 const A=(id,eqId,type,sev,conf,status,offMin,reading,isNew,rca)=>an.push({id,eq:eqId,plant:E(eqId).plant,type,sev,conf,status,detectedAt:now-offMin*MIN,...reading,isNew,rca,comments:[],log:[{t:now-offMin*MIN,a:'Anomaly detected by '+(rca&&rca.model||'AD-Multivariate v4.1')}]});
 A('AN-1043','C-203','Temperature','High',87,'Active',45,{metric:'Discharge temperature',value:104,unit:'°C',lo:80,hi:95,base:93},true,{causes:[['Valve wear',64],['Intercooler fouling',27],['Sensor drift',9]],model:'FP-Thermal v2.4',action:'Inspect discharge valves and clean the intercooler.'});
 A('AN-1042','M-12','Performance','Medium',76,'Investigating',120,{metric:'Efficiency',value:86,unit:'%',lo:90,hi:96,base:93},false,{causes:[['Bearing wear',58],['Supply voltage imbalance',30],['Load change',12]],model:'AD-Multivariate v4.1',action:'Schedule a bearing inspection.'});
 A('AN-1041','F-3','Energy','Medium',68,'Active',192,{metric:'Specific energy',value:1.42,unit:'MWh/t',lo:1.15,hi:1.3,base:1.22},true,{causes:[['Refractory hot spot',52],['Burner tuning',33],['Feed variation',15]],model:'AD-Multivariate v4.1',action:'Thermography survey of the refractory lining.'});
 A('AN-1040','CV-7','Vibration','Low',52,'Resolved',257,{metric:'Vibration',value:4.9,unit:'mm/s',lo:1.5,hi:4.5,base:3.1},false,{causes:[['Belt misalignment',61],['Idler wear',39]],model:'AD-Vibration v3.0',action:'Realign the belt.'});
 A('AN-1039','HX-2','Temperature','Critical',91,'Active',330,{metric:'Outlet temperature',value:61,unit:'°C',lo:42,hi:52,base:47},true,{causes:[['Tube fouling',78],['Cooling water flow',15],['Sensor drift',7]],model:'FP-Static v1.9',action:'Chemical clean during the Line 3 stop.'});
 A('AN-1038','B-2','Sensor','Critical',89,'Active',365,{metric:'Flame signal',value:38,unit:'%',lo:60,hi:100,base:82},true,{causes:[['Flame scanner fouling',71],['Burner instability',22],['Wiring fault',7]],model:'AD-Multivariate v4.1',action:'Replace the flame scanner.'});
 A('AN-1037','P-311','Vibration','High',81,'Active',410,{metric:'Vibration',value:6.1,unit:'mm/s',lo:2.0,hi:5.0,base:3.4},true,{causes:[['Impeller imbalance',57],['Cavitation',31],['Looseness',12]],model:'AD-Vibration v3.0',action:'Check suction conditions and balance the impeller.'});
 A('AN-1036','CF-2','Behavioral','Medium',72,'Active',460,{metric:'Start/stop cycles',value:14,unit:'/h',lo:2,hi:6,base:4},false,{causes:[['Control loop tuning',66],['Load sensor fault',34]],model:'AD-Multivariate v4.1',action:'Review the control loop tuning.'});
 A('AN-1035','TP-4','Performance','Medium',70,'Active',505,{metric:'Tablet weight variation',value:3.8,unit:'%',lo:0,hi:2.5,base:1.6},true,{causes:[['Punch wear',62],['Feeder fill variation',38]],model:'AD-Multivariate v4.1',action:'Inspect the punches and die set.'});
 A('AN-1034','M-112','Energy','Low',58,'Active',550,{metric:'Power draw',value:58,unit:'kW',lo:44,hi:52,base:48},true,{causes:[['Load increase',55],['Bearing friction',45]],model:'AD-Multivariate v4.1',action:'Compare with the production load.'});
 A('AN-1033','P-207','Sensor','Low',55,'Active',600,{metric:'Flow signal',value:0,unit:'m³/h',lo:60,hi:90,base:75},false,{causes:[['Flow transmitter dropout',84],['Cable damage',16]],model:'AD-Multivariate v4.1',action:'Check the flow transmitter wiring.'});
 const ct=eq.find(e=>e.type==='Cooling tower'&&e.plant==='MES');A('AN-1029',ct.id,'Temperature','Low',61,'Investigating',2*1440+180,{metric:'Approach temperature',value:7.8,unit:'°C',lo:3,hi:6.5,base:5},false,{causes:[['Fill fouling',60],['Fan blade pitch',40]],model:'FP-Static v1.9',action:'Inspect fill media.'});
 for(let i=0;i<23;i++){const e=eq[19+Math.floor(r()*200)];const ty=pick(['Sensor','Behavioral','Performance','Energy','Temperature','Vibration']);
  an.push({id:'AN-'+(1004+i),eq:e.id,plant:e.plant,type:ty,sev:pick(['Low','Low','Medium','Medium','High']),conf:50+Math.floor(r()*40),status:'Resolved',detectedAt:now-(1+Math.floor(r()*6))*D-Math.floor(r()*20)*H,metric:ty+' reading',value:0,unit:'',lo:0,hi:0,base:0,isNew:false,rca:{causes:[['Process change',60],['Minor wear',40]],model:'AD-Multivariate v4.1',action:'Monitored and closed.'},comments:[],log:[]})}

 // ---------- predictions ----------
 const pr=[];const PRD=(eqId,mode,prob,win,rul,conf,action,status)=>pr.push({id:'PR-'+(301+pr.length),eq:eqId,plant:E(eqId).plant,mode,prob,win,rul,conf,action,status,createdAt:now-Math.floor(r()*40)*H});
 PRD('HX-2','Tube fouling, loss of heat transfer',74,'3–6 days',5,88,'Chemical clean during the Line 3 stop','Scheduled');
 PRD('B-2','Burner flame sensor failure',66,'4–8 days',7,84,'Replace flame scanner','Open');
 PRD('C-203','Valve wear, discharge overheating',58,'6–12 days',10,82,'Inspect valves and cooler','Open');
 PRD('F-3','Refractory hot spot',52,'10–20 days',16,77,'Thermography and refractory repair','Open');
 const mesGen=eq.filter(e=>e.plant==='MES'&&(e.type==='Pump'||e.type==='Motor'||e.type==='Valve')&&e.health<80&&e.status!=='Offline'&&!e.desc&&e.id.length<6);
 [['Mechanical seal leak',61,'2–5 days',4],['Bearing overheating',57,'3–7 days',6],['Actuator failure',54,'4–7 days',7]].forEach((m,i)=>{const e=mesGen[i*3%mesGen.length];PRD(e.id,m[0],m[1],m[2],m[3],80,i===2?'Replace actuator diaphragm':'Inspect and replace worn parts','Open')});
 for(let i=0;i<7;i++){const e=eq[30+Math.floor(r()*180)];PRD(e.id,pick(['Bearing wear','Seal degradation','Belt wear','Insulation ageing','Impeller erosion']),25+Math.floor(r()*25),'2–5 weeks',14+Math.floor(r()*30),70+Math.floor(r()*15),'Plan at next scheduled stop','Open')}

 // ---------- alerts ----------
 const al=[];const AL=(eqId,sev,title,trigger,offMin,state)=>al.push({id:'AL-'+(5401+al.length),eq:eqId,plant:E(eqId).plant,sev,title,trigger,t:now-offMin*MIN,state});
 AL('HX-2','Critical','Outlet temperature above limit','AI',330,'new');AL('B-2','Critical','Flame signal low','AI',365,'new');AL('C-203','High','High discharge temperature','Rule',45,'new');AL('P-311','High','Vibration above alarm level','Rule',410,'new');
 AL('F-3','Medium','Specific energy above target','AI',192,'ack');AL('M-12','Medium','Efficiency drop','AI',120,'ack');AL('M-112','Low','Power draw above normal','Rule',550,'ack');AL('P-207','Low','Flow signal lost','Rule',600,'ack');
 AL('CF-2','Medium','Frequent start/stop cycling','AI',460,'ack');AL('TP-4','Medium','Tablet weight variation high','AI',505,'ack');AL(eq.find(e=>e.plant==='RLF'&&e.type==='Tank').id,'Low','Level transmitter deviation','Rule',900,'ack');
 AL('CV-7','Low','Vibration above normal','AI',257,'resolved');

 // ---------- work orders ----------
 const wo=[];let won=371;const CL={Predictive:['Isolate and lock out','Inspect component','Replace worn parts','Test run and record readings'],Preventive:['Isolate and lock out','Lubricate','Inspect and clean','Test run'],Corrective:['Isolate and lock out','Diagnose fault','Repair','Test run'],Inspection:['Visual inspection','Record readings','Report findings']};
 const W=(eqId,title,type,pri,status,dueOff,assignee,source,extra={})=>{const doneN=status==='Completed'?99:status==='In Progress'?2:0;const items=CL[type].map((t,i)=>({t,done:i<doneN}));
  wo.push({id:'WO-2026-0'+(won++),title,eq:eqId,plant:E(eqId).plant,type,pri,status,dueAt:now+dueOff*D,assignee,team:'Maintenance',est:+(2+r()*5).toFixed(1),parts:[],checklist:items,source,anomalyId:null,createdAt:now-Math.floor(3+r()*10)*D,doneAt:status==='Completed'?now+dueOff*D:null,hours:status==='Completed'?+(2+r()*4).toFixed(1):0,log:[{t:now-4*D,a:'Work order created',by:source==='AI'?'MaintaX AI':'John Doe'}],...extra})};
 W('M-12','Bearing check — Motor M-12','Inspection','High','Scheduled',2,'David Martinez','AI');
 W('C-203','Service — Compressor C-203','Preventive','Medium','Scheduled',3,'Omar Al-Sulaiti','Manual');
 W('F-08','Inspection — Fan F-08','Inspection','Medium','Open',4,'Yusuf Qureshi','Manual');
 W('CV-7','Belt replacement — Conveyor CV-7','Preventive','Low','Open',6,'Thomas Mathew','Manual');
 W('HX-2','Chemical clean — Heat Exchanger HX-2','Predictive','High','Scheduled',3,'Rajesh Nair','AI',{});
 const mesAssets=eq.filter(e=>e.plant==='MES'&&e.status!=='Offline');
 [['Lubrication round','Preventive','Low',1],['Seal inspection','Inspection','Medium',2],['Filter change','Preventive','Low',5],['Alignment check','Inspection','Medium',5],['Valve stroke test','Preventive','Low',6],['Thermography survey','Inspection','Low',7],['Vibration route','Inspection','Low',4]].forEach(([t,ty,p,d])=>{const e=mesAssets[20+Math.floor(r()*100)];W(e.id,`${t} — ${e.name}`,ty,p,'Open',d,pick(TECHS),'Manual')});
 const rlf=eq.filter(e=>e.plant==='RLF'&&e.status!=='Offline'),doh=eq.filter(e=>e.plant==='DOH'&&e.status!=='Offline');
 W('B-2','Replace flame scanner — Boiler B-2','Predictive','High','Open',2,'Omar Al-Sulaiti','AI');
 for(let i=0;i<5;i++){const e=rlf[3+i*5];W(e.id,`${pick(['Lubrication round','Seal inspection','Filter change'])} — ${e.name}`,'Preventive','Low','Open',1+i,pick(TECHS),'Manual')}
 for(let i=0;i<4;i++){const e=doh[3+i*4];W(e.id,`${pick(['GMP calibration','Filter change','Inspection'])} — ${e.name}`,'Preventive','Medium','Scheduled',1+i,pick(TECHS),'Manual')}
 for(let i=0;i<5;i++){const e=eq[25+i*17];W(e.id,`${pick(['Overhaul','Gearbox oil change','Coupling replacement'])} — ${e.name}`,'Preventive','Low','Open',10+i*4,pick(TECHS),'Manual')}
 for(let i=0;i<5;i++){const e=eq[40+i*13];W(e.id,`${pick(['Repair','Replace bearing','Fix leak'])} — ${e.name}`,'Corrective','Medium','In Progress',0,pick(TECHS),'Manual')}
 for(let i=0;i<14;i++){const e=eq[50+i*11];W(e.id,`${pick(['Bearing replacement','Seal replacement','Lubrication round','Belt replacement','Inspection'])} — ${e.name}`,pick(['Preventive','Corrective','Predictive','Inspection']),pick(['Low','Medium','High']),'Completed',-(1+i*2),pick(TECHS),i%3===0?'AI':'Manual')}

 // ---------- users ----------
 const UD=[['John Doe','Operations','Operations Manager','Active',0],['Sarah Wilson','Maintenance','Maintenance Lead','Active',135],['Michael Brown','Engineering','Engineer','Active',209],['Emily Davis','Quality & Safety','Quality Manager','Active',248],['Robert Johnson','IT & Admin','System Administrator','Active',274],['Lisa Garcia','Operations','Data Analyst','Active',351],['David Martinez','Maintenance','Technician','Active',1440],['Jennifer Lee','Engineering','Engineer','Pending',1500],['Daniel Clark','IT & Admin','IT Support','Active',1620],['Sophia Anderson','Quality & Safety','Auditor','Inactive',5760],
  ['Ahmed Al-Mansoori','Operations','Operations Manager','Active',420],['Fatima Al-Kuwari','Operations','Operations Manager','Active',95],['Mohammed Al-Thani','Operations','Operations Manager','Active',700],['Khalid Al-Marri','Operations','Data Analyst','Active',2300],['Aisha Rahman','Operations','Data Analyst','Active',180],['Noor Hassan','Operations','Maintenance Lead','Active',3000],
  ['Omar Al-Sulaiti','Maintenance','Technician','Active',60],['Yusuf Qureshi','Maintenance','Maintenance Lead','Active',800],['Thomas Mathew','Maintenance','Maintenance Lead','Active',1900],['Arjun Shah','Maintenance','Engineer','Active',2600],
  ['Rajesh Nair','Engineering','Engineer','Active',300],['Priya Menon','Engineering','System Administrator','Active',4200],['Hana Al-Emadi','Quality & Safety','Auditor','Active',5000],['Maria Santos','IT & Admin','System Administrator','Active',3500]];
 const users=UD.map(([name,team,role,status,m],i)=>({id:'U'+(100+i),name,email:name.toLowerCase().replace(/[^a-z ]/g,'').replace(/ /g,'.')+'@gulfcrest.example',team,role,status,loginAt:now-m*MIN}));
 const activity=[[0,'John Doe','Role Updated','Changed role to Operations Manager','edit'],[135,'Sarah Wilson','Permission Granted','Granted equipment access for Line 2','key'],[227,'Michael Brown','User Added','Added new user: Robert Wilson','userplus'],[310,'Emily Davis','Team Updated','Moved to Quality & Safety team','users'],[1349,'David Martinez','Access Revoked','Revoked facility access for Plant 1','lock']].map(([m,u,a,d,ic])=>({t:now-m*MIN,user:u,action:a,detail:d,icon:ic}));
 const audit=activity.map(x=>({...x}));audit.push({t:now-2*D,user:'Robert Johnson',action:'SSO Configured',detail:'Microsoft Entra ID connection verified',icon:'shield'},{t:now-3*D,user:'Maria Santos',action:'API Key Created',detail:'Key for SAP PM integration',icon:'key'},{t:now-5*D,user:'Robert Johnson',action:'MFA Enforced',detail:'Multi-factor authentication required for all users',icon:'lock'});

 // ---------- models ----------
 const models=[['FP-Rotating','Failure Prediction','3.2',93.1,1.1,'Healthy',6],['FP-Thermal','Failure Prediction','2.4',91.8,1.4,'Healthy',9],['FP-Static','Failure Prediction','1.9',88.6,1.9,'Healthy',14],['AD-Multivariate','Anomaly Detection','4.1',94.2,0.9,'Healthy',4],['AD-Vibration','Anomaly Detection','3.0',92.7,1.2,'Healthy',11],['RUL-Bearing','RUL','2.2',90.4,1.3,'Healthy',8],['RUL-General','RUL','1.7',86.9,1.8,'Healthy',20],['RCA-Graph','Root Cause','1.3',84.5,2.1,'Training',30],['REL-Weibull','Reliability','2.0',89.0,1.0,'Healthy',16]].map(([n,f,v,acc,dr,st,d])=>({id:n,family:f,ver:v,acc,drift:dr,status:st,trainedAt:now-d*D,progress:st==='Training'?68:100}));
 const feedback=[['Prediction confirmed — HX-1 tube fouling, lead time 6 days','ok',2],['Prediction confirmed — P-128 seal leak, lead time 4 days','ok',3],['False positive — CF-1 behavioral anomaly','fp',4],['Prediction confirmed — M-77 bearing overheating, lead time 9 days','ok',6],['Prediction confirmed — C-118 valve wear, lead time 5 days','ok',8],['False positive — T-140 level deviation','fp',11]].map(([t,k,d])=>({t:now-d*D,text:t,kind:k}));

 // ---------- integrations ----------
 const integ=[['opcua','OPC UA — Mesaieed DCS','Industrial protocol','1,840 tags',true,'server'],['modbus','Modbus TCP — Utility gateways','Industrial protocol','6 gateways',true,'cpu'],['mqtt','MQTT — Edge sensors','IoT','118 sensors',true,'wifi'],['pi','Process historian (PI System)','Historian','5 years of history',true,'db'],['sap','SAP PM','CMMS','Work orders sync both ways',true,'clip'],['maximo','IBM Maximo','CMMS','',false,'clip'],['teams','Microsoft Teams','Notifications','Alert channel #mes-maintenance',true,'msg'],['sms','Email / SMS gateway','Notifications','',false,'mail']].map(([id,name,kind,detail,on,icon],i)=>({id,name,kind,detail,on,icon,syncAt:now-(2+i*3)*MIN}));

 // ---------- sensors inventory (118) ----------
 const sensors=[];const monitored=eq.filter(e=>e.status!=='Offline');SENSOR_TYPES.forEach(([t,n])=>{for(let i=0;i<n;i++){const e=monitored[Math.floor(r()*monitored.length)];sensors.push({id:`${t.slice(0,2).toUpperCase()}-${p2(i+1)}${String.fromCharCode(65+Math.floor(r()*6))}`,type:t,eq:e.id,plant:e.plant,status:'Online',lastAt:now-Math.floor(r()*50)*1000})}});

 // ---------- reports ----------
 const reports=[['Equipment Health Report','Equipment','All Equipment · Mesaieed',0,'MES'],['Maintenance Summary','Maintenance','All Facilities',1,'ALL'],['Reliability Report','Reliability','Production Line 2',2,'MES'],['Downtime Analysis','Downtime','Mesaieed',3,'MES'],['Production Performance','Production','Line 2',4,'MES'],['Failure Analysis','Failure','Compressors',5,'ALL']].map(([n,c,s,d,pl],i)=>({id:'RP-'+(900+i),name:n,cat:c,scope:s,plant:pl,t:now-d*D-Math.floor(r()*8)*H}));

 // ---------- insights ----------
 const insDash=[['spark','blue','Emerging Equipment Issue','Vibration increase detected on Line 2 compressor.',120],['alert','blue','Predicted Failure','Heat Exchanger HX-2 failure probability at 74% (next 5 days).',240],['alert','purple','Anomaly Detection','Abnormal temperature pattern on Furnace F-3.',360],['wrench','orange','Maintenance Recommendation','Schedule bearing inspection for Motor M-12.',480],['alert','amber','Operational Risk','Production Line 4 at risk due to equipment degradation.',600]].map(([icon,tone,title,text,m])=>({icon,tone,title,text,t:now-m*MIN}));
 const insAn=[['Thermal pattern detected on Heat Exchanger HX-2 (91% confidence).','spark','purple',120],['Similar pattern found in Compressor C-203 (87% confidence).','spark','blue',240],['Potential bearing wear detected in Motor M-12 (76% confidence).','pump','blue',360],['Energy consumption anomaly in Furnace F-3 (68% confidence).','alert','amber',480],['Temperature trend increasing in Conveyor CV-7 (52% confidence).','thermo','red',600]].map(([text,icon,tone,m])=>({text,icon,tone,t:now-m*MIN}));
 const analysis=[['Root cause identified for Heat Exchanger HX-2: tube fouling.','spark','purple',120],['High probability of failure for Compressor C-203 in next 7 days.','pump','blue',240],['Energy inefficiency detected in Furnace F-3.','alert','red',360],['Recommended maintenance for Conveyor CV-7.','checkc','green',480]].map(([text,icon,tone,m])=>({text,icon,tone,t:now-m*MIN}));

 return {v:1,eq,an,pr,al,wo,users,activity,audit,models,feedback,integ,sensors,reports,insDash,insAn,analysis,
  detTypes:{Sensor:24,Behavioral:14,Performance:10,Energy:8,Temperature:7,Vibration:4},detD:{Sensor:6,Behavioral:4,Performance:-12,Energy:2,Temperature:8,Vibration:15},
  avoided:{MES:0,RLF:0,DOH:0},nextAn:1044,nextAl:5413,nextWo:won,nextPr:301+pr.length,nextRep:906,completed:[],eqHist:{}} as DB;
}

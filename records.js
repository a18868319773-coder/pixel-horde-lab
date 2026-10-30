export const RECORD_KEY='pixel-horde.records.v1';
const n=v=>Number.isFinite(v)&&v>=0?Math.floor(v):0;
export function loadRecords(storage){try{const d=JSON.parse(storage.getItem(RECORD_KEY)||'{}');return {runs:n(d.runs),wins:n(d.wins),kills:n(d.kills),bestKills:n(d.bestKills),bestTime:Math.min(180,n(d.bestTime))}}catch{return {runs:0,wins:0,kills:0,bestKills:0,bestTime:0}}}
export function recordRun(records,run,win){return {runs:records.runs+1,wins:records.wins+(win?1:0),kills:records.kills+run.kills,bestKills:Math.max(records.bestKills,run.kills),bestTime:Math.max(records.bestTime,Math.min(180,Math.floor(run.t)))}}
export function saveRecords(storage,records){try{storage.setItem(RECORD_KEY,JSON.stringify(records));return true}catch{return false}}

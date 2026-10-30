export const SAVE_KEY='pixel-horde.camp.v1';
const count=v=>Number.isFinite(v)&&v>=0?Math.min(100000000,Math.floor(v)):0;
export function loadProgress(storage){try{const d=JSON.parse(storage.getItem(SAVE_KEY)||'{}');return {wood:count(d.wood),stone:count(d.stone),hut:count(d.hut)>0?1:0,forge:count(d.forge)>0?1:0}}catch{return {wood:0,stone:0,hut:0,forge:0}}}
export function saveProgress(storage,data){try{storage.setItem(SAVE_KEY,JSON.stringify(data));return true}catch{return false}}
export const buildings={hut:{name:'补给小屋',wood:8,stone:4,desc:'每局初始治疗药剂 +1'},forge:{name:'训练工坊',wood:12,stone:8,desc:'每局初始弹丸伤害 +10%'}};
export function construct(data,id){const b=buildings[id];if(!b||data[id]||data.wood<b.wood||data.stone<b.stone)return false;data.wood-=b.wood;data.stone-=b.stone;data[id]=1;return true}

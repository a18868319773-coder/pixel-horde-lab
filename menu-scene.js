import {drawZombies} from './zombie-motion.js';
import {sceneState,drawSky,drawSearchlight,drawFlags,LOOP_FRAMES} from './scene-motion.js';
export function initMenuScene(){const root=document.getElementById('menuscene'),img=root.querySelector('img'),canvas=document.getElementById('menufx'),c=canvas.getContext('2d'),reduce=matchMedia('(prefers-reduced-motion: reduce)');let enabled=!reduce.matches,last=-1;
try{const v=localStorage.getItem('pixel-horde.menu-motion');if(v!==null)enabled=v==='on'}catch{}
function setMotion(value){enabled=value;last=-1;try{localStorage.setItem('pixel-horde.menu-motion',value?'on':'off')}catch{}return enabled}
function tick(ms){if(!document.body.classList.contains('menu-visible')||document.hidden)return;const frame=enabled?Math.floor(ms/(1000/12))%LOOP_FRAMES:0;if(frame===last)return;last=frame;const w=innerWidth,h=innerHeight;canvas.width=Math.round(w/2);canvas.height=Math.round(h/2);const scale=Math.max(w/1672,h/941),ox=(w-1672*scale)/2,oy=(h-941*scale)/2;c.setTransform(scale/2,0,0,scale/2,ox/2,oy/2);c.imageSmoothingEnabled=false;if(!enabled)return;
const snap=n=>Math.round(n/2)*2,phase=frame/192*Math.PI*2,s=sceneState(frame);
drawSky(c,img,frame);drawZombies(c,img,frame);drawFlags(c,img,frame);
drawSearchlight(c,{x:1068,y:182,angle:s.lightAngle,length:700,width:.14,strength:.33});drawSearchlight(c,{x:885,y:416,angle:s.leftAngle,length:550,width:.12,strength:.25});
const fires=[{x:985,y:711,s:1.15},{x:1409,y:651,s:.95},{x:1249,y:788,s:.65},{x:144,y:605,s:.8}];
for(const {x,y,s}of fires){c.save();c.translate(x,y);c.scale(s,s);c.globalCompositeOperation='screen';let glow=c.createRadialGradient(0,-10,4,0,-10,78);glow.addColorStop(0,'#ff9c3b55');glow.addColorStop(1,'#ff5d1500');c.fillStyle=glow;c.globalAlpha=.7+Math.sin(phase*16)*.2;c.fillRect(-80,-90,160,155);c.globalCompositeOperation='source-over';for(let i=0;i<9;i++){const height=19+[0,9,21,36,22,11,25,5][(frame+i*3)%8],dx=(i-4)*5+snap(Math.sin(phase*12+i)*3);c.fillStyle=i%2?'#ff8c24':'#ffcc54';c.globalAlpha=.7+((frame+i)%3)*.1;c.fillRect(dx,-height*.4,8,height*.4);c.fillRect(dx+1,-height*.75,6,height*.4);c.fillRect(dx+2,-height,4,height*.4);c.fillStyle='#fff0ae';c.fillRect(dx+1,-height*.4,4,height*.4)}c.restore();
for(let i=0;i<34;i++){const age=((frame+i*17)%96)/96,px=x+Math.sin(age*7+i)*28*s+age*28,py=y-age*185*s;c.globalAlpha=Math.sin(age*Math.PI)*.95;c.fillStyle=i%2?'#ffc468':'#f47a38';c.fillRect(snap(px),snap(py),2+(i%3)*2,2+(i%2)*3)}
for(let i=0;i<12;i++){const age=((frame+i*8)%96)/96;c.globalAlpha=Math.sin(age*Math.PI)*.16;c.fillStyle=i%2?'#88879b':'#42415d';const sx=snap(x+Math.sin(age*4+i)*22*s+age*35-16),sy=snap(y-30-age*200*s);c.fillRect(sx,sy,26+Math.floor(age*7)*4,16+Math.floor(age*4)*4);c.fillRect(sx+8,sy-8,22+Math.floor(age*5)*4,12)}}
c.globalAlpha=1;
for(const [x,y]of [[1047,40],[953,619],[923,633],[1096,102]]){const on=frame%24<9;c.fillStyle=on?'#ffb0a0':'#a52345';c.fillRect(x-3,y-3,6,6);if(on){c.globalAlpha=.36;c.fillStyle='#ff796d';c.fillRect(x-9,y-9,18,18);c.globalAlpha=.1;c.fillRect(x-17,y-17,34,34)}c.globalAlpha=1}
const lamps=[[958,332],[986,500],[1029,489],[1080,458],[1136,536],[182,398],[338,461],[1538,430],[1019,150],[1357,430]];for(let i=0;i<lamps.length;i++){const [x,y]=lamps[i];c.globalCompositeOperation='screen';c.globalAlpha=.08+((frame+i*7)%12)/80;c.fillStyle='#ffd98e';c.fillRect(x-7,y-10,14,20);c.globalAlpha=.08+(Math.sin(phase*8+i)+1)*.035;c.fillRect(x-23,y-23,46,46)}c.globalCompositeOperation='source-over';
for(let i=0;i<9;i++){c.globalAlpha=.2+(frame+i)%4*.07;c.fillStyle=i%2?'#ffba64':'#ffa044';c.fillRect(972+snap(Math.sin(phase*8+i)*15)-i*2,814+i*13,10+i*3,3)}c.globalAlpha=1;
}
return {tick,setMotion,get enabled(){return enabled}}}

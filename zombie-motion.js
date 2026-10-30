// Small local warps of the supplied pixels, with stable feet and asynchronous loops.
// Polygon margins include a few background pixels, so displaced silhouettes cover their old positions.
export const ZOMBIES=[
 {id:'distant-left',cycle:48,offset:7,amp:3,points:[[863,664],[877,659],[887,676],[889,699],[885,718],[863,717],[858,691]]},
 {id:'distant-center',cycle:48,offset:25,amp:3,points:[[895,661],[908,660],[918,680],[929,706],[916,720],[889,715],[884,692]]},
 {id:'middle-left',cycle:96,offset:11,amp:6,points:[[1063,653],[1080,653],[1091,676],[1114,686],[1112,722],[1093,744],[1082,776],[1055,775],[1051,741],[1040,714],[1046,681]]},
 {id:'middle-center',cycle:48,offset:31,amp:6,points:[[1188,657],[1209,656],[1219,679],[1233,695],[1231,740],[1213,767],[1183,765],[1176,736],[1159,715],[1168,684]]},
 {id:'middle-right',cycle:96,offset:53,amp:9,points:[[1236,647],[1260,643],[1278,658],[1279,683],[1300,698],[1307,737],[1292,766],[1294,794],[1277,809],[1254,796],[1247,772],[1229,794],[1200,792],[1194,773],[1205,734],[1215,696],[1231,677]]},
 {id:'foreground-center',cycle:96,offset:17,amp:12,points:[[653,748],[692,741],[719,753],[730,783],[724,807],[742,824],[756,871],[751,920],[768,941],[576,941],[593,901],[609,847],[630,818],[640,797],[640,767]]},
 {id:'foreground-right',cycle:96,offset:67,amp:12,points:[[1382,803],[1421,799],[1447,822],[1449,849],[1478,860],[1508,887],[1549,926],[1555,941],[1298,941],[1315,904],[1343,873],[1357,850],[1355,827]]},
 {id:'edge-left',cycle:48,offset:39,amp:6,points:[[70,651],[91,653],[101,674],[99,692],[117,710],[129,751],[113,784],[85,790],[64,766],[45,770],[35,745],[46,705],[56,679]]}
];
export function motionAt(z,frame,y){const ys=z.points.map(p=>p[1]),top=Math.min(...ys),bottom=Math.max(...ys),height=bottom-top,t=Math.max(0,Math.min(1,(bottom-y)/height)),phase=((frame+z.offset)%z.cycle)/z.cycle*Math.PI*2;
// Pixel quantization keeps the same stepped cadence as the fire and flags.
const torso=Math.sin(phase),arms=Math.sin(phase*2+.6)*Math.sin(t*Math.PI)*.6;
return {dx:Math.round((torso*t+arms)*z.amp)||0,dy:Math.round(Math.sin(phase*2)*z.amp*.55*t*t)||0};
}
export function drawZombies(c,img,frame){if(!img.complete||!img.naturalWidth)return;for(const z of ZOMBIES){const top=Math.max(0,Math.min(...z.points.map(p=>p[1]))),bottom=Math.min(941,Math.max(...z.points.map(p=>p[1])));c.save();c.beginPath();z.points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.clip();
for(let y=top;y<bottom;y+=2){const xs=[];for(let i=0;i<z.points.length;i++){const a=z.points[i],b=z.points[(i+1)%z.points.length],scan=y+1;if((a[1]<=scan&&b[1]>scan)||(b[1]<=scan&&a[1]>scan))xs.push(a[0]+(scan-a[1])/(b[1]-a[1])*(b[0]-a[0]))}if(xs.length<2)continue;const left=Math.floor(Math.min(...xs))-16,right=Math.ceil(Math.max(...xs))+16,{dx,dy}=motionAt(z,frame,y);c.drawImage(img,left-dx,y-dy,right-left,2,left,y,right-left,2)}c.restore()}}

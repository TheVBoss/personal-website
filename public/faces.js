(()=>{
const base=window.BMO_WEB_CONFIG.githubBase,assets={},names=['Eyes_Open','Eyes_Open2','Eyes_Closed','Eyes_Blinked',...'ABCDEFGH'];
let normal=[],ready=false,mode='idle',paused=matchMedia('(prefers-reduced-motion: reduce)').matches,elapsed=0,lastTime=performance.now(),lastFrame='',speaking=false;
const surface=document.createElement('canvas');surface.width=1000;surface.height=601;const ctx=surface.getContext('2d');const faceStatus=document.querySelector('#face-status'),pause=document.querySelector('#pause-face');
function sync(){document.querySelectorAll('[data-face]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.face===mode)));pause.setAttribute('aria-pressed',String(paused));pause.innerHTML=paused?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>';pause.setAttribute('aria-label',paused?'Play face animation':'Pause face animation');pause.title=paused?'Play':'Pause';faceStatus.textContent=speaking?'Speaking':mode==='talk'?'BMO’s talking expression':''}
function frameAt(time){let t=time%normal.reduce((a,p)=>a+p[1],0);for(const [key,duration]of normal){if(t<duration)return key;t-=duration}return normal[0][0]}
function render(){if(!ready)return;const eye=frameAt(elapsed),mouth=speaking||mode==='talk'?'BCDEFGHACB'[Math.floor(elapsed/140)%10]:'A',frame=eye+mouth;if(frame===lastFrame)return;lastFrame=frame;ctx.fillStyle='#bbfdc9';ctx.fillRect(0,0,1000,601);ctx.drawImage(assets[mouth],0,0,1000,601);ctx.drawImage(assets[eye],0,0,1000,601);updateScreenFrame(surface)}
window.BMOFace={setSpeaking(value){speaking=value;lastFrame='';sync();render()}};
document.querySelectorAll('[data-face]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.face;elapsed=0;lastFrame='';sync();render()}));pause.onclick=()=>{paused=!paused;lastTime=performance.now();sync()};
async function init(){
 const response=await fetch(base+'config.py',{signal:AbortSignal.timeout(12000)});if(!response.ok)throw Error('config');const config=await response.text();
 const duration=(key,fallback)=>{const match=config.match(new RegExp('^'+key+'\\s*=\\s*([0-9.]+)','m'));const value=match?Number(match[1]):fallback;return Math.max(.05,Math.min(10,value))*1000};
 const open=duration('eye_open_secs',2),closed=duration('eye_closed_secs',.35),blink=duration('eye_blink_secs',.2);
 normal=[['Eyes_Open',open],['Eyes_Closed',closed],['Eyes_Blinked',blink],['Eyes_Closed',closed],['Eyes_Open2',open],['Eyes_Closed',closed],['Eyes_Blinked',blink],['Eyes_Closed',closed]];
 await Promise.all(names.map(name=>new Promise((resolve,reject)=>{const img=new Image();img.crossOrigin='anonymous';img.onload=()=>{assets[name]=img;resolve()};img.onerror=reject;img.src=base+'faces/'+(name.startsWith('Eyes_')?'eyes/':'mouths/')+name+'.png'})));
 ready=true;sync();render();
}
init().catch(()=>{faceStatus.textContent='GitHub face assets could not load. Refresh to retry.'});
setInterval(()=>{const now=performance.now(),delta=Math.min(now-lastTime,250);lastTime=now;if(document.hidden||step!==10||(paused&&!speaking))return;elapsed+=delta;render()},100);
})();

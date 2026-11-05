import React,{useEffect,useRef,useState} from 'react';
import {Inspector} from './ReferenceLanding.jsx';
const Sculpture=React.lazy(()=>import('./ReferenceSculpture.jsx'));
import './site-experience.css';
// The page itself is the canvas. Never traverse text nodes or read field values.
function PageBuilder({root}){useEffect(()=>{
 const motion=matchMedia('(prefers-reduced-motion: reduce)');if(motion.matches)return;
 let raf,scanTimer,paused=0,closed=false;const records=new Map();
 const selector='.shell>.top, main.wrap>*>section, main.wrap section.glass, main.wrap .glass, main.wrap .sechead, main.wrap .kpis, main.wrap .chart-head, main.center form, .dialog, [data-build-copy], main input, main select, main textarea';
 const scan=()=>{for(const el of root.current.querySelectorAll(selector)){if(el.closest('.page-experience,.rf:not(.page-experience)')||records.has(el))continue;records.set(el,{el,start:0,done:false,copy:el.hasAttribute('data-build-copy'),oldClip:el.style.clipPath});}for(const [el] of records)if(!el.isConnected)records.delete(el)};
 scan();const mo=new MutationObserver(()=>{clearTimeout(scanTimer);scanTimer=setTimeout(scan,80)});mo.observe(root.current,{childList:true,subtree:true});
 const restore=r=>{if(r.copy)r.el.style.clipPath=r.oldClip;delete r.el.dataset.building};
 const finish=()=>{closed=true;records.forEach(r=>{r.done=true;restore(r)});dispatchEvent(new CustomEvent('rf:build-target',{detail:null}))};
 const replay=()=>{closed=false;paused=0;scan();records.forEach(r=>{r.start=0;r.done=false;restore(r)})};
 const pause=e=>{if(e.detail)paused=performance.now();else if(paused){const delay=performance.now()-paused;records.forEach(r=>{if(r.start)r.start+=delay});paused=0}};
 const draw=now=>{const targets=[];if(!paused&&!closed){for(const r of records.values()){if(r.done||!r.el.isConnected)continue;const b=r.el.getBoundingClientRect();if(b.width<8||b.height<8||b.bottom<28||b.top>innerHeight-38)continue;if(!r.start)r.start=now;const progress=Math.min(1,(now-r.start)/(r.copy?3100:4300));r.el.dataset.building='true';if(r.copy)r.el.style.clipPath=`inset(0 ${100-progress*100}% 0 0)`;if(progress===1){r.done=true;restore(r)}else targets.push({element:r.el,progress,structure:!r.copy});}dispatchEvent(new CustomEvent('rf:build-target',{detail:targets.length?{...targets[0],targets}:null}));}raf=requestAnimationFrame(draw)};
 raf=requestAnimationFrame(draw);addEventListener('rf:pause',pause);addEventListener('rf:finish',finish);addEventListener('rf:replay',replay);
 return()=>{cancelAnimationFrame(raf);clearTimeout(scanTimer);mo.disconnect();records.forEach(restore);removeEventListener('rf:pause',pause);removeEventListener('rf:finish',finish);removeEventListener('rf:replay',replay);dispatchEvent(new CustomEvent('rf:build-target',{detail:null}))};
 },[]);return null}
export default function SiteExperience({embedded=false}){
 const [active,setActive]=useState(false);const root=useRef(null);
 useEffect(()=>{if(embedded)return;root.current=document.getElementById('root');const update=()=>{const yes=!root.current.querySelector('.rf:not(.page-experience)')&&!!root.current.querySelector('.shell,form.auth');setActive(yes);document.body.classList.toggle('has-experience',yes)};update();const mo=new MutationObserver(update);mo.observe(root.current,{childList:true,subtree:true});return()=>{mo.disconnect();document.body.classList.remove('has-experience')}},[embedded]);
 if(embedded||!active)return null;
 return <div className="page-experience" aria-label="Page construction animation"><div className="page-sculpture" aria-hidden="true"><React.Suspense fallback={null}><Sculpture/></React.Suspense></div><PageBuilder root={root}/><Inspector root={root}/></div>
}

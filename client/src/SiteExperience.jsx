import React,{useEffect,useRef,useState} from 'react';
import {LiveBuilder,Inspector} from './ReferenceLanding.jsx';
const Sculpture=React.lazy(()=>import('./ReferenceSculpture.jsx'));
import './site-experience.css';
export default function SiteExperience({Logo,embedded=false}){
 const [mode,setMode]=useState('loading');
 useEffect(()=>{const update=()=>{const next=document.querySelector('.rf:not(.site-experience)')?'landing':document.querySelector('.shell')?'workspace':document.querySelector('form.auth')?'access':'record';setMode(m=>m===next?m:next);document.body.classList.toggle('has-experience',next!=='landing')};update();const mo=new MutationObserver(update);mo.observe(document.getElementById('root'),{childList:true,subtree:true});return()=>{mo.disconnect();document.body.classList.remove('has-experience')}},[]);
 if(embedded)return <Stage mode='workspace' embedded Logo={Logo}/>;
 if(mode==='landing'||mode==='loading'||mode==='workspace')return null;
 return <Stage key={mode} mode={mode} Logo={Logo}/>;
}
function Stage({mode,Logo,embedded}){const root=useRef(null);return <div className="rf site-experience" ref={root}>
 {!embedded&&<header className="se-nav"><Logo size={25}/><span>CAMPUSTRACE / {mode==='access'?'ACCOUNT ACCESS':'PARTICIPATION PLATFORM'}</span></header>}
 <main><section className="se-stage"><div className="se-copy"><p className="rf-status"><i/>EVIDENCE → REVIEW → VERIFIED RECORD</p><h2>Every activity.<br/><em>One verified record.</em></h2><p className="se-description">{mode==='access'?'Your college account. Your participation journey.':"Evidence first. Trust follows. Every checked activity becomes part of the record."}</p><div className="se-tags"><small>SUBMIT / REVIEW / VERIFY / SHARE</small></div></div><div className="se-visual" aria-hidden="true"><React.Suspense fallback={null}><Sculpture/></React.Suspense></div></section></main>
 <LiveBuilder root={root}/><Inspector root={root} bounded/>
 </div>}

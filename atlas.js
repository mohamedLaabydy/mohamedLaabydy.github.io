const artURL=name=>name==='pagerank'?'art/pagerank-network.svg':name==='dynamics'?'art/morocco.svg':'art/'+name+'.webp';
const {stops}=content;
const rail=document.querySelector('.rail'),chapter=document.querySelector('#chapter');
let station=0;
stops.forEach((s,i)=>{const b=document.createElement('button');b.innerHTML='<span class="station-date">'+s.date+'</span><span class="station-dot"></span><strong>'+s.city+'</strong>';b.setAttribute('aria-label',s.city+', '+s.date);b.onclick=()=>visit(i,true);rail.append(b);});
function visit(i,push=false){
 station=i;const s=stops[i];
 [...rail.children].forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));
 const img=document.querySelector('#station-art');img.src=artURL(s.art);img.alt=ui.illustration+' '+s.city+' — '+s.school;
 document.querySelector('#station-loc').textContent=String(i+1).padStart(2,'0')+' / '+s.city.toUpperCase()+' · '+s.date;
 chapter.innerHTML='<small>'+s.school+'</small><h3>'+s.title+'</h3><p>'+s.story+'</p><blockquote>'+s.lesson+'</blockquote>'+(s.link?'<a class="chapter-link" href="#project-'+s.link+'">'+ui.project+'</a>':s.target?'<a class="chapter-link" href="#'+s.target+'">'+ui.chapter+'</a>':'')+'<div class="chapter-nav"><button id="previous-stop" aria-label="'+ui.previous+'" '+(i===0?'disabled':'')+'>←</button><span>'+ui.chapterLabel+' '+(i+1)+' / '+stops.length+'</span><button id="next-stop" aria-label="'+ui.next+'" '+(i===stops.length-1?'disabled':'')+'>→</button></div>';
 document.querySelector('#previous-stop').onclick=()=>visit(Math.max(0,station-1),true);
 document.querySelector('#next-stop').onclick=()=>visit(Math.min(stops.length-1,station+1),true);
 if(push){history.pushState(null,'','#'+s.id);updateLanguageLinks();rail.children[i].scrollIntoView({block:'nearest',inline:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches)img.animate([{opacity:.35,transform:'scale(1.025)'},{opacity:1,transform:'scale(1)'}],{duration:360,easing:'ease-out'});
}
function routeStop(){const alias={amana:'traffic',assessment:'traffic',seismic:'decision'};const h=location.hash.slice(1),i=stops.findIndex(s=>s.id===(alias[h]||h));if(i>=0){visit(i);document.querySelector('#atlas').scrollIntoView();}}
visit(0);routeStop();window.addEventListener('hashchange',routeStop);window.addEventListener('popstate',routeStop);

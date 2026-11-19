const {projects,projectKit,lessons,imageNotes}=content;
const sources={
  seismic:'SeismicRepGAN-filippo',dynamics:'Epidemic_Study_Covid19',rag:'Document-Assistant-RAG',
  sentiment:'Sentiment-Analysis-with-NLP',pagerank:'SocialNetworkPageRankAnalysis',options:'Black-Scholes-Function'
};
const projectArea=document.querySelector('#portfolio-projects'),filterBar=document.querySelector('#filters');
function renderProjects(filter){
 projectArea.replaceChildren();
 for(const [id,title,field,intro,detail] of projects.filter(p=>filter===ui.all||p[2]===filter)){
  const [art,kit]=projectKit[id],card=document.createElement('details');card.className='project';card.id='project-'+id;card.dataset.explore=ui.explore;card.dataset.close=ui.close;
  const head=document.createElement('summary'),img=document.createElement('img');img.src=artURL(art);img.alt=id==='pagerank'?title:id==='dynamics'?title:'';img.loading=id==='pagerank'?'eager':'lazy';img.className='project-art';
  const label=document.createElement('small');label.textContent=field;
  const h=document.createElement('h3');h.textContent=title;
  const lead=document.createElement('p');lead.textContent=intro;
  const stack=document.createElement('div');stack.className='stack';kit.forEach(([name])=>{const span=document.createElement('span');span.textContent=name;stack.append(span);});
  head.append(img,label,h,lead,stack);card.append(head);
  const approachTitle=document.createElement('h4');approachTitle.textContent=ui.approach;const body=document.createElement('p');body.textContent=detail;const lessonTitle=document.createElement('h4');lessonTitle.textContent=ui.lesson;const lesson=document.createElement('p');lesson.textContent=lessons[id];const toolsTitle=document.createElement('h4');toolsTitle.textContent=ui.tools;card.append(approachTitle,body,lessonTitle,lesson,toolsTitle);
  const usage=document.createElement('dl');usage.className='tool-usage';kit.forEach(([name,role])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=name;dd.textContent=role;usage.append(dt,dd);});card.append(usage);
  if(sources[id]){const a=document.createElement('a');a.href='https://github.com/mohamedLaabydy/'+sources[id];a.textContent=ui.code;card.append(a);}
  if(imageNotes[id]){const note=document.createElement('p');note.className='image-note';note.textContent=imageNotes[id];card.append(note);if(id==='dynamics'){const source=document.createElement('a');source.href='https://www.naturalearthdata.com/downloads/10m-cultural-vectors/';source.textContent=ui.mapSource;source.className='image-note';card.append(source);}}
  projectArea.append(card);
 }
 [...filterBar.children].forEach(btn=>btn.setAttribute('aria-pressed',String(btn.textContent===filter)));
}
for(const name of [ui.all,...new Set(projects.map(p=>p[2]))]){const btn=document.createElement('button');btn.textContent=name;btn.onclick=()=>renderProjects(name);filterBar.append(btn);}
renderProjects(ui.all);
const {toolStories}=content;
const toolChoices=document.querySelector('#tool-choices');
function selectTool(i){const [name,title,story,id,label]=toolStories[i];[...toolChoices.children].forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));document.querySelector('#tool-example').innerHTML='<h4>'+title+'</h4><p>'+story+'</p><a href="#'+id+'">'+label+' ↗</a>';}
toolStories.forEach(([name],i)=>{const b=document.createElement('button');b.textContent=name;b.onclick=()=>selectTool(i);toolChoices.append(b);});selectTool(0);
function openLinkedProject(){if(!location.hash.startsWith('#project-'))return;let el=document.getElementById(location.hash.slice(1));if(!el){renderProjects(ui.all);el=document.getElementById(location.hash.slice(1));}if(el){el.open=true;el.scrollIntoView({block:'start'});}}
window.addEventListener('hashchange',openLinkedProject);openLinkedProject();
document.querySelector('#main-nav').onclick=()=>{document.querySelector('#mobile-menu').open=false;};

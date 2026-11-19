(() => {
const fr=document.documentElement.lang==='fr';
const rows=[...document.querySelectorAll('.experience-row')];
const stages=fr?[['Évaluer','Des contrôles reproductibles pour suivre la qualité des champs extraits.'],['Comprendre','Examiner les erreurs avec les équipes métier et techniques.'],['Améliorer','Transformer les observations en prochaines améliorations.']]:[['Evaluate','Repeatable checks to track the quality of extracted fields.'],['Understand','Investigate errors with business and engineering colleagues.'],['Improve','Turn observations into the next improvement.']];
const host=document.createElement('div');host.className='pipeline-demo';
const title=document.createElement('p');title.textContent=fr?'Dans les coulisses : ma boucle de qualité':'Behind the work: my quality loop';host.append(title);
const controls=document.createElement('div');controls.className='pipeline-controls';host.append(controls);
const output=document.createElement('p');output.className='pipeline-output';output.setAttribute('aria-live','polite');
stages.forEach(([label,description],i)=>{const button=document.createElement('button');button.textContent=label;button.type='button';button.setAttribute('aria-pressed',String(i===0));button.onclick=()=>{controls.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));output.textContent=description;};controls.append(button);});output.textContent=stages[0][1];host.append(output);
const note=document.createElement('small');note.textContent=fr?'Schémas illustratifs du travail — aucune donnée interne.':'Conceptual workflow illustrations — no internal data.';host.append(note);rows[0]?.querySelector('section').append(host);
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
if(!reduce.matches && 'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target);}}),{threshold:.08});rows.forEach(row=>{row.classList.add('reveal-ready');observer.observe(row);});}
})();
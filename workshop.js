const {methods}=content;
const tabs=document.querySelector('#method-tabs'),copy=document.querySelector('#method-copy'),workshop=document.querySelector('#mind'),gearCanvas=document.querySelector('#gears');
const ctx=gearCanvas.getContext('2d');let active=0,angle=0,frame=0;
const wheels=[{x:88,y:132,n:16},{x:193,y:132,n:14},{x:272,y:82,n:13},{x:360,y:128,n:16}];
methods.forEach((m,i)=>{const b=document.createElement('button');b.textContent=String(i+1).padStart(2,'0')+' '+m[0];b.onclick=()=>selectMethod(i,true);tabs.append(b);});
function selectMethod(i,animate=false){active=i;[...tabs.children].forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));copy.innerHTML='<small>'+ui.step+' '+String(i+1).padStart(2,'0')+'</small><h3>'+methods[i][1]+'</h3><p>'+methods[i][2]+'</p>';if(animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches){cancelAnimationFrame(frame);const from=angle,start=performance.now();function tick(t){const p=Math.min(1,(t-start)/850);angle=from+(1-Math.pow(1-p,3))*.64;draw();if(p<1)frame=requestAnimationFrame(tick);}frame=requestAnimationFrame(tick);}else draw();}
function gear(g,i){
 const r=g.n*3.5,rotation=angle*(i%2?-1:1)*16/g.n+i*.15;
 ctx.save();ctx.translate(g.x,g.y);ctx.rotate(rotation);ctx.beginPath();
 for(let k=0;k<g.n*4;k++){const a=k*Math.PI*2/(g.n*4),d=r+(k%4===1||k%4===2?4:-4);const x=Math.cos(a)*d,y=Math.sin(a)*d;if(!k)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.closePath();
 ctx.shadowColor='#070e24';ctx.shadowBlur=9;ctx.shadowOffsetY=6;
 const grad=ctx.createLinearGradient(-r,-r,r,r);grad.addColorStop(0,i===active?'#f6d795':'#a4b8ff');grad.addColorStop(.55,i===active?'#bb874a':'#526fc4');grad.addColorStop(1,i===active?'#e9b86b':'#294589');ctx.fillStyle=grad;ctx.fill();ctx.shadowBlur=0;ctx.shadowOffsetY=0;ctx.strokeStyle=i===active?'#ffe3a8':'#c6d2ff';ctx.lineWidth=1;ctx.stroke();
 ctx.beginPath();ctx.arc(0,0,r*.68,0,Math.PI*2);ctx.fillStyle='#172548';ctx.fill();ctx.strokeStyle='#0b1533';ctx.lineWidth=3;ctx.stroke();
 for(let k=0;k<5;k++){ctx.rotate(Math.PI*2/5);ctx.fillStyle=i===active?'#c79858':'#7795e8';ctx.fillRect(0,-5,r*.69,10);}
 ctx.beginPath();ctx.arc(0,0,14,0,Math.PI*2);ctx.fillStyle=i===active?'#e4b878':'#afc1ff';ctx.fill();ctx.strokeStyle='#17254d';ctx.stroke();ctx.beginPath();ctx.arc(0,0,5,0,Math.PI*2);ctx.fillStyle='#17254d';ctx.fill();ctx.restore();
 ctx.fillStyle=i===active?'#f7d6a1':'#becbf4';ctx.font='10px monospace';ctx.textAlign='center';ctx.fillText(String(i+1).padStart(2,'0'),g.x,g.y+r+24);
}
function draw(){const width=gearCanvas.clientWidth||500,height=width*250/455,dpr=Math.min(devicePixelRatio||1,2);gearCanvas.width=width*dpr;gearCanvas.height=height*dpr;ctx.setTransform(width*dpr/455,0,0,width*dpr/455,0,0);ctx.clearRect(0,0,455,250);wheels.forEach(gear);}
gearCanvas.onclick=e=>{const box=gearCanvas.getBoundingClientRect(),x=(e.clientX-box.left)/box.width*455,y=(e.clientY-box.top)/box.width*455;const i=wheels.findIndex(g=>Math.hypot(g.x-x,g.y-y)<g.n*3.5+4);if(i>=0)selectMethod(i,true);};
document.querySelector('#turn').onclick=()=>selectMethod((active+1)%4,true);
function openWorkshop(){workshop.hidden=false;draw();workshop.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
document.querySelectorAll('.enter').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();history.pushState(null,'','#mind');updateLanguageLinks();openWorkshop();}));
document.querySelector('#exit').onclick=()=>{workshop.hidden=true;};
function routeWorkshop(){if(location.hash==='#mind')openWorkshop();else if(location.hash==='#top')workshop.hidden=true;}
window.addEventListener('hashchange',routeWorkshop);window.addEventListener('popstate',routeWorkshop);new ResizeObserver(draw).observe(gearCanvas);selectMethod(0);routeWorkshop();

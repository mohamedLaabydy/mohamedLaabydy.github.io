function updateLanguageLinks(){document.querySelectorAll('.language-switch a').forEach(a=>{a.href=a.dataset.page+location.hash;});}
updateLanguageLinks();window.addEventListener('hashchange',updateLanguageLinks);window.addEventListener('popstate',updateLanguageLinks);
document.querySelectorAll('.language-switch a').forEach(a=>{a.addEventListener('pointerenter',updateLanguageLinks);a.addEventListener('focus',updateLanguageLinks);a.addEventListener('click',e=>{updateLanguageLinks();if(!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey){e.preventDefault();location.assign(a.href);}});});

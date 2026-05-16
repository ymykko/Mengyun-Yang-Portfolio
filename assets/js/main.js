function drivePreview(url){
  const m = url.match(/\/d\/([^/]+)/);
  if(m) return `https://drive.google.com/file/d/${m[1]}/preview`;
  return url;
}
function getLang(){return localStorage.getItem('lang') || 'en'}
function setLang(lang){localStorage.setItem('lang',lang);document.documentElement.lang=lang==='zhHant'?'zh-Hant':lang;renderAll()}
function tr(path){let cur=t[getLang()];for(const p of path.split('.')) cur=cur?.[p];return cur || path}
function loc(obj){return typeof obj==='string'?obj:(obj?.[getLang()]||obj?.en||'')}
function rootPrefix(){return location.pathname.includes('/projects/')?'../':''}
function projectUrl(id){return `${rootPrefix()}projects/project.html?id=${id}`}
function externalBtn(link, cls='btn'){return `<a class="${cls}" href="${link.url}" target="_blank" rel="noopener">${link.label}</a>`}
function initLangButtons(){document.querySelectorAll('[data-lang-btn]').forEach(b=>{b.classList.toggle('active', b.dataset.langBtn===getLang());b.onclick=()=>setLang(b.dataset.langBtn)})}
function renderStaticText(){document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=tr(el.dataset.i18n)});document.querySelectorAll('[data-i18n-html]').forEach(el=>{el.innerHTML=tr(el.dataset.i18nHtml)})}
function projectCard(p){return `<article class="card project-card" data-category="${p.category}">
  <div class="cover">${p.cover||loc(p.title)}</div>
  <div class="meta">${tr('categories.'+p.category)}${p.subcat?' · '+tr('subcats.'+p.subcat):''}</div>
  <h3>${loc(p.title)}</h3>
  <p>${loc(p.overview)}</p>
  <div class="tools">${p.tools.slice(0,4).map(x=>`<span class="tool">${x}</span>`).join('')}</div>
  <div class="card-actions"><a class="btn primary" href="${projectUrl(p.id)}">${tr('viewCase')}</a></div>
</article>`}
function renderProjects(){
 const grid=document.querySelector('#projects-grid'); if(!grid) return;
 const lang=getLang(); grid.innerHTML='';
 const active=document.querySelector('.filter.active')?.dataset.filter || 'all';
 const shown=projects.filter(p=>active==='all'||p.category===active);
 grid.innerHTML=shown.map(projectCard).join('');
 document.querySelectorAll('.filter').forEach(f=>{f.textContent=f.dataset.filter==='all'?(lang==='en'?'All':'全部'):tr('categories.'+f.dataset.filter);f.onclick=()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));f.classList.add('active');renderProjects()}})
}
function renderProjectPage(){
 const mount=document.querySelector('#project-page'); if(!mount) return;
 const id=new URLSearchParams(location.search).get('id') || 'kaco';
 const p=projects.find(x=>x.id===id) || projects[0];
 document.title=`${loc(p.title)} | Mengyun Yang Portfolio`;
 const media = p.media ? `<div class="embed-wrap"><iframe src="${drivePreview(p.media.url)}" allow="autoplay; encrypted-media" allowfullscreen></iframe></div><p class="note">Google Drive media preview is embedded when available. If it does not load, use the external link below.</p>` : '';
 mount.innerHTML=`
 <section class="project-hero"><div class="container">
   <div class="breadcrumbs"><a href="../index.html#projects">Projects</a> / ${tr('categories.'+p.category)}${p.subcat?' / '+tr('subcats.'+p.subcat):''}</div>
   <p class="kicker">${tr('categories.'+p.category)}</p>
   <h1>${loc(p.title)}</h1>
   <p class="type">${loc(p.type)}</p>
   <div class="chip-row">${p.tools.map(x=>`<span class="chip">${x}</span>`).join('')}</div>
 </div></section>
 <section><div class="container detail-grid">
   <article class="card detail-card">
     <h2>Project Overview</h2>
     <p>${loc(p.overview)}</p>
     <h3>My Role</h3>
     <p>${loc(p.role)}</p>
     <h3>Key Outputs</h3>
     <div class="link-list">${p.links.map(l=>externalBtn(l, 'btn primary')).join('')}</div>
     ${media}
   </article>
   <aside class="card detail-card">
     <h2>Project Summary</h2>
     <div class="side-list">
       <div class="side-row"><strong>Category</strong>${tr('categories.'+p.category)}</div>
       ${p.subcat?`<div class="side-row"><strong>Focus</strong>${tr('subcats.'+p.subcat)}</div>`:''}
       <div class="side-row"><strong>Project Type</strong>${loc(p.type)}</div>
       <div class="side-row"><strong>Tools</strong>${p.tools.join(', ')}</div>
     </div>
   </aside>
 </div></section>`;
}
function renderGroupedSections(){
 const mount=document.querySelector('#grouped-projects'); if(!mount) return;
 const content = projects.filter(p=>p.category==='content');
 const data = projects.filter(p=>p.category==='data');
 const groups=[
  ['campaign',content.filter(p=>p.subcat==='campaign')],['social',content.filter(p=>p.subcat==='social')],['campus',content.filter(p=>p.subcat==='campus')],['creative',content.filter(p=>p.subcat==='creative')],['extra',content.filter(p=>p.subcat==='extra')],['featuredData',data.filter(p=>p.subcat==='featuredData')],['moreData',data.filter(p=>p.subcat==='moreData')]
 ];
 mount.innerHTML=groups.filter(([,items])=>items.length).map(([key,items])=>`<h3 class="subsection-title">${tr('subcats.'+key)}</h3><div class="project-grid">${items.map(projectCard).join('')}</div>`).join('');
}
function renderAll(){initLangButtons();renderStaticText();renderProjects();renderGroupedSections();renderProjectPage()}
document.addEventListener('DOMContentLoaded',renderAll);

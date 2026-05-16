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


function fileIdFromDrive(url){
  const m = (url || '').match(/\/d\/([^/]+)/);
  return m ? m[1] : '';
}
function driveThumb(url){
  const id = fileIdFromDrive(url);
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w1200` : '';
}
const coverMap = {
  kaco: {src: rootPrefix()+'assets/images/covers/kaco.jpg', label: 'Brand guideline preview'},
  noodles: {src: rootPrefix()+'assets/images/covers/noodles.jpg', label: 'Brand guideline preview'},
  meituan: {src: rootPrefix()+'assets/images/covers/meituan.jpg', label: 'H5 activity page preview'},
  crumbling: {src: rootPrefix()+'assets/images/covers/crumbling.jpg', label: 'Short film preview'},
  podcast: {src: rootPrefix()+'assets/images/covers/podcast.jpg', label: 'Podcast trailer preview'},
  'small-designs': {src: rootPrefix()+'assets/images/covers/small-designs.jpg', label: 'Creative works preview'},
  tomodachi: {src: rootPrefix()+'assets/images/covers/tomodachi.jpg', label: 'Community analysis preview'},
  ceps: {src: rootPrefix()+'assets/images/covers/ceps.jpg', label: 'Research poster preview'}
};
const caseHeadings = {
  en:{overview:'Project Overview', role:'My Role', process:'Process & Focus', outputs:'Preview & Key Outputs', links:'View Full Materials', summary:'Project Summary', note:'The preview image introduces the project visually. Full files, reports, production logs, and code are opened through the buttons below.'},
  zh:{overview:'项目概览', role:'我的角色', process:'过程与重点', outputs:'预览与核心产出', links:'查看完整材料', summary:'项目摘要', note:'预览图用于先让访问者快速理解项目风格或内容方向，完整文件、报告、production log 和代码可通过下方按钮打开。'},
  zhHant:{overview:'項目概覽', role:'我的角色', process:'過程與重點', outputs:'預覽與核心產出', links:'查看完整材料', summary:'項目摘要', note:'預覽圖用於先讓訪問者快速理解項目風格或內容方向，完整文件、報告、production log 和代碼可通過下方按鈕打開。'}
};
function H(k){return caseHeadings[getLang()][k]}
function projectProcess(p){
  const lang=getLang();
  const isZh=lang!=='en';
  const common = {
    brand: isZh ? '项目重点在于将前期调研转化为可执行的品牌视觉系统。页面先呈现项目背景、个人角色和主要视觉预览，再通过外部链接展示完整品牌手册与 production log。' : 'The project focuses on translating early-stage research into a coherent brand identity system. The case study introduces the context and role first, presents a visual preview, then links to the full brand guideline and production log.',
    content: isZh ? '项目重点在于内容目标、受众理解、平台表达和最终传播物料之间的关系。页面先说明项目背景和个人贡献，再展示关键内容/视觉预览，最后提供完整链接。' : 'The project focuses on the relationship between content objectives, audience understanding, platform expression, and final communication materials. The case study introduces the context and role first, then presents a selected preview before linking to the full materials.',
    data: isZh ? '项目重点在于研究问题、数据处理、分析方法和可视化叙事。页面先概括研究逻辑，再展示报告或海报预览，并保留完整 report 与 code 链接。' : 'The project focuses on research questions, data processing, analytical methods, and visual storytelling. The case study summarizes the research logic first, then highlights a key visual output and keeps links to the full report and code.'
  };
  return common[p.category] || common.content;
}
function coverFor(p){return coverMap[p.id] || null}
function renderProjectCover(p, small=false){
  const c = coverFor(p);
  if(!c || !c.src) return '';
  return `<figure class="project-cover ${small?'small':''}"><img src="${c.src}" alt="${c.label || loc(p.title)}" loading="lazy"><figcaption>${c.label || loc(p.title)}</figcaption></figure>`;
}
function projectCard(p){return `<article class="card project-card" data-category="${p.category}">
  ${renderProjectCover(p,true)}
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
 const media = p.media ? `<section class="case-section"><h2>Media Preview</h2><div class="embed-wrap"><iframe src="${drivePreview(p.media.url)}" allow="autoplay; encrypted-media" allowfullscreen></iframe></div><p class="note">Google Drive media preview is embedded when available. If it does not load, use the external link below.</p></section>` : '';
 mount.innerHTML=`
 <section class="project-hero"><div class="container">
   <div class="breadcrumbs"><a href="../index.html#projects">Projects</a> / ${tr('categories.'+p.category)}${p.subcat?' / '+tr('subcats.'+p.subcat):''}</div>
   <p class="kicker">${tr('categories.'+p.category)}</p>
   <h1>${loc(p.title)}</h1>
   <p class="type">${loc(p.type)}</p>
   <div class="chip-row">${p.tools.map(x=>`<span class="chip">${x}</span>`).join('')}</div>
 </div></section>
 <section><div class="container detail-grid rich-detail">
   <article class="card detail-card main-case">
     <section class="case-section"><h2>${H('overview')}</h2><p>${loc(p.overview)}</p></section>
     <section class="case-section"><h2>${H('role')}</h2><p>${loc(p.role)}</p></section>
     <section class="case-section"><h2>${H('process')}</h2><p>${projectProcess(p)}</p></section>
     <section class="case-section"><h2>${H('outputs')}</h2>${renderProjectCover(p,false)}<p class="note">${H('note')}</p></section>
     ${media}
     <section class="case-section"><h2>${H('links')}</h2><div class="link-list">${p.links.map(l=>externalBtn(l, 'btn primary')).join('')}</div></section>
   </article>
   <aside class="card detail-card sticky-summary">
     <h2>${H('summary')}</h2>
     <div class="side-list">
       <div class="side-row"><strong>Category</strong>${tr('categories.'+p.category)}</div>
       ${p.subcat?`<div class="side-row"><strong>Focus</strong>${tr('subcats.'+p.subcat)}</div>`:''}
       <div class="side-row"><strong>Project Type</strong>${loc(p.type)}</div>
       <div class="side-row"><strong>Tools</strong>${p.tools.join(', ')}</div>
     </div>
     <div class="mini-links">${p.links.slice(0,4).map(l=>externalBtn(l,'btn')).join('')}</div>
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

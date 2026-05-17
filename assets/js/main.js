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
  xppen: {src: rootPrefix()+'assets/images/covers/xppen.jpg', label: 'Campaign proposal preview'},
  meituan: {src: rootPrefix()+'assets/images/covers/meituan.jpg', label: 'H5 activity page preview'},
  'fashion-xhs': {src: rootPrefix()+'assets/images/covers/lofficiel.jpg', label: 'Xiaohongshu account preview'},
  'campus-media': {src: rootPrefix()+'assets/images/covers/campus-media.jpg', label: 'WeChat editorial preview'},
  'personal-xhs': {src: rootPrefix()+'assets/images/covers/personal-xhs.jpg', label: 'Personal Xiaohongshu preview'},
  crumbling: {src: rootPrefix()+'assets/images/covers/crumbling.jpg', label: 'Short film preview'},
  podcast: {src: rootPrefix()+'assets/images/covers/podcast.jpg', label: 'Podcast preview'},
  'small-designs': {src: rootPrefix()+'assets/images/covers/small-designs.jpg', label: 'Creative works preview'},
  youtube: {src: rootPrefix()+'assets/images/covers/youtube.jpg', label: 'Data storytelling preview'},
  tomodachi: {src: rootPrefix()+'assets/images/covers/tomodachi.jpg', label: 'Community analysis preview'},
  ceps: {src: rootPrefix()+'assets/images/covers/ceps.jpg', label: 'Research poster preview'},
  'news-image': {src: rootPrefix()+'assets/images/covers/news-image.jpg', label: 'News image analysis preview'}
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
  const copy={
    crumbling:{
      en:'This short film was developed and produced in the UK as a collaborative student film. The process began with script ideation and revisions, followed by storyboard planning, public actor recruitment, location and shooting schedule coordination, on-site sound recording, and post-production editing. The case study highlights the full small-team production workflow rather than only the final cut.',
      zh:'这个项目是在英国拍摄完成的微电影实践。团队从脚本构思与修改开始，继续推进分镜绘制、公开平台演员招募、拍摄场地与时间沟通、现场收音和后期剪辑。这个 case study 的重点不是单纯展示视频成片，而是呈现一个小型团队从前期筹备到后期完成的完整制作流程。',
      zhHant:'這個項目是在英國拍攝完成的微電影實踐。團隊從腳本構思與修改開始，繼續推進分鏡繪製、公開平台演員招募、拍攝場地與時間溝通、現場收音和後期剪輯。這個 case study 的重點不是單純展示影片成片，而是呈現一個小型團隊從前期籌備到後期完成的完整製作流程。'
    },
    podcast:{
      en:'Echoing Time was designed as a blog-style audio storytelling project that travels back to the 1980s to discuss music, memory, and cultural atmosphere of that era. The production process included defining the podcast concept, designing a sound logo, developing the episode structure, inviting and interviewing a guest, recording audio, editing the trailer, and producing the final piece.',
      zh:'Echoing Time 是一个偏博客形式的音频叙事项目，概念是“穿越回到 80 年代”，围绕当时的音乐、记忆与时代氛围展开讨论。制作过程包括确定播客概念、设计 sound logo、规划节目结构、邀请嘉宾并完成采访、录制音频、剪辑 trailer 和制作最终成片。',
      zhHant:'Echoing Time 是一個偏博客形式的音頻敘事項目，概念是「穿越回到 80 年代」，圍繞當時的音樂、記憶與時代氛圍展開討論。製作過程包括確定播客概念、設計 sound logo、規劃節目結構、邀請嘉賓並完成訪談、錄製音頻、剪輯 trailer 和製作最終成片。'
    },
    'small-designs':{
      en:'This section gathers smaller personal design practices created outside larger campaign or branding projects. Instead of presenting them as a single strategic project, the case study shows how I experiment with visual style, fan-made objects, illustration, personal storytelling, and playful design formats in everyday creative work.',
      zh:'这一部分集合了我平时完成的一些小型设计练习，并不把它们包装成一个大型策略项目，而是展示我在日常创作中对视觉风格、自制物料、插画、个人表达和趣味设计形式的尝试。',
      zhHant:'這一部分集合了我平時完成的一些小型設計練習，並不把它們包裝成一個大型策略項目，而是展示我在日常創作中對視覺風格、自製物料、插畫、個人表達和趣味設計形式的嘗試。'
    },
    youtube:{
      en:'This project uses YouTube comments as audience data to examine how music fans express emotion, appreciation, fandom identity, and topic interests. The process involved collecting comments, cleaning text data, applying sentiment analysis and topic modeling, visualizing patterns, and translating the findings into a Shorthand data story.',
      zh:'这个项目将 YouTube 评论作为受众数据，分析音乐粉丝如何表达情绪、喜爱、粉丝身份和话题兴趣。过程包括评论收集、文本清洗、情绪分析、主题建模、可视化呈现，并最终整理成 Shorthand 数据叙事文章。',
      zhHant:'這個項目將 YouTube 評論作為受眾數據，分析音樂粉絲如何表達情緒、喜愛、粉絲身份和話題興趣。過程包括評論收集、文本清洗、情緒分析、主題建模、可視化呈現，並最終整理成 Shorthand 數據敘事文章。'
    },
    tomodachi:{
      en:'This project focuses on an online game-community discussion and turns visible reply relationships into a network structure. The analysis examines interaction patterns, central voices, reply dynamics, and how conversation visibility is shaped by network position rather than only by opinion content.',
      zh:'这个项目聚焦一个线上游戏社区讨论，并将可见的回复关系整理成网络结构。分析重点包括互动模式、关键发声者、回复关系，以及讨论可见度如何受到网络位置影响，而不仅仅取决于观点内容本身。',
      zhHant:'這個項目聚焦一個線上遊戲社區討論，並將可見的回覆關係整理成網絡結構。分析重點包括互動模式、關鍵發聲者、回覆關係，以及討論可見度如何受到網絡位置影響，而不僅僅取決於觀點內容本身。'
    },
    ceps:{
      en:'This research project uses CEPS seventh-grade classroom data to construct friendship networks and examine peer influence across different network distances. The workflow involved building one-, two-, and three-degree peer exposure measures, modeling subjective and behavioural engagement separately, testing distance decay and network-structure moderation, and summarizing the findings in a research poster.',
      zh:'这个研究项目使用 CEPS 七年级班级数据构建友谊网络，分析不同网络距离下的同伴影响。过程包括构建一度、二度、三度同伴暴露指标，分别建模主观学习投入与行为学习投入，检验距离衰减和网络结构调节作用，并最终通过研究海报呈现结果。',
      zhHant:'這個研究項目使用 CEPS 七年級班級數據構建友誼網絡，分析不同網絡距離下的同伴影響。過程包括構建一度、二度、三度同伴暴露指標，分別建模主觀學習投入與行為學習投入，檢驗距離衰減和網絡結構調節作用，並最終透過研究海報呈現結果。'
    },
    'news-image':{
      en:'This project explores how news photos can be automatically annotated and assigned to relevant news sections. The process involved generating image-based text annotations, using those annotations to train or support multi-class classification, comparing machine-assisted results with human annotations, and turning the evaluation into a concise WordPress report with visual diagrams.',
      zh:'这个项目探索如何对新闻图片进行自动文本标注，并将图片分配到相关的新闻版块。过程包括生成图片文本标注、基于标注进行多分类预测、比较机器辅助结果与人工标注表现，并将评估结果整理为带有图示的 WordPress 报告。',
      zhHant:'這個項目探索如何對新聞圖片進行自動文本標註，並將圖片分配到相關的新聞版塊。過程包括生成圖片文本標註、基於標註進行多分類預測、比較機器輔助結果與人工標註表現，並將評估結果整理為帶有圖示的 WordPress 報告。'
    }
  };
  if(copy[p.id]) return copy[p.id][lang] || copy[p.id].en;
  const common = {
    brand: isZh ? '项目重点在于将前期调研转化为可执行的品牌视觉系统。页面先呈现项目背景、个人角色和主要视觉预览，再通过外部链接展示完整品牌手册与 production log。' : 'The project focuses on translating early-stage research into a coherent brand identity system. The case study introduces the context and role first, presents a visual preview, then links to the full brand guideline and production log.',
    content: isZh ? '项目重点在于内容目标、受众理解、平台表达和最终传播物料之间的关系。页面先说明项目背景和个人贡献，再展示关键内容/视觉预览，最后提供完整链接。' : 'The project focuses on the relationship between content objectives, audience understanding, platform expression, and final communication materials. The case study introduces the context and role first, then presents a selected preview before linking to the full materials.',
    data: isZh ? '项目重点在于研究问题、数据处理、分析方法和可视化叙事。页面先概括研究逻辑，再展示报告或海报预览，并保留完整 report 与 code 链接。' : 'The project focuses on research questions, data processing, analytical methods, and visual storytelling. The case study summarizes the research logic first, then highlights a key visual output and keeps links to the full report and code.'
  };
  return common[p.category] || common.content;
}

function coverFor(p){return coverMap[p.id] || {src: rootPrefix()+'assets/images/covers/default.jpg', label: loc(p.title)}}
function renderProjectCover(p, small=false){
  const c = coverFor(p);
  const fallback = rootPrefix()+'assets/images/covers/default.jpg';
  return `<figure class="project-cover ${small?'small':''}"><img src="${c.src}" alt="${c.label || loc(p.title)}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'"><figcaption>${c.label || loc(p.title)}</figcaption></figure>`;
}
function uniqueProjects(){
  const seen=new Set();
  return projects.filter(p=>{
    if(seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
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
 const shown=uniqueProjects().filter(p=>active==='all'||p.category===active);
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
 const mount=document.querySelector('#grouped-projects');
 if(mount) mount.innerHTML='';
}
function renderAll(){initLangButtons();renderStaticText();renderProjects();renderGroupedSections();renderProjectPage()}
document.addEventListener('DOMContentLoaded',renderAll);

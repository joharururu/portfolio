(() => {
  'use strict';
  const data = window.PORTFOLIO;
  const main = document.querySelector('#main');
  const viewer = document.querySelector('#viewer');
  const menu = document.querySelector('#projects-menu');
  const menuToggle = document.querySelector('#projects-toggle');
  const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const byId = id => data.projects.find(p=>p.id===id);
  const media = new Map();
  data.gallery.forEach(im=>media.set(im.id,im));
  data.projects.forEach(p=>[p.hero,...p.sections.flatMap(s=>s.images||[])].forEach(im=>{im.project=p.id;im.key=`${p.id}-${im.id}`;media.set(im.key,im);}));
  let currentRoute = '', activeItems = [], activeIndex = 0, grid = false, returnFocus = null;
  const scrollPositions = new Map();
  history.scrollRestoration = 'manual';
  const route = () => (location.hash.slice(1)||'/').split('?')[0];
  const pathFor = p => p.detailPath || `/project/${p.id}`;
  const imageKey = im => im.key||im.id;
  const picture = (im, cls='') => im.src
    ? `<img class="${cls}" src="${esc(im.src)}" alt="${esc(im.alt||im.label)}" loading="lazy" decoding="async">`
    : `<span class="placeholder ${cls}" role="img" aria-label="${esc(im.label)} — 이미지 준비 중"><span>${esc(im.label)}<small>이미지 준비 중</small></span></span>`;
  const figure = (im, extra='') => `<figure class="visual ${extra}" style="--ratio:${esc(im.ratio||'3/2')}"><button class="image-button" data-image="${esc(imageKey(im))}" aria-label="${esc(im.label)} 확대">${picture(im)}</button><figcaption>${esc(im.caption||im.label)}</figcaption></figure>`;
  const copy = s => `<div class="section-copy"><p class="eyebrow">${esc(s.label)}</p><h2>${esc(s.title).replace(/\n/g,'<br>')}</h2>${s.status?`<p class="status">${esc(s.status)}</p>`:''}${s.body?`<p class="body-copy">${esc(s.body)}</p>`:s.prompt?`<p class="body-copy pending"><span>본문 입력 대기</span>${esc(s.prompt)}</p>`:''}</div>`;
  const blocks = {
    'text-image':s=>`${copy(s)}${(s.images||[]).map(im=>figure(im)).join('')}`,
    research:s=>`${copy(s)}<div class="research-visuals">${s.images.map(im=>figure(im)).join('')}</div><p class="source">${esc(s.source)}</p>`,
    insight:s=>copy(s),
    strategy:s=>`${copy(s)}${s.images.map(im=>figure(im)).join('')}`,
    flow:s=>`${copy(s)}${s.images.map(im=>figure(im)).join('')}`,
    gallery:s=>`${copy(s)}<div class="gallery-tools"><span>Scroll to explore</span><div><button data-scroll="-1" aria-label="이전 화면">←</button><button data-scroll="1" aria-label="다음 화면">→</button></div></div><div class="horizontal-gallery" tabindex="0" role="region" aria-label="${esc(s.title)} 가로 갤러리">${s.images.map(im=>figure(im)).join('')}</div>`,
    brand:s=>`${copy(s)}<div class="brand-layout">${s.images.map(im=>figure(im)).join('')}</div>`,
    full:s=>`${copy(s)}<div class="full-visuals">${s.images.map(im=>figure(im)).join('')}</div>`,
    reflection:s=>copy(s)
  };
  function setMenu(open) {menu.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));}
  menu.innerHTML=data.projects.map((p,i)=>`<a ${p.detailPath?`href="#${esc(p.detailPath)}"`:'role="link" aria-disabled="true" title="상세 페이지 준비 중"'}><span>${esc(p.name)}</span><small>0${i+1}</small></a>`).join('');
  menuToggle.addEventListener('click',()=>setMenu(menu.hidden));
  document.addEventListener('click',e=>{if(!menu.contains(e.target)&&!menuToggle.contains(e.target))setMenu(false);});
  function home() {
    return `<h1 class="sr-only">${esc(data.name)} BX 디자인 포트폴리오</h1><div class="home-gallery" aria-label="전체 프로젝트 이미지">${data.gallery.map(im=>`<button data-image="${im.id}" class="thumbnail" style="--thumb-width:${im.width}px" aria-label="${esc(byId(im.project).name)} ${im.label} 확대">${picture(im)}</button>`).join('')}</div><footer class="home-footer"><span>BX Design Portfolio</span><span>60 images / 5 projects</span></footer>`;
  }
  function detail(p) {
    const index=data.projects.indexOf(p), prev=data.projects[index-1], next=data.projects[index+1];
    return `<article class="project ${p.id}" aria-label="${esc(p.name)} 프로젝트"><header class="project-header"><div><p class="eyebrow">0${index+1} / ${esc(p.category||'Project')}</p><h1>${esc(p.name)}</h1></div><div class="project-intro"><p>${esc(p.intro)}</p>${p.sections.length?`<div class="metadata"><span>역할 <em>${esc(p.role||'입력 대기')}</em></span><span>기간 <em>${esc(p.period||'입력 대기')}</em></span></div>`:''}${p.notice?`<p class="concept-note">${esc(p.notice)}</p>`:''}</div></header>${figure(p.hero,'hero')}${p.sections.length?`<nav class="chapter-nav" aria-label="프로젝트 목차">${p.sections.map((s,i)=>`<a href="#section-${i+1}" data-section="section-${i+1}">${esc(s.label.split(' / ')[1])}</a>`).join('')}</nav>`:'<p class="empty-copy">이 프로젝트의 이미지와 설명은 아직 제공되지 않았습니다.</p>'}${p.sections.map((s,i)=>`<section id="section-${i+1}" class="block block-${s.type} ${s.variant||''}">${blocks[s.type](s)}</section>`).join('')}<nav class="project-navigation" aria-label="이전 다음 프로젝트">${prev?`<a href="#${pathFor(prev)}"><small>Previous Project</small><span>← ${esc(prev.name)}</span></a>`:'<a href="#/"><small>Back to gallery</small><span>← All images</span></a>'}${next?`<a href="#${pathFor(next)}"><small>Next Project</small><span>${esc(next.name)} ↗</span></a>`:'<a href="#/"><small>Back to gallery</small><span>All images ↗</span></a>'}</nav></article>`;
  }
  function explore(p) {
    const images=data.gallery.filter(im=>im.project===p.id);
    return `<section class="explore"><div class="explore-heading"><h1>${esc(p.name)}</h1><a class="project-link" href="#${pathFor(p)}">View Project ↗</a></div><div class="explore-strip" tabindex="0" role="region" aria-label="${esc(p.name)} 이미지 탐색">${images.map(im=>`<button class="explore-image" style="--ratio:${im.width}/${im.height}" data-image="${im.id}" aria-label="${esc(p.name)} ${im.label} 확대">${picture(im)}</button>`).join('')}</div><p class="explore-hint">${images.length} images <span>Scroll to explore →</span></p></section>`;
  }
  function renderPage() {
    const r=route();
    if(currentRoute!==r){
      if(currentRoute)scrollPositions.set(currentRoute,window.scrollY);
      currentRoute=r;setMenu(false);
      const p=byId(r.split('/')[2]);
      if(r==='/')main.innerHTML=home();
      else if(r==='/about')main.innerHTML=`<section class="about"><p class="eyebrow">About</p><h1>${esc(data.name)}</h1><p class="about-lead">${esc(data.about)}</p><p class="body-copy">${esc(data.biography||'소개 문구를 준비하고 있습니다.')}</p>${data.email?`<a class="project-link" href="mailto:${esc(data.email)}">${esc(data.email)} ↗</a>`:'<p class="source">연락처 입력 대기</p>'}<a href="#/" class="back-link">← Back to gallery</a></section>`;
      else if(p&&r.startsWith('/project/'))main.innerHTML=detail(p);
      else if(p&&r.startsWith('/explore/'))main.innerHTML=explore(p);
      else main.innerHTML='<section class="about"><h1>페이지를 찾을 수 없습니다.</h1><a href="#/">갤러리로 돌아가기</a></section>';
      document.title=`${p?p.name:r==='/about'?'About':'Portfolio'} — ${data.name}`;
      window.scrollTo(0,scrollPositions.get(r)||0);
      main.focus({preventScroll:true});
    }
    const params=new URLSearchParams((location.hash.split('?')[1]||''));
    const key=params.get('image');
    if(key&&media.has(key)){
      const im=media.get(key);
      activeItems=im.key?[byId(im.project).hero,...byId(im.project).sections.flatMap(s=>s.images||[])]:data.gallery.filter(item=>item.project===im.project);
      activeIndex=activeItems.indexOf(im);grid=params.get('grid')==='1';
      if(!viewer.open){returnFocus=document.activeElement;viewer.showModal();document.body.classList.add('viewing');}
      renderViewer();
    }else if(viewer.open){viewer.close();document.body.classList.remove('viewing');returnFocus?.focus({preventScroll:true});}
  }
  function renderViewer() {
    resetSlide();
    const im=activeItems[activeIndex],p=byId(im.project);
    document.querySelector('#viewer-project').textContent=p.name;
    document.querySelector('#grid-toggle').textContent=grid?'Image':'Grid';
    document.querySelector('#grid-toggle').setAttribute('aria-pressed',String(grid));
    document.querySelector('#viewer-caption').textContent=`${activeIndex+1} / ${activeItems.length} — ${im.label}`;
    const link=document.querySelector('#view-project');
    if(p.detailPath){link.href=`#${p.detailPath}`;link.removeAttribute('aria-disabled');link.removeAttribute('title');}
    else{link.removeAttribute('href');link.setAttribute('aria-disabled','true');link.title='상세 페이지 준비 중';}
    viewer.classList.toggle('grid-mode',grid);
    document.querySelector('#viewer-content').innerHTML=grid?`<div class="viewer-grid">${activeItems.map((item,i)=>`<button class="grid-image ${i===activeIndex?'selected':''}" data-select="${i}" aria-label="${esc(item.label)} 선택">${picture(item)}</button>`).join('')}</div>`:`<div class="viewer-stage"><button class="neighbor previous" data-step="-1" aria-label="이전 이미지" ${activeIndex===0?'disabled':''}>${activeIndex>0?picture(activeItems[activeIndex-1]):''}</button><a class="viewer-image" ${p.detailPath?`href="#${esc(p.detailPath)}"`:'role="link" aria-disabled="true"'} draggable="false" aria-label="${esc(p.name)} 상세 보기" style="--ratio:${im.ratio||`${im.width}/${im.height}`}">${picture(im)}</a><button class="neighbor next" data-step="1" aria-label="다음 이미지" ${activeIndex===activeItems.length-1?'disabled':''}>${activeIndex<activeItems.length-1?picture(activeItems[activeIndex+1]):''}</button></div>`;
  }
  function openImage(key) {
    returnFocus=document.activeElement;
    history.pushState({overlay:true},'',`#${route()}?image=${encodeURIComponent(key)}`);renderPage();
  }
  function updateViewer(index,asGrid=false) {
    if(index<0||index>=activeItems.length)return;
    history.replaceState(history.state,'',`#${route()}?image=${encodeURIComponent(imageKey(activeItems[index]))}${asGrid?'&grid=1':''}`);
    const focused=document.activeElement;const step=focused?.dataset.step;
    renderPage();
    if(step)(viewer.querySelector(`.neighbor[data-step="${step}"]:not(:disabled)`)||document.querySelector('#grid-toggle')).focus({preventScroll:true});
  }
  function closeViewer(){if(history.state?.overlay)history.back();else{history.replaceState({},'',`#${route()}`);renderPage();}}
  document.querySelector('#viewer-close').addEventListener('click',closeViewer);
  document.querySelector('#grid-toggle').addEventListener('click',()=>updateViewer(activeIndex,!grid));
  viewer.addEventListener('cancel',e=>{e.preventDefault();closeViewer();});
  document.addEventListener('click',e=>{
    if(e.target.closest('.skip')){e.preventDefault();main.focus();main.scrollIntoView();return;}
    const imageButton=e.target.closest('[data-image]');if(imageButton){openImage(imageButton.dataset.image);return;}
    const select=e.target.closest('[data-select]');if(select){updateViewer(Number(select.dataset.select));document.querySelector('#grid-toggle').focus();return;}
    const step=e.target.closest('[data-step]');if(step){slideTo(Number(step.dataset.step));return;}
    const scroll=e.target.closest('[data-scroll]');if(scroll){const rail=scroll.closest('section').querySelector('.horizontal-gallery');rail.scrollBy({left:rail.clientWidth*.8*Number(scroll.dataset.scroll),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return;}
    const section=e.target.closest('[data-section]');if(section){e.preventDefault();document.getElementById(section.dataset.section)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return;}
    const link=e.target.closest('a[href^="#/"]');
    if(link&&viewer.open){e.preventDefault();history.replaceState({},'',`#${route()}`);viewer.close();document.body.classList.remove('viewing');history.pushState({},'',link.getAttribute('href'));renderPage();}
    if(e.target===viewer||e.target.classList.contains('viewer-stage'))closeViewer();
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&!menu.hidden){setMenu(false);menuToggle.focus();}
    if(viewer.open&&!grid&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();slideTo(e.key==='ArrowRight'?1:-1);}
  });
  // One Pointer Events path for mouse, pen and touch. Geometry is taken from
  // the existing three slots so resting image sizes and blur stay unchanged.
  let gesture=null, slide=null, slideVersion=0, settling=false, suppressClickUntil=0;
  function resetSlide(){
    slideVersion++;
    const previousGesture=gesture;gesture=null;
    if(previousGesture?.element.hasPointerCapture(previousGesture.id))previousGesture.element.releasePointerCapture(previousGesture.id);
    settling=false;
    if(slide)slide.elements.forEach(el=>{el.getAnimations().forEach(a=>a.cancel());['transform','filter','opacity'].forEach(prop=>el.style.removeProperty(prop));});
    slide=null;viewer.classList.remove('dragging','sliding');
  }
  function measureSlide(){
    const stage=viewer.querySelector('.viewer-stage');if(!stage)return null;
    const elements=[...stage.children];
    const rects=elements.map(el=>{const r=el.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2,width:r.width,height:r.height};});
    return {elements,rects,progress:0};
  }
  function slideFrames(progress){
    const direction=progress<0?-1:1,t=Math.abs(progress);
    return slide.elements.map((el,i)=>{
      const from=slide.rects[i],slot=i-direction;
      const to=slide.rects[slot]||{...from,x:from.x+direction*-Math.max(from.width,innerWidth*.2)};
      const startBlur=i===1?0:5,endBlur=slot===1?0:5;
      const startOpacity=i===1?1:.5,endOpacity=slot===1?1:slot<0||slot>2?0:.5;
      return {transform:`translate(${(to.x-from.x)*t}px, ${(to.y-from.y)*t}px) scale(${1+(to.width/from.width-1)*t}, ${1+(to.height/from.height-1)*t})`,filter:`blur(${startBlur+(endBlur-startBlur)*t}px)`,opacity:String(startOpacity+(endOpacity-startOpacity)*t)};
    });
  }
  function paintSlide(progress){slide.progress=progress;slideFrames(progress).forEach((frame,i)=>Object.assign(slide.elements[i].style,frame));}
  async function settleSlide(target){
    if(!slide)return;
    settling=true;viewer.classList.remove('dragging');viewer.classList.add('sliding');
    const version=slideVersion,from=slideFrames(slide.progress),to=slideFrames(target);
    const duration=matchMedia('(prefers-reduced-motion: reduce)').matches?0:280;
    const animations=slide.elements.map((el,i)=>el.animate([from[i],to[i]],{duration,easing:'cubic-bezier(.22,.61,.36,1)',fill:'forwards'}));
    await Promise.allSettled(animations.map(a=>a.finished));
    if(version!==slideVersion||!viewer.open)return;
    if(target)updateViewer(activeIndex+target);
    else resetSlide();
  }
  function slideTo(direction){
    if(grid||settling||gesture||activeIndex+direction<0||activeIndex+direction>=activeItems.length)return;
    slide=measureSlide();if(slide)settleSlide(direction);
  }
  viewer.addEventListener('dragstart',e=>{if(e.target.closest('.viewer-stage'))e.preventDefault();});
  viewer.addEventListener('pointerdown',e=>{
    if(grid||settling||!e.isPrimary||e.button!==0)return;
    const element=e.target.closest('.viewer-image');if(!element)return;
    suppressClickUntil=0;slide=measureSlide();
    gesture={id:e.pointerId,element,x:e.clientX,y:e.clientY,locked:false,samples:[{x:e.clientX,time:e.timeStamp}]};
  });
  viewer.addEventListener('pointermove',e=>{
    const g=gesture;if(!g||g.id!==e.pointerId)return;
    const dx=e.clientX-g.x,dy=e.clientY-g.y;
    if(!g.locked){
      if(Math.max(Math.abs(dx),Math.abs(dy))<6)return;
      if(Math.abs(dy)>Math.abs(dx)){resetSlide();return;}
      g.locked=true;g.element.setPointerCapture(g.id);viewer.classList.add('dragging');
    }
    e.preventDefault();
    g.samples.push({x:e.clientX,time:e.timeStamp});g.samples=g.samples.filter(s=>e.timeStamp-s.time<100);
    const direction=dx<0?1:-1,distance=Math.abs(slide.rects[1+direction].x-slide.rects[1].x);
    const atEdge=activeIndex+direction<0||activeIndex+direction>=activeItems.length;
    paintSlide(direction*Math.min(Math.abs(dx)/distance*(atEdge?.22:1),1));
  });
  function finishGesture(e,cancelled=false){
    const g=gesture;if(!g||g.id!==e.pointerId)return;
    gesture=null;if(g.element.hasPointerCapture(g.id))g.element.releasePointerCapture(g.id);
    if(!g.locked){slide=null;return;}
    suppressClickUntil=performance.now()+500;
    const dx=e.clientX-g.x,first=g.samples[0];
    const velocity=(e.clientX-first.x)/Math.max(1,e.timeStamp-first.time);
    const direction=dx<0?1:-1,valid=activeIndex+direction>=0&&activeIndex+direction<activeItems.length;
    const threshold=Math.min(100,slide.rects[1].width*.2);
    const commit=!cancelled&&valid&&(Math.abs(dx)>=threshold||(Math.abs(dx)>16&&Math.abs(velocity)>.5&&Math.sign(velocity)===Math.sign(dx)));
    settleSlide(commit?direction:0);
  }
  viewer.addEventListener('pointerup',e=>finishGesture(e));
  viewer.addEventListener('pointercancel',e=>finishGesture(e,true));
  viewer.addEventListener('lostpointercapture',e=>{if(gesture?.id===e.pointerId)finishGesture(e,true);});
  viewer.addEventListener('click',e=>{if(performance.now()<suppressClickUntil&&e.target.closest('.viewer-image')){e.preventDefault();e.stopPropagation();}},true);
  viewer.addEventListener('close',resetSlide);
  window.addEventListener('resize',()=>{if(slide)resetSlide();});
  window.addEventListener('hashchange',renderPage);
  window.addEventListener('popstate',renderPage);
  renderPage();
})();

document.addEventListener("DOMContentLoaded", () => {
 const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 const revealTargets=document.querySelectorAll(".main > section:not(.hero),.section,.feature,.card,.feature-list > div,.skill-card,.numbers > div,.detail-panel");
 revealTargets.forEach((el,i)=>{el.classList.add("reveal-on-scroll");if(el.matches(".card,.feature,.skill-card,.numbers > div"))el.style.setProperty("--reveal-delay",`${(i%4)*55}ms`);});
 if(!reduceMotion && "IntersectionObserver" in window){
  const observer=new IntersectionObserver((entries,obs)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");obs.unobserve(e.target);}}),{threshold:.1,rootMargin:"0px 0px -30px 0px"});
  revealTargets.forEach(el=>observer.observe(el));
 }else revealTargets.forEach(el=>el.classList.add("is-visible"));
 if(!reduceMotion){let ticking=false;const update=()=>{const y=Math.min(window.scrollY,1600);document.documentElement.style.setProperty("--scroll-motion",`${y*.14}px`);document.documentElement.style.setProperty("--dot-motion",`${y*.035}px`);ticking=false;};update();window.addEventListener("scroll",()=>{if(!ticking){requestAnimationFrame(update);ticking=true;}},{passive:true});}
 const input=document.querySelector("#field-search");
 const cards=Array.from(document.querySelectorAll("#field-cards .field-card,.cards .field-card"));
 const empty=document.querySelector("#search-empty"),count=document.querySelector("#result-count");
 const buttons=Array.from(document.querySelectorAll(".filter-chip"));
 const clear=document.querySelector("#clear-search"),reset=document.querySelector("#reset-fields");
 let category="all";
 const norm=s=>(s||"").toLocaleLowerCase("ko-KR").replace(/[\s·\-_/]+/g,"");
 const apply=()=>{if(!cards.length)return;const q=norm(input?.value||"");let n=0;
  cards.forEach(card=>{const text=norm((card.innerText||card.textContent||"")+" "+(card.dataset.keywords||""));
   const visible=(!q||text.includes(q))&&(category==="all"||card.dataset.category===category);card.hidden=!visible;if(visible)n++;});
  if(empty)empty.hidden=n!==0;if(count)count.textContent=(q||category!=="all")?`검색 결과 ${n}개`:`전체 ${n}개 분야`;
 };
 if(input&&cards.length){input.addEventListener("input",apply);
  buttons.forEach(btn=>btn.addEventListener("click",()=>{category=btn.dataset.filter||"all";buttons.forEach(b=>{const active=b===btn;b.classList.toggle("active",active);b.setAttribute("aria-pressed",active?"true":"false");});apply();}));
  if(clear)clear.addEventListener("click",()=>{input.value="";input.focus();apply();});
  if(reset)reset.addEventListener("click",()=>{input.value="";category="all";buttons.forEach(b=>{const active=b.dataset.filter==="all";b.classList.toggle("active",active);b.setAttribute("aria-pressed",active?"true":"false");});apply();input.focus();});
  apply();
 }
});
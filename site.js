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

// ===== COMMENTS & REVIEWS: STORED LOCALLY IN THIS BROWSER =====
document.addEventListener("DOMContentLoaded", () => {
 const form=document.querySelector("#review-form");
 if(!form) return;
 const key="engineeringWorldReviews_v1";
 const list=document.querySelector("#review-list"), total=document.querySelector("#review-total");
 const message=document.querySelector("#review-message"), charCount=document.querySelector("#review-char-count");
 const feedback=document.querySelector("#review-form-feedback"), clear=document.querySelector("#clear-my-reviews");
 const load=()=>{try{const v=JSON.parse(localStorage.getItem(key)||"[]");return Array.isArray(v)?v.filter(x=>x&&typeof x.id==="string"&&typeof x.name==="string"&&typeof x.message==="string"&&Number.isInteger(x.rating)):[]}catch(_){return[]}};
 const save=items=>{try{localStorage.setItem(key,JSON.stringify(items));return true}catch(_){feedback.textContent="브라우저 저장 공간을 사용할 수 없습니다.";feedback.style.color="#b45a6a";return false}};
 const render=()=>{const items=load();total.textContent=String(items.length);list.replaceChildren();
  if(!items.length){const empty=document.createElement("div");empty.className="review-empty";empty.innerHTML="<span>✧</span><strong>아직 등록된 리뷰가 없습니다.</strong><p>첫 번째 의견을 남겨보세요!</p>";list.appendChild(empty);return}
  [...items].reverse().forEach(item=>{const article=document.createElement("article");article.className="review-item";const head=document.createElement("div");head.className="review-item-head";const author=document.createElement("span");author.className="review-author";author.textContent=item.name;const date=document.createElement("time");date.className="review-date";date.textContent=item.date;head.append(author,date);const stars=document.createElement("div");stars.className="review-stars";stars.textContent="★".repeat(item.rating)+"☆".repeat(5-item.rating);const text=document.createElement("p");text.className="review-message";text.textContent=item.message;const del=document.createElement("button");del.type="button";del.className="review-delete";del.textContent="이 리뷰 삭제";del.addEventListener("click",()=>{if(save(load().filter(x=>x.id!==item.id)))render()});article.append(head,stars,text,del);list.appendChild(article)});
 };
 message.addEventListener("input",()=>charCount.textContent=`${message.value.length} / 500`);
 form.addEventListener("submit",e=>{e.preventDefault();const name=document.querySelector("#review-name").value.trim();const text=message.value.trim();const rating=Number(form.querySelector('input[name="rating"]:checked')?.value||5);if(!name||!text){feedback.textContent="닉네임과 리뷰 내용을 모두 입력해 주세요.";feedback.style.color="#b45a6a";return}
  const items=load();items.push({id:`${Date.now()}-${Math.random().toString(36).slice(2,9)}`,name:name.slice(0,20),rating:Math.min(5,Math.max(1,rating)),message:text.slice(0,500),date:new Date().toLocaleString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})});
  if(save(items)){form.reset();charCount.textContent="0 / 500";feedback.textContent="리뷰가 이 브라우저에 저장되었습니다.";feedback.style.color="#378c78";render()}
 });
 clear.addEventListener("click",()=>{if(!load().length)return;if(confirm("이 브라우저에 저장된 리뷰를 모두 삭제할까요?")){localStorage.removeItem(key);feedback.textContent="이 브라우저의 리뷰를 모두 삭제했습니다.";render()}});
 render();
});

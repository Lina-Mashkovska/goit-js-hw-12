import{a as v,S as w,i as u}from"./assets/vendor-frHSA4Lh.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const q="50264582-5072b5ac7075dcbe954d58fd2";async function S(s,e){return(await v.get("https://pixabay.com/api/",{params:{key:q,q:s,image_type:"photo",orientation:"horizontal",page:e,per_page:15}})).data}const g=document.querySelector(".gallery"),o=document.querySelector(".loader"),i=document.querySelector(".load-more");let d;function I({largeImageURL:s,webformatURL:e,tags:a,likes:c,views:t,comments:r,downloads:l}){return`<li class="gallery-item">
    <a class="gallery-link" href="${s}">
      <img
        class="gallery-image"
        src="${e}"
        alt="${a}"
      />
    </a>
    <div class="image-info">
      <p><span class="label">Likes</span> <span class="value">${c}</span></p>
      <p><span class="label">Views</span> <span class="value">${t}</span></p>
      <p><span class="label">Comments</span> <span class="value">${r}</span></p>
      <p><span class="label">Downloads</span> <span class="value">${l}</span></p>
    </div>
  </li>`}function $(s){const e=s.map(I).join("");g.insertAdjacentHTML("beforeend",e),d?d.refresh():d=new w(".gallery a",{captionsData:"alt",captionDelay:250}),h()}function E(){const s=document.querySelectorAll(".gallery-item"),e=s[s.length-1];if(!e)return;const{height:a}=e.getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"})}function O(){g.innerHTML=""}function x(){o==null||o.classList.remove("is-hidden")}function h(){o==null||o.classList.add("is-hidden")}function A(){i==null||i.classList.remove("is-hidden")}function p(){i==null||i.classList.add("is-hidden")}const H=document.querySelector(".form"),L=document.querySelector('input[name="search-text"]'),P=document.querySelector(".load-more");let n=1,f=0,m=0,y="";H.addEventListener("submit",async s=>{s.preventDefault();const e=L.value.trim();if(!e){u.error({title:"Error",message:"Введіть текст для пошуку"});return}e!==y&&(y=e,n=1,f=0,m=0,O(),p()),await b()});P.addEventListener("click",async()=>{await b()});async function b(){x();try{const s=await S(y,n),e=s.hits;if(e.length===0&&n===1){u.info({title:"Info",message:"Зображення не знайдено"}),p();return}$(e),m+=e.length,f=s.totalHits,n+=1,m>=f?(p(),u.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})):A(),n>2&&E()}catch{u.error({title:"Error",message:"Помилка під час завантаження зображень"})}finally{h(),n===2&&(L.value="")}}
//# sourceMappingURL=index.js.map

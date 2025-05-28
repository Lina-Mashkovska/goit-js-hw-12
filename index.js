import{a as L,S as b,i as a}from"./assets/vendor-frHSA4Lh.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const q="50264582-5072b5ac7075dcbe954d58fd2";async function y(r,t){return(await L.get("https://pixabay.com/api/",{params:{key:q,q:r,image_type:"photo",orientation:"horizontal",page:t,per_page:15}})).data}const g=document.querySelector(".gallery");let f;function S({largeImageURL:r,webformatURL:t,tags:o,likes:c,views:e,comments:s,downloads:n}){return`<li class="gallery-item">
        <a class="gallery-link" href="${r}">
          <img
            class="gallery-image"
            src="${t}"
            alt="${o}"
          />
        </a>
        <div class="image-info">
          <p>
          <span class="label">Likes</span>
  <span class="value">${c}</span>
          </p>
          <p>
          <span class="label">Views</span>
  <span class="value">${e}</span>
          </p>
          <p>
          <span class="label">Comments</span>
  <span class="value">${s}</span>
          </p>
          <p>
          <span class="label">Downloads</span>
  <span class="value">${n}</span>
          </p>
        </div>
      </li>`}function h(r){const t=r.map(S).join("");g.insertAdjacentHTML("beforeend",t),f?f.refresh():f=new b(".gallery a",{captionsData:"alt",captionDelay:250}),l()}function w(){if(!document.querySelector(".gallery-item"))return;const{height:t}=document.querySelector("gallery-item").getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}function I(){g.innerHTML=""}function v(){document.querySelector(".loader").classList.remove("is-hidden")}function l(){document.querySelector(".loader").classList.add("is-hidden")}function E(){document.querySelector(".load-more").classList.remove("is-hidden")}function u(){document.querySelector(".load-more").classList.remove("is-hidden")}const $=document.querySelector(".form"),m=document.querySelector('input[name="search-text"]'),M=document.querySelector(".load-more");let i=1,p=0,d=0;$.addEventListener("submit",async r=>{r.preventDefault();const t=m.value.trim();if(t===""){a.error({title:"Error",message:"Введіть текст для пошуку"}),l();return}t!==currentQuery&&(i=1,currentQuery=t,I(),u()),v();try{const o=await y(t,i);if(p=o.totalHits,d=o.hits.length,o.hits.length===0){a.info({title:"Info",message:"Зображення не знайдено"}),l();return}h(o.hits),i+=1,d>=p?(u(),a.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})):E(),m.value=""}catch{a.error({title:"Error",message:"Помилка під час запиту"})}finally{l(),m.value=""}});M.addEventListener("click",async()=>{v();try{const r=await y(currentQuery,i);if(r.hits.length===0){u(),a.info({title:"Info",message:"Більше зображень не знайдено"});return}h(r.hits),w(),i+=1,d+=r.hits.length,d>=p&&(u(),a.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}))}catch{a.error({title:"Error",message:"Помилка під час завантаження зображень"})}finally{l()}});
//# sourceMappingURL=index.js.map

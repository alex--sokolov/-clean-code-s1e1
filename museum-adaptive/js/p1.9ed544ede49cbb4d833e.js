(()=>{const t=document.querySelector(".progress1"),e=document.querySelector(".progress2");t.addEventListener("input",(function(){const t=this.value;this.style.background=`linear-gradient(to right, #710707 0%, \n    #710707 ${t}%, #fff ${t}%, white 100%)`})),e.addEventListener("input",(function(){const t=this.value;this.style.background=`linear-gradient(to right, #710707 0%, \n    #710707 ${t}%, #fff ${t}%, white 100%)`})),function(){const t=document.querySelector(".picture-inner-container"),e=[];for(let t=1;t<=15;t++){const n=document.createElement("img");n.classList.add("gallery-img"),n.src=`assets/img/galery/galery${t}.jpg`,n.alt=`galery${t}`,e.push(n)}e.sort((()=>.5-Math.random())),e.map((e=>{t.append(e)}))}(),$("html").on("click",".form__right__button",(function(t){let e=$(t.currentTarget),n=t.pageX-e.offset().left,r=t.pageY-e.offset().top;$("<span/>").appendTo(e).css({left:n,top:r})}))})();
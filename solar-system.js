import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */const s="solar-object",c="solar-list";let o=[];const t={solarForm:document.querySelector(".solar-form"),addObjectBtn:document.querySelector(".js-add-object-button"),submitObjectBtn:document.querySelector(".js-solar-submit-button"),deleteSolarCardBtn:document.querySelector(".js-delete-solar-card"),modalBackdrop:document.querySelector(".js-modal-backdrop"),modalWindow:document.querySelector(".js-modal-window"),container:document.querySelector(".container")};t.addObjectBtn.addEventListener("click",()=>{t.modalBackdrop.classList.add("is-open")});t.modalWindow.addEventListener("click",e=>{e.stopPropagation()});t.modalBackdrop.addEventListener("click",()=>{t.modalBackdrop.classList.remove("is-open")});t.submitObjectBtn.addEventListener("click",()=>{t.modalBackdrop.classList.remove("is-open")});t.container.addEventListener("click",e=>{if(e.target&&e.target.classList.contains("js-delete-solar-card")){const a=e.target.closest(".solar-container"),n=a.dataset.id;o=o.filter(l=>l.id!==Number(n)),d(c,o),a.remove(),localStorage.removeItem(s)}});t.solarForm.addEventListener("input",e=>{const r={id:Date.now(),image:e.currentTarget.elements.image.value,title:e.currentTarget.elements.title.value,type:e.currentTarget.elements.type.value,diameter:e.currentTarget.elements.diameter.value,distanceFromSun:e.currentTarget.elements.distance.value,hasAtmosphere:e.currentTarget.elements.atmosphere.checked?"Так":"Ні",discovered_by:e.currentTarget.elements.discovered_by.value};d(s,r)});function v(){const e=i(s)||{};t.solarForm.elements.image.value=e.image||"",t.solarForm.elements.title.value=e.title||"",t.solarForm.elements.type.value=e.type||"Планета",t.solarForm.elements.diameter.value=e.diameter||"",t.solarForm.elements.distance.value=e.distanceFromSun||"",t.solarForm.elements.atmosphere.checked=e.hasAtmosphere==="Так",t.solarForm.elements.discovered_by.value=e.discovered_by||"",o=i(c)||[],t.container.innerHTML=m(o)}v();t.solarForm.addEventListener("submit",e=>{e.preventDefault();const r={id:Date.now(),image:e.currentTarget.elements.image.value,title:e.currentTarget.elements.title.value,type:e.currentTarget.elements.type.value,diameter:e.currentTarget.elements.diameter.value,distanceFromSun:e.currentTarget.elements.distance.value,hasAtmosphere:e.currentTarget.elements.atmosphere.checked?"Так":"Ні",discovered_by:e.currentTarget.elements.discovered_by.value};if(!r.image||!r.title||!r.type||!r.diameter||!r.distanceFromSun||!r.discovered_by){alert("Please, fill all inputs");return}o.push(r),t.container.innerHTML=m(o),d(c,o),t.solarForm.reset(),localStorage.removeItem(s)});function d(e,r){const a=JSON.stringify(r);localStorage.setItem(e,a)}function i(e){const r=localStorage.getItem(e);try{return JSON.parse(r)}catch{return r}}function b({id:e,image:r,title:a,type:n,diameter:l,distanceFromSun:u,hasAtmosphere:p,discovered_by:g}){return`
            <div class="solar-container" data-id="${e}">
                <img class="solar-image" src="${r}" alt="${a}">
                <p><strong>Назва: </strong>${a}</p>
                <p><strong>Тип: </strong>${n}</p>
                <p><strong>Діаметр: </strong>${l} км</p>
                <p><strong>Відстань до Сонця (млн км): </strong>${u}</p>
                <p><strong>Чи є атмосфера: </strong>${p}</p>
                <p><strong>Відкривач: </strong>${g}</p>

                <button class="delete-solar-card js-delete-solar-card" type="button">Видалити картку</button>
            </div>
            
    `}function m(e){return e.map(b).join(`
`)}
//# sourceMappingURL=solar-system.js.map

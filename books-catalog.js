import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */const i="book-storage-key",m="books-storage-list";let n=[];const r={bookForm:document.querySelector(".book-form"),booksContainer:document.querySelector(".books-main-container")};r.bookForm.addEventListener("input",e=>{const t={image:e.currentTarget.elements.coverImage.value,title:e.currentTarget.elements.title.value,author:e.currentTarget.elements.author.value,genre:e.currentTarget.elements.genre.value,year:e.currentTarget.elements.publicYear.value,description:e.currentTarget.elements.description.value};g(i,t)});function v(){const e=u(i)||{};r.bookForm.elements.coverImage.value=e.image||"",r.bookForm.elements.title.value=e.title||"",r.bookForm.elements.author.value=e.author||"",r.bookForm.elements.genre.value=e.genre||"Фентезі",r.bookForm.elements.publicYear.value=e.year||"",r.bookForm.elements.description.value=e.description||"",n=u(m)||[],r.booksContainer.innerHTML=b(n)}v();r.bookForm.addEventListener("submit",e=>{e.preventDefault();const t=e.currentTarget.elements.coverImage.value.trim(),o=e.currentTarget.elements.title.value.trim(),a=e.currentTarget.elements.author.value.trim(),s=e.currentTarget.elements.genre.value.trim(),l=e.currentTarget.elements.publicYear.value.trim(),c=e.currentTarget.elements.description.value.trim();if(!t||!o||!a||!s||!l||!c){alert("Please, fill all inputs");return}const p={image:t,title:o,author:a,genre:s,year:l,description:c};n.push(p),r.booksContainer.innerHTML=b(n),g(m,n),r.bookForm.reset(),localStorage.removeItem(i)});function g(e,t){const o=JSON.stringify(t);localStorage.setItem(e,o)}function u(e){const t=localStorage.getItem(e);try{return JSON.parse(t)}catch{return t}}function k({image:e,title:t,author:o,genre:a,year:s,description:l}){return`
            <div class="book-container">
                <img class="book-image" src="${e}" alt="${t} обкладинка">
                <p><strong>Назва: </strong>${t}</p>
                <p><strong>Жанр: </strong>${a}</p>
                <p><strong>Автор: </strong>${o}</p>
                <p><strong>Рік видання: </strong>${s}</p>
                <p class="description"><strong>Опис: </strong>${l}</p>
            </div>
  `}function b(e){return e.map(k).join(`
`)}
//# sourceMappingURL=books-catalog.js.map

const SOLAR_OBJECT_KEY = 'solar-object';
const SOLAR_LIST_KEY = 'solar-list';
let solarList = [];

const refs = {
  solarForm: document.querySelector('.solar-form'),
  addObjectBtn: document.querySelector('.js-add-object-button'),
  submitObjectBtn: document.querySelector('.js-solar-submit-button'),
  deleteSolarCardBtn: document.querySelector('.js-delete-solar-card'),
  modalBackdrop: document.querySelector('.js-modal-backdrop'),
  modalWindow: document.querySelector('.js-modal-window'),
  container: document.querySelector('.container'),
};

//============== BUTTONS ==============

refs.addObjectBtn.addEventListener('click', () => {
  refs.modalBackdrop.classList.add('is-open');
});

refs.modalWindow.addEventListener('click', e => {
  e.stopPropagation();
});

refs.modalBackdrop.addEventListener('click', () => {
  refs.modalBackdrop.classList.remove('is-open');
});

refs.submitObjectBtn.addEventListener('click', () => {
  refs.modalBackdrop.classList.remove('is-open');
});

refs.container.addEventListener('click', e => {
  if (e.target && e.target.classList.contains('js-delete-solar-card')) {
    const button = e.target;
    const card = button.closest('.solar-container');
    const cardID = card.dataset.id;

    solarList = solarList.filter(solar => solar.id !== Number(cardID));

    saveToLS(SOLAR_LIST_KEY, solarList);

    card.remove();
    localStorage.removeItem(SOLAR_OBJECT_KEY);
  }
});

//============================

refs.solarForm.addEventListener('input', e => {
  const solarObject = {
    id: Date.now(),

    image: e.currentTarget.elements.image.value,
    title: e.currentTarget.elements.title.value,
    type: e.currentTarget.elements.type.value,
    diameter: e.currentTarget.elements.diameter.value,
    distanceFromSun: e.currentTarget.elements.distance.value,
    hasAtmosphere: e.currentTarget.elements.atmosphere.checked ? 'Так' : 'Ні',
    discovered_by: e.currentTarget.elements.discovered_by.value,
  };

  saveToLS(SOLAR_OBJECT_KEY, solarObject);
});

function initPage() {
  const solarObject = loadFromLS(SOLAR_OBJECT_KEY) || {};

  refs.solarForm.elements.image.value = solarObject.image || '';
  refs.solarForm.elements.title.value = solarObject.title || '';
  refs.solarForm.elements.type.value = solarObject.type || 'Планета';
  refs.solarForm.elements.diameter.value = solarObject.diameter || '';
  refs.solarForm.elements.distance.value = solarObject.distanceFromSun || '';
  refs.solarForm.elements.atmosphere.checked =
    solarObject.hasAtmosphere === 'Так';
  refs.solarForm.elements.discovered_by.value = solarObject.discovered_by || '';

  solarList = loadFromLS(SOLAR_LIST_KEY) || [];
  refs.container.innerHTML = solarCardsTemplate(solarList);
}

initPage();

refs.solarForm.addEventListener('submit', e => {
  e.preventDefault();

  const solarObject = {
    id: Date.now(),
    image: e.currentTarget.elements.image.value,
    title: e.currentTarget.elements.title.value,
    type: e.currentTarget.elements.type.value,
    diameter: e.currentTarget.elements.diameter.value,
    distanceFromSun: e.currentTarget.elements.distance.value,
    hasAtmosphere: e.currentTarget.elements.atmosphere.checked ? 'Так' : 'Ні',
    discovered_by: e.currentTarget.elements.discovered_by.value,
  };

  if (
    !solarObject.image ||
    !solarObject.title ||
    !solarObject.type ||
    !solarObject.diameter ||
    !solarObject.distanceFromSun ||
    !solarObject.discovered_by
  ) {
    alert('Please, fill all inputs');
    return;
  }

  solarList.push(solarObject);

  refs.container.innerHTML = solarCardsTemplate(solarList);
  saveToLS(SOLAR_LIST_KEY, solarList);

  refs.solarForm.reset();
  localStorage.removeItem(SOLAR_OBJECT_KEY);
});

//--------------------------------------------------------------------------------------

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
  const data = localStorage.getItem(key);

  try {
    const parseData = JSON.parse(data);
    return parseData;
  } catch {
    return data;
  }
}

function solarCardTemplate({
  id,
  image,
  title,
  type,
  diameter,
  distanceFromSun,
  hasAtmosphere,
  discovered_by,
}) {
  return `
            <div class="solar-container" data-id="${id}">
                <img class="solar-image" src="${image}" alt="${title}">
                <p><strong>Назва: </strong>${title}</p>
                <p><strong>Тип: </strong>${type}</p>
                <p><strong>Діаметр: </strong>${diameter} км</p>
                <p><strong>Відстань до Сонця (млн км): </strong>${distanceFromSun}</p>
                <p><strong>Чи є атмосфера: </strong>${hasAtmosphere}</p>
                <p><strong>Відкривач: </strong>${discovered_by}</p>

                <button class="delete-solar-card js-delete-solar-card" type="button">Видалити картку</button>
            </div>
            
    `;
}

function solarCardsTemplate(cards) {
  return cards.map(solarCardTemplate).join('\n');
}

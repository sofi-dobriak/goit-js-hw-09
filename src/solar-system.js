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
  container: document.querySelector('.solar-main-container'),
  searchInput: document.querySelector('.js-search-input'),
  searchButton: document.querySelector('.search-button'),
};

//==================================== BUTTONS ====================================

refs.addObjectBtn.addEventListener('click', () => {
  refs.modalBackdrop.classList.add('is-open');
});

refs.modalBackdrop.addEventListener('click', e => {
  if (e.target === refs.modalBackdrop) {
    refs.modalBackdrop.classList.remove('is-open');
  }
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

//====================================================================================

refs.searchInput.addEventListener('input', handleSearch);
refs.searchButton.addEventListener('click', handleSearch);

function handleSearch() {
  const searchQuery = refs.searchInput.value.toLowerCase().trim();
  const cards = document.querySelectorAll('.solar-container');

  cards.forEach(card => {
    const title = card.querySelector('.title').textContent.toLowerCase();
    const type = card.querySelector('.type').textContent.toLowerCase();

    const isVisible = title.includes(searchQuery) || type.includes(searchQuery);

    card.style.display = isVisible ? 'block' : 'none';
  });
}

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
    link: e.currentTarget.elements.link.value,
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
  refs.solarForm.elements.link.value = solarObject.link || '';

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
    link: e.currentTarget.elements.link.value,
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
  link,
}) {
  return `
            <div class="solar-container" data-id="${id}">
                <img class="solar-image" src="${image}" alt="${title}">
                <p class="title"><strong>Назва: </strong>${title}</p>
                <p class="type"><strong>Тип: </strong>${type}</p>
                <p><strong>Діаметр: </strong>${diameter} км</p>
                <p><strong>Відстань до Сонця: </strong>${distanceFromSun}</p>
                <p><strong>Чи є атмосфера: </strong>${hasAtmosphere}</p>
                <p><strong>Відкривач: </strong>${discovered_by}</p>

                <div class="link-button-container">
                  <a class="video-link" href="${link}" target="_blank">Дізнатися більше</a>
                  <button class="delete-solar-card js-delete-solar-card" type="button">Видалити картку</button>
                </div>
            </div>
            
    `;
}

function solarCardsTemplate(cards) {
  return cards.map(solarCardTemplate).join('\n');
}

const planets = [
  {
    image: 'https://surl.li/iyfrbd',
    title: 'Земля',
    type: 'Планета',
    diameter: '12742 км', // в км
    distanceFromSun: '149.6 млн км', // в млн км
    hasAtmosphere: true,
    discovered_by: 'Давнина',
    link: 'https://surl.li/xfocwn',
  },
  {
    image: 'https://surl.li/qljoei',
    title: 'Марс',
    type: 'Планета',
    diameter: '6779 км',
    distanceFromSun: '227.9 млн км',
    hasAtmosphere: true,
    discovered_by: 'Античність',
    link: 'https://surl.li/bpsrug',
  },
  {
    image: 'https://surl.li/zoionb',
    title: 'Юпітер',
    type: 'Планета',
    diameter: '139820 км',
    distanceFromSun: '778.3 млн км',
    hasAtmosphere: true,
    discovered_by: 'Давнина',
    link: 'https://surl.li/pxfjkq',
  },
  {
    image: 'https://surl.li/zdvdjv',
    title: 'Сатурн',
    type: 'Планета',
    diameter: '116460 км',
    distanceFromSun: '1427 млн км',
    hasAtmosphere: true,
    discovered_by: 'Давнина',
    link: 'https://surl.li/kazbqu',
  },
  {
    image: 'https://surl.li/symcuz',
    title: 'Венера',
    type: 'Планета',
    diameter: '12104 км',
    distanceFromSun: '108.2 млн км',
    hasAtmosphere: true,
    discovered_by: 'Давнина',
    link: 'https://surl.li/qcymif',
  },
  {
    image: 'https://surl.li/ifskol',
    title: 'Меркурій',
    type: 'Планета',
    diameter: '4879 км',
    distanceFromSun: '57.9 млн км',
    hasAtmosphere: false,
    discovered_by: 'Давнина',
    link: 'https://surl.li/ikchkt',
  },
  {
    image: 'https://surl.li/loglig',
    title: 'Нептун',
    type: 'Планета',
    diameter: '49528 км',
    distanceFromSun: '4497.1 млн км',
    hasAtmosphere: true,
    discovered_by: 'Йоганн Галле',
    link: 'https://surl.li/ijjffn',
  },
  {
    image: 'https://surl.li/pbglcb',
    title: 'Уран',
    type: 'Планета',
    diameter: '50724 км',
    distanceFromSun: '2871 млн км',
    hasAtmosphere: true,
    discovered_by: 'Вільям Гершель',
    link: 'https://surl.li/gkxcpt',
  },
];

const stars = [
  {
    image: 'https://surl.li/lqowuq',
    title: 'Сонце',
    type: 'Зоря',
    diameter: '1 392.7 млн км', // в км
    distanceFromSun: 0, // воно ж і є Сонце
    hasAtmosphere: true,
    discovered_by: 'Давнина',
    link: 'https://surl.li/rpwouo',
  },
  {
    image: 'https://surl.li/csjzpp',
    title: 'Сіріус',
    type: 'Зоря',
    diameter: '2.37 млн км',
    distanceFromSun: '8.6 c.в', // світлових років
    hasAtmosphere: true,
    discovered_by: 'Давнина',
    link: 'https://surl.li/zkqxtg',
  },
  {
    image: 'https://surl.li/lmcfcn',
    title: 'Полярна зоря',
    type: 'Зоря',
    diameter: '44.5 млн км',
    distanceFromSun: '642.5 c.в',
    hasAtmosphere: true,
    discovered_by: 'Давнина',
    link: 'https://surl.li/lwpeaz',
  },
  {
    image: 'https://surl.li/dolkcm',
    title: 'Альдебаран',
    type: 'Зоря',
    diameter: '61.7 млн км',
    distanceFromSun: '65.3 c.в',
    hasAtmosphere: true,
    discovered_by: 'Давнина',
    link: 'https://surl.li/dmlvpy',
  },
  {
    image: 'https://surl.li/mblrpg',
    title: 'Вега',
    type: 'Зоря',
    diameter: '2.35 млн км',
    distanceFromSun: '25 c.в',
    hasAtmosphere: true,
    discovered_by: 'Давнина',
    link: 'https://surl.li/mhkyue',
  },
  {
    image: 'https://surl.li/acgaeq',
    title: 'Антарес',
    type: 'Зоря',
    diameter: '1230 млн км',
    distanceFromSun: '550 c.в',
    hasAtmosphere: true,
    discovered_by: 'Давнина',
    link: 'https://surl.li/lbscuw',
  },
  {
    image: 'https://surl.li/lzelgp',
    title: 'Рігель',
    type: 'Зоря',
    diameter: '116 млн км',
    distanceFromSun: '860 c.в',
    hasAtmosphere: true,
    discovered_by: 'Давнина',
    link: 'https://surl.li/snxfhx',
  },
];

const dwarfPlanets = [
  {
    image: 'https://surl.li/yovifq',
    title: 'Плутон',
    type: 'Карликова планета',
    diameter: '2376 км', // в км
    distanceFromSun: '5.9 млрд км (39.5 а.о.)',
    hasAtmosphere: true,
    discovered_by: 'Клайд Томбо (1930)',
    link: 'https://surl.li/sjjvnv',
  },
  {
    image: 'https://surl.li/wuhxtw',
    title: 'Церера',
    type: 'Карликова планета',
    diameter: '946 км',
    distanceFromSun: '413 млн км (2.77 а.о.)',
    hasAtmosphere: false,
    discovered_by: 'Джузеппе Піацці (1801)',
    link: 'https://surl.li/zndeen',
  },
  {
    image: 'https://surl.li/lhmsxi',
    title: 'Еріда',
    type: 'Карликова планета',
    diameter: '2326 км',
    distanceFromSun: '10.1 млрд км (67.7 а.о.)',
    hasAtmosphere: false,
    discovered_by: 'Майкл Браун (2005)',
    link: 'https://surl.li/hlfepz',
  },
  {
    image: 'https://surl.li/zvjgxz',
    title: 'Макемаке',
    type: 'Карликова планета',
    diameter: '1430 км',
    distanceFromSun: '6.85 млрд км (45.8 а.о.)',
    hasAtmosphere: false,
    discovered_by: 'Майкл Браун (2005)',
    link: 'https://surl.li/kyryhw',
  },
  {
    image: 'https://surl.li/uxpgal',
    title: 'Хаумеа',
    type: 'Карликова планета',
    diameter: '1560 км',
    distanceFromSun: '6.43 млрд км (43.3 а.о.)',
    hasAtmosphere: false,
    discovered_by: 'Майкл Браун (2004)',
    link: 'https://surl.li/unlbke',
  },
];

const moons = [
  {
    image: 'https://surl.li/gaqjve',
    title: 'Ганімед',
    type: 'Супутник',
    diameter: '5268 км', // км
    distanceFromSun: '778.5 млн км', // млн км (середня орбіта Юпітера)
    hasAtmosphere: true,
    discovered_by: 'Галілео Галілей (1610)',
    link: 'https://surl.li/xvvmrm',
  },
  {
    image: 'https://surl.li/vajndc',
    title: 'Титан',
    type: 'Супутник',
    diameter: '5149 км', // км
    distanceFromSun: '1427 млн км', // млн км (середня орбіта Сатурна)
    hasAtmosphere: true,
    discovered_by: 'Крістіан Гюйгенс (1655)',
    link: 'https://surl.li/ecpqvc',
  },
  {
    image: 'https://surl.li/jhyhtw',
    title: 'Каллісто',
    type: 'Супутник',
    diameter: '4821 км', // км
    distanceFromSun: '778.5 млн км', // млн км
    hasAtmosphere: false,
    discovered_by: 'Галілео Галілей (1610)',
    link: 'https://surl.li/eylpdg',
  },
  {
    image: 'https://surl.li/qobdsm',
    title: 'Іо',
    type: 'Супутник',
    diameter: '3643 км', // км
    distanceFromSun: '778.5 млн км', // млн км
    hasAtmosphere: true,
    discovered_by: 'Галілео Галілей (1610)',
    link: 'https://surl.li/eklqzy',
  },
  {
    image: 'https://surl.li/lkniwp',
    title: 'Місяць',
    type: 'Супутник',
    diameter: '3475 км', // км
    distanceFromSun: '149.6 млн км', // млн км (середня орбіта Землі)
    hasAtmosphere: false,
    discovered_by: 'Давнина',
    link: 'https://surl.li/ycavie',
  },
  {
    image: 'https://surl.li/ogyvpo',
    title: 'Європа',
    type: 'Супутник',
    diameter: '3121 км', // км
    distanceFromSun: '778.5 млн км', // млн км
    hasAtmosphere: true,
    discovered_by: 'Галілео Галілей (1610)',
    link: 'https://surl.li/wscydi',
  },
  {
    image: 'https://surl.li/cybmjq',
    title: 'Тритон',
    type: 'Супутник',
    diameter: '2706 км', // км
    distanceFromSun: '4497 млн км', // млн км (середня орбіта Нептуна)
    hasAtmosphere: true,
    discovered_by: 'Вільям Ласселл (1846)',
    link: 'https://surl.li/vkgenk',
  },
  {
    image: 'https://surl.li/uvutxq',
    title: 'Енцелад',
    type: 'Супутник',
    diameter: '504 км', // км
    distanceFromSun: '1427 млн км', // млн км
    hasAtmosphere: true,
    discovered_by: 'Вільям Гершель (1789)',
    link: 'https://surl.li/tylzzx',
  },
  {
    image: 'https://surl.li/sxwrwh',
    title: 'Фобос',
    type: 'Супутник',
    diameter: '22.4 км', // км
    distanceFromSun: '227.9 млн км', // млн км (середня орбіта Марса)
    hasAtmosphere: false,
    discovered_by: 'Асаф Холл (1877)',
    link: 'https://surl.li/lqltpo',
  },
  {
    image: 'https://surl.li/oefbfv',
    title: 'Деймос',
    type: 'Супутник',
    diameter: '12.4 км', // км
    distanceFromSun: '227.9 млн км', // млн км
    hasAtmosphere: false,
    discovered_by: 'Асаф Холл (1877)',
    link: 'https://surl.li/quxnnj',
  },
];

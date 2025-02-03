const BOOK_STORAGE_KEY = 'book-storage-key';
const BOOKS_STORAGE_LIST = 'books-storage-list';

let booksList = [];

const refs = {
  bookForm: document.querySelector('.book-form'),
  booksContainer: document.querySelector('.books-main-container'),
};

refs.bookForm.addEventListener('input', e => {
  const bookObject = {
    image: e.currentTarget.elements.coverImage.value,
    title: e.currentTarget.elements.title.value,
    author: e.currentTarget.elements.author.value,
    genre: e.currentTarget.elements.genre.value,
    year: e.currentTarget.elements.publicYear.value,
    description: e.currentTarget.elements.description.value,
  };

  saveToLS(BOOK_STORAGE_KEY, bookObject);
});

function initPage() {
  const bookObject = loadFromLS(BOOK_STORAGE_KEY) || {};

  refs.bookForm.elements.coverImage.value = bookObject.image || '';
  refs.bookForm.elements.title.value = bookObject.title || '';
  refs.bookForm.elements.author.value = bookObject.author || '';
  refs.bookForm.elements.genre.value = bookObject.genre || 'Фентезі';
  refs.bookForm.elements.publicYear.value = bookObject.year || '';
  refs.bookForm.elements.description.value = bookObject.description || '';

  booksList = loadFromLS(BOOKS_STORAGE_LIST) || [];
  refs.booksContainer.innerHTML = booksTemplate(booksList);
}

initPage();

refs.bookForm.addEventListener('submit', e => {
  e.preventDefault();

  const image = e.currentTarget.elements.coverImage.value.trim();
  const title = e.currentTarget.elements.title.value.trim();
  const author = e.currentTarget.elements.author.value.trim();
  const genre = e.currentTarget.elements.genre.value.trim();
  const year = e.currentTarget.elements.publicYear.value.trim();
  const description = e.currentTarget.elements.description.value.trim();

  if (!image || !title || !author || !genre || !year || !description) {
    alert('Please, fill all inputs');
    return;
  }

  const bookObject = { image, title, author, genre, year, description };
  booksList.push(bookObject);

  refs.booksContainer.innerHTML = booksTemplate(booksList);
  saveToLS(BOOKS_STORAGE_LIST, booksList);

  refs.bookForm.reset();
  localStorage.removeItem(BOOK_STORAGE_KEY);
});

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

function bookTemplate({ image, title, author, genre, year, description }) {
  return `
            <div class="book-container">
                <img class="book-image" src="${image}" alt="${title} обкладинка">
                <p><strong>Назва: </strong>${title}</p>
                <p><strong>Жанр: </strong>${genre}</p>
                <p><strong>Автор: </strong>${author}</p>
                <p><strong>Рік видання: </strong>${year}</p>
                <p class="description"><strong>Опис: </strong>${description}</p>
            </div>
  `;
}

function booksTemplate(books) {
  return books.map(bookTemplate).join('\n');
}

const books = [
  {
    title: 'Володар перснів',
    author: 'Дж. Р. Р. Толкін',
    genre: ['Фентезі', 'Пригоди'],
    publicationYear: 1954,
    description:
      "Епічна історія про боротьбу добра і зла у Середзем'ї, де кільце всевладдя може змінити долю світу.",
    cover: 'https://surl.li/ljabrt',
  },
  {
    title: 'Гаррі Поттер і філософський камінь',
    author: 'Дж. К. Ролінґ',
    genre: ['Фентезі', 'Пригоди'],
    publicationYear: 1997,
    description:
      'Історія хлопчика-чарівника, який відкриває для себе світ магії та таємниць у школі Гоґвортс.',
    cover: 'https://surl.li/ftjwrs',
  },
  {
    title: 'Гра престолів',
    author: 'Джордж Р. Р. Мартін',
    genre: ['Фентезі', 'Драма'],
    publicationYear: 1996,
    description:
      'Політичні інтриги, боротьба за владу та магічні сили у світі Вестеросу.',
    cover: 'https://surl.li/jucxsx',
  },
  {
    title: 'Форрест Гамп',
    author: 'Вінстон Ґрум',
    genre: ['Драма', 'Пригоди'],
    publicationYear: 1986,
    description:
      'Неймовірні пригоди простодушного чоловіка, який стає учасником важливих історичних подій.',
    cover: 'https://surl.li/tcjcub',
  },
  {
    title: 'Голодні ігри',
    author: 'Сюзанна Коллінз',
    genre: ['Антиутопія', 'Пригоди'],
    publicationYear: 2008,
    description:
      'У світі, де діти змушені боротися на арені до смерті, Катніс Евердін кидає виклик системі.',
    cover: 'https://surl.li/gcmfon',
  },
  {
    title: 'Піаніст',
    author: 'Владислав Шпільман',
    genre: ['Біографія', 'Історія'],
    publicationYear: 1946,
    description:
      'Мемуари польського піаніста про виживання під час нацистської окупації Варшави.',
    cover: 'https://surl.li/yonsza',
  },
  {
    title: 'Втеча з Шоушенка',
    author: 'Стівен Кінг',
    genre: ['Драма', 'Кримінал'],
    publicationYear: 1982,
    description:
      "Історія несправедливо ув'язненого чоловіка, який планує втечу зі строгої в'язниці.",
    cover: 'https://surl.li/jnhhfl',
  },
  {
    title: 'Шерлок Голмс: Етюд у багряних тонах',
    author: 'Артур Конан Дойл',
    genre: ['Детектив', 'Трилер'],
    publicationYear: 1887,
    description:
      'Перший роман про знаменитого детектива Шерлока Голмса та його друга доктора Ватсона.',
    cover: 'https://surl.li/etkymr',
  },
  {
    title: 'Код да Вінчі',
    author: 'Ден Браун',
    genre: ['Трилер', 'Детектив'],
    publicationYear: 2003,
    description:
      'Роберт Ленґдон розкриває таємниці, заховані у творах Леонардо да Вінчі, що ведуть до змови.',
    cover: 'https://surl.li/hxihnx',
  },
  {
    title: 'Мовчання ягнят',
    author: 'Томас Гарріс',
    genre: ['Трилер', 'Кримінал'],
    publicationYear: 1988,
    description:
      'Агентка ФБР Кларіс Старлінг працює з харизматичним канібалом, щоб спіймати серійного вбивцю.',
    cover: 'https://surl.li/jbdsyj',
  },
  {
    title: 'Життя Пі',
    author: 'Янн Мартель',
    genre: ['Пригоди', 'Філософія'],
    publicationYear: 2001,
    description:
      "Хлопець на ім'я Пі виживає у відкритому океані разом із бенгальським тигром у рятувальному човні.",
    cover: 'https://surl.li/cqlgfp',
  },
  {
    title: '1984',
    author: 'Джордж Орвелл',
    genre: ['Антиутопія', 'Політична сатира'],
    publicationYear: 1949,
    description:
      'Світ тотального контролю, де "Великий брат" спостерігає за кожним кроком громадян.',
    cover: 'https://surl.li/rlzxuq',
  },
];

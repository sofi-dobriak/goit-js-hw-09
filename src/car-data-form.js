import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const CAR_STORAGE_KEY = 'car-form-data';
const CARS_LIST_KEY = 'cars-list';
let carsArray = [];

const refs = {
  carForm: document.querySelector('.form'),
  carContainer: document.querySelector('.car-main-container'),
};

refs.carForm.addEventListener('input', e => {
  const carData = {
    url: e.currentTarget.elements.image.value,
    brand: e.currentTarget.elements.brand.value,
    model: e.currentTarget.elements.model.value,
    color: e.currentTarget.elements.color.value,
    onSale: e.currentTarget.elements.sale.value,
  };

  saveToLS(CAR_STORAGE_KEY, carData);
});

function initPage() {
  const carFormData = loadFromLS(CAR_STORAGE_KEY) || {};

  refs.carForm.elements.image.value = carFormData.url || '';
  refs.carForm.elements.brand.value = carFormData.brand || '';
  refs.carForm.elements.model.value = carFormData.model || '';
  refs.carForm.elements.color.value = carFormData.color || '';
  refs.carForm.elements.sale.value = carFormData.onSale || '';

  carsArray = loadFromLS(CARS_LIST_KEY) || [];
  refs.carContainer.innerHTML = carsTemplate(carsArray);
}

initPage();

refs.carForm.addEventListener('submit', e => {
  e.preventDefault();

  const url = e.currentTarget.elements.image.value.trim();
  const brand = e.currentTarget.elements.brand.value.trim();
  const model = e.currentTarget.elements.model.value.trim();
  const color = e.currentTarget.elements.color.value.trim();
  const onSale = e.currentTarget.elements.sale.value.trim();

  if (!url || !brand || !model || !color || !onSale) {
    alert('Please, fill all inputs');
    return;
  }

  const carData = { url, brand, model, color, onSale };
  carsArray.push(carData);

  refs.carContainer.innerHTML = carsTemplate(carsArray);
  saveToLS(CARS_LIST_KEY, carsArray);

  refs.carForm.reset();
  localStorage.removeItem(CAR_STORAGE_KEY);
});

function saveToLS(key, value) {
  const JSONdata = JSON.stringify(value);
  localStorage.setItem(key, JSONdata);
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

function carTemplate({ url, brand, model, color, onSale }) {
  const saleColor = onSale === 'Yes' ? 'green' : 'red';
  const onSaleText = `<span style = "color: ${saleColor};">${onSale}</span>`;
  return `<div class="car-container">
                <img class="car-img" src="${url}" alt="${brand}">
                <p><strong>Brand:</strong> ${brand}</p>
                <p><strong>Model:</strong> ${model}</p>
                <p><strong>Color:</strong> ${color}</p>
                <p><strong>On sale:</strong> ${onSaleText}</p>
            </div>`;
}

function carsTemplate(cars) {
  return cars.map(carTemplate).join('');
}

const cars = [
  {
    image: 'https://surl.li/xcchoc',
    brand: 'Audi',
    model: 'TT RS',
    color: 'Red',
    sale: true,
  },
  {
    image: 'https://surl.li/wttzye',
    brand: 'BMW',
    model: 'M3',
    color: 'Blue',
    sale: false,
  },
  {
    image: 'https://surl.li/jvwdyq',
    brand: 'Mercedes-Benz',
    model: 'AMG GT 63',
    color: 'Black',
    sale: true,
  },
  {
    image: 'https://surl.li/jomzkm',
    brand: 'Porsche',
    model: '911 GT3',
    color: 'Yellow',
    sale: false,
  },
  {
    image: 'https://surl.li/xdtvpz',
    brand: 'Ford',
    model: 'Mustang GT',
    color: 'Orange',
    sale: true,
  },
  {
    image: 'https://surl.li/ohhmjn',
    brand: 'Tesla',
    model: 'Model 3',
    color: 'White',
    sale: true,
  },
  {
    image: 'https://surl.li/mmmxcg',
    brand: 'Chevrolet',
    model: 'Corvette',
    color: 'Green',
    sale: false,
  },
  {
    image: 'https://surl.li/uhlfhd',
    brand: 'Nissan',
    model: '370Z',
    color: 'Purple',
    sale: true,
  },
  {
    image: 'https://surl.li/dlvpat',
    brand: 'Toyota',
    model: 'Supra',
    color: 'Silver',
    sale: false,
  },
  {
    image: 'https://surl.li/bwnucc',
    brand: 'Jaguar',
    model: 'F-Type',
    color: 'Blue',
    sale: true,
  },
  {
    image: 'https://surl.li/wbfymr',
    brand: 'Lamborghini',
    model: 'Huracan',
    color: 'Yellow',
    sale: false,
  },
  {
    image: 'https://surl.li/quyxxf',
    brand: 'Ferrari',
    model: '488 GTB',
    color: 'Red',
    sale: true,
  },
];

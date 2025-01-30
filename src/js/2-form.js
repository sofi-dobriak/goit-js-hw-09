'use strict';

const LOCAL_STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  labels: document.querySelectorAll('label'),
  input: document.querySelector('input'),
  textArea: document.querySelector('textarea'),
  button: document.querySelector('button'),
};

let formData = {
  email: '',
  message: '',
};

refs.form.addEventListener('input', e => {
  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;

  formData = { email, message };
  saveToLS(LOCAL_STORAGE_KEY, formData);
});

function initPage() {
  const formData = loadFromLS(LOCAL_STORAGE_KEY);

  refs.form.elements.email.value = formData?.email || '';
  refs.form.elements.message.value = formData?.message || '';
}

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log({ email, message });

  localStorage.removeItem(LOCAL_STORAGE_KEY);
  refs.form.reset();
});

initPage();

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
  const body = localStorage.getItem(key);
  try {
    const data = JSON.parse(body);
    return data;
  } catch {
    return body;
  }
}

//-------------------------- STYLES ---------------------------------------
refs.labels.forEach(label => label.classList.add('form-label'));
refs.input.classList.add('form-input');
refs.textArea.classList.add('form-textarea');
refs.button.classList.add('form-button');
//-----------------------------------------------------------------

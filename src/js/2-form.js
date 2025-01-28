'use strict';

const refs = {
  form: document.querySelector('.feedback-form'),
  labels: document.querySelectorAll('label'),
  input: document.querySelector('input'),
  textArea: document.querySelector('textarea'),
  button: document.querySelector('button'),
};

// Styles
//-----------------------------------------------------------------
refs.labels.forEach(label => label.classList.add('form-label'));
refs.input.classList.add('form-input');
refs.textArea.classList.add('form-textArea');
refs.button.classList.add('button');
//-----------------------------------------------------------------

const formData = {
  email: '',
  message: '',
};

const localeStorageKey = 'feedback-form-state';
const savedData = localStorage.getItem(localeStorageKey);

if (savedData) {
  try {
    const parseSavedData = JSON.parse(savedData);

    refs.input.value = parseSavedData.email ?? '';
    refs.textArea.value = parseSavedData.message ?? '';
  } catch (error) {
    console.error('Error parsing saved data:', error.message);
  }
}

refs.form.addEventListener('input', () => {
  formData.email = refs.input.value.trim();
  formData.message = refs.textArea.value.trim();

  localStorage.setItem(localeStorageKey, JSON.stringify(formData));
});

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  const email = refs.input.value.trim();
  const message = refs.textArea.value.trim();

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  const submittedData = { email, message };

  console.log(submittedData);

  localStorage.removeItem(localeStorageKey);
  refs.form.reset();
});

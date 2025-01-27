'use strict';

const refs = {
  form: document.querySelector('.feedback-form'),
  labels: document.querySelectorAll('label'),
  input: document.querySelector('input'),
  textArea: document.querySelector('textarea'),
  button: document.querySelector('button'),
};

refs.labels.forEach(label => label.classList.add('form-label'));
refs.input.classList.add('form-input');
refs.textArea.classList.add('form-textArea');
refs.button.classList.add('button');

const formData = {
  email: '',
  message: '',
};

'use strict';

const form = document.querySelector('.feedback-form');
const labels = document.querySelectorAll('label');
const input = document.querySelector('input');
const textArea = document.querySelector('textarea');
const button = document.querySelector('button');

labels.forEach(label => label.classList.add('form-label'));
input.classList.add('form-input');
textArea.classList.add('form-textArea');
button.classList.add('button');

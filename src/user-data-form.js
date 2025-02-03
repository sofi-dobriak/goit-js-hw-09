const STORAGE_KEY = 'form-storage-key';
const USER_LIST_KEY = 'user-list-key';

let userDataArray = [];

const refs = {
  userForm: document.querySelector('.form'),
  container: document.querySelector('.user-main-container'),
};

refs.userForm.addEventListener('input', e => {
  const userData = {
    firstName: e.currentTarget.elements['first-name'].value,
    lastName: e.currentTarget.elements['last-name'].value,
    email: e.currentTarget.elements.email.value,
    phone: e.currentTarget.elements.phone.value,
  };

  saveToLS(STORAGE_KEY, userData);
});

function initPage() {
  const userFormData = loadFromLS(STORAGE_KEY) || {};

  refs.userForm.elements['first-name'].value = userFormData?.firstName || '';
  refs.userForm.elements['last-name'].value = userFormData?.lastName || '';
  refs.userForm.elements.email.value = userFormData?.email || '';
  refs.userForm.elements.phone.value = userFormData?.phone || '';

  userDataArray = loadFromLS(USER_LIST_KEY) || [];
  refs.container.innerHTML = cardsTemplate(userDataArray);
}

initPage();

refs.userForm.addEventListener('submit', e => {
  e.preventDefault();

  const firstName = e.currentTarget.elements['first-name'].value.trim();
  const lastName = e.currentTarget.elements['last-name'].value.trim();
  const email = e.currentTarget.elements.email.value.trim();
  const phone = e.currentTarget.elements.phone.value.trim();

  if (!firstName || !lastName || !email || !phone) {
    alert('Please, fill all inputs');
    return;
  }

  const userDataObject = { firstName, lastName, email, phone };
  userDataArray.push(userDataObject);

  refs.container.innerHTML = cardsTemplate(userDataArray);
  saveToLS(USER_LIST_KEY, userDataArray);

  refs.userForm.reset();
  localStorage.removeItem(STORAGE_KEY);
});

function saveToLS(key, value) {
  const JSONdata = JSON.stringify(value);
  localStorage.setItem(key, JSONdata);
}

function loadFromLS(key) {
  const data = localStorage.getItem(key);

  try {
    const dataParse = JSON.parse(data);
    return dataParse;
  } catch {
    return data;
  }
}

function cardTemplate({ firstName, lastName, email, phone }) {
  return `  <div class="user-container">
                <p class="first-name"><strong>First Name</strong>: ${firstName}</p>
                <p class="last-name"><strong>Last Name</strong>: ${lastName}</p>
                <p class="email"><strong>Email</strong>: ${email}</p>
                <p class="tel"><strong>Phone Number</strong>: +${phone}</p>
            </div>`;
}

function cardsTemplate(cards) {
  return cards.map(cardTemplate).join('');
}

// const userDataArrays = [
//   {
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'john.doe@example.com',
//     phone: '1234567890',
//   },
//   {
//     firstName: 'Jane',
//     lastName: 'Smith',
//     email: 'jane.smith@example.com',
//     phone: '1987654321',
//   },
//   {
//     firstName: 'Alice',
//     lastName: 'Brown',
//     email: 'alice.brown@example.com',
//     phone: '1122334455',
//   },
//   {
//     firstName: 'Bob',
//     lastName: 'Johnson',
//     email: 'bob.johnson@example.com',
//     phone: '1098765432',
//   },
//   {
//     firstName: 'Emma',
//     lastName: 'Brown',
//     email: 'emma.brown@example.com',
//     phone: '14165552345',
//   },
//   {
//     firstName: 'Michael',
//     lastName: 'Williams',
//     email: 'michael.williams@example.com',
//     phone: '15105553456',
//   },
//   {
//     firstName: 'Sophia',
//     lastName: 'Davis',
//     email: 'sophia.davis@example.com',
//     phone: '16175554567',
//   },
//   {
//     firstName: 'Daniel',
//     lastName: 'Miller',
//     email: 'daniel.miller@example.com',
//     phone: '17185555678',
//   },
//   {
//     firstName: 'Olivia',
//     lastName: 'Wilson',
//     email: 'olivia.wilson@example.com',
//     phone: '18195556789',
//   },
//   {
//     firstName: 'Liam',
//     lastName: 'Anderson',
//     email: 'liam.anderson@example.com',
//     phone: '19205557890',
//   },
//   {
//     firstName: 'Charlotte',
//     lastName: 'Thomas',
//     email: 'charlotte.thomas@example.com',
//     phone: '20215558901',
//   },
//   {
//     firstName: 'James',
//     lastName: 'Jackson',
//     email: 'james.jackson@example.com',
//     phone: '21225559012',
//   },
// ];

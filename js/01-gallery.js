import { galleryItems } from './gallery-items.js';

let activeModal = undefined;

//! function for created gallery
function createGallery() {
  const elemGallery = document.querySelector('.gallery');

  elemGallery.innerHTML = createElementsGallery(galleryItems).join(' ');
}

function createElementsGallery(galleryItems) {
  const result = [];
  galleryItems.forEach(element => {
    result.push(creareElementGalary(element));
  });

  return result;
}

function creareElementGalary({ preview, original, description } = {}) {
  return `
  <div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>
  `;
}

//! Add events
function addEvenOnGallery() {
  const elemGallery = document.querySelector('.gallery');
  elemGallery.addEventListener('click', onImageClick);
}

//! BasicLightbox
function connectBasicLightbox() {
  //Це можна було запхатив index.html, але хотілося попрактикуватися із ручним додаванням
  addCssBasicLightbox();
  addScriptBasicLightbox();
}

function addScriptBasicLightbox() {
  // <script
  //   src="https://cdnjs.cloudflare.com/ajax/libs/basicLightbox/5.0.4/basicLightbox.min.js"
  //   integrity="sha512-ycqisnM5/8n5gDxYe0MTYoW+5DDuupgGdbdsJ9zcu66ZszaKh4JGsmjzyi7jJY4AjynXc43DOba/m+yVGmv+wQ=="
  //   crossorigin="anonymous"
  //   referrerpolicy="no-referrer"
  // ></script>;

  const newScript = document.createElement('script');
  newScript.src =
    'https://cdnjs.cloudflare.com/ajax/libs/basicLightbox/5.0.4/basicLightbox.min.js';
  newScript.integrity =
    'sha512-ycqisnM5/8n5gDxYe0MTYoW+5DDuupgGdbdsJ9zcu66ZszaKh4JGsmjzyi7jJY4AjynXc43DOba/m+yVGmv+wQ==';
  newScript.crossOrigin = 'anonymous';
  newScript.referrerPolicy = 'no-referrer';

  document.body.append(newScript);
}

function addCssBasicLightbox() {
  // <link
  //   rel="stylesheet"
  //   href="https://cdnjs.cloudflare.com/ajax/libs/basicLightbox/5.0.4/basicLightbox.min.css"
  //   integrity="sha512-yNvWz1C0Io3RxC18Hrqh/V+bFUlqSt3aVAtTF7xggTqr9JnV2ZQOGrd4gyaErdDgDOFK5nb/HQL1Q/j7ehmOow=="
  //   crossorigin="anonymous"
  //   referrerpolicy="no-referrer"
  // />;

  const newLink = document.createElement('link');

  newLink.rel = 'stylesheet';
  newLink.href =
    'https://cdnjs.cloudflare.com/ajax/libs/basicLightbox/5.0.4/basicLightbox.min.css';
  newLink.integrity =
    'sha512-yNvWz1C0Io3RxC18Hrqh/V+bFUlqSt3aVAtTF7xggTqr9JnV2ZQOGrd4gyaErdDgDOFK5nb/HQL1Q/j7ehmOow==';
  newLink.crossOrigin = 'anonymous';
  newLink.referrerPolicy = 'no-referrer';

  document.head.append(newLink);
}

//! Event Handlers
function onImageClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  //* Відключаю дію кліка по посиланню
  event.preventDefault();

  activeModal = basicLightbox.create(
    `
    <img src="${event.target.dataset.source}" width="800" height="600">`,
    { onShow: addOnModalKeydown, onClose: removeOnModalKeydown },
  );

  activeModal.show();
}

function onModalKeydown(even) {
  if (even.code === 'Escape') {
    activeModal.close();
  }
}

function addOnModalKeydown() {
  document.addEventListener('keydown', onModalKeydown);
}

function removeOnModalKeydown() {
  document.removeEventListener('keydown', onModalKeydown);
}

//! Inicialization script
function initializationActions() {
  //* 1. Створення і рендер розмітки
  createGallery();

  //* 2. Реалізація делегування на div.gallery
  addEvenOnGallery();

  //* 3. Підключення скрипту і стилів бібліотеки модального вікна basicLightbox.
  connectBasicLightbox();
}

//! Start Script
initializationActions();

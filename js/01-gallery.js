import { galleryItems } from './gallery-items.js';

let activeModal = undefined;

//! function for created gallery
function createGallery() {
  const elemGallery = document.querySelector('.gallery');

  const arrayNewElem = createElementsGallery(galleryItems);

  elemGallery.append(...arrayNewElem);
}

function createElementsGallery(galleryItems) {
  const result = [];
  galleryItems.forEach(element => {
    result.push(creareElementGalary(element));
  });

  return result;
}

function creareElementGalary({ preview, original, description } = {}) {
  // <div class="gallery__item">
  //   <a class="gallery__link" href="large-image.jpg">
  //     <img
  //       class="gallery__image"
  //       src="small-image.jpg"
  //       data-source="large-image.jpg"
  //       alt="Image description"
  //     />
  //   </a>
  // </div>;

  const newElemDiv = document.createElement('div');
  const newElemA = document.createElement('a');
  const newElemImg = document.createElement('img');

  newElemDiv.classList.add('gallery__item');

  newElemA.classList.add('gallery__link');
  newElemA.href = original;
  // newElemA.style.pointerEvents = 'none';

  newElemImg.classList.add('gallery__image');
  newElemImg.src = preview;
  newElemImg.dataset.source = original;
  newElemImg.alt = description;

  newElemA.append(newElemImg);
  newElemDiv.append(newElemA);

  return newElemDiv;
}

//! Add events
function addEvenOnGallery() {
  const elemGallery = document.querySelector('.gallery');
  elemGallery.addEventListener('click', onImageClick);
}

function addEventOnGalleryLink() {
  const elementsGalleryLink = document.querySelectorAll('.gallery__link');

  elementsGalleryLink.forEach(elem =>
    elem.addEventListener('click', onLinkClick),
  );
}

//! BasicLightbox
function connectBasicLightbox() {
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

  activeModal = basicLightbox.create(
    `
    <img src="${event.target.dataset.source}" width="800" height="600">`,
    { onClose: removeOnModalKeydown },
  );

  document.addEventListener('keydown', onModalKeydown);

  activeModal.show();
}

function onLinkClick(event) {
  event.preventDefault();
}

function onModalKeydown(even) {
  if (even.code === 'Escape') {
    removeOnModalKeydown();
    activeModal.close();
  }
}

function removeOnModalKeydown() {
  document.removeEventListener('keydown', onModalKeydown);
}

//! Inicialization script
function initializationActions() {
  //* 1. Створення і рендер розмітки
  const elemGallery = createGallery();

  //* 2. Реалізація делегування на div.gallery
  addEvenOnGallery();

  //* 3. Відключаю дію кліка по посиланню
  addEventOnGalleryLink();

  //* 4. Підключення скрипту і стилів бібліотеки модального вікна basicLightbox.
  connectBasicLightbox();
}

//! Start Script
initializationActions();

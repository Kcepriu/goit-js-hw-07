import { galleryItems } from './gallery-items.js';

let gallery;

//! function for created gallery
function createGallery() {
  const elemGallery = document.querySelector('.gallery');

  const arrayNewElem = createElementsGallery(galleryItems);

  elemGallery.append(...arrayNewElem);

  return elemGallery;
}

function createElementsGallery(galleryItems) {
  const result = [];

  galleryItems.forEach(element => {
    result.push(creareElementGalary(element));
  });

  return result;
}

function creareElementGalary({ preview, original, description } = {}) {
  // <a class="gallery__item" href="large-image.jpg">
  //   <img class="gallery__image" src="small-image.jpg" alt="Image description" />
  // </a>;

  const newElemLi = document.createElement('li');
  const newElemA = document.createElement('a');
  const newElemImg = document.createElement('img');

  newElemA.classList.add('gallery__item');
  newElemA.href = original;
  // newElemA.style.pointerEvents = 'none';

  newElemImg.classList.add('gallery__image');
  newElemImg.src = preview;
  newElemImg.alt = description;

  newElemA.append(newElemImg);
  newElemLi.append(newElemA);

  return newElemLi;
}

//! Add events
function addEvenOnGallery() {
  const elemGallery = document.querySelector('.gallery');
  elemGallery.addEventListener('click', onImageClick);
}

function addEventOnGalleryLink() {
  const elementsGalleryLink = document.querySelectorAll('.gallery__item');

  elementsGalleryLink.forEach(elem =>
    elem.addEventListener('click', onLinkClick),
  );
}

//! Event Handlers
function onImageClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  gallery.open(event.target.parentNode);
}

function onLinkClick(event) {
  event.preventDefault();
}

//! gallery
function connectSimpleLightbox() {
  gallery = new SimpleLightbox('.gallery .gallery__item', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

//! Inicialization script
function initializationActions() {
  //* 1. Створення і рендер розмітки на підставі
  createGallery();

  //* 2. Реалізація делегування на div.gallery
  addEvenOnGallery();

  //* 3. Відключаю дію кліка по посиланню
  addEventOnGalleryLink();

  //* 4. Підключаю галерею
  connectSimpleLightbox();
}

//! Start Script
initializationActions();

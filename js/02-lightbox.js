import { galleryItems } from './gallery-items.js';

let gallery;

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
    <a class="gallery__item" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
    `;
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

  //* 2. Підключаю галерею
  connectSimpleLightbox();
}

//! Start Script
initializationActions();

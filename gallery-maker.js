import galleryItems from "./gallery-items.js";

const refs = {
  galleryList: document.querySelector('.gallery'),
  modalIsOpen: document.querySelector('.lightbox'),
  originalImageAttr: document.querySelector('.lightbox__image'),
  modalIsClose: document.querySelector('button[data-action="close-lightbox"]'),
  modalOverlay: document.querySelector('.lightbox__overlay'),
  currentImage: document.querySelector('.lightbox__image'),
}

const createGalleryItem = ({ preview, original, description }) => {
  return `<li class="gallery__item"><a class="gallery__link" href="${original}">
  <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
    </a>
</li>`
}

const markup = galleryItems.map(createGalleryItem).join('');
refs.galleryList.insertAdjacentHTML("beforeend", markup);

refs.galleryList.addEventListener('click', getOriginalImageUrl);

function getOriginalImageUrl(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  openModal();

  const currentImgUrl = evt.target.dataset.source;
  const currentImgAlt = evt.target.alt;

  addCurrentImageAttr(currentImgUrl, currentImgAlt);


  const imagesListLink = galleryItems.map(item => item.original);
  const imagesListDescription = galleryItems.map(item => item.description);
  let currentIdx = imagesListLink.indexOf(currentImgUrl);
  
  window.addEventListener('keydown', turnaboutImg);

  function turnaboutImg(evt) {

    if (evt.code === 'ArrowRight') {
      if (currentIdx >= galleryItems.length - 1) {
        return;
      }
        currentIdx += 1;
        refs.currentImage.src = imagesListLink[currentIdx];
        refs.currentImage.alt = imagesListDescription[currentIdx];
    }

    if (evt.code === 'ArrowLeft') {
      if (currentIdx <= 0) {
        return;
      }
        currentIdx -= 1;
        refs.currentImage.src = imagesListLink[currentIdx];
        refs.currentImage.alt = imagesListDescription[currentIdx];
    }
  }
}


function openModal() {
  refs.modalIsOpen.classList.add('is-open');
}


function addCurrentImageAttr (url, alt){
  refs.originalImageAttr.src = `${url}`;
  refs.originalImageAttr.alt = `${alt}`;
}


refs.modalIsClose.addEventListener('click', closeModal);

refs.modalOverlay.addEventListener('click', closeModal);

function closeModal() {
  refs.modalIsOpen.classList.remove('is-open');
  clearImageSrc();
}

window.addEventListener('keydown', onEscPress);

function onEscPress(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}

function clearImageSrc() {
  refs.originalImageAttr.src = '';
  refs. originalImageAttr.alt = '';
}

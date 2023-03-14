import { isEnter } from './utils.js';
import { renderThumbnails } from './render-thumbnails.js';
import { showPictureWindow } from './render-picture.js';

const picturesNode = document.querySelector('.pictures');
let thumbnails = [];

const initGalery = (data) => {
  thumbnails = data;
};

const onThumbnailClick = (evt) => {
  if (evt.target.matches('.picture__img')) {
    const id = evt.target.dataset.id - 1;
    showPictureWindow(thumbnails[id]);
  }
};

const onThumbnailKeyDown = (evt) => {
  if (evt.target.matches('.picture') && isEnter(evt)) {
    const id = evt.target.querySelector('.picture__img').dataset.id - 1;
    showPictureWindow(thumbnails[id]);
  }
};

const showGallery = () => {
  renderThumbnails(thumbnails);
  picturesNode.addEventListener('click', onThumbnailClick);
  picturesNode.addEventListener('keydown', onThumbnailKeyDown);
};

export { initGalery, showGallery };

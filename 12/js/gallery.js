import { isEnter } from './utils.js';
import { renderThumbnails } from './render-thumbnails.js';
import { showPictureWindow } from './render-picture.js';
import { FilterTypes, FILTER_RANDOM_MAX } from './setup.js';

const picturesNode = document.querySelector('.pictures');
let thumbnails = [];

const initGalery = (data) => {
  thumbnails = data;
};

const onThumbnailClick = (evt) => {
  if (evt.target.matches('.picture__img')) {
    evt.preventDefault();
    const id = evt.target.dataset.id;
    showPictureWindow(thumbnails[id]);
  }
};

const onThumbnailKeyDown = (evt) => {
  if (evt.target.matches('.picture') && isEnter(evt)) {
    const id = evt.target.querySelector('.picture__img').dataset.id;
    showPictureWindow(thumbnails[id]);
  }
};

const getPreparedThumbnails = (filterType) => {
  let preparedThumbnails;
  switch (filterType) {
    case FilterTypes.DISCASSED : preparedThumbnails = thumbnails
      .slice()
      .sort((a, b) => b.comments.length - a.comments.length);
      break;
    case FilterTypes.RANDOM : preparedThumbnails = thumbnails
      .slice()
      .sort(() => .5 - Math.random())
      .slice(0, FILTER_RANDOM_MAX);
      break;
    default: preparedThumbnails = thumbnails;
  }
  return preparedThumbnails;
};

const showGallery = (filterType = FilterTypes.DEFAULT) => {
  renderThumbnails(getPreparedThumbnails(filterType));
  picturesNode.addEventListener('click', onThumbnailClick);
  picturesNode.addEventListener('keydown', onThumbnailKeyDown);
};

export { initGalery, showGallery };

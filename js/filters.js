import { showGallery } from './gallery.js';
import { debounce } from './utils.js';

const filtersNode = document.querySelector('.img-filters');
const filters = document.querySelector('.img-filters__form');
const showGalleryDebaunced = debounce(showGallery);

const onFilterClick = (evt) => {
  if (evt.target.matches('.img-filters__button')) {
    const buttons = filtersNode.querySelectorAll('button');
    const button = filters.querySelector(`#${evt.target.id}`);

    showGalleryDebaunced(evt.target.id);
    buttons.forEach((element) => element.classList.remove('img-filters__button--active'));
    button.classList.add('img-filters__button--active');
  }
};

const showFilters = () => {
  filtersNode.classList.remove('img-filters--inactive');
  filtersNode.addEventListener('click', onFilterClick);
};

export { showFilters };

import { getPhotos } from './api.js';
import { initGalery, showGallery } from './gallery.js';
import { showAlert } from './dialogs.js';
import { showFilters } from './filters.js';

getPhotos()
  .then((photos) => {
    initGalery(photos);
    showGallery();
    showFilters();
  })
  .catch((err) => {
    showAlert(err.message);
  });

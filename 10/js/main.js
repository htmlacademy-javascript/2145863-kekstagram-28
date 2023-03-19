import { getPhotos } from './api.js';
import { initGalery, showGallery } from './gallery.js';
import { showAlert } from './dialogs.js';

getPhotos()
  .then((photos) => {
    initGalery(photos);
    showGallery();
  })
  .catch((err) => {
    showAlert(err.message);
  });

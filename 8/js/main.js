import { PHOTOS_AMOUNT } from './setup.js';
import { mockPhotos } from './data.js';
import { initGalery, showGallery } from './gallery.js';

initGalery(mockPhotos(PHOTOS_AMOUNT));
showGallery();

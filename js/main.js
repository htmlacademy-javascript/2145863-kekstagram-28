import {PHOTOS_AMOUNT} from './setup.js';
import {mockPhotos} from './data.js';
import {renderThumbnails} from './render-thumbnails.js';

const thumbnails = mockPhotos(PHOTOS_AMOUNT);
renderThumbnails(thumbnails);

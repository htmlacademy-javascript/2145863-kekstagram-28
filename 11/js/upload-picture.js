import { isEscape, isHidden } from './utils.js';
import { showSuccess, showError } from './dialogs.js';
import { Scale, SLIDER_SETUP, FILTERS, SubmitButtonText, FILE_TYPES } from './setup.js';
import { initPristine, resetValidation, isUploadValid } from './upload-picture-validation.js';
import { sendPhotos } from './api.js';

const form = document.querySelector('.img-upload__form');
const uploadWindow = form.querySelector('.img-upload__overlay');
const uploadCloseButton = form.querySelector('.img-upload__cancel');
const uploadField = form.querySelector('#upload-file');
const previewNode = form.querySelector('.img-upload__preview>img');

const smallerControl = form.querySelector('.scale__control--smaller');
const biggeerControl = form.querySelector('.scale__control--bigger');
const scaleControl = form.querySelector('.scale__control--value');
const effectLevelControl = form.querySelector('.effect-level__value');
const rangeSlider = form.querySelector('.effect-level__slider');
const effectsListNode = form.querySelector('.effects__list');

let scale;
let filter;
let isSending;

const onCloseButtonClick = () => {
  closeUploadWindow();
};

const onCloseButtonKeydown = (evt) => {
  const errorModal = document.querySelector('section.error');
  if (isEscape(evt) &&
      !evt.target.matches('.text__hashtags') &&
      !evt.target.matches('.text__description') &&
      !errorModal) {
    closeUploadWindow();
    uploadCloseButton.removeEventListener('keydown', onCloseButtonKeydown);
  }
};

const onUploadFieldChange = () => {
  openUploadWindow();
};

const renderScale = () => {
  scaleControl.value = `${ scale }%`;
  previewNode.style.transform = `scale(${ scale / 100 })`;
};

const scaleControlClick = (evt) => {
  let step = Scale.STEP;
  step = evt.target.classList.contains('scale__control--bigger')
    ? step : -step;
  if (scale + step < Scale.MIN || Scale.MAX < scale + step) {
    return;
  }
  scale += step;
  renderScale();
};

const onSmallerScaleControlClick = (evt) => {
  scaleControlClick(evt);
};

const onBiggerScaleControlClick = (evt) => {
  scaleControlClick(evt);
};

const setEffect = (effect) => {
  if (!previewNode.classList.contains(`effects__preview--${ effect }`)) {
    previewNode.classList.remove(...previewNode.classList);
    previewNode.classList.add(`effects__preview--${ effect }`);
    filter = (FILTERS[effect]);
    rangeSlider.noUiSlider.updateOptions({
      range: {min: filter.min, max: filter.max},
      start: filter.init,
      step: filter.step,
    });
  }
  const sliderNode = form.querySelector('.img-upload__effect-level');
  if (effect === 'none' && !isHidden(sliderNode)) {
    sliderNode.classList.add('hidden');
  }
  if (effect !== 'none' && isHidden(sliderNode)) {
    sliderNode.classList.remove('hidden');
  }
};

const onEffectClick = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    const effect = evt.target.id.replace('effect-', '');
    setEffect(effect);
  }
};

const onOpenUploadWindowSuccessevent = () => {
  closeUploadWindow();
};

const removeUploadWindowHandlers = () => {
  effectsListNode.removeEventListener('click', onEffectClick);
  uploadCloseButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onCloseButtonKeydown);
  smallerControl.removeEventListener('click', onSmallerScaleControlClick);
  biggeerControl.removeEventListener('click', onBiggerScaleControlClick);
  rangeSlider.noUiSlider?.destroy();
  uploadWindow.addEventListener('success-event', onOpenUploadWindowSuccessevent);
};

function closeUploadWindow() {
  if (isSending) {
    return;
  }
  uploadWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  removeUploadWindowHandlers();
  form.reset();
  resetValidation();
}

const setFilter = () => {
  const value = rangeSlider.noUiSlider.get();
  const filterString = filter.name !== 'none'
    ? `${filter.name}(${ value + filter.unit })`
    : 'none';
  previewNode.style.filter = filterString;
  effectLevelControl.value = value;
};

const updatePreview = ()=> {
  const file = uploadField.files[0];
  const fileName = file.name.toLowerCase();
  const isValidExtention = FILE_TYPES.some((extention) => fileName.endsWith(extention));
  if (isValidExtention) {
    previewNode.src = URL.createObjectURL(file);
  }
};

const initUploadWindow = () => {
  noUiSlider.create(rangeSlider, SLIDER_SETUP);
  updatePreview();
  uploadWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');
  scale = Scale.INIT;
  renderScale();
  form.querySelector('#effect-none').checked = true;
  setEffect('none');
};

const setUploadWindowHandlers = () => {
  smallerControl.addEventListener('click', onSmallerScaleControlClick);
  biggeerControl.addEventListener('click', onBiggerScaleControlClick);
  effectsListNode.addEventListener('click', onEffectClick);
  uploadCloseButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onCloseButtonKeydown);
  rangeSlider.noUiSlider.on('update', setFilter);
  uploadWindow.addEventListener('success-event', onOpenUploadWindowSuccessevent);
};

function openUploadWindow() {
  initUploadWindow();
  setUploadWindowHandlers();
}

uploadField.addEventListener('change', onUploadFieldChange);
initPristine(form);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (isUploadValid()) {
    const formData = new FormData(form);
    const submitButton = uploadWindow.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = SubmitButtonText.SENDING;
    isSending = true;
    sendPhotos(formData)
      .then(() => {
        showSuccess();
      })
      .catch(() => {
        showError();
      })
      .finally(() => {
        submitButton.textContent = SubmitButtonText.IDLE;
        submitButton.disabled = false;
        isSending = false;
      });
  }
});

import { isEscape, isHidden } from './utils.js';
import { Scale, SLIDER_SETUP, FILTERS} from './setup.js';
import './upload-picture-validation.js';

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

const onCloseButtonClick = () => {
  closeUploadEditWindow();
};

const onCloseButtonKeydown = (evt) => {
  if (isEscape(evt)) {
    closeUploadEditWindow();
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

const onScaleControlClick = (evt) => {
  let step = Scale.STEP;
  step = evt.target.classList.contains('scale__control--bigger')
    ? step : -step;
  if (scale + step < Scale.MIN || Scale.MAX < scale + step) {
    return;
  }
  scale += step;
  renderScale();
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

const removeUploadEditWindowHandlers = () => {
  effectsListNode.removeEventListener('click', onEffectClick);
  uploadCloseButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onCloseButtonKeydown);
  smallerControl.removeEventListener('click', onScaleControlClick);
  biggeerControl.removeEventListener('click', onScaleControlClick);
  rangeSlider.noUiSlider.destroy();
};

function closeUploadEditWindow() {
  uploadWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadField.value = '';

  removeUploadEditWindowHandlers();
}

const setFilter = () => {
  const value = rangeSlider.noUiSlider.get();
  const filterString = filter.name !== 'none'
    ? `${filter.name}(${ value + filter.unit })`
    : 'none';
  previewNode.style.filter = filterString;
  effectLevelControl.value = value;
};

const initUploadWindow = () => {
  noUiSlider.create(rangeSlider, SLIDER_SETUP);
  uploadWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');
  scale = Scale.INIT;
  renderScale();
  form.querySelector('#effect-none').checked = true;
  setEffect('none');
};

const setUploadWindowHandlers = () => {
  smallerControl.addEventListener('click', onScaleControlClick);
  biggeerControl.addEventListener('click', onScaleControlClick);
  effectsListNode.addEventListener('click', onEffectClick);
  uploadCloseButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onCloseButtonKeydown);
  rangeSlider.noUiSlider.on('update', setFilter);
};

function openUploadWindow() {
  initUploadWindow();
  setUploadWindowHandlers();
}

uploadField.addEventListener('change', onUploadFieldChange);

const PHOTOS_AMOUNT = 25; // количество моковых объектов фотографий
const COMMENTS_AMOUNT = 5; // количетво подгружаемых за один раз комментариев
const COMMENTS_MAX = 17; // максимальное количество генерируемых коментариев
const HASHTAGS_MAX = 5; // максимальное количество хештегов
const HASHTAG_MAX_LENGTH = 20; // максимальная длина хеш-тега
const FILTER_RANDOM_MAX = 10; // максимальное количество в фильтре случайных изображений
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю ...'
};

const Rest = {
  BASE_URL: 'https://28.javascript.pages.academy/kekstagram',
  GET_URL: '/data',
  POST_URL: '/',
  Method : {
    GET: 'GET',
    POST: 'POST',
  },
};

const Likes = {
  MIN: 15,
  MAX: 200,
};

const Avatar = {
  MIN: 1,
  MAX: 6,
};

const Message = {
  MIN: 1,
  MAX: 2,
};

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  INIT: 100,
};

const SLIDER_SETUP = {
  range: {min: 0, max: 0},
  start: 0, connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      } else {
        return value.toFixed(1);
      }
    },
    from: (value) => parseFloat(value),
  },
  tooltips: true,
};

const FILTERS = {
  none:   { name: 'none', min: 0, max: 0, step: 0, init: 0, unit: ''},
  chrome: { name: 'grayscale', min: 0, max: 1, step: 0.1, init: 1, unit: ''},
  sepia:  { name: 'sepia', min: 0, max: 1, step: 0.1, init: 1, unit: ''},
  marvin: { name: 'invert', min: 0, max: 100, step: 1, init: 100, unit: '%'},
  phobos: { name: 'blur', min: 0, max: 3, step: 0.1, init: 3, unit: 'px'},
  heat:   { name: 'brightness', min: 1, max: 3, step: 0.1, init: 3, unit: ''},
};

const FilterTypes = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCASSED: 'filter-discussed',
};

export {
  PHOTOS_AMOUNT, COMMENTS_AMOUNT, COMMENTS_MAX, HASHTAGS_MAX, HASHTAG_MAX_LENGTH,
  Likes, Avatar, Message, Scale, Rest, SubmitButtonText,
  SLIDER_SETUP, FILTERS, FilterTypes, FILTER_RANDOM_MAX, FILE_TYPES
};

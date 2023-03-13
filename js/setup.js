const PHOTOS_AMOUNT = 25; // количество моковых объектов фотографий
const COMMENTS_AMOUNT = 5; // количетво подгружаемых за один раз комментариев
const COMMENTS_MAX = 17; // максимальное количество генерируемых коментариев

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

export {
  PHOTOS_AMOUNT, COMMENTS_AMOUNT, COMMENTS_MAX,
  Likes, Avatar, Message, Scale,
  SLIDER_SETUP, FILTERS
};

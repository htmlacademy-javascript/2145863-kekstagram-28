import { HASHTAGS_MAX } from './setup.js';

let pristine;

const isEmpty = (str) => str.trim().length === 0;
const getHashtagsArray = (str) => str.trim().split(/\s+/);

// проверка хештегов на начальный #
const validateHashtagsSharp = (value) => {
  const hashtags = getHashtagsArray(value);
  if (isEmpty(value)) {
    return true;
  }
  for (const hash of hashtags) {
    if (hash.match(/^#/) === null) {
      return false;
    }
  }
  return true;
};

// проверка только на пустой хештег
const validateOnlyHashtagsSharp = (value) => {
  if (isEmpty(value)) {
    return true;
  }
  const hashtags = getHashtagsArray(value);
  if (hashtags.includes('#')) {
    return false;
  }
  return true;
};

// проверка хештегов на вилидные символы
const validateChars = (value) => {
  const hashtags = getHashtagsArray(value);
  if (isEmpty(value)) {
    return true;
  }
  for (const hash of hashtags) {
    if (1 < hash.length) {
      const validChars = hash.match(/^.[a-zа-я0-9]{1,19}/i);
      if (validChars === null || hash.trim() === '#') {
        return false;
      } else if (validChars.join('') !== hash || hash.length > 20) {
        return false;
      }
    }
  }
  return true;
};

// проверка хештегов на максимальное количество
const validateHastagsAmount = (value) => {
  const hashtags = getHashtagsArray(value);
  if (isEmpty(value)) {
    return true;
  }
  if (hashtags.length > HASHTAGS_MAX) {
    return false;
  }
  return true;
};

// Проверка хештегов над дублирование
const validateDubles = (value) => {
  const hashtags = getHashtagsArray(value);
  if (isEmpty(value)) {
    return true;
  }
  const hashtagsSet = new Set(hashtags.map((hashtag) => hashtag.toUpperCase()));
  if (hashtagsSet.size !== hashtags.length) {
    return false;
  }
  return true;
};

const initPristine = (form) => {
  pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
  });

  const hashtagsNode = form.querySelector('.text__hashtags');

  pristine.addValidator(hashtagsNode, validateHashtagsSharp,
    'Хеш тег должен начинаться символом #'
  );
  pristine.addValidator(hashtagsNode, validateOnlyHashtagsSharp,
    'Хеш тег не должен содержать только символ #'
  );
  pristine.addValidator(hashtagsNode, validateChars,
    'Хештег должен содержать только буквы и цифры (не более 20)'
  );
  pristine.addValidator(hashtagsNode, validateHastagsAmount,
    'Допускается не более 5 хештегов'
  );
  pristine.addValidator(hashtagsNode, validateDubles,
    'Хештеги не должны дублироваться (без учета регистра)'
  );
};

const resetValidation = () => {
  pristine.reset();
};

const validateUpload = () => pristine.validate();

export { initPristine, validateUpload, resetValidation };

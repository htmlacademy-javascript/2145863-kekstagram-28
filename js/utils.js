// получение случайного числа из диапазона
const getRandomInRange = (min, max) => {
  min = Math.abs(min);
  max = Math.abs(max);
  [min, max] = [Math.ceil(Math.min(min, max)), Math.floor(Math.max(min, max))];
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// генератор счетчиков от единицы
const getCounterGenerator = () => {
  let counter = 0;
  return () =>
    ++counter;
};

// генератор неповторяющего числа из дипазона 1 max
const getUniqueRandomGenerator = (max) => {
  const hasGenerated = new Set();
  return () => {
    while (hasGenerated.size <= max) {
      const id = getRandomInRange(1, max);
      if (!hasGenerated.has(id)) {
        hasGenerated.add(id);
        return id;
      }
    }
  };
};

// получить случайных элемент из массива
const getRandomElement = (elements) =>
  elements[getRandomInRange(0, elements.length - 1)];

const isValidLenght = (str, maxLength) =>
  str.length <= maxLength;

const isPalindrome = (str) => {
  str = str.replace(/\s+/g,'').toLowerCase();
  const len = str.length;
  for (let i = 0; i < len / 2 ; i++) {
    if (str[i] !== str[len - i - 1]) {
      return false;
    }
  }
  return true;
};

const extractNumber = (str) => {
  let result = String(str).replace(/\D+/g, '');
  result = (result.length) ? Number(result) : NaN;
  return result;
};

const makePadStart = (str, minLength, pad) => {
  const extraLength = minLength - str.length;
  if (extraLength > 0) {
    str = pad.slice(0, extraLength % pad.length) + pad.repeat(extraLength / pad.length) + str;
  }
  return str;
};

const isEscape = (evt) => evt.key === 'Escape';

export {
  isValidLenght, isPalindrome, extractNumber, makePadStart,
  getRandomInRange, getCounterGenerator, getUniqueRandomGenerator, getRandomElement,
  isEscape
};

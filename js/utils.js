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

const isEscape = (evt) => evt.key === 'Escape';
const isEnter = (evt) => evt.key === 'Enter';

export {
  getRandomInRange, getCounterGenerator, getUniqueRandomGenerator, getRandomElement,
  isEscape, isEnter
};

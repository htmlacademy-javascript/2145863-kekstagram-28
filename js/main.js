const NUMBER_OF_PHOTOS = 25; // Количество моковых объектов фотографий

const PHOTO_DESC = [
  'Спаситель мира,',
  'Алжирские женщины',
  'Лежащая обнажённа',
  'Три наброска к портрету Люсьена Фрейда',
  'Крик',
  'Молодая девушка с цветочной корзиной',
  'Стога',
  'Обнажённая, зелёные листья и бюст',
  'Серебряная автокатастрофа',
  'Мальчик с трубкой',
  'Дора Маар с кошкой',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Keks',
  'Varvara',
  'Barsik',
  'Murka',
  'Bantik',
  'Gosha',
  'Boolochka',
  'Tom'
];

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

const photoIdCounter = getCounterGenerator();
const commentIdCounter = getCounterGenerator();
const getUrlNumber = getUniqueRandomGenerator(NUMBER_OF_PHOTOS);

const generateComment = () =>
  ({
    id: commentIdCounter(),
    avatar: `img/avatar-${getRandomInRange(1, 6)}.svg`,
    message: getRandomElement(MESSAGES),
    name: getRandomElement(NAMES),
  });

const createPhoto = () =>
  ({
    id: photoIdCounter(),
    url: `photos/${getUrlNumber()}.jpg`,
    description: getRandomElement(PHOTO_DESC),
    likes: getRandomInRange(15, 200),
    comments: Array.from({length: getRandomInRange(0, MESSAGES.length)}, generateComment),
  });

// eslint-disable-next-line
const mockPhotos = Array.from({length: NUMBER_OF_PHOTOS}, createPhoto);

// console.log(mockPhotos);


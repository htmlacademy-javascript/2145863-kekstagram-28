import { PHOTOS_AMOUNT, Likes, Avatar, Message } from './setup.js';
import {
  getRandomInRange,
  getUniqueRandomGenerator,
  getRandomElement} from './utils.js';

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

const getUrlNumber = getUniqueRandomGenerator(PHOTOS_AMOUNT);

const generateComment = (_, index) =>
  ({
    id: ++index,
    avatar: `img/avatar-${getRandomInRange(Avatar.MIN, Avatar.MAX)}.svg`,
    message: Array
      .from({length: getRandomInRange(Message.MIN, Message.MAX)}, () => getRandomElement(MESSAGES))
      .join(' '),
    name: getRandomElement(NAMES),
  });

const generatePhoto = (_, index) =>
  ({
    id: ++index,
    url: `photos/${getUrlNumber()}.jpg`,
    description: getRandomElement(PHOTO_DESC),
    likes: getRandomInRange(Likes.MIN, Likes.MAX),
    comments: Array
      .from({length: getRandomInRange(0, MESSAGES.length)}, generateComment),
  });

const mockPhotos = (elements) => Array.from({length: elements}, generatePhoto);
export { mockPhotos };

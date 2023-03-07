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

export {
  PHOTOS_AMOUNT, COMMENTS_AMOUNT, COMMENTS_MAX,
  Likes, Avatar, Message
};

import { isEscape, formatCommetsAmount } from './utils.js';
import { COMMENTS_AMOUNT } from './setup.js';

const picture = document.querySelector('.big-picture');
const closeButton = picture.querySelector('.big-picture__cancel');

const commentsList = document.querySelector('.social__comments');
const commentsCounterNode = picture.querySelector('.social__comment-count');
const commentsLoader = picture.querySelector('.comments-loader');
const comments = {
  curentCounter: 0,
  data: [],
};

const createComment = ({avatar, name, message}) =>
  `<li class="social__comment">
    <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
    <p class="social__text">${message}</p>
    </li>
  `;

const showNextComments = () => {

  const nextCounter = (comments.curentCounter + COMMENTS_AMOUNT < comments.data.length)
    ? comments.curentCounter + COMMENTS_AMOUNT
    : comments.data.length;
  commentsList.innerHTML += comments.data
    .slice(comments.curentCounter, nextCounter)
    .map(createComment).join('');
  comments.curentCounter = nextCounter;

  if (comments.curentCounter >= comments.data.length) {
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', showNextComments);
  }

  const total = comments.data.length;
  commentsCounterNode.innerHTML =
    `${comments.curentCounter} из <span class="comments-count">${total}</span>
    ${formatCommetsAmount(total)}`;
};


const onCloseButtonClick = () => {
  closePictureWindow();
};

const onDocumentKeyDown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault(); // требуется для некоторых ОС
    closePictureWindow();
  }
};

function closePictureWindow() {
  picture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeyDown);
}

const showPictureWindow = ({url, description, likes, comments: commentsData}) => {
  const img = picture.querySelector('.big-picture__img img');
  comments.data = commentsData;
  comments.curentCounter = 0;

  img.src = url;
  img.alt = description;
  picture.querySelector('.social__caption').textContent = description;
  picture.querySelector('.likes-count').textContent = likes;

  commentsLoader.addEventListener('click', showNextComments);
  commentsLoader.classList.remove('hidden');
  commentsList.innerHTML = '';
  showNextComments();

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeyDown);

  document.body.classList.add('modal-open');
  picture.classList.remove('hidden');
};

export { showPictureWindow, closePictureWindow };

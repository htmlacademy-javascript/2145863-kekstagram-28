import { isEscape } from './utils.js';

const picture = document.querySelector('.big-picture');
const closeButton = picture.querySelector('.big-picture__cancel');

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

const showPictureWindow = ({url, description, likes, comments}) => {
  const commentsList = document.querySelector('.social__comments');
  const img = picture.querySelector('.big-picture__img img');

  img.src = url;
  img.alt = description;
  picture.querySelector('.social__caption').textContent = description;
  picture.querySelector('.likes-count').textContent = likes;
  picture.querySelector('.comments-count').textContent = `${comments.length} комментариев`;
  commentsList.innerHTML = comments.map(createComment).join('');

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeyDown);

  document.body.classList.add('modal-open');
  picture.classList.remove('hidden');
  picture.querySelector('.social__comment-count').classList.add('hidden');
  picture.querySelector('.comments-loader').classList.add('hidden');
};

export { showPictureWindow, closePictureWindow };

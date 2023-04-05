import './upload-picture.js';

const pictures = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const createThumbnail = ({id, url: src, comments, likes, description}) => {
  const pictureNode = document.createElement('a');
  pictureNode.href = '#';
  pictureNode.classList.add('picture');
  pictureNode.innerHTML = `
    <img class="picture__img" src="${src}" width="182" height="182" data-id="${id}" alt="${description}">
    <p class="picture__info">
      <span class="picture__comments">${comments.length}</span>
      <span class="picture__likes">${likes}</span>
    </p>
  `;

  return pictureNode;
};

const renderThumbnails = (thumbnails) => {

  const picturesToRemove = pictures.querySelectorAll('.picture');
  picturesToRemove.forEach((element) => element.remove());

  thumbnails.forEach((element) => {
    fragment.append(createThumbnail(element));
  });
  pictures.append(fragment);
};

export { renderThumbnails };

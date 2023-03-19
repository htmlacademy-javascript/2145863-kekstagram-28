import { Rest } from './setup.js';

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные.<br> Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму.<br> Попробуйте ещё раз',
};

const getPhotos = () =>
  fetch(`${Rest.BASE_URL}${Rest.GET_URL}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .catch((err) => {
      throw new Error(`(${err.message.trim()}) ${ErrorText.GET_DATA}`);
    });

const sendPhotos = (formData) =>
  fetch(
    `${Rest.BASE_URL}${Rest.POST_URL}`,
    {
      method: 'POST',
      body: formData,
    })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        throw new Error(ErrorText.SEND_DATA);
      }
    });

export { getPhotos, sendPhotos };

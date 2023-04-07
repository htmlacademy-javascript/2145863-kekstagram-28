import { Rest } from './setup.js';

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные.<br> Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму.<br> Попробуйте ещё раз',
};


const ioData = (route, errorText, method = Rest.Method.GET, body = null) =>
  fetch(Rest.BASE_URL + route, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(errorText);
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getPhotos = () => ioData(Rest.GET_URL, ErrorText.GET_DATA);

const sendPhotos = (formData) => ioData(Rest.POST_URL, ErrorText.POST_DATA, Rest.Method.POST, formData);

export { getPhotos, sendPhotos};


import { ALERT_SHOW_TIME } from './setup.js';
import { isEscape } from './utils.js';

const successEvent = new Event('success-event');
const upload = document.querySelector('.img-upload__overlay');
let successModal;
let errorModal;

const onSuccessButtonClick = () => {
  closeSuccess();
};

const onErrorButtonClick = () => {
  closeError();
};

const onSuccessKeydown = (evt) => {
  if (isEscape(evt)) {
    closeSuccess();
  }
};

const onErrorKeydown = (evt) => {
  if (isEscape(evt)) {
    closeError();
  }
};

const onSuccessModalClick = (evt) => {
  if (evt.target.matches('section.success')) {
    closeSuccess();
  }
};

const onErrorModalClick = (evt) => {
  if (evt.target.matches('section.error')) {
    closeError();
  }
};

function closeSuccess(){
  successModal.remove();
  document.removeEventListener('keydown', onSuccessKeydown);
  upload.dispatchEvent(successEvent);
}

function closeError(){
  errorModal.remove();
  document.removeEventListener('keydown', onErrorKeydown);
}

const showSuccess = () => {
  const successTempalate = document.querySelector('#success');
  document.body.append(successTempalate.content.cloneNode(true));
  successModal = document.querySelector('section.success');
  successModal.addEventListener('click', onSuccessModalClick);
  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onSuccessKeydown);
};

const showError = () => {
  const errorTempalate = document.querySelector('#error');
  document.body.append(errorTempalate.content.cloneNode(true));
  errorModal = document.querySelector('section.error');
  errorModal.addEventListener('click', onErrorModalClick);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onErrorKeydown);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '15px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'tomato';
  alertContainer.style.transition = 'opacity 1s';
  alertContainer.style.opacity = '0';
  alertContainer.style.textTransform = 'none';

  alertContainer.innerHTML = message;

  document.body.append(alertContainer);

  setTimeout(()=> {
    alertContainer.style.opacity = '1';
    setTimeout(()=> {
      alertContainer.style.opacity = '0';
      setTimeout(()=> {
        alertContainer.remove();
      }, 1000);
    }, ALERT_SHOW_TIME * 1000);
  }, 1);
};

export { showAlert, showSuccess, showError, successEvent };

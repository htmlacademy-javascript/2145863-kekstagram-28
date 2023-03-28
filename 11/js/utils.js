const DEBOUNCE_DELAY = 500;

const isEscape = (evt) => evt.key === 'Escape';
const isEnter = (evt) => evt.key === 'Enter';
const isHidden = (element) => element.classList.contains('hidden');

const formatCommetsAmount = (total) => {
  const res = (total % 10 === 1 && total % 100 !== 11) ? 'комментария' : 'комментариев';
  return res;
};

const debounce = (cb, delay = DEBOUNCE_DELAY) => {
  let timerId;
  return (...rest) => {
    clearTimeout(timerId);
    timerId = setTimeout(()=> cb.apply(this, rest), delay);
  };
};

export { isEscape, isEnter, isHidden, formatCommetsAmount, debounce };


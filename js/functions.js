const isValidLenght = (str, maxLength) =>
  str.length <= maxLength;

const isPalindrome = (str) => {
  str = str.replace(/\s+/g,'').toLowerCase();
  const len = str.length;
  for (let i = 0; i < len / 2 ; i++) {
    if (str[i] !== str[len - i - 1]) {
      return false;
    }
  }
  return true;
};

const extractNumber = (str) => {
  let result = String(str).replace(/\D+/g, '');
  result = (result.length) ? Number(result) : NaN;
  return result;
};

const makePadStart = (str, minLength, pad) => {
  const extraLength = minLength - str.length;
  if (extraLength > 0) {
    str = pad.slice(0, extraLength % pad.length) + pad.repeat(extraLength / pad.length) + str;
  }
  return str;
};

isValidLenght('проверяемая строка', 20);
isPalindrome('топот');
extractNumber('2023 год');
makePadStart('1', 2, '0');

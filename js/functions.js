// Проверяет сроку на допустимую длину
const isValidLenght = (str, maxLength) =>
  str.length <= maxLength;

// Проверяет стороку на палиндром
const isPalindrome = (str) => {
  str = str.replace(/\s+/g,'').toLowerCase();

  // * Легкочитаемый вариант:
  // return str === [...str].reverse().join('');

  // * Оптимальный (по скорости) вариант:
  const len = str.length;
  for (let i = 0; i < len / 2 ; i++) {
    if (str[i] !== str[len - i - 1]) {
      return false;
    }
  }
  return true;
};

// Извлекает из строки цифры и преобразует их в целое положительное число или NaN
const extractNumber = (str) => {
  // * Оптимальный вариант
  let result = String(str).replace(/\D+/g, '');

  /* - Вариант с циклами
  str = String(str).replaceAll(' ', '');

  let result = '';
  for (let i=0; i < str.length; i++) {
    if (Number.isInteger(Number(str[i]))) {
      result += (str[i]);
    }
  }
  */

  result = (result.length) ? Number(result) : NaN;

  return result;
};

// Набивка строки с начала с вырезанием остатка набивки
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


// console.log('* isValidLenght *');
// console.log(isValidLenght('проверяемая строка', 20));       // true
// console.log(isValidLenght('проверяемая строка', 18));       // true
// console.log(isValidLenght('проверяемая строка', 10));       // false

// console.log('* isPalindrome *');
// console.log(isPalindrome('топот'));                         // true
// console.log(isPalindrome('ДовОд'));                         // true
// console.log(isPalindrome('Кекс'));                          // false
// console.log(isPalindrome('Лёша на полке клопа нашёл '));    // true

// console.log('* extractNumber *');
// console.log(extractNumber('2023 год'));                     // 2023
// console.log(extractNumber('ECMAScript 2022'));              // 2022
// console.log(extractNumber('1 кефир, 0.5 батона'));          // 105
// console.log(extractNumber('агент 007'));                    // 7
// console.log(extractNumber('а я томат'));                    // NaN
// console.log(extractNumber(2023));                           // 2023
// console.log(extractNumber(-1));                             // 1
// console.log(extractNumber(1.5));                            // 15

// console.log('* makePadStart *');
// console.log(makePadStart('1', 2, '0'));                     // '01'
// console.log(makePadStart('1', 4, '0'));                     // '0001'
// console.log(makePadStart('q', 4, 'werty'));                 // 'werq'
// console.log(makePadStart('q', 4, 'we'));                    // 'wweq'
// console.log(makePadStart('qwerty', 4, '0'));                // 'qwerty'

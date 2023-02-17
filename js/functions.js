// Проверяет сроку на допустимую длину
const isValidLenght = (str, maxLength) =>
  str.length <= maxLength;

// Проверяет стороку на палиндром
const isPalindrome = (str) => {
  str = str
    .replaceAll(' ','')
    .toLowerCase();

  return str === str.split('').reverse().join('');
};

// Извлекает из строки цифры и преобразует их в целое положительное число или NaN
const extractNumbers = (str) => {
  const result = [];
  str = String(str).replaceAll(' ','');
  str = [...str];
  str.forEach((char) => {
    if (Number.isInteger(Number(char))) {
      result.push(char);
    }
  });

  return (result.length) ? parseInt(result.join(''), 10) : NaN;
};

// Кастомная набивка строки
const makePadStart = (str, minLength, pad) => {
  const paddingLength = minLength - str.length;
  let pattern = '';
  if (paddingLength > 0) {
    for (let i = 1; i <= paddingLength / pad.length; i++) {
      pattern += pad;
    }
    const remainder = paddingLength % pad.length;
    pattern = (remainder ? pad.slice(0, remainder) : '') + pattern;
    return pattern.slice(0, paddingLength) + str;
  }

  return str;
};

console.log('* isValidLenght *');
console.log(isValidLenght('проверяемая строка', 20));
console.log(isValidLenght('проверяемая строка', 18));
console.log(isValidLenght('проверяемая строка', 10));

console.log('* isPalindrome *');
console.log(isPalindrome('топот'));
console.log(isPalindrome('ДовОд'));
console.log(isPalindrome('Кекс'));
console.log(isPalindrome('Лёша на полке клопа нашёл '));

console.log('* extractNumbers *');
console.log(extractNumbers('2023 год'));
console.log(extractNumbers('ECMAScript 2022'));
console.log(extractNumbers('1 кефир, 0.5 батона'));
console.log(extractNumbers('а я томат'));
console.log(extractNumbers(2023));
console.log(extractNumbers(-1));
console.log(extractNumbers(1.5));

console.log('* makePadStart *');
console.log(makePadStart('1', 2, '0'));
console.log(makePadStart('1', 4, '0'));
console.log(makePadStart('q', 4, 'werty'));
console.log(makePadStart('q', 4, 'we'));
console.log(makePadStart('qwerty', 4, '0'));

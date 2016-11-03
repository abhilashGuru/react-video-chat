/**
 * Generate a random id, example: 1ag5-3ndh-358z-5jha
 *
 * @export
 * @returns
 */
export function generateId() {
  let groupLength = 4;
  let wordLength = 4;
  let result = '';
  let separator = '-';
  for (let groupIndex = 0; groupIndex < groupLength; groupIndex++) {
    for (let wordIndex = 0; wordIndex < wordLength; wordIndex++) {
      let isChar = Math.random() > 0.5;
      let char = null;

      if (isChar) {
        let charCode = randomNumberInRange(65, 90);
        char = String.fromCharCode(charCode);
      } else {
        char = Math.floor(Math.random() * 9).toString();
      }
      result += char;
    }
    if (groupIndex < groupLength - 1) {
      result += separator;
    }
  }
  return result;
}

function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Generate a random word, example: asdgggh, aswejdj, qoiglazk
 *
 * @export
 * @param {number} [length=6]
 * @returns
 */
export function generateRandomWord(length = 6) {
  let consonants = 'bcdfghjklmnprstvwz', // consonants except hard to speak ones
      vowels = 'aeiou', // vowels
      all = consonants + vowels, // all
      text = '',
      chr;

  for (let i = 0; i < length; i++) {
    if (i === 0) {
      chr = pickRandomChar(all);
    } else if (consonants.indexOf(chr) === -1) {
      chr = pickRandomChar(consonants);
    } else {
      chr = pickRandomChar(vowels);
    }
    text += chr;
  }

  return text;
}

/**
 * Pick a char from pool
 *
 * @param {any} pool
 * @returns
 */
function pickRandomChar(pool) {
  let charIndex = Math.floor(Math.random() * pool.length);
  return pool[charIndex];
}


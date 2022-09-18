/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) {
    return '';
  } 

  if (!size) {
    return string;
  }

  let result = '';
  let acc = 0;

  string.split('').map(i => {
    if (result.at(-1) === i && acc !== size) {
      acc++;
      result += i;
    } else if (result.at(-1) !== i) {
      acc = 1;
      result += i;
    }
  });

  return result;
}

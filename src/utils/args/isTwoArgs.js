/**
 * Returns 'true' if two elements start with '--' prefix
 * @param {string} first
 * @param {string} second
 * @returns {boolean}
 */
const isTwoArgs = (first, second) => {
  return first.startsWith('--') && second.startsWith('--') ? true : false;
};

export { isTwoArgs };

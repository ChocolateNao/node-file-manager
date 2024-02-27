/**
 * Returns 'true' if value is the last element in the given array
 * @param {any} value
 * @param {any[]} arr
 * @returns {boolean}
 */
const isLast = (value, arr) => {
  if (!value) return false;
  return value === arr[arr.length - 1] ? true : false;
}

export { isLast };

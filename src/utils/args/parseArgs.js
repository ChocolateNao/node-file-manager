import { isLast as isLastArg } from "./isLast.js";
import { isTwoArgs as isTwoInARowArgs } from "./isTwoArgs.js";

/**
 * Parse CLI arguments starting with "--" and return them in a form of an object with "key: value" pair
 * @param {Array<string>} argsArray An array of console arguments
 * @returns {Record<string, string | boolean>} An object that represents parsed arguments
 */
const parseArgs = (argsArray) => {
  return argsArray.reduce((acc, cur, index, arr) => {
    if (!cur.startsWith('--')) {
      return acc;
    }

    if (cur.includes('=')) {
      const argWithEqual = cur.split('=');
      acc[argWithEqual[0].slice(2)] = argWithEqual[1];
      return acc;
    }

    if (isLastArg(cur, arr) || isTwoInARowArgs(cur, arr[index+1])) {
      acc[cur.slice(2)] = true;
      return acc;
    }

    acc[cur.slice(2)] = arr[index+1];
    return acc;
  }, {});
}

export { parseArgs };

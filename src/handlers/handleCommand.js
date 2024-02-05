import { handleExit } from "./handleExit.js";
import { handleOs } from "./handleOs.js";
import { add, cat, cd, cp, ls, mv, rm, rn, up } from "../commands/filesystem.js";
import colors from "../utils/cliColors.js";
import { workingDir } from '../../index.js';
import { hash } from "../commands/hash.js";
import { compress, decompress } from "../commands/zip.js";

const navigationCmd = ['up', 'cd']

const handleWrongCommand = () => {
  console.error(colors.red('Invalid input'));
};

const handleOperationFail = (msg) => {
  console.error(msg ? colors.red(`Operation failed: ${msg.toString()}`) : colors.red('Operation failed'));
  return;
};

const cmdSwitcher = {
  'os': handleOs,
  'up': up,
  'cd': cd,
  'ls': ls,
  'cat': cat,
  'add': add,
  'rn': rn,
  'cp': cp,
  'mv': mv,
  'rm': rm,
  'hash': hash,
  'compress': compress,
  'decompress': decompress,
  '.exit': handleExit,
  'default': handleWrongCommand
};

/**
 * Invokes after each end of input
 */
const handleCommand = (input) => {
  if (input) {
    const inputArr = input.split(' ');
    const cmd = inputArr[0];
    let args = inputArr.length === 1 ? '' : inputArr.slice(1);
    (cmdSwitcher[cmd] || cmdSwitcher['default'])(args ?? null);

    if (!navigationCmd.includes(cmd)) {
      console.log(colors.lightCyan(`You are currently in ${workingDir}`));
    }
  }
};

export { handleCommand, handleWrongCommand, handleOperationFail };

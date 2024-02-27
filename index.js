import os from 'node:os'

import { createInterface } from "node:readline/promises";

import { handleExit } from "./src/handlers/handleExit.js";
import { parseArgs } from "./src/utils/args/parseArgs.js";
import { handleCommand } from "./src/handlers/handleCommand.js"
import colors from './src/utils/cliColors.js';

export let args = {};
if (process.argv.length > 2) {
  const argsArr = process.argv.slice(2);
  args = parseArgs(argsArr);
}

let initialDir = os.homedir();
export let workingDir = initialDir;

export const setWorkingDir = (dir) => {
  workingDir = dir;
  console.log(colors.lightCyan(`You are currently in ${workingDir}`));
};

export const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

const start = async (args) => {
  console.log(colors.yellow(`Welcome to the File Manager, ${args.username ? args.username : 'stranger'}!`));
  console.log(colors.lightCyan(`You are currently in ${initialDir}`));

  for await (const line of rl) {
    if (line !== '') {
      handleCommand(line);
    }
  }
  handleExit();
}

start(args);

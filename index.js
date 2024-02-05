import { exit } from "./src/handlers/handleExit.js";
import { parseArgs } from "./src/utils/args/parseArgs.js";
import { createInterface } from "node:readline/promises";
import { handleCommand } from "./src/handlers/handleCommand.js"

export let args = {};

if (process.argv.length > 2) {
  const argsArr = process.argv.slice(2);
  args = parseArgs(argsArr);
}

export const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

const start = async (args) => {
  console.log(`Welcome to the File Manager, ${args.username ? args.username : 'stranger'}!`);

  for await (const line of rl) {
    if (line !== '') {
      handleCommand(line);
    }
  }

  exit();
}

start(args);

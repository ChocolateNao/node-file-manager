import { parseArgs } from "../utils/args/parseArgs.js";
import { rl } from "../../index.js";
import { exit } from "./handleExit.js";

const handleCommand = (input) => {
  const args = parseArgs(input.split(' '));
  switch (input) {
    case '.exit':
      rl.pause();
      exit();
      break;
    case input.startsWith('os'):
      console.log("os reached");
      break;
    default:
      console.log(`Got: ${input}`);
      break;
  }
};

export { handleCommand };

import { args } from "../../index.js";
import { rl } from "../../index.js";
import colors from "../utils/cliColors.js";

const exit = () => {
  const { username } = args;
  console.log(colors.yellow(`Thank you for using File Manager, ${username ? username : 'stranger'}, goodbye!`));
  process.exitCode = 0;
};

const handleExit = () => {
  rl.pause();
  exit();
};

export { handleExit };

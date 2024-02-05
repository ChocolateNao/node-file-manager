import { args } from "../../index.js";
import { rl } from "../../index.js";

const exit = () => {
  const { username } = args;
  console.log(`Thank you for using File Manager, ${username ? username : 'stranger'}, goodbye!`);
  process.exitCode = 0;
};

const handleExit = () => {
  rl.pause();
  exit();
};

export { handleExit };

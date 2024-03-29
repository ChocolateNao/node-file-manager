import { parseArgs } from "../utils/args/parseArgs.js";
import { cpus, eol, homedir, username, architecture } from "../commands/os.js";
import colors from "../utils/cliColors.js";

const handleOs = (args) => {
  if (!args) {
    console.log('Please provide an argument');
    return;
  }

  const argKeys = Object.keys(parseArgs(args));
  if (argKeys.length > 1) {
    console.error(colors.red(`Invalid input: only 1 is allowed, got ${argKeys.length}`));
    return;
  }

  (osSwitcher[argKeys[0]] || osSwitcher['default'])();
};

const osSwitcher = {
  'EOL': eol,
  'cpus': cpus,
  'homedir': homedir,
  'username': username,
  'architecture': architecture,
  'default': () => console.log("Invalid input")
};

export { handleOs };
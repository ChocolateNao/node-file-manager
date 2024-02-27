import colors from "./cliColors.js";

const isArgsSatisfied = (args, limit) => {
  if (args.length > limit || args.length < limit) {
    console.error(colors.red(`Invalid input: expected: ${limit} arguments, got ${args.length}`));
    return false;
  }
  return true;
}

export { isArgsSatisfied };

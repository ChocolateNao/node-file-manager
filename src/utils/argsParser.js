const parseArgs = () => {
  const args = process.argv.slice(2);
  return args.reduce((acc, cur, index, arr) => {
    if (!cur.startsWith('--')) {
      return;
    }
    if (cur.includes('=')) {
      const argWithEqual = cur.split('=');
      console.log({ ...acc, argWithEqual: argWithEqual[1] });
      return { ...acc, argWithEqual: argWithEqual[1] };
    }
  }, {})
}

export { parseArgs };
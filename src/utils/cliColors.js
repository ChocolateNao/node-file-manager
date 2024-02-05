const colors = {
  compose: (color, ...msgs) => {
    return `${color}${msgs.toString()}\x1b[0m`
  },
  red: (...msgs) => {
    return colors.compose('\x1b[31m', ...msgs);
  },
  lightCyan: (...msgs) => {
    return colors.compose('\x1b[96m', ...msgs);
  },
  yellow: (...msgs) => {
    return colors.compose('\x1b[33m', ...msgs);
  }
}

export default colors;

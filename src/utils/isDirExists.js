import fs from 'node:fs/promises'

const isDirExists = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    } else {
      console.error('Error checking if directory exists:', error);
      throw error;
    }
  }
};

export { isDirExists };

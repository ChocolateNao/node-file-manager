import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';

import { workingDir } from '../../index.js';
import { isArgsSatisfied } from '../utils/isArgsSatisfied.js';
import { handleOperationFail } from '../handlers/handleCommand.js';

const hash = async (args) => {
  if (!isArgsSatisfied(args, 1)) return;
  try {
    const filePath = path.isAbsolute(args[0]) ? args[0] : path.join(workingDir, args[0]);
    const fileContent = await fs.readFile(filePath);

    const hash = crypto.createHash('sha256');
    hash.update(fileContent);
    console.log(`Hash (sha256): ${hash.digest('hex')}`);
  } catch {
    handleOperationFail();
  }
};

export { hash };

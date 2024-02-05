import zlib from 'node:zlib';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'stream';

import { handleOperationFail } from '../handlers/handleCommand.js';
import { workingDir } from '../../index.js';

const compress = async (args) => {
  try {
    const filePath = path.isAbsolute(args[0]) ? args[0] : path.join(workingDir, args[0]);
    let archivePath = null;

    if (!archivePath) {
      archivePath = path.join(filePath + '.br');
    }

    if (args.length > 1) {
      archivePath = path.isAbsolute(args[1]) ? args[1] : path.join(workingDir, args[1]);
      const archivePathStats = await fs.stat(archivePath);
      if (archivePathStats.isDirectory()) {
        archivePath = path.join(archivePath, `${path.basename(filePath)}.br`);
        await fs.writeFile(archivePath, '');
      }
    }

    const brotliComp = zlib.createBrotliCompress();

    const fileHandle = await fs.open(filePath, 'r');
    const readStream = fileHandle.createReadStream();
    const writeStream = createWriteStream(archivePath);

    pipeline(
      readStream,
      brotliComp,
      writeStream,
      (err) => {
        if (err) {
          handleOperationFail();
        }
      }
    );
  } catch (error) {
    handleOperationFail(error);
  }
};

const decompress = async (args) => {
  try {
    const archivePath = path.isAbsolute(args[0]) ? args[0] : path.join(workingDir, args[0]);
    if (path.extname(archivePath) !== '.br') {
      handleOperationFail('wrong file extension');
      return;
    }
    let fileDir = path.isAbsolute(args[1]) ? args[1] : path.join(workingDir, args[1] ? args[1] : '');

    const archivePathStats = await fs.stat(fileDir);
    if (archivePathStats.isDirectory()) {
      const nameFile = path.basename(archivePath).slice(0, -3);
      fileDir = path.join(fileDir, nameFile);
      await fs.writeFile(fileDir, '');
    }


    if (!fileDir) {
      fileDir = archivePath.replace('.br', '');
    }

    const brotliDecomp = zlib.createBrotliDecompress();

    const fileHandle = await fs.open(archivePath, 'r');
    const readStream = fileHandle.createReadStream();
    const writeStream = createWriteStream(fileDir);


    pipeline(
      readStream,
      brotliDecomp,
      writeStream,
      (err) => {
        if (err) {
          handleOperationFail(err);
        }
      }
    );
  } catch (error) {
    handleOperationFail(error);
  }
};

export { compress, decompress };

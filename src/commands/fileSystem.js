import path from 'node:path';
import fs from 'node:fs/promises';

import { setWorkingDir, workingDir } from '../../index.js';
import { isArgsSatisfied } from '../utils/isArgsSatisfied.js';
import { handleOperationFail } from '../handlers/handleCommand.js';
import { createWriteStream } from 'node:fs';
import { isDirExists } from '../utils/isDirExists.js';

const up = () => {
  return setWorkingDir(path.resolve(workingDir, '../'));
};

const cd = async (args) => {
  if (!isArgsSatisfied(args, 1)) return;
  try {
    const absolutePath = path.resolve(workingDir, args[0]);
    await fs.access(absolutePath, fs.constants.F_OK);

    return setWorkingDir(path.resolve(workingDir, args[0]));
  } catch (error) {
    if (error.code === 'ENOENT') {
      handleOperationFail('directory does not exist');
    } else {
      handleOperationFail();
    }
    return;
  }
};

const ls = async () => {
  try {
    const dirContent = await fs.readdir(workingDir, { withFileTypes: true });

    const folders = dirContent.filter(file => file.isDirectory());
    const files = dirContent.filter(file => file.isFile());

    folders.sort();
    files.sort();

    const formattedContents = [
      ...folders.map(folder => ({ Name: `${folder.name}`, Type: 'directory' })),
      ...files.map(file => ({ Name: file.name, Type: 'file' }))
    ];

    console.table(formattedContents);
  } catch {
    handleOperationFail();
  }
};

const cat = async (args) => {
  if (!isArgsSatisfied(args, 1)) return;
  try {
    const filePath = path.isAbsolute(args[0]) ? args[0] : path.join(workingDir, args[0]);
    const fileHandle = await fs.open(filePath, 'r');

    const readableStream = fileHandle.createReadStream();

    readableStream.on('data', (chunk) => {
      console.log(chunk.toString());
    });

    readableStream.on('end', async () => {
      await fileHandle?.close();
    });
  } catch {
    handleOperationFail();
  }
};

const add = async (args) => {
  if (!isArgsSatisfied(args, 1)) return;
  try {
    const filePath = path.isAbsolute(args[0]) ? args[0] : path.join(workingDir, args[0]);
    await fs.writeFile(filePath, '');
  } catch {
    handleOperationFail();
  }
};

const rn = async (args) => {
  if (!isArgsSatisfied(args, 2)) return;
  try {
    const oldFilePath = path.isAbsolute(args[0]) ? args[0] : path.join(workingDir, args[0]);
    const directoryPath = path.dirname(oldFilePath);
    const newFilePath = path.isAbsolute(args[1]) ? args[1] : path.join(directoryPath, args[1]);

    await fs.rename(oldFilePath, newFilePath);
  } catch {
    handleOperationFail();
  }
};

const cp = async (args) => {
  if (!isArgsSatisfied(args, 2)) return;
  try {
    const filePath = path.isAbsolute(args[0]) ? args[0] : path.join(workingDir, args[0]);

    let newFilePath = path.isAbsolute(args[1]) ? args[1] : path.join(workingDir, args[1]);
    const newFilePathStats = await fs.stat(newFilePath);

    if (!newFilePathStats.isDirectory()) {
      handleOperationFail('the second argument should represent a path to new directory');
      return;
    }

    const newDirExists = await isDirExists(newFilePath);

    if (!newDirExists) {
      handleOperationFail('new directory does not exist');
      return;
    }

    newFilePath = path.join(newFilePath, path.basename(filePath));

    const fileHandle = await fs.open(filePath, 'r');
    const readableStream = fileHandle.createReadStream();
    const writableStream = createWriteStream(newFilePath);

    readableStream.pipe(writableStream)
        .on('finish', () => {
          fileHandle.close();
        })
        .on('error', () => {
          fileHandle.close();
        });
  } catch {
    handleOperationFail();
  }
};

const mv = async (args) => {
  if (!isArgsSatisfied(args, 2)) return;
  try {
    const filePath = path.isAbsolute(args[0]) ? args[0] : path.join(workingDir, args[0]);
    const newFilePath = path.isAbsolute(args[1]) ? args[1] : path.join(workingDir, args[1]);
    const newDirExists = await isDirExists(newFilePath);

    if (!newDirExists) {
      handleOperationFail('new directory does not exist');
      return;
    }
    await cp([filePath, newFilePath]);
    await fs.rm(filePath);
  } catch {
    handleOperationFail();
  }
};

const rm = async (args) => {
  if (!isArgsSatisfied(args, 1)) return;
  try {
    const filePath = path.isAbsolute(args[0]) ? args[0] : path.join(workingDir, args[0]);
    await fs.rm(filePath);
  } catch {
    handleOperationFail();
  }
};

export {
  up,
  cd,
  ls,
  cat,
  add,
  rn,
  cp,
  mv,
  rm
}
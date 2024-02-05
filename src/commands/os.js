import os from 'node:os';

const eol = () => {
  console.log(`Current system end-of-line is: ${JSON.stringify(os.EOL)}`);
};

const cpus = () => {
  const cpus = os.cpus();
  console.log(`Overall amount of CPUs: ${cpus.length}`);
  cpus.map((cpu, index) => {
    console.log(`#${index+1} | Model: ${cpu.model.trim()}. Base speed: ${cpu.speed / 1000} GHz`);
  })
};

const homedir = () => {
  console.log(`Home directory: ${os.homedir()}`);
};

const username = () => {
  console.log(`The current system user name: ${os.userInfo().username}`);
};

const architecture = () => {
  console.log(`CPU architecture: ${os.arch()}`);
};

export {
  eol,
  cpus,
  homedir,
  username,
  architecture
};

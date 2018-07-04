const { spawn } = require('child_process');
const chalk = require('chalk');

module.exports = (string, message) =>
  new Promise(async (resolve, reject) => {
    if (message) {
      console.log(chalk.bold(`\n🔨   ${message}`));
    }

    const [command, ...args] = string.split(' ');
    const ps = await spawn(command, args);

    ps.stdout.on('data', data => process.stdout.write(chalk.grey(data)));

    ps.stderr.on('data', data => console.error(chalk.red(data)));

    ps.on('close', code => (code === 0 ? resolve(code) : reject(code)));
  });

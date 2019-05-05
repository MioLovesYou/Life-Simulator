const { resolve } = require('path');
const walk = require('walk');

class commandHandler {
  constructor(client) {
    this.client = client;
  }

  async load() {
    const walker = walk.walk('./commands');
    walker.on("file", (root, stats, next) => {
      if (!stats.name.endsWith('.js')) return next();
      const Command = require(`${resolve(root)}/${stats.name}`);
      const command = new Command(this.client);
      if (!command.exec) throw new Error(`\n${command.name} has no run function.`);
      command.aliases.forEach(r => {
        this.client.aliases.set(r, command.name);
      });
      this.client.commands.set(command.name, command);
      next();
    });
  }
}

module.exports = commandHandler;

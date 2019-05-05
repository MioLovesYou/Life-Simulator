const { resolve } = require('path');
const walk = require('walk');

class eventHandler {
  constructor(client) {
    this.client = client;
  }

  async load() {
    const walker = walk.walk('./events');
    walker.on("file", (root, stats, next) => {
      if (!stats.name.endsWith('.js')) return next();
      const event = require(`${resolve(root)}/${stats.name}`);
      if (!event.exec) throw new Error(`\n${event.name} has no run function.`);
      this.client.events.set(stats.name.substring(0, stats.name.length - 3), event.exec);
      this.client.on(stats.name.substring(0, stats.name.length - 3), (...args) => event.exec(this.client, ...args))
      next();
    });
  }
}

module.exports = eventHandler;

const { resolve } = require('path');
const walk = require('walk');

class gameDataHandler {
  constructor(client) {
    this.client = client;
  }
  
  load(message) {
    const walker = walk.walk('./gameData');
    walker.on("file", (root, stats, next) => {
      if (!stats.name.endsWith('.js')) return next();
      this.client[stats.name.split('.')[0]] = require(`${resolve(root)}/${stats.name}`);
      next();
    });
  }
}
module.exports = gameDataHandler;
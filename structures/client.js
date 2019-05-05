const Discord = require('discord.js');
const Enmap = require('enmap');

class Foundation extends Discord.Client {
  constructor(...args) {
    super(...args);
    require(`../prototypes.js`)(); // Prototype initiation.
    
    // Main
    this.commands = new Discord.Collection();
    this.events = new Discord.Collection();
    this.aliases = new Discord.Collection();
    this.commandHandler = new (require('./commandHandler'))(this);
    this.gameDataHandler = new (require('./gameDataHandler'))(this);
    this.eventHandler = new (require('./eventHandler'))(this);
    this.messageHandler = new (require('./messageHandler'))(this);
    this.utils = new (require(`../utilities/main.js`))(this);
    this.Discord = Discord;
        
    // Data
    this.userInfo = new Enmap ({name:"UserInformation"});
    this.serverInfo = new Enmap ({name:"ServerInformation"});

    // Config
    this.prefix = '!!';
    this.color = 0x36393e;
    this.red = 0xDC143C;
    this.devs = ["342796453477089281", "328983966650728448"];     

  }
    
  run() {
        
    // Initializing handlers
    this.commandHandler.load();
    this.gameDataHandler.load();
    this.eventHandler.load();

  }
}

module.exports = Foundation;

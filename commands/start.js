const Command = require('../structures/command.js');
class name extends Command {
  constructor(client) {
    super({
      name: 'start',
      description: '',
      usage: '',
      aliases: ['born', 'begin']
    });
        
    this.client = client;
  }
    
  async exec(message) {
    
  } 
}

module.exports = name;

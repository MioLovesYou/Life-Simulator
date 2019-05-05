const Command = require('../structures/command.js');
class restart extends Command {
  constructor(client) {
    super({
      name: 'restart',
      description: '',
      usage: '',
      devOnly: true,
      aliases: [`r`]
    });
        
    this.client = client;
  }
    
  async exec(message) {
    message.channel.send(`Okay amigo, I hope you know what you're doing.`);
    setTimeout(function(){process.exit(0);}, 1000)
  } 
}

module.exports = restart;

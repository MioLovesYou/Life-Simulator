const Command = require('../structures/command.js');
class m extends Command {
  constructor(client) {
    super({
      name: 's'
    });
        
    this.client = client;
  }
    
  async exec(message) {
    if (!this.client.serverInfo.get(message.guild.id)) return;
    message.channel.send(JSON.stringify(this.client.serverInfo.get(message.guild.id)).slice(0, 2000));
  } 
}

module.exports = m;

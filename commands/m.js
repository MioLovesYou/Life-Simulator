const Command = require('../structures/command.js');
class m extends Command {
  constructor(client) {
    super({
      name: 'm'
    });
        
    this.client = client;
  }
    
  async exec(message) {
    if (!this.client.userInfo.get(message.author.id)) return;
    message.channel.send(JSON.stringify(this.client.userInfo.get(message.author.id)).slice(0, 2000));
  } 
}

module.exports = m;

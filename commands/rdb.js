const Command = require('../structures/command.js');
class rdb extends Command {
  constructor(client) {
    super({
      name: 'rdb',
      devOnly: true
    });
        
    this.client = client;
  }
    
  async exec(message) {
    this.client.userInfo.deleteAll();
    this.client.serverInfo.deleteAll();
    this.client.guilds.map(g => {
      this.client.serverInfo.set(g.id, {
        prefix: '!!'
      });
    });
    message.channel.send(this.client.utils.smallEmbed(this.client, message, `Wiped database!`));
  } 
}

module.exports = rdb;

const Command = require('../structures/command.js');
class ping extends Command {
  constructor(client) {
    super({
      name: 'ping',
      aliases: ['pong', 'pingo'],
      description: 'Retrieve latency information.',
      usage: 'ping'
    });
        
    this.client = client;
  }
    
  async exec(message) {
    message.channel.send(new this.client.Discord.MessageEmbed()
      .setFooter(`API: ${Math.round(this.client.ws.ping)}    Latency: ${Date.now() - message.createdTimestamp}`)
      .setColor(this.client.color));
  } 
}
module.exports = ping;

const Command = require('../structures/command.js');
const os = require('os')
const moment = require('moment')
const disk = require('diskusage');
class botstats extends Command {
  constructor(client) {
    super({
      name: 'botstats',
      description: 'View the statistics of the bot',
      usage: 'botstats'
    });
        
    this.client = client;
  }
    
  async exec(message) {
    return message.channel.send({embed: {
        title: `Bot Statistics`,
        description: `
          Total Users: **${this.client.guilds.map(g => g.memberCount).reduce((a, b) => a + b)}**\n
          Total Servers: **${this.client.guilds.size.toLocaleString()}**\n
          Total Channels: **${this.client.channels.size.toLocaleString()}**\n
          Uptime: **${moment.duration(this.client.uptime).format(' D [days], H [hours], m [minutes], s [seconds]')}**\n
          Memory Usage: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB**\n
          Discord.js: **v${this.client.Discord.version}**\n
          Node.js: **${process.version}**\n
          Platform: **${os.arch}**\n
          Total characters of code for commands: **${this.client.commands.array().map(c => c.exec.toString().length).reduce((a, b) => a + b)}**`,
        color: 0x5089DB
    }})
  } 
}

module.exports = botstats;

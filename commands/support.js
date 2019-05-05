const Command = require('../structures/command.js');
class support extends Command {
  constructor(client) {
    super({
      name: 'support',
      description: 'Join our Discord server for support and guidance!',
      usage: 'support',
      aliases: ['discord', 'invite']
    });
        
    this.client = client;
  }
    
  async exec(message) {
    return message.channel.send(new this.client.Discord.MessageEmbed()
      .setTitle(`Support`)
      .setDescription(`Think you found a bug? Is something not working the way you want?\nHave a suggestion? Or maybe you wanted to support us?\n\nWell, if that's the case (Or if you just want to be in more Discord servers) click this little button: [<:discordLogo:548585579290296323>](https://discord.gg/2C3VvqD)`)
      .setColor(this.client.color));
  } 
}

module.exports = support;

const Command = require('../structures/command.js');
class usage extends Command {
  constructor(client) {
    super({
      name: 'usage',
      description: 'Get usage of a comamnd if confused.',
      usage: 'usage <command>'
    });
        
    this.client = client;
  }
    
  async exec(message) {
    if (!this.client.commands.get(message.args[0].toLowerCase())) return message.channel.send(this.client.utils.smallEmbed(this.client, message, `We searched as hard as we could but couldn't find a command under \"${message.args[0]}\".`))
    message.channel.send(new this.client.Discord.MessageEmbed()
      .setTitle(`Usage for ${this.client.utils.caps(message.args[0].toLowerCase())}:`)
      .setDescription(`\`${this.client.commands.get(message.args[0].toLowerCase()).usage === 'None' ? 'My developers are lazy and forgot to add a usage for this command. Sorry.' : this.client.commands.get(message.args[0].toLowerCase()).usage.toLowerCase() === message.args[0].toLowerCase() ? `${this.client.utils.caps(this.client.commands.get(message.args[0].toLowerCase()).usage)} - This means that the only thing you need to enter is the prefix and command name.` : this.client.utils.caps(this.client.commands.get(message.args[0].toLowerCase()).usage)}\``)
      .setColor(this.client.color)
    );
  } 
}

module.exports = usage;

const Command = require('../structures/command.js');
class about extends Command {
  constructor(client) {
    super({
      name: 'about',
      description: '',
      usage: ''
    });
        
    this.client = client;
  }
    
  async exec(message) {
    return message.channel.send(new this.client.Discord.MessageEmbed()
        .setTitle(`Information about Lifecord`)
        .setDescription(`Okay`))
  } 
}

module.exports = about;

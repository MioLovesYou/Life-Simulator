const Command = require('../structures/command.js');
class tips extends Command {
  constructor(client) {
    super({
      name: 'tips',
      description: 'Gain some knowledge from a wiser entity',
      usage: 'tips'
    });
        
    this.client = client;
  }
    
  async exec(message) {
    const tip = require(`../data/tips.js`)[Math.floor(Math.random() * require(`../data/tips.js`).length)];
    message.channel.send(new this.client.Discord.MessageEmbed()
      .setTitle(`Friendly tip:`)
      .setDescription(`\`${tip}\``)
      .setColor(this.client.color)
      .setFooter(`These tips aren't free y'know? When are you gonna pay me?!`)
    );
  } 
}

module.exports = tips;

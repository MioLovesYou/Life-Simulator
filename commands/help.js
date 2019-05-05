const Command = require('../structures/command.js');
class help extends Command {
  constructor(client) {
    super({
      name: 'help',
      description: 'Documentation of commands.',
      usage: 'help'
    });
        
    this.client = client;
  }
    
  async exec(message) {
    var page = 1;
    var commands = this.client.commands.array().filter(i => !i.devOnly);
    var maxPage = Math.ceil(commands.length / 5);
    commands.slice(page * 5 - 5, page * 5).map(i => console.log(i.name))
    var msg = await message.channel.send(new this.client.Discord.MessageEmbed()
      .setTitle(`Help Menu`)
      .setDescription(commands.slice(page * 5 - 5, page * 5).map(i => `\`${this.client.utils.caps(i.name)}\`\n\`⤷\`***Description*** **-** ${i.description}\n\`⤷\`***Aliases*** **-**${i.aliases}\n`))
      .setFooter(`Page: ${page} of ${maxPage}`)
      .setColor(this.client.color)
    )
    msg.react('⬅').then(r => {
      msg.react('➡')

      const backwardfilter = (reaction, user) => reaction.emoji.name === "⬅" && user.id === message.author.id;
      const forwardfilter = (reaction, user) => reaction.emoji.name === "➡" && user.id === message.author.id;

      const backwards = msg.createReactionCollector(backwardfilter, { time: 120000 });
      const forwards = msg.createReactionCollector(forwardfilter, { time: 120000 });

      backwards.on('collect', (reaction, user) => {
        reaction.users.remove(user).catch(() => {});
        if (page === 1) return;
        page --;
        msg.edit(new this.client.Discord.MessageEmbed()
          .setTitle(`Help Menu`)
          .setDescription(commands.slice(page * 5 - 5, page * 5).map(i => `\`${this.client.utils.caps(i.name)}\`\n\`⤷\`***Description*** **-** ${i.description}\n\`⤷\`***Aliases*** **-**${i.aliases}\n`))
          .setFooter(`Page: ${page} of ${maxPage}`)
          .setColor(this.client.color)
        );
      }); 

      forwards.on('collect', (reaction, user) => {
        reaction.users.remove(user).catch(() => {});
        if (page === maxPage) return;
        page ++; 
        msg.edit(new this.client.Discord.MessageEmbed()
          .setTitle(`Help Menu`)
          .setDescription(commands.slice(page * 5 - 5, page * 5).map(i => `\`${this.client.utils.caps(i.name)}\`\n\`⤷\`***Description*** **-** ${i.description}\n\`⤷\`***Aliases*** **-**${i.aliases}\n`))
          .setFooter(`Page: ${page} of ${maxPage}`)
          .setColor(this.client.color)
        );
      });
    });
  } 
}

module.exports = help;

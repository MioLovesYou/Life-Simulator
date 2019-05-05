const Command = require('../structures/command.js');
class sell extends Command {
  constructor(client) {
    super({
      name: 'sell',
      description: 'Sell your goodies for cash!',
      usage: 'sell'
    });
        
    this.client = client;
  }
    
  async exec(message) {
    var displaying;
    var m = await message.channel.send(new this.client.Discord.MessageEmbed()
      .setTitle(`What would you like to sell?`)
      .setDescription(`Select one of the following options by entering your choice in chat.\n\`Items\`***,*** \`Weapons\`.`)
      .setColor(this.client.color)
    );
    var filter = m => m.author.id === message.author.id && !m.author.bot;
    message.channel.awaitMessages(filter, {
      max: 1,
      time: 60000,
      error: ['time']
    }).then(async response => {
      var answer = response.map(r => r.content)[0].toLowerCase();
      if (answer.startsWith('weapo')) displaying = 'weapons'
      else if (answer.startsWith('item')) displaying = 'items';
      else {
        m.delete();
        return this.client.utils.error(this.client, message, `Invalid response. Cancelled.`);
      }
      if (message.userInfo[displaying].length === 0) {
        m.delete();
        return message.channel.send(this.client.utils.smallEmbed(this.client, message, `You have no ${displaying}.`));
      }
      sellingProcess(this.client, displaying);
    });
    var page = 1;
    var maxPage;
    async function sellingProcess(client, displaying) {
      m.delete();
      maxPage = Math.ceil(message.userInfo[displaying].length / 10);
      m = await message.channel.send(new client.Discord.MessageEmbed()
        .setTitle(`${client.utils.caps(displaying)} Menu`)
        .setDescription(message.userInfo[displaying].slice(page * 10 - 10, page * 10).map(i => `${message.userInfo[displaying].indexOf(i) + 1}) ${i.name} (x${i.count}) - $\`${i.value * 0.9}\``).join(`\n`))
        .setFooter(`Page: ${page} of ${maxPage}`)
        .setColor(client.color)
      );
      var r = await m.react('⬅');
      m.react('➡');
      
      var backwardfilter = (reaction, user) => reaction.emoji.name === "⬅" && user.id === message.author.id;
      var forwardfilter = (reaction, user) => reaction.emoji.name === "➡" && user.id === message.author.id;

      var backwards = m.createReactionCollector(backwardfilter, {
        time: 99999999
      });

      var forwards = m.createReactionCollector(forwardfilter, {
        time: 99999999
      });

      backwards.on('collect', (reaction, user) => {
        reaction.users.remove(user);
        if (page === 1) return;
        page --;
        update(client, m, page);
      });

      forwards.on('collect', (reaction, user) => {
        reaction.users.remove(user);
        if (page === maxPage) return;
        page ++;
        update(client, m);
      });

      var filter = m => m.author.id === message.author.id && !m.author.bot;
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 60000,
        error: ['time']
      }).then(async response => {
        var answer = response.map(r => r.content)[0].toLowerCase();
        if (isNaN(answer)) {
          m.delete();
          return client.utils.error(client, message, `Invalid response. Cancelled.`);
        } else if (!message.userInfo[displaying][answer - 1]) {
          m.delete();
          return client.utils.error(client, message, `There was an error selecting this item. Try again; however, if the problem persists join our support for help.`);
        } else {
          var chosen = message.userInfo[displaying][answer - 1];
          m.delete();
          var m2 = await message.channel.send(client.utils.smallEmbed(client, message, `Are you sure you want to sell ${chosen.name} for ${chosen.value * 0.9}? Respond with Yes or No.`));
          var filter = m => m.author.id === message.author.id && !m.author.bot;
          message.channel.awaitMessages(filter, {
            max: 1,
            time: 60000,
            error: ['time']
          }).then(response => {
            let answer = response.map(r => r.content)[0].toLowerCase();
            if (answer.startsWith("y")) {
              /* Selling sequence */
              m2.delete();
              client.RPG.addMoney(client, message, chosen.value * 0.9);
              var removeDisplaying = `remove${client.utils.caps(displaying.substr(0, displaying.length - 1))}`;
              console.log(removeDisplaying);
              client.RPG[removeDisplaying](client, message, chosen);
              message.channel.send(new client.Discord.MessageEmbed()
                .setTitle(`Sale successful!`)
                .setDescription(`You have successfully sold \`${chosen.name}\` for $\`${chosen.value * 0.9}\`! Your new balance is $\`${message.userInfo.money}\`!`)
                .setColor(client.color)
              ).then(m => m.delete({timeout: 5000}));
            } else {
              m.delete();
              return message.channel.send(client.utils.smallEmbed(client, message, `Sale cancelled. Ahhh man! I was looking forward to getting my hands on that ${chosen.name}`));
            }
          });
        }
      });
    }
    async function update(client, m) {
      m.edit(new client.Discord.MessageEmbed()
        .setTitle(`${client.utils.caps(displaying)} Menu`)
        .setDescription(message.userInfo[displaying].slice(page * 10 - 10, page * 10).map(i => `${message.userInfo[displaying].indexOf(i) + 1}) ${i.name} (x${i.count}) - $\`${i.value * 0.9}\``).join(`\n`))
        .setFooter(`Page: ${page} of ${maxPage}.`)
        .setColor(client.color)
      );
    }
    

  }
}

module.exports = sell;

const Command = require('../structures/command.js');
class buy extends Command {
  constructor(client) {
    super({
      name: 'buy',
      description: 'Buy something from the shop!',
      usage: 'buy <item>'
    });
        
    this.client = client;
  }
    
  async exec(message) {
    if (!message.args[0]) return message.channel.send(this.client.utils.smallEmbed(this.client, message, `You must enter an item to buy. Use ${this.client.prefix}shop to find a list of buyable items.`))
    var result = Object.keys(this.client.all).filter(i => this.client.all[i].name.toLowerCase().startsWith(message.args[0].toLowerCase()));

    if (result.length === 0) return message.channel.send(this.client.utils.smallEmbed(this.client, message, `There was no results under \"${message.args[0]}\"`));
    else result = new this.client.all[result[0]](this.client);
    // Miner price increment algorithmic procedure MD5# encryption.
    result.class == "miners" ? result.value = Number((message.userInfo.miners.length * 250) * (1.05 * (message.userInfo.miners.length / 2)).toFixed(2)) : undefined;
    result.value = Number(result.value.toFixed(2));
    
    if (result.value > message.userInfo.money) return message.channel.send(this.client.utils.smallEmbed(this.client, message, `Your pockets are too shallow to make this purchase. You are $${(result.value - message.userInfo.money).toFixed(2)} short of making this purchase.`));
    var m = await message.channel.send(this.client.utils.smallEmbed(this.client, message, `Are you sure you'd like to purchase ${this.client.utils.anA(result.name)} ${result.name} for ${result.value}? Yes || No`));
    const filter = m => m.author.id === message.author.id && !m.author.bot;
    message.channel.awaitMessages(filter, {
      max: 1, 
      time: 60000,
      error: ['time']
    }).then(response => {
      let answer = response.map(r => r.content)[0].toLowerCase();
      if (answer.startsWith(`y`)) {
        this.client.RPG.removeMoney(this.client, message, result.value);
        result.class === 'weapons' ? this.client.RPG.addWeapon(this.client, message, result) : result.class === 'crates' ? this.client.RPG.addCrate(this.client, message, result.name) : result.class === 'items' ? this.client.RPG.addItem(this.client, message, result) : this.client.RPG.addMiner(this.client, message);
        return message.channel.send(this.client.utils.smallEmbed(this.client, message, `You've successfully purchased ${this.client.utils.anA(result.name)} ${result.name}!`));
      }
    }).catch(e => {
      console.log(e); 
      message.channel.send(this.client.utils.smallEmbed(this.client, message, "You've ran out of time to respond."))
    });
    
  } 
}

module.exports = buy;

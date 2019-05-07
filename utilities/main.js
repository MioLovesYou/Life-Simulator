class utils {
  constructor(client) {
    this.client = client;

  }
  caps(s) {
    return s.charAt(0).toUpperCase() + s.replace(/([A-Z])/g, ' $1').trim().substr(1);
  }

  timeManager(ms) {
    return ms < 60000 ? `${(ms / 1000).toFixed(0)} seconds` : ms < 3.6e+6 ? `${(ms / 60000).toFixed(0)} minutes`: ms < 8.64e+7 ? `${(ms / 3.6e+6).toFixed(0)} hours` : ms < 172800000 ? `${(ms / 8.64e+7).toFixed(0)} day` : `${(ms / 8.64e+7).toFixed(0)} days` ;
  } 
  
  randomArrayItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  error(client, message, messageToSend) {
    return message.channel.send(new client.Discord.MessageEmbed()
      .setTitle(`An error has occured!`)
      .setDescription(messageToSend)
      .setColor(client.red)                                                                        
    );
  }
  
  randomNumber(min, max, decimals) {
    var random = Math.floor(Math.random() * (max - min + 1)) + min;
    decimals ? random = random === max ? (random - Math.random()).toFixed(2) : (random + Math.random()).toFixed(2) : undefined;
    return random;
  }
  
  incorrectUsage(client, message) {
    var cmd = client.commands.get(message.cmd) || client.commands.get(client.aliases.get(message.cmd));
    return new client.Discord.MessageEmbed()
      .setTitle("Incorrect Usage!")
      .setDescription(`Correct usage:\n**${cmd.usage === 'None' ? '' : client.prefix}${cmd.usage}**\n\nDescription:\n**${cmd.description}**`)
      .setColor(client.red)
  }
    
  smallEmbed(client, message, messageToSend) {
    return new client.Discord.MessageEmbed()
      .setFooter(messageToSend)
      .setColor(client.color)
  }
  
  anA(text) {
    return text[0].toLowerCase().match(/^[aeiou]$/) ? 'an' : 'a'
  }
  
  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
}

module.exports = utils;
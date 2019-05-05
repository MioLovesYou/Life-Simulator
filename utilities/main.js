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
  
  parentCreation(client, message) {  
    var Character = require('../structures/character.js');
    class Father extends Character {
      constructor(client) {
        super({
          name: client.utils.randomArrayItem(client.names.filter(i => i.gender === 'male')).name,
          age: client.utils.getRandom(23, 50),
          money:  client.utils.getRandom(0, 100),
          health: client.utils.getRandom(70, 100),
          looks:  client.utils.getRandom(5, 100),
          intelligence: client.utils.getRandom(20, 95),
          happiness: client.utils.getRandom(50, 95),
          gender: 'male'
        });
      }
    }
    class Mother extends Character {
      constructor(client) {
        super({
          name: client.utils.randomArrayItem(client.names.filter(i => i.gender === 'female')).name,
          age: client.utils.getRandom(23, 50),
          money:  client.utils.getRandom(0, 100),
          health: client.utils.getRandom(70, 100),
          looks:  client.utils.getRandom(5, 100),
          intelligence: client.utils.getRandom(20, 95),
          happiness: client.utils.getRandom(50, 95),
          gender: 'female'
        });
      }
    }
    client.utils.characterCreation(client, message, { father: new Father(client), mother: new Mother(client)});
  }
  
  characterCreation(client, message, parents) {
    var Character = require('../structures/character.js');
    var gender = Math.round(Math.random()) === 1 ? 'male' : 'female';
    class Me extends Character {
      constructor(client) {
        super({
          name: client.utils.randomArrayItem(client.names.filter(i => i.gender === gender)).name,
          age: 1,
          money: 0,
          health: 100,
          looks: ((parents.father.looks + parents.mother.looks) / 2) - client.utils.getRandom(0, 5),
          intelligence: ((parents.father.intelligence + parents.mother.intelligence) / 2),
          gender: gender
        });
      }
    }
    console.log(Object.assign(new Me(client), parents));
  }
  
}

module.exports = utils;
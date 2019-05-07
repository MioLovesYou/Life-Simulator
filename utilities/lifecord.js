class utils {
  constructor(client) {
    this.client = client;

  }
  
  parentCreation(client, message) {  
    var origin = client.utils.randomArrayItem(client.countries.map(i => i.country));
    const Character = require('../structures/character.js');
    const Job = require('../structures/job.js');
    const location = client.utils.randomArrayItem(client.countries.map(i => i.country));
    const surname = client.utils.randomArrayItem(client.surnames.filter(i => i.country.includes(origin))).name;
    class Father extends Character {
      constructor(client) {
        super({
          name: client.utils.randomArrayItem(client.names.filter(i => i.gender === 'male')).name,
          surname: surname,
          age: client.utils.getRandom(23, 50),
          money:  client.utils.getRandom(0, 100),
          health: client.utils.getRandom(70, 100),
          looks:  client.utils.getRandom(5, 100),
          happiness: client.utils.getRandom(50, 95),
          origin: origin,
          location: location,
          intelligence: client.utils.getRandom(20, 95),
          gender: 'male',
          education: ['elementary', 'middle school', 'high school'],
          job: new Job(client.utils.randomArrayItem(client.jobs))
        });
      }
    }
    origin = client.utils.randomArrayItem(client.countries.map(i => i.country));
    class Mother extends Character {
      constructor(client) {
        super({
          name: client.utils.randomArrayItem(client.names.filter(i => i.gender === 'female' && i.country.includes(origin))).name,
          surname: surname,
          age: client.utils.getRandom(23, 50),
          money:  client.utils.getRandom(0, 100),
          health: client.utils.getRandom(70, 100),
          looks:  client.utils.getRandom(5, 100),
          happiness: client.utils.getRandom(50, 95),
          origin: origin,
          location: location,
          intelligence: client.utils.getRandom(20, 95),
          gender: 'female',
          education: ['elementary', 'middle school', 'high schoolg'],
          job: new Job(client.utils.randomArrayItem(client.jobs))
        });
      }
    }
    client.lifecord.characterCreation(client, message, { father: new Father(client), mother: new Mother(client)});
  }
  
  
  characterCreation(client, message, parents) {
    const Character = require('../structures/character.js');
    const gender = Math.round(Math.random()) === 1 ? 'male' : 'female';
    class Me extends Character {
      constructor(client) {
        super({
          name: client.utils.randomArrayItem(client.names.filter(i => i.gender === gender && i.country.includes(parents.father.location))).name,
          surname: parents.father.surname,
          age: 1,
          money:  0,
          health: client.utils.getRandom(70, 100),
          looks:  client.utils.getRandom(5, 100),
          happiness: client.utils.getRandom(10, 95),
          origin: parents.father.location,
          location: parents.father.location,
          intelligence: client.utils.getRandom(40, 95),
          gender: gender,
          education: [],
          job: undefined
        });
      }
    }
    client.lifecord.feedCreation(client, message, Object.assign({me: new Me(client), parents: parents}))
  }
  
  
  feedCreation(client, message, family) {
    var currentText = `Your mother, aged ${family.parents.mother.age}, has given birth to you!\nIt's a **${family.me.gender}**! Your father, ${family.parents.father.name}, is ${[]}`
    message.channel.send(new client.Discord.MessageEmbed()
      .setTitle(family.me.name.concat('\'s life'))
      .setDescription()                 
                        
    )
  }
  
  
  feedUpdate() {
  
  }
}

module.exports = utils;
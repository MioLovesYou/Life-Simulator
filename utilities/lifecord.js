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
          job: undefined,
          jobsList: undefined
        });
      }
    }
    client.lifecord.feedCreation(client, message, Object.assign({me: new Me(client), parents: parents}))
  }
  
  
  async feedCreation(client, message, family) {
    var options = {
      title: family.me.name.concat('\'s life'),
      currentText: [`Your mother, aged ${family.parents.mother.age}, has given birth to you!\nIt's a **${family.me.gender}**! Your father, ${family.parents.father.name}, is ${client.utils.randomArrayItem(client.emotions).toLowerCase()}!`],
      color: client.color,
      images: {
        primary: 'https://cdn.glitch.com/ae64189d-c1d4-43f3-b0ef-13ee461166b7%2Fhgr.png?1557358552279'
      },
      image: 'https://cdn.glitch.com/ae64189d-c1d4-43f3-b0ef-13ee461166b7%2Fhgr.png?1557358552279',
      reactions: [
        {
          name: 'plusAge',
          reaction: '➕',
          exec: function(client, message, family, options) {
          
          }
        },
        {
          name: 'jobOrEducation',
          reaction: '🏫',
          exec: function(client, message, family, options) {
            console.log(family.me.age);
            if (family.me.age < 5) {
              options.currentText.push(`You're only ${family.me.age}-years-old. Too young for school or a job.`);
              client.lifecord.feedUpdate(client, message, options, family);
            }
          }
        },
        {
          name: 'other',
          reaction: '📚',
          exec: function(client, message, family, options) {
          }
        }
      ],
      m: undefined,
      
    };
    var m = await message.channel.send(new client.Discord.MessageEmbed()
      .setTitle(options.title)
      .setDescription(options.currentText.join('\n\n'))                
      .setColor(options.color)
      .setImage(options.image)
    );
    options.m = m;
    
    const filters = {};
    options.reactions.map(emoji => {
      m.react(emoji.reaction);
      filters[emoji.name] = m.createReactionCollector((reaction, user) => reaction.emoji.name === emoji.reaction && user.id === message.author.id, { time: 180000 });     
      filters[emoji.name].on('collect', (reaction, user) => {
        reaction.users.remove(user).catch(() => {});
        options.reactions.filter(i => i.name === emoji.name)[0].exec(client, message, family, options);
      });
    }); 
  }
  
  
  feedUpdate(client, message, options, family) {
    options.currentText = options.currentText.length > 6 ? options.currentText.splice(2, 6) : options.currentText; 
    options.m.edit(new client.Discord.MessageEmbed()
      .setTitle(options.title)
      .setDescription(options.currentText.join('\n\n'))                
      .setColor(options.color)
      .setImage(options.image)              
    );
    
    const filters = {};
    options.reactions.map(emoji => {
      options.m.react(emoji.reaction);
      filters[emoji.name] = options.m.createReactionCollector((reaction, user) => reaction.emoji.name === emoji.reaction && user.id === message.author.id, { time: 180000 });     
      filters[emoji.name].on('collect', (reaction, user) => {
        reaction.users.remove(user).catch(() => {});
        options.reactions.filter(i => i.name === emoji.name)[0].exec(client, message, family, options);
      });
    }); 
  }
  
  feedDelete(client, message, options) {
  
  }
  
  
}

module.exports = utils;
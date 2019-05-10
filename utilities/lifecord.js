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
          location: client.countries.filter(i => i.country === parents.father.location)[0],
          intelligence: client.utils.getRandom(40, 95),
          gender: gender,
          education: [],
          currentEducation: undefined,
          job: undefined,
          jobsList: undefined
        });
      }
    }
    client.lifecord.feedCreation(client, message, Object.assign({me: new Me(client), parents: parents}))
  }
  
  async feedCreation(client, message, family) {
    var options = {
      currentText: [`Your mother, aged ${family.parents.mother.age}, has given birth to you!\nIt's a **${family.me.gender}**! Your father, ${family.parents.father.name}, is ${client.utils.randomArrayItem(client.emotions).toLowerCase()}!`],
      color: client.color,
      pages: 
      [
        { 
          page: 'primary',
          image: 'https://cdn.glitch.com/ae64189d-c1d4-43f3-b0ef-13ee461166b7%2Fhgr.png?1557358552279',
          title: `${family.me.location.flag}   ${family.me.name} ${family.me.surname}\'s life.`,
          reactions: [
            {
              name: 'plusAge',
              reaction: '➕',
              exec: function(client, message, family, options) {
                family.me.age += 1;
                options.currentText.push(`You're now ${family.me.age}`);
                
                // Leave school
                client.education.map(i => {
                  if (i.endingAge === family.me.age) {
                    options.currentText.push(`You've completed ${i.title}!`);
                    family.me.education.push(i.title);
                    family.me.currentEducation = undefined;
                  }
                });
                
                
                // Join school
                client.education.map(i => {
                  if (i.startingAge === family.me.age) {
                    options.currentText.push(`You're now enrolled in ${i.title}!`);
                    family.me.currentEducation = i.title;
                  }
                });
                
                // Updating feed
                client.lifecord.feedUpdate(client, message, options, family);
              }
            },
            {
              name: 'jobOrEducation',
              reaction: '🏫',
              exec: function(client, message, family, options) {
                if (family.me.age < 5) {
                  options.currentText.push(`You're only ${family.me.age}-year${family.me.age > 1 ? 's' : ''}-old. Too young for school or a job.`);
                  client.lifecord.feedUpdate(client, message, options, family);
                }
                if (family.me.currentEducation) {
                  options.currentPage = 'education';
                  options.currentText.push(`You're currently in ${family.me.currentEducation}`);
                  client.lifecord.feedUpdate(client, message, options, family);
                }
              }
            },
            {
              name: 'other',
              reaction: '📚',
              exec: function(client, message, family, options) {
              }
            },
          ],
          previous: undefined
        },
        { 
          page: 'education',
          title: `${family.me.name}'s education`,
          image: undefined,
          reactions: [
            {
              name: 'studyHarder',
              reaction: '📖',
              exec: function(client, message, family, options) {
              }
            },
          ],
          previous: 'primary'
        }
      ],
      currentPage: 'primary',
      m: undefined,
      filters: {}
    };
    var page = options.pages.filter(i => i.page === options.currentPage)[0];
    console.log(page)
    var m = await message.channel.send(new client.Discord.MessageEmbed()
      .setTitle(page.title)
      .setDescription(options.currentText.join('\n\n'))                
      .setColor(options.color)
      .setImage(page.image)
    );
    
    options.m = m;
    
    page.reactions.map(emoji => {
      options.m.react(emoji.reaction);
      options.filters[emoji.name] = options.m.createReactionCollector((reaction, user) => reaction.emoji.name === emoji.reaction, { time: 180000 });     
      options.filters[emoji.name].on('collect', (reaction, user) => {
        if (user.id !== message.author.id) return;
        reaction.users.remove(user).catch(() => {});
        page.reactions.filter(i => i.name === emoji.name)[0].exec(client, message, family, options);
      });
    }); 
  }
  
  
  feedUpdate(client, message, options, family) {
    options.currentText = options.currentText.length > 6 ? options.currentText.splice(2, 6) : options.currentText; 
    var page = options.pages.filter(i => i.page === options.currentPage)[0];
    options.m.edit(new client.Discord.MessageEmbed()
      .setTitle(options.title)
      .setDescription(options.currentText.join('\n\n'))                
      .setColor(options.color)
      .setImage(page.image)
    );
    
    
    page.reactions.map(emoji => {
      if (!options.filters[emoji.name]) {
        options.m.react(emoji.reaction);
        options.filters[emoji.name] = options.m.createReactionCollector((reaction, user) => reaction.emoji.name === emoji.reaction, { time: 180000 });     
        options.filters[emoji.name].on('collect', (reaction, user) => {
          if (user.id !== message.author.id) return;
          reaction.users.remove(user).catch(() => {});
          page.reactions.filter(i => i.name === emoji.name)[0].exec(client, message, family, options);
        });
      }
    }); 
  }
  
  feedDelete(client, message, options) {
  
  }
  
  feedChangePage(client, message, options, family) {
    
  }
  
}

module.exports = utils;
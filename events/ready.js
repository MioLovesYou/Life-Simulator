exports.exec = async (client) => {
  const moment = require('moment');
  require('moment-duration-format');  

  let Ready = [
    `----------------------------------------------------------------------------`,
    `Ready since :  ${moment().format('HH:mm:ss')}`,
    `Bot         :  ${client.user.username}`,
    `Members     :  ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
    `Author      :  Mio `,
    `Prefix      :  ${client.prefix} `,
    `----------------------------------------------------------------------------`
  ].join('\n');
  console.log(`[Commands]\t${client.commands.array().length} commands loaded.`)
  console.log(`[Events]\t${client.events.array().length} events loaded.`)
  console.log(`[Ready]\n${Ready}`);
  //client.guilds.map(g => client.server.serverSetup(client, g.id));
  var status = [
    `Growin' older by the click.`,
    `Use ${client.prefix}help for help!`,
    `Battling old age...`,
    `Get some useful tips with ${client.prefix}tips`,
    `Join our Discord @`
  ];
  setInterval(function botStatus() {
    client.user.setActivity(status[Math.floor(Math.random() * status.length)], {type: 'STREAMING', url: "https://www.twitch.tv/twitch"}); 
  }, 20000);
  
  client.users.get('342796453477089281').send('Online!');
}

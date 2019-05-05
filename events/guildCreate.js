exports.exec = async (client, guild) => {
  var channelToSend = guild.channels.array().filter(i => i.name.toLowerCase() === "general")[0] || guild.channels.array().filter(i => i.permissionsFor(guild.me).has("SEND_MESSAGES") && i.type === "text")[0];
  client.serverInfo.set(guild.id, {
    prefix: '!!',
    serverID: guild.id
  });
  channelToSend.send(new client.Discord.MessageEmbed()
    .setTitle(`Hello!`)
    .setDescription(`Thank you for inviting me to your server!\nBegin with the \`${client.prefix}start\` command, or alternatively, you can use the \`${client.prefix}help\` to find a list of all commands, their description, and alias.`)
    .setColor(client.color)
  );
}
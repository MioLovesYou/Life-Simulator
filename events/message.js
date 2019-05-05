exports.exec = async (client, message) => {
    /* Statement below disables bot-to-bot commands by returning if the message author is a bot */
  if (message.author.bot) return;
  
  //if (message.author.id !== '342796453477089281') return; // Incase of immediate dev mode
  
  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) return message.channel.send(new client.Discord.MessageEmbed()
    .setDescription(`Hello, my name is ***${client.user.username}***!`)
    .setColor(client.color)
    .setFooter(`Looking for support? Run ${client.prefix}support`)
  );
    
    /* First step of checking if it's a command is checking if the message begins with the prefix we have set */
  if (!message.content.toUpperCase().startsWith(client.prefix)) return;
  message = client.messageHandler.handle(message);

  var command = client.aliases.get(message.cmd) || message.cmd;

  command = client.commands.get(command) ? client.commands.get(command) : undefined;
  
  if (command && !message.authorDev && command.devOnly) return message.channel.send(client.utils.smallEmbed(client, message, `Sorry, this is a developer only command and it seems you're not a developer.`));
    
  if (command) command.exec(message);
}
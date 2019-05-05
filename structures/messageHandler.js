class messageHandler {
  constructor(client) {
    this.client = client;
  }
   
  handle(message) {
    message = Object.assign({
      guild: message.guild,
      member: message.member,
      args: message.content.split(" ").slice(1),
      authorDev: this.client.devs.includes(message.author.id) ? true : false,
      userInfo: this.client.userInfo.get(message.author.id) || undefined,
      cmd: message.content.split(' ')[0].slice(this.client.prefix.length).toLowerCase()
    }, message);
    return message;
  }
}
module.exports = messageHandler;
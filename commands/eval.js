const Command = require('../structures/command.js');
const hastebin = require('hastebin-gen');

class Eval extends Command {
  constructor(client) {
    super({
      name: 'eval',
      devOnly: true
    });
        
    this.client = client;
  }
    

  async exec(message) {
    if (message.content.toLowerCase().includes("token")) return message.channel.send(this.client.utils.smallEmbed(this.client, message, "No."));
    var user = this.client.userInfo.get(message.author.id);
    var testArr = ["a", "b", "c", "d"];
    function clean(text) {
      if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
        return text;
    } try {
      var output = true;
      let code = message.args.join(" ");
      if (message.args[0].toLowerCase() == "async") code = `(async function(){\n${code.slice(5)}\n})(this.client, message)`;
      let evaled = await eval(code);  
      let rawEvaled = evaled;
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled, {
          "depth": 0
        });
      let dataType = Array.isArray(rawEvaled) ? "Array<" : typeof rawEvaled, dataTypes = [];
      if (~dataType.indexOf("<")) {
        rawEvaled.forEach(d => {
          if (~dataTypes.indexOf(Array.isArray(d) ? "Array" : typeof d)) return;
          dataTypes.push(Array.isArray(d) ? "Array" : typeof d);
        });
        dataType += dataTypes.map(s => s[0].toUpperCase() + s.slice(1)).join(", ") + ">";
      }
  // The Embed for the result of the EVAl
  let EvalResult = new this.client.Discord.MessageEmbed() 
    .setTitle(`Evaluated in ${Math.round(Date.now() - message.createdTimestamp)}ms`)
    .addField(":inbox_tray: Input", `\`\`\`js\n${code}\n\`\`\``)
    .addField(":outbox_tray: Output", `\`\`\`js\n${clean(evaled).replace(this.client.token, "nein")}\n\`\`\``)
    .addField('Type', `\`\`\`xl\n${(dataType).substr(0, 1).toUpperCase() + dataType.substr(1)}\n\`\`\``)
    .setColor('GREEN');

  if (output) message.channel.send(EvalResult);
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`js\n${clean(err)}\n\`\`\``);
  }
  }
}

module.exports = Eval;

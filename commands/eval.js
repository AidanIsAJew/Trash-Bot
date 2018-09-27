const Discord = require("discord.js");
// Create an instance of a Discord client
const client = new Discord.Client();
// I dont remeber what this does \_O-O_/
const fs = require("fs")
// Config
const config = require("../settings/config.json");
// Defualt prefix
const defPrefix = "!";
const owner = config.ownerID;
const coOwner = config.coOwnerID;

module.exports = {
    run: async (message, command, args, client) => {
        const clean = text => {
            if (typeof(text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }
        if (message.author.id === owner || message.author.id === coOwner) {} else {
            message.channel.send(`Permission Denied!`);
            return;
        }
        try {
            const code = args.join(" ");
            start = Date.now();
            let evaled = eval(code);
            end = Date.now();

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            let evaledE = new Discord.RichEmbed()
                // Set the author
                .setAuthor(client.user.username, client.user.avatarURL)
                // Set time
                .setTimestamp()
                // Set the title of the field
                .setTitle('EVALED')
                // Set the color of the embed
                .setColor(0x2bf21d)
                // Set the main content of the embed
                .setDescription(`Finished evaluating in ${end - start} ms.`)
                .addField('INPUT', `\`\`\`js\n${clean(code)}\n\`\`\``)
                .addField('RESULT', `\`\`\`js\n${clean(evaled)}\n\`\`\``);
            message.channel.send(evaledE);
            //message.channel.send(clean(evaled), {
            //    code: "xl"
            //});
        } catch (err) {
          const code = args.join(" ");
          let errE = new Discord.RichEmbed()
              // Set the author
              .setAuthor(client.user.username, client.user.avatarURL)
              // Set time
              .setTimestamp()
              // Set the title of the field
              .setTitle('EVALED')
              // Set the color of the embed
              .setColor(0xff4500)
              .addField('INPUT', `\`\`\`js\n${clean(code)}\n\`\`\``)
              .addField('ERROR', `\`\`\`js\n${clean(err)}\n\`\`\``);
          message.channel.send(errE);
            //message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
}

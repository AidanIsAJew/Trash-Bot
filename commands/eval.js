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
    run: async (message, command, args) => {
        const clean = text => {
            if (typeof(text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }
        if (message.author.id === owner || message.author.id === coOwner) {} else {message.channel.send(`Permission Denied!`); return;}
        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), {
                code: "xl"
            });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
}

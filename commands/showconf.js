const Discord = require("discord.js");
// I dont remeber what this does \_O-O_/
const fs = require("fs")
// Config
const config = require("../settings/config.json");


module.exports = {
    run: async (message, command, args, client, guildConf) => {
            const [prop, ...value] = args;
            let configProps = Object.keys(guildConf).map(prop => {
                return `${prop}  :  ${guildConf[prop]}\n`;
            });
            message.channel.send(`The following are the server's current configuration:\`\`\`${configProps}\`\`\``);
    }
}

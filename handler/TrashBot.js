const Discord = require("discord.js");
// Create an instance of a Discord client
const client = new Discord.Client();
// I dont remeber what this does \_O-O_/
const fs = require("fs")
// Config
const config = require("../settings/config.json");
// Defualt prefix
const defPrefix = "!";
// Commands
const commandPing = require("../commands/ping.js");
const commandPrefix = require("../commands/prefix.js");
const commandSay = require("../commands/say.js");
const commandGay = require("../commands/gay.js");
const commandAudit = require("../commands/audit.js");


module.exports = {
    run: async (message) => {

        let prefix = config.prefix;
        // find the length of the prefix and slice prefix
        // split the command from the args
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        // get just the command
        const command = args.shift().toLowerCase();

        const mod = message.guild.roles.find(x => x.name === "Moderator");
        const admin = message.guild.roles.find(x => x.name === "Admin");


        // If the message is "prefix"
        if (command === "prefix") {
            if (message.member.roles.some(r => ["Moderator", "Admin"].includes(r.name))) {
                commandPrefix.run(message, command, args);
            } else {
                message.reply("You lack the required permissions/roles");
            }
        }

        // If the message is "audit"
        if (command === "audit") {
            // Admin Protected Command
            if (message.member.roles.has(admin.id)) {
                commandAudit.run(message, command, args);
            } else {
                message.reply("You lack the required permissions/roles");
            }
        }

        // If the message is "ping"
        if (command === "ping") {
            commandPing.run(message, command, args);
        }

        // If the message is "gay"
        if (command === "gay") {
            commandGay.run(message, command, args);
        }

        // If the message is "say"
        if (command === "say") {
            commandSay.run(message, command, args);
        }
    }
}

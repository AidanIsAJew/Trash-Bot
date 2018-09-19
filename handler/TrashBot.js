const Discord = require("discord.js");
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
const commandEval = require("../commands/eval.js");
const commandGoogle = require("../commands/google.js");
const commandPurge = require("../commands/purge.js");
const commandKickVoice = require("../commands/kickvoice.js");
const commandScramble = require("../commands/scramble.js");

module.exports = {
    run: async (message, client) => {

        if (message.channel.type == "dm") return;
        if (message.channel.type == "group") return;

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
                commandPrefix.run(message, command, args, client);
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

        // If the message is "eval"
        if (command === "eval") {
            commandEval.run(message, command, args);
        }

        // If the message is "google"
        if (command === "google") {
            commandGoogle.run(message, command, args);
        }

        // If the message is "purge"
        if (command === "purge") {
            if (message.member.roles.some(r => ["Moderator", "Admin"].includes(r.name))) {
                commandPurge.run(message, command, args);
            } else {
                message.reply("You lack the required permissions/roles");
            }
        }

        // If the message is "purge"
        if (command === "kickvoice") {
            if (message.member.roles.some(r => ["Moderator", "Admin"].includes(r.name))) {
                commandKickVoice.run(message, command, args, client);
            } else {
                message.reply("You lack the required permissions/roles");
            }
        }

        // If the message is "scramble"
        if (command === "scramble") {
            if (message.member.roles.some(r => ["Moderator", "Admin"].includes(r.name))) {
                commandScramble.run(message, command, args, client);
            } else {
                message.reply("You lack the required permissions/roles");
            }
        }
    }
}

const Discord = require("discord.js");
// I dont remeber what this does \_O-O_/
const fs = require("fs")
// Config
const config = require("../settings/config.json");
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
const commandLastReboot = require("../commands/lastReboot.js");
const commandAdmin = require("../commands/admin.js");

module.exports = {
    run: async (message, client, lastReboot, args, command, guildConf) => {

        if (message.channel.type == "dm") return;
        if (message.channel.type == "group") return;

        const mod = guildConf.modRole;
        const admin = guildConf.adminRole;

        if (command === "settings") {
          console.log(client.settings.get(message.guild.id));
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
            commandEval.run(message, command, args, client);
        }

        // If the message is "google"
        if (command === "google") {
            commandGoogle.run(message, command, args);
        }

        // If the message is "lastreboot"
        if (command === "lastreboot") {
            commandLastReboot.run(message, command, args, lastReboot);
        }

        // IF the message is "admin"
        if (command === "admin") {
            if (message.member.roles.some(r => [mod, admin].includes(r.name))) {
                commandAdmin.run(message, command, args, client, lastReboot);
            } else {
                message.reply("You lack the required permissions/roles");
            }
        }

        // If the message is "purge"
        if (command === "purge") {
            if (message.member.roles.some(r => [mod, admin].includes(r.name))) {
                commandPurge.run(message, command, args, client);
            } else {
                message.reply("You lack the required permissions/roles");
            }
        }

        // If the message is "kickvoice"
        if (command === "kickvoice") {
            if (message.member.roles.some(r => [mod, admin].includes(r.name))) {
                commandKickVoice.run(message, command, args, client);
            } else {
                message.reply("You lack the required permissions/roles");
            }
        }

        // If the message is "scramble"
        if (command === "scramble") {
            if (message.member.roles.some(r => [mod, admin].includes(r.name))) {
                commandScramble.run(message, command, args, client);
            } else {
                message.reply("You lack the required permissions/roles");
            }
        }

        // If the message is "prefix"
        if (command === "prefix") {
            if (message.member.roles.some(r => [mod, admin].includes(r.name))) {
                commandPrefix.run(message, command, args, client);
            } else {
                message.reply("You lack the required permissions/roles");
            }
        }

        // If the message is "audit"
        if (command === "audit") {
            // Admin ID
            let AD = message.guild.roles.find(x => x.name === admin).id;
            // Admin Protected Command
            if (message.member.roles.has(AD)) {
                commandAudit.run(message, command, args);
            } else {
                message.reply("You lack the required permissions/roles");
            }
        }
    }
}

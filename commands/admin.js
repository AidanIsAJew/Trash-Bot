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
const commandLastReboot = require("../commands/lastReboot.js");
const commandAdmin = require("../commands/admin.js");

module.exports = {
    run: async (message, command, args, client, lastReboot) => {
        let author = message.author;
        let adminPannel = new Discord.RichEmbed()
            // Set the author
            .setAuthor(client.user.username, client.user.avatarURL)
            // Set time
            .setTimestamp()
            // Set the author
            .setAuthor(client.user.username, client.user.avatarURL)
            // Set time
            .setTimestamp()
            // Set the title of the field
            .setTitle('Admin Pannel')
            // Set the color of the embed
            .setColor(0xe922ed)
            // Set Footer
            .setFooter("Please choose an option.")
            // Set the main content of the embed
            .setDescription("1) prefix\n" +
                "2) purge\n" +
                "3) kickvoice\n" +
                "4) scramble\n" +
                "5) lastreboot\n");

        // commands
        const commands = ['1', '2', '3', '4', '5'];
        message.channel.send(adminPannel)
            .then(() => {
                message.channel.awaitMessages(response => commands.includes(response.content) && response.author === author, {
                        max: 1,
                        time: 30000,
                        errors: ['time'],
                    })
                    .then((collected) => {
                        message.channel.send(`The collected message was: ${collected.first().content}\n` +
                                `Please enter the arguments now.`)
                            .then(() => {
                                if (collected.first().content === "1") {
                                    message.channel.awaitMessages(response => response.author === author, {
                                            max: 1,
                                            time: 30000,
                                            errors: ['time'],
                                        })
                                        .then((collected) => {
                                            message.channel.send(`The collected message was: ${collected.first().content}`);
                                            let args = collected.first().content;
                                            commandPrefix.run(message, command, args, client);
                                        })
                                        .catch(() => {
                                            message.channel.send('There was no collected message that passed the filter within the time limit!');
                                        });
                                }
                                if (collected.first().content === "2") {
                                    message.channel.awaitMessages(response => response.author === author, {
                                            max: 1,
                                            time: 30000,
                                            errors: ['time'],
                                        })
                                        .then((collected) => {
                                            message.channel.send(`The collected message was: ${collected.first().content}`);
                                            let testMessage = collected.first();
                                            commandPurge.run(message, command, args, client, testMessage);
                                        })
                                        .catch(() => {
                                            message.channel.send('There was no collected message that passed the filter within the time limit!');
                                        });
                                }
                                if (collected.first().content === "3") {
                                    commandKickVoice.run(message, command, args, client);
                                }
                                if (collected.first().content === "4") {
                                    commandScramble.run(message, command, args, client);
                                }
                                if (collected.first().content === "5") {
                                    commandLastReboot.run(message, command, args, lastReboot);
                                }
                            });
                    })
                    .catch(() => {
                        message.channel.send('There was no collected message that passed the filter within the time limit!');
                    });
            });
    }
}

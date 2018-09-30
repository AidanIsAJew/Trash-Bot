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
const commandSetConf = require("../commands/setconf.js");
const commandShowConf = require("../commands/showconf.js");

module.exports = {
    run: async (message, command, args, client, lastReboot, guildConf) => {
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
            .setDescription("**1) prefix**\n\n" +
                "**2) purge**\n\n" +
                "**3) kickvoice**\n\n" +
                "**4) scramble**\n\n" +
                "**5) last reboot**\n\n" +
                "**6) show config**\n\n" +
                "**7) set config**\n\n" +
                "**8)**\n\n" +
                "**9)**\n\n" +
                "*10) Next page*\n\n");

        // commands
        const commands = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        message.channel.send(adminPannel)
            .then(() => {
                message.channel.awaitMessages(response => commands.includes(response.content) && response.author === author, {
                        max: 1,
                        time: 30000,
                        errors: ['time'],
                    })
                    .then((collected) => {
                        message.channel.send(`The collected message was: \`${collected.first().content}\`\n`)
                            .then(() => {
                                if (collected.first().content === "1") {
                                    message.channel.send(`Please enter the arguments now.`);
                                    message.channel.awaitMessages(response => response.author === author, {
                                            max: 1,
                                            time: 30000,
                                            errors: ['time'],
                                        })
                                        .then((collected) => {
                                            message.channel.send(`The collected message was: \`${collected.first().content}\``);
                                            let testMessage = collected.first();
                                            commandPrefix.run(message, command, args, client, testMessage);
                                        })
                                        .catch(() => {
                                            message.channel.send('There was no collected message that passed the filter within the time limit!');
                                        });
                                }
                                if (collected.first().content === "2") {
                                    message.channel.send(`Please enter the arguments now.`);
                                    message.channel.awaitMessages(response => response.author === author, {
                                            max: 1,
                                            time: 30000,
                                            errors: ['time'],
                                        })
                                        .then((collected) => {
                                            message.channel.send(`The collected message was: \`${collected.first().content}\``);
                                            let testMessage = collected.first();
                                            commandPurge.run(message, command, args, client, testMessage);
                                        })
                                        .catch(() => {
                                            message.channel.send('There was no collected message that passed the filter within the time limit!');
                                        });
                                }
                                if (collected.first().content === "3") {
                                    message.channel.send(`Please enter the arguments now.`);
                                    message.channel.awaitMessages(response => response.author === author, {
                                            max: 1,
                                            time: 30000,
                                            errors: ['time'],
                                        })
                                        .then((collected) => {
                                            message.channel.send(`The collected message was: \`${collected.first().content}\``);
                                            let testMessage = collected.first();
                                            commandKickVoice.run(message, command, args, client, testMessage);
                                        })
                                        .catch(() => {
                                            message.channel.send('There was no collected message that passed the filter within the time limit!');
                                        });
                                }
                                if (collected.first().content === "4") {
                                    message.channel.send(`Please enter the arguments now.`);
                                    message.channel.awaitMessages(response => response.author === author, {
                                            max: 1,
                                            time: 30000,
                                            errors: ['time'],
                                        })
                                        .then((collected) => {
                                            message.channel.send(`The collected message was: \`${collected.first().content}\``);
                                            let testMessage = collected.first();
                                            commandScramble.run(message, command, args, client, testMessage);
                                        })
                                        .catch(() => {
                                            message.channel.send('There was no collected message that passed the filter within the time limit!');
                                        });
                                }
                                if (collected.first().content === "5") {
                                    commandLastReboot.run(message, command, args, lastReboot);
                                }
                                if (collected.first().content === "6") {
                                    commandShowConf.run(message, command, args, client, guildConf);
                                }
                                if (collected.first().content === "7") {
                                    message.channel.send(`Please enter the arguments now.`);
                                    message.channel.awaitMessages(response => response.author === author, {
                                            max: 1,
                                            time: 30000,
                                            errors: ['time'],
                                        })
                                        .then((collected) => {
                                            message.channel.send(`The collected message was: \`${collected.first().content}\``);
                                            let testMessage = collected.first();
                                            commandSetConf.run(message, command, args, client, testMessage);
                                        })
                                        .catch(() => {
                                            message.channel.send('There was no collected message that passed the filter within the time limit!');
                                        });
                                }
                                if (collected.first().content === "10") {
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
                                        .setTitle('Admin Pannel *Cont.*')
                                        // Set the color of the embed
                                        .setColor(0xe922ed)
                                        // Set Footer
                                        .setFooter("Please choose an option.")
                                        // Set the main content of the embed
                                        .setDescription("**11)**\n\n" +
                                            "**12)**\n\n" +
                                            "**13)**\n\n" +
                                            "**14)**\n\n" +
                                            "**15)**\n\n" +
                                            "**16)**\n\n" +
                                            "**17)**\n\n" +
                                            "**18)**\n\n" +
                                            "**19)**\n\n" +
                                            "**20)**\n\n");

                                    // commands
                                    const commandsNext = ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
                                    message.channel.send(adminPannel)
                                        .then(() => {
                                            message.channel.awaitMessages(response => commandsNext.includes(response.content) && response.author === author, {
                                                    max: 1,
                                                    time: 30000,
                                                    errors: ['time'],
                                                })
                                                .then((collected) => {
                                                    message.channel.send(`The collected message was: \`${collected.first().content}\`\n`)
                                                        .then(() => {
                                                            if (collected.first().content === "11") {
                                                                message.channel.send(`Please enter the arguments now.`);
                                                                message.channel.awaitMessages(response => response.author === author, {
                                                                        max: 1,
                                                                        time: 30000,
                                                                        errors: ['time'],
                                                                    })
                                                                    .then((collected) => {
                                                                        message.channel.send(`The collected message was: \`${collected.first().content}\``);
                                                                        let testMessage = collected.first();
                                                                        //commandPrefix.run(message, command, args, client, testMessage);
                                                                    })
                                                                    .catch(() => {
                                                                        message.channel.send('There was no collected message that passed the filter within the time limit!');
                                                                    });
                                                            }
                                                        });
                                                })
                                                .catch(() => {
                                                    message.channel.send('There was no collected message that passed the filter within the time limit!');
                                                });
                                        });
                                }
                            });
                    })
                    .catch(() => {
                        message.channel.send('There was no collected message that passed the filter within the time limit!');
                    });
            });
    }
}

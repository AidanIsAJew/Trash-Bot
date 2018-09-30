const Discord = require("discord.js");
// I dont remeber what this does \_O-O_/
const fs = require("fs")
// Config
const config = require("../settings/config.json");
// Defualt prefix
const defPrefix = "!";
const owner = config.ownerID;
const coOwner = config.coOwnerID;

module.exports = {
    run: async (message, command, args, client, testMessage) => {
        if (message.author.id === owner || message.author.id === coOwner) {} else {
            message.channel.send(`Permission Denied!`);
            return;
        }

        function isValidURL(string) {
            var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            if (res == null)
                return false;
            else
                return true;
        };
        if (testMessage) {

        } else {
            let author = message.author;
            let ImMad = new Discord.RichEmbed()
                // Set the author
                .setAuthor(client.user.username, client.user.avatarURL)
                // Set time
                .setTimestamp()
                // Set the title of the field
                .setTitle('Type')
                // Set the color of the embed
                .setColor(0xe922ed)
                // Set Footer
                .setFooter("Please choose an option.")
                // Set the main content of the embed
                .setDescription("**1) Playing**\n\n" +
                    "**2) Streaming**\n\n" +
                    "**3) Listening**\n\n" +
                    "**4) Watching**\n\n");

            // commands
            const commandsImMad = ['1', '2', '3', '4'];
            message.channel.send(ImMad)
                .then(() => {
                    message.channel.awaitMessages(response => commandsImMad.includes(response.content) && response.author === author, {
                            max: 1,
                            time: 30000,
                            errors: ['time'],
                        })
                        .then((collected) => {
                            message.channel.send(`The collected message was: \`${collected.first().content}\`\n`)
                                .then(() => {
                                    if (collected.first().content === "1") {
                                        let gameType = `PLAYING`;

                                        client.user.setPresence({
                                            game: {
                                                name: `Prefix: ` + client.settings.get(message.guild.id, "prefix"),
                                                type: gameType
                                            },
                                            status: 'online'
                                        });

                                        collected.first().react('👌');
                                    }
                                    if (collected.first().content === "2") {
                                        let gameType = `STREAMING`;

                                        client.user.setPresence({
                                            game: {
                                                name: `Prefix: ` + client.settings.get(message.guild.id, "prefix"),
                                                type: gameType,
                                                url: `https://www.twitch.tv/AidanIsAJew` //streamurl
                                            },
                                            status: 'online'
                                        });

                                        collected.first().react('👌');
                                    }
                                    if (collected.first().content === "3") {
                                        let gameType = `LISTENING`;

                                        client.user.setPresence({
                                            game: {
                                                name: `Prefix: ` + client.settings.get(message.guild.id, "prefix"),
                                                type: gameType
                                            },
                                            status: 'online'
                                        });

                                        collected.first().react('👌');
                                    }
                                    if (collected.first().content === "4") {
                                        let gameType = `WATCHING`;

                                        client.user.setPresence({
                                            game: {
                                                name: `Prefix: ` + client.settings.get(message.guild.id, "prefix"),
                                                type: gameType
                                            },
                                            status: 'online'
                                        });

                                        collected.first().react('👌');
                                    }
                                });
                        })
                        .catch(() => {
                            message.channel.send('There was no collected message that passed the filter within the time limit!');
                        });
                });
            //client.user.setPresence({ game: { name: `Prefix: ` + client.settings.get(guildDevServer.id, "prefix"), type: `STREAMING`, url: `https://www.twitch.tv/AidanIsAJew` }, status: 'online' });
        }
    }
}

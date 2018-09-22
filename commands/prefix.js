const Discord = require("discord.js");
// I dont remeber what this does \_O-O_/
const fs = require("fs")
// Config
const config = require("../settings/config.json");
// Defualt prefix
const defPrefix = "!";

module.exports = {
    run: async (message, command, args, client, testMessage) => {
        // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
        if (testMessage) {
            console.log(testMessage.content);
            let newPrefix = testMessage.content.split(" ").slice(0, 1)[0];
            // Makes sure there is a new prefix
            if (newPrefix === undefined) {
                testMessage.reply('Please enter a prefix.');
                // Return jf no new prefix was defined
                return;
            }
            // Change the configuration in memory
            console.log(`\nCurrent Prefix: ` + config.prefix + `\nNew Prefix: ` + newPrefix);
            let oldprefix = config.prefix;
            config.prefix = newPrefix;

            // Save the file.
            fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);

            // Set user Activity
            client.user.setActivity(`Prefix: ` + config.prefix);

            // React to message
            if (testMessage) {
                testMessage.react('👌');
            } else {
                message.react('👌');
            }

            // Setup the embeded message
            let prefixreply = new Discord.RichEmbed()
                // Set the author
                .setAuthor(client.user.username, client.user.avatarURL)
                // Set time
                .setTimestamp()
                // Set the title of the field
                .setTitle('Prefix Change')
                // Set the color of the embed
                .setColor(0x4286f4)
                // Set Footer
                .setFooter("Emitted whenever the prefix is changed in a guild.")
                // Set the main content of the embed
                .setDescription('\nOld prefix: ' + oldprefix + '\nNew prefix: ' + config.prefix);
            // Send the embed to the same channel as the message

            const logs = message.guild.channels.find(x => x.name === 'logs');
            if (!logs) {
                message.channel.send(prefixreply);
            }
            logs.send(prefixreply);
        }
        if (testMessage === undefined) {
            let newPrefix = message.content.split(" ").slice(1, 2)[0];
            // Makes sure there is a new prefix
            if (newPrefix === undefined) {
                message.reply('Please enter a prefix.');
                // Return jf no new prefix was defined
                return;
            }
            // Change the configuration in memory
            console.log(`\nCurrent Prefix: ` + config.prefix + `\nNew Prefix: ` + newPrefix);
            let oldprefix = config.prefix;
            config.prefix = newPrefix;

            // Save the file.
            fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);

            // Set user Activity
            client.user.setActivity(`Prefix: ` + config.prefix);

            // React to message
            if (testMessage) {
                testMessage.react('👌');
            } else {
                message.react('👌');
            }

            // Setup the embeded message
            let prefixreply = new Discord.RichEmbed()
                // Set the author
                .setAuthor(client.user.username, client.user.avatarURL)
                // Set time
                .setTimestamp()
                // Set the title of the field
                .setTitle('Prefix Change')
                // Set the color of the embed
                .setColor(0x4286f4)
                // Set Footer
                .setFooter("Emitted whenever the prefix is changed in a guild.")
                // Set the main content of the embed
                .setDescription('\nOld prefix: ' + oldprefix + '\nNew prefix: ' + config.prefix);
            // Send the embed to the same channel as the message

            const logs = message.guild.channels.find(x => x.name === 'logs');
            if (!logs) {
                message.channel.send(prefixreply);
            }
            logs.send(prefixreply);
        }
    }
}

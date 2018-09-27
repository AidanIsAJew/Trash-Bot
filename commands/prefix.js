const Discord = require("discord.js");
// I dont remeber what this does \_O-O_/
const fs = require("fs")
// Config
const config = require("../settings/config.json");


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
            let oldprefix = client.settings.get(testMessage.guild.id, "prefix");
            console.log(`\nCurrent Prefix: ` + oldprefix + `\nNew Prefix: ` + newPrefix);

            //config.prefix = newPrefix;

            const [prop, ...value] = ["prefix", newPrefix];

            // Example:
            // prop: "prefix"
            // value: ["+"]
            // (yes it's an array, we join it further down!)

            // We can check that the key exists to avoid having multiple useless,
            // unused keys in the config:
            if (!client.settings.has(testMessage.guild.id, prop)) {
                return testMessage.reply("This key is not in the configuration.");
            }

            // Now we can finally change the value. Here we only have strings for values
            // so we won't bother trying to make sure it's the right type and such.
            client.settings.set(testMessage.guild.id, value.join(" "), prop);
            testMessage.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
            // Set user Activity
            client.user.setActivity(`Prefix: ` + client.settings.get(testMessage.guild.id, prop));

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
                .setDescription('\nOld prefix: ' + oldprefix + '\nNew prefix: ' + client.settings.get(testMessage.guild.id, prop));
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
            let oldprefix = client.settings.get(message.guild.id, "prefix");
            console.log(`\nCurrent Prefix: ` + oldprefix + `\nNew Prefix: ` + newPrefix);

            //config.prefix = newPrefix;

            const [prop, ...value] = ["prefix", newPrefix];

            // Example:
            // prop: "prefix"
            // value: ["+"]
            // (yes it's an array, we join it further down!)

            // We can check that the key exists to avoid having multiple useless,
            // unused keys in the config:
            if (!client.settings.has(message.guild.id, prop)) {
                return message.reply("This key is not in the configuration.");
            }

            // Now we can finally change the value. Here we only have strings for values
            // so we won't bother trying to make sure it's the right type and such.
            client.settings.set(message.guild.id, value.join(" "), prop);
            message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
            // Set user Activity
            client.user.setActivity(`Prefix: ` + client.settings.get(message.guild.id, prop));

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
                .setDescription('\nOld prefix: ' + oldprefix + '\nNew prefix: ' + client.settings.get(message.guild.id, prop));
            // Send the embed to the same channel as the message

            const logs = message.guild.channels.find(x => x.name === 'logs');
            if (!logs) {
                message.channel.send(prefixreply);
            }
            logs.send(prefixreply);
        }
    }
}

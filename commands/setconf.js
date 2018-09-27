const Discord = require("discord.js");
// I dont remeber what this does \_O-O_/
const fs = require("fs")
// Config
const config = require("../settings/config.json");


module.exports = {
    run: async (message, command, args, client, testMessage) => {
        if (testMessage) {
            let args = testMessage.content.split(/\s+/g);
            const [prop, ...value] = args;

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

            if (testMessage) {
                testMessage.react('👌');
            } else {
                message.react('👌');
            }
        }
        if (testMessage === undefined) {
            const [prop, ...value] = args;
            message.channel.send(args);
            message.channel.send(prop);
            message.channel.send(value);
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

            // React to message
            if (testMessage) {
                testMessage.react('👌');
            } else {
                message.react('👌');
            }
        }
    }
}

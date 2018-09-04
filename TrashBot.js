const Discord = require("discord.js");
// Create an instance of a Discord client
const client = new Discord.Client();
// I dont remeber what this does \_O-O_/
const fs = require("fs")
// Config
const config = require("./settings/config.json");
// Defualt prefix
const defPrefix = "!";


module.exports = {
    run: async (message) => {

        let prefix = config.prefix;
        // find the length of the prefix and slice prefix
        // split the command from the args
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        // get just the command
        const command = args.shift().toLowerCase();


        // If the message is "ping"
        if (command === "ping") {
            // Send "pong" to the same person
            const m = await message.channel.send("Ping?");
            // Edit the message and measure the time from the orginal message sent and the edit
            m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
        }


        // If the message is "gay"
        if (command === "gay") {
            // Send "no u" to the same person
            message.reply('no u');
            console.log(`I was sexually assualted today!`);
        }

        // If the message is "say"
        if (command === "say") {
            const sayMessage = args.join(" ");
            // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
            message.delete().catch(O_o => {});
            // And we get the bot to say the thing:
            message.channel.send(sayMessage);
        }

        // If the message is "prefix"
        if (command === "prefix") {
            // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
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

            // Setup the embeded message
            let prefixreply = new Discord.RichEmbed()
                // Set the title of the field
                .setTitle('Prefix Change')
                // Set the color of the embed
                .setColor(0xFF0000)
                // Set the main content of the embed
                .setDescription('\nOld prefix: ' + oldprefix + '\nNew prefix: ' + config.prefix);
            // Send the embed to the same channel as the message

            const logs = message.guild.channels.find('name', 'logs');
            if (!logs) {
              message.channel.send(prefixreply);
            }
            logs.send(prefixreply);
        }
    }
}

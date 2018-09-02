// Import the discord.js module
const Discord = require("discord.js");
// Create an instance of a Discord client
const client = new Discord.Client();
// I dont remeber what this does \_O-O_/
const fs = require("fs")
// Config
const config = require("./config.json");
// Defualt prefix
const defPrefix = "!";



/**
 * The ready event is vital, it means that only after this will your bot start reacting to information
 * received from Discord
 */
let currentDate = new Date();
let date = currentDate.getDate();
let month = currentDate.getMonth();
let year = currentDate.getFullYear();
let hour = currentDate.getHours();
let minute = currentDate.getMinutes();
let seconds = currentDate.getSeconds();
let time = (month + 1) + "/" + date + "/" + year + " " + hour + ":" + minute + ":" + seconds + " : ";

client.on("ready", () => {
    console.log(time + `Logged in as ${client.user.tag}\n`);
});


// Sets defualt prefix
config.prefix = defPrefix;
fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);



// Create an event listener for messages
client.on("message", (message) => {
    //exit if no prefix
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    // If the message is "ping"
    if (message.content.startsWith(config.prefix + 'ping')) {
        // Send "pong" to the same person
        message.reply('pong!');
    } else
        // If the message is "gay"
        if (message.content.startsWith(config.prefix + 'gay')) {
            // Send "no u" to the same person
            message.reply('no u');
            console.log(`I was sexually assualted today!`);
        } else
            // Does something
            if (message.content.startsWith(config.prefix + 'prefix')) {
                // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
                let newPrefix = message.content.split(" ").slice(1, 2)[0];
                if (newPrefix === undefined) {
                    message.reply('Please enter a prefix.');
                    return;
                }
                // change the configuration in memory
                console.log(`\nCurrent Prefix: ` + config.prefix + `\nNew Prefix: ` + newPrefix);
                let oldprefix = config.prefix;
                config.prefix = newPrefix;

                // Now we have to save the file.
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
                message.channel.send(prefixreply);
            }
});



// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(config.token);

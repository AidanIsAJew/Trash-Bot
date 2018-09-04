// Import the discord.js module
const Discord = require("discord.js");
// Create an instance of a Discord client
const client = new Discord.Client();
// I dont remeber what this does \_O-O_/
const fs = require("fs")
// Config
const config = require("./settings/config.json");
// Defualt prefix
const defPrefix = "!";
// Time
const time = require("./func/time.js");
// Command handler
const TrashBot = require("./handler/TrashBot.js");


client.on("ready", () => {
    console.log(time.run() + `Logged in as ${client.user.tag}\n` + `Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.\n\n`);
    //Sets the game
    client.user.setActivity(`Faithfuly serving the TRASH server since 9/4/18!`);
});

// Bot is joins a guild.
client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

// Bot is removed from a guild.
client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

// Error Handler
client.on('error', console.error);

// Sets and writes defualt prefix
config.prefix = defPrefix;
fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);


// Create an event listener for messages
client.on("message", async message => {
    //exit if no prefix
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    //run the command handler
    TrashBot.run(message);
});



// Log bot in using the token from https://discordapp.com/developers/applications/me
client.login(config.token);

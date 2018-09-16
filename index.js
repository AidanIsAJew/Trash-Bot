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
    // Sets the game
    client.user.setActivity(`Faithfuly serving the TRASH server since 9/4/18!`);

    // create and assign role to me (aidan)
    const guildDevServer = client.guilds.find(x => x.name === "Dev Server");
    let ownerRole = guildDevServer.roles.find(x => x.name === "Bot Dev");
    let aidanInGuild = guildDevServer.members.find(x => x.id === "207684258913976320");
    if (!ownerRole) {
        guildDevServer.createRole({
                name: 'Bot Dev',
                color: 0xf74ada,
            })
            .then(role => {
                console.log(`Created new role with name ${role.name} and color ${role.color}\n`)
                if (aidanInGuild) {
                    aidanInGuild.addRole(role.id).catch(console.error);
                }
            })
            .catch(console.error);
    } else if (aidanInGuild) {
      if (aidanInGuild) {
          aidanInGuild.addRole(ownerRole.id).catch(console.error);
      }
    }

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
client.on("error", console.error);

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


client.on('channelCreate', channel => {
    const logs = client.channels.find(x => x.name === 'logs');
    if (!logs) {
        console.log("no log channel");
        return;
    }
    // Setup the embeded message
    let channelCreateE = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle('Channel Created')
        // Set the color of the embed
        .setColor(0x55f441)
        // Set the main content of the embed
        .setDescription("A " + channel.type + " channel with ID: " + channel.id + " was just created\n\nEmitted whenever a channel is created.");
    logs.send(channelCreateE);
    console.log("Channel Created");
});

client.on('channelDelete', channel => {
    const logs = client.channels.find(x => x.name === 'logs');
    if (!logs) {
        console.log("no log channel");
        return;
    }
    // Setup the embeded message
    let channelDeleteE = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle('Channel Deleted')
        // Set the color of the embed
        .setColor(0xf44141)
        // Set the main content of the embed
        .setDescription("A " + channel.type + " channel with ID: " + channel.id + " was just deleted\n\nEmitted whenever a channel is deleted.");
    console.log("Channel Deleted");
    logs.send(channelDeleteE);
});

client.on('channelPinsUpdate', channel => {
    const logs = client.channels.find(x => x.name === 'logs');
    if (!logs) {
        console.log("no log channel");
        return;
    }
    // Setup the embeded message
    let channelPinsUpdateE = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle('Pins Updated')
        // Set the color of the embed
        .setColor(0xfffb38)
        // Set the main content of the embed
        .setDescription("The pins of a channel with ID: " + channel.id + " was just updated\n\nEmitted whenever the pins of a channel are updated. Due to the nature of the WebSocket event, not much information can be provided easily here");
    console.log("Pin Updated");
    logs.send(channelPinsUpdateE);
});

client.on('channelUpdate', channel => {
    const logs = client.channels.find(x => x.name === 'logs');
    if (!logs) {
        console.log("no log channel");
        return;
    }
    // Setup the embeded message
    let channelUpdateE = new Discord.RichEmbed()
        // Set the title of the field
        .setTitle('Channel Updated')
        // Set the color of the embed
        .setColor(0xfffb38)
        // Set the main content of the embed
        .setDescription("A " + channel.type + " channel with ID: " + channel.id + " was just updated\n\nEmitted whenever a channel is updated - e.g. name change, topic change.");
    console.log("Channel Updated");
    logs.send(channelUpdateE);
});

// Log bot in using the token from https://discordapp.com/developers/applications/me
client.login(config.token);

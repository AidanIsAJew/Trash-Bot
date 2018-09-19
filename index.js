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
// Talked Recently
const talkedRecently = new Set();


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
    // Exit if has talked in 2.5 seconds
    if (talkedRecently.has(message.author.id))
        return;

    // Adds the user to the set so that they can't talk for 2.5 seconds
    talkedRecently.add(message.author.id);
    setTimeout(() => {
        // Removes the user from the set after 2.5 seconds
        talkedRecently.delete(message.author.id);
    }, 2500);
    //run the command handler
    TrashBot.run(message, client);
});


client.on('channelCreate', channel => {
    if (channel.type == "dm") return;
    if (channel.type == "group") return;
    if (channel.name === "Temp Channel") return;
    const logs = client.channels.find(x => x.name === 'logs');
    if (!logs) {
        console.log("no log channel");
        return;
    }
    // Setup the embeded message
    let channelCreateE = new Discord.RichEmbed()
        // Set the author
        .setAuthor(client.user.username, client.user.avatarURL)
        // Set time
        .setTimestamp()
        // Set the author
        .setAuthor(client.user.username, client.user.avatarURL)
        // Set time
        .setTimestamp()
        // Set the title of the field
        .setTitle('Channel Created')
        // Set the color of the embed
        .setColor(0x55f441)
        // Set Footer
        .setFooter("Emitted whenever a channel is created.")
        // Set the main content of the embed
        .setDescription("A " + channel.type + " channel with ID: " + channel.id + " and name: " + channel.name + ", was just created.\n\n");
    logs.send(channelCreateE);
    console.log("Channel Created");
});

client.on('channelDelete', channel => {
    if (channel.type == "dm") return;
    if (channel.type == "group") return;
    if (channel.name === "Temp Channel") return;
    const logs = client.channels.find(x => x.name === 'logs');
    if (!logs) {
        console.log("no log channel");
        return;
    }
    // Setup the embeded message
    let channelDeleteE = new Discord.RichEmbed()
        // Set the author
        .setAuthor(client.user.username, client.user.avatarURL)
        // Set time
        .setTimestamp()
        // Set the title of the field
        .setTitle('Channel Deleted')
        // Set the color of the embed
        .setColor(0xf44141)
        // Set Footer
        .setFooter("Emitted whenever a channel is deleted.")
        // Set the main content of the embed
        .setDescription("A " + channel.type + " channel with ID: " + channel.id + " and name: " + channel.name + ", was just deleted.\n\n");
    console.log("Channel Deleted");
    logs.send(channelDeleteE);
});

client.on('channelPinsUpdate', channel => {
    if (channel.type == "dm") return;
    if (channel.type == "group") return;
    const logs = client.channels.find(x => x.name === 'logs');
    if (!logs) {
        console.log("no log channel");
        return;
    }
    // Setup the embeded message
    let channelPinsUpdateE = new Discord.RichEmbed()
        // Set the author
        .setAuthor(client.user.username, client.user.avatarURL)
        // Set time
        .setTimestamp()
        // Set the title of the field
        .setTitle('Pins Updated')
        // Set the color of the embed
        .setColor(0xfffb38)
        // Set Footer
        .setFooter("Emitted whenever the pins of a channel are updated.")
        // Set the main content of the embed
        .setDescription("The pins of a channel with ID: " + channel.id + " and name: " + channel.name + ", was just updated.\n\n");
    console.log("Pin Updated");
    logs.send(channelPinsUpdateE);
});

client.on('channelUpdate', channel => {
    if (channel.type == "dm") return;
    if (channel.type == "group") return;
    const logs = client.channels.find(x => x.name === 'logs');
    if (!logs) {
        console.log("no log channel");
        return;
    }
    // Setup the embeded message
    let channelUpdateE = new Discord.RichEmbed()
        // Set the author
        .setAuthor(client.user.username, client.user.avatarURL)
        // Set time
        .setTimestamp()
        // Set the title of the field
        .setTitle('Channel Updated')
        // Set the color of the embed
        .setColor(0xfffb38)
        // Set Footer
        .setFooter("Emitted whenever a channel is updated.")
        // Set the main content of the embed
        .setDescription("A " + channel.type + " channel with ID: " + channel.id + " and name: " + channel.name + ", was just updated.\n\n");
    console.log("Channel Updated");
    logs.send(channelUpdateE);
});

client.on('emojiCreate', emoji => {
    const logs = client.channels.find(x => x.name === 'logs');
    if (!logs) {
        console.log("no log channel");
        return;
    }
    // Setup the embeded message
    let emojiCreateE = new Discord.RichEmbed()
        // Set the author
        .setAuthor(client.user.username, client.user.avatarURL)
        // Set time
        .setTimestamp()
        // Set the title of the field
        .setTitle('Emoji Created')
        // Set the color of the embed
        .setColor(0x55f441)
        // Set Footer
        .setFooter("Emitted whenever a custom emoji is created in a guild.")
        // Set the main content of the embed
        .setDescription("A emoji with name: " + emoji.name + ", was just created.\n\n");
    logs.send(emojiCreateE);
    console.log("Emoji Created");
});

client.on('emojiDelete', emoji => {
    const logs = client.channels.find(x => x.name === 'logs');
    if (!logs) {
        console.log("no log channel");
        return;
    }
    // Setup the embeded message
    let emojiDeleteE = new Discord.RichEmbed()
        // Set the author
        .setAuthor(client.user.username, client.user.avatarURL)
        // Set time
        .setTimestamp()
        // Set the title of the field
        .setTitle('Emoji Deleted')
        // Set the color of the embed
        .setColor(0xf44141)
        // Set Footer
        .setFooter("Emitted whenever a custom emoji is created in a guild.")
        // Set the main content of the embed
        .setDescription("A emoji with name: " + emoji.name + ", was just deleted.\n\n");
    logs.send(emojiDeleteE);
    console.log("Emoji Delted");
});

client.on('emojiUpdate', emoji => {
    const logs = client.channels.find(x => x.name === 'logs');
    if (!logs) {
        console.log("no log channel");
        return;
    }
    // Setup the embeded message
    let emojiUpdateE = new Discord.RichEmbed()
        // Set the author
        .setAuthor(client.user.username, client.user.avatarURL)
        // Set time
        .setTimestamp()
        // Set the title of the field
        .setTitle('Emoji Updated')
        // Set the color of the embed
        .setColor(0xfffb38)
        // Set Footer
        .setFooter("Emitted whenever a custom emoji is created in a guild.")
        // Set the main content of the embed
        .setDescription("A emoji with name: " + emoji.name + ", was just updated.\n\n");
    logs.send(emojiUpdateE);
    console.log("Emoji Updated");
});

client.on('guildBanAdd', userBan => {
    const logs = client.channels.find(x => x.name === 'logs');
    if (!logs) {
        console.log("no log channel");
        return;
    }
    // Setup the embeded message
    let guildBanAddE = new Discord.RichEmbed()
        // Set the author
        .setAuthor(client.user.username, client.user.avatarURL)
        // Set time
        .setTimestamp()
        // Set the title of the field
        .setTitle('User Banned')
        // Set the color of the embed
        .setColor(0x4b23ed)
        // Set Footer
        .setFooter("Emitted whenever a member is banned from a guild.")
        // Set the main content of the embed
        .setDescription("A user with ID: " + userBan.id + " and name: " + userBan.username + userBan.tag + ", was just banned.\n\n");
    logs.send(guildBanAddE);
    console.log("User Banned");
});

client.on('guildBanRemove', userBan => {
    const logs = client.channels.find(x => x.name === 'logs');
    if (!logs) {
        console.log("no log channel");
        return;
    }
    // Setup the embeded message
    let guildBanRemoveE = new Discord.RichEmbed()
        // Set the author
        .setAuthor(client.user.username, client.user.avatarURL)
        // Set time
        .setTimestamp()
        // Set the title of the field
        .setTitle('User Unbanned')
        // Set the color of the embed
        .setColor(0x4b23ed)
        // Set Footer
        .setFooter("Emitted whenever a member is unbanned from a guild.")
        // Set the main content of the embed
        .setDescription("A user with ID: " + userBan.id + " and name: " + userBan.username + userBan.tag + ", was just unbanned.\n\n");
    logs.send(guildBanRemoveE);
    console.log("User Unbanned");
});


// Log bot in using the token from https://discordapp.com/developers/applications/me
client.login(config.token);

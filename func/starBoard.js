// Import the discord.js module
const Discord = require("discord.js");
// I dont remeber what this does \_O-O_/
const fs = require("fs");
// Config
const config = require("../settings/config.json");

module.exports = {
    // This is where all the action happens.
    async run(reaction, user) {
        const message = reaction.message;
        // This is the first check where we check to see if the reaction is not the unicode star emote.
        if (reaction.emoji.name !== '⭐') return;
        // Here we check to see if the person who reacted is the person who sent the original message.
        if (message.author.id === user.id) return message.channel.send(`${user}, you cannot star your own messages.`);
        // This is our final check, checking to see if message was sent by a bot.
        if (message.author.bot) return message.channel.send(`${user}, you cannot star bot messages.`);
        // Here we get the starboard channel from the guilds settings.
        const starboardChannel = /*this.client.settings.get(message.guild.id)*/"star-board";
        // Here we will find the channel
        const starChannel = message.guild.channels.find(channel => channel.name == starboardChannel);
        // If there's no starboard channel, we stop the event from running any further, and tell them that they don't have a starboard channel.
        if (!starChannel) return message.channel.send(`It appears that you do not have a \`${starboardChannel}\` channel.`);
    }
}

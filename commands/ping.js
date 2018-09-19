const Discord = require("discord.js");
// Create an instance of a Discord client
const fs = require("fs")
// Config
const config = require("../settings/config.json");
// Defualt prefix
const defPrefix = "!";


module.exports = {
    run: async (message, command, args) => {
        // Send "pong" to the same person
        const m = await message.channel.send("Ping?");
        // Edit the message and measure the time from the orginal message sent and the edit
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
    }
}

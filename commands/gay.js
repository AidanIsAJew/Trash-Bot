const Discord = require("discord.js");
// I dont remeber what this does \_O-O_/
const fs = require("fs")
// Config
const config = require("../settings/config.json");
// Defualt prefix
const defPrefix = "!";


module.exports = {
    run: async (message, command, args) => {
        // Send "no u" to the same person
        message.reply('no u');
        console.log(`I was sexually assualted today!`);
    }
}

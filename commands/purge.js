const Discord = require("discord.js");
// Create an instance of a Discord client
const fs = require("fs")
// Config
const config = require("../settings/config.json");
// Defualt prefix
const defPrefix = "!";


module.exports = {
    run: async (message, command, args, client, testMessage) => {
        if (testMessage) {
            const user = testMessage.mentions.users.first();
            // Parse Amount
            const amount = user ? parseInt(testMessage.content.split(' ')[1]) : testMessage.content;
            if (!amount && !user) return testMessage.reply('Must specify a user and amount, or just an amount, of messages to purge!');
            if (!amount) return testMessage.reply('Must specify an amount to delete!');
            // Fetch 100 messages (will be filtered and lowered up to max amount requested)
            testMessage.channel.fetchMessages({
                limit: 100,
            }).then((messages) => {
                if (user) {
                  const filterBy = user ? user.id : client.user.id;
                  messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
              } else {
                messages = messages.array().slice(0, amount);
              }
                testMessage.channel.bulkDelete(messages).catch(error => console.log(error.stack));
            });
        } else {
            const user = message.mentions.users.first();
            // Parse Amount
            const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
            if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
            if (!amount) return message.reply('Must specify an amount to delete!');
            // Fetch 100 messages (will be filtered and lowered up to max amount requested)
            message.channel.fetchMessages({
                limit: 100,
            }).then((messages) => {
                if (user) {
                    const filterBy = user ? user.id : client.user.id;
                    messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
                } else {
                  messages = messages.array().slice(0, amount);
                }
                message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
            });
        }
    }
}

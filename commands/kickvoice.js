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
            // Make sure the bot user has permissions to make channels and move members in the guild:
            if (!testMessage.guild.me.hasPermission(['MANAGE_CHANNELS', 'MOVE_MEMBERS'])) return testMessage.reply('Missing the required `Manage Channels` and `Move Members` permissions.');

            // Get the mentioned user/bot and check if they're in a voice channel:
            const member = testMessage.mentions.members.first();
            if (!member) return testMessage.reply('You need to @mention a user/bot to kick from the voice channel.');
            if (!member.voiceChannel) return testMessage.reply('That user/bot isn\'t in a voice channel.');

            // Now we make a temporary voice channel, move the user/bot into the channel, and delete it:
            const temp_channel = await testMessage.guild.createChannel("Temp Channel", 'voice', [{
                    id: testMessage.guild.id,
                    deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'],
                },
                {
                    id: testMessage.member.id,
                    deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK']
                }
            ]);
            await member.setVoiceChannel(temp_channel);

            await temp_channel.delete();

            // Finally, pass some user response to show it all worked out:
            testMessage.react('👌');
        } else {
            // Make sure the bot user has permissions to make channels and move members in the guild:
            if (!message.guild.me.hasPermission(['MANAGE_CHANNELS', 'MOVE_MEMBERS'])) return message.reply('Missing the required `Manage Channels` and `Move Members` permissions.');

            // Get the mentioned user/bot and check if they're in a voice channel:
            const member = message.mentions.members.first();
            if (!member) return message.reply('You need to @mention a user/bot to kick from the voice channel.');
            if (!member.voiceChannel) return message.reply('That user/bot isn\'t in a voice channel.');

            // Now we make a temporary voice channel, move the user/bot into the channel, and delete it:
            const temp_channel = await message.guild.createChannel("Temp Channel", 'voice', [{
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'],
                },
                {
                    id: message.member.id,
                    deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK']
                }
            ]);
            await member.setVoiceChannel(temp_channel);

            await temp_channel.delete();

            // Finally, pass some user response to show it all worked out:
            message.react('👌');
        }
    }
}

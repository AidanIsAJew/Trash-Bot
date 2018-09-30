const Discord = require("discord.js");
// I dont remeber what this does \_O-O_/
const fs = require("fs")
// Config
const config = require("../settings/config.json");


module.exports = {
    run: async (message, command, args, client, testMessage) => {
        if (testMessage) {
          let member = testMessage.mentions.members.first();
          if (!member)
              return testMessage.reply("Please mention a valid member of this server");
          if (!member.bannable)
              return testMessage.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
          let reason = testMessage.content.split(' ').slice(1).join(' ');
          if (!reason) reason = "No reason provided";
          await member.ban(reason)
              .catch(error => testMessage.reply(`Sorry ${testMessage.author} I couldn't ban because of : ${error}`));
          testMessage.reply(`**${member.user.tag}** has been banned by **${testMessage.author.tag}** because: ${reason}`);
        } else {
            let member = message.mentions.members.first();
            if (!member)
                return message.reply("Please mention a valid member of this server");
            if (!member.bannable)
                return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
            let reason = args.slice(1).join(' ');
            if (!reason) reason = "No reason provided";
            await member.ban(reason)
                .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
            message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
        }
    }
}

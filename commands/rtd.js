exports.run = async (client, message, args, level) => {
    const Discord = require("discord.js");
    const num = await Math.floor(Math.random() * 6) + 1;
    if (num == 1) {
        const embed = new Discord.RichEmbed()
            .setTitle("One!")
            .setColor(0x00AE86)
            .setImage("https://i.imgur.com/KrF74yB.png")
            .setTimestamp();
        message.channel.send({
            embed
        });
    } else if (num == 2) {
        const embed = new Discord.RichEmbed()
            .setTitle("Two!")
            .setColor(0x00AE86)
            .setImage("https://i.imgur.com/L4k2kY4.png")
            .setTimestamp();
        message.channel.send({
            embed
        });
    } else if (num == 3) {
        const embed = new Discord.RichEmbed()
            .setTitle("Three!")
            .setColor(0x00AE86)
            .setImage("https://i.imgur.com/DMT5pDo.png")
            .setTimestamp();
        message.channel.send({
            embed
        });
    } else if (num == 4) {
        const embed = new Discord.RichEmbed()
            .setTitle("Four!")
            .setColor(0x00AE86)
            .setImage("https://i.imgur.com/yKnQKcN.png")
            .setTimestamp();
        message.channel.send({
            embed
        });
    } else if (num == 5) {
        const embed = new Discord.RichEmbed()
            .setTitle("Five!")
            .setColor(0x00AE86)
            .setImage("https://i.imgur.com/ejjgvIx.png")
            .setTimestamp();
        message.channel.send({
            embed
        });
    } else if (num == 6) {
        const embed = new Discord.RichEmbed()
            .setTitle("Six!")
            .setColor(0x00AE86)
            .setImage("https://i.imgur.com/NN9Qtwp.png")
            .setTimestamp();
        message.channel.send({
            embed
        });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["roll", "dice", "die"],
    permLevel: "User"
};

exports.help = {
    name: "rtd",
    category: "Fun",
    description: "Rolls a die.",
    usage: "rtd"
};

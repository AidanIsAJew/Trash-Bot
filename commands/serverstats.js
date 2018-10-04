const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
    const embed = new Discord.RichEmbed()
        .setTitle("Server Info")
        .setColor(0x00AE86)
        .setThumbnail(message.guild.iconURL)
        .addField("Name", message.guild.name, true)
        .addField("ID", message.guild.id, true)
        .addField("Region", message.guild.region, true)
        .addField("Owner", message.guild.owner, true)
        .addField("Members", message.guild.memberCount, true)
        .addField("Created at", message.guild.createdAt, true);


    message.channel.send({
        embed
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["serverinfo", "serverstatus"],
    permLevel: "User"
};

exports.help = {
    name: "serverstats",
    category: "Miscelaneous",
    description: "Gives stats of the guild.",
    usage: "serverstats"
};

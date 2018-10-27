exports.run = async (client, message, args, level) => {
    var min = 0;
    var max = message.guild.memberCount;
    var x = Math.floor(Math.random() * (max - min) + min);
    var mems = [];
    await message.guild.members.forEach((mem) => {
      mems.push(mem);
    });
    var usr = mems[x].user.username;
    var desc = mems[x].user.discriminator;
    message.channel.send(`**${usr}#${desc}**`);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "randomuser",
    category: "Fun",
    description: "Returns a random user.",
    usage: "randomuser"
};

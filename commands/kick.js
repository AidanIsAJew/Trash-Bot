exports.run = async (client, message, args, level) => {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.reply("Please mention a valid member of this server");
    //console.log(member.user.id +"\n"+message.author.id);
    if (member.user.id === message.author.id) return message.reply("You can not kick yourself");
    if (!member.kickable) return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    let reason = args.slice(1).join(' ');
    if (!reason) reason = "No reason provided";
    await member.kick(reason)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Moderator"
};

exports.help = {
    name: "kick",
    category: "Moderation",
    description: "Kicks user with reason.",
    usage: "kick [mention] [reason]"
};

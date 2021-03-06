exports.run = async (client, message, args, level) => {
    let member = message.mentions.members.first();
    if (!member)
        return message.reply("Please mention a valid member of this server");
    if (member.user.id === message.author.id) return message.reply("You can not ban yourself");
    if (!member.bannable)
        return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
    let reason = args.slice(1).join(' ');
    if (!reason) reason = "No reason provided";
    await member.ban(reason)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Administrator"
};

exports.help = {
    name: "ban",
    category: "Moderation",
    description: "Bans user with reason.",
    usage: "ban [mention] [reason]"
};

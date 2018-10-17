exports.run = async (client, message, args, level) => {
  const settings = message.settings;
  const user = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!user) return message.reply("Please mention a valid member of this server");
  if (user.user.id === message.author.id) return message.reply("You can not mute yourself");
  const role = message.guild.roles.find(x => x.name === "GARBAGE-muted");
  if (!role) {
      await message.guild.createRole({
          name: 'GARBAGE-muted'
      });
  }
  user.removeRole(role);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Administrator"
};

exports.help = {
    name: "unmute",
    category: "Moderation",
    description: "Unblocks user from speaking in voice channels.",
    usage: "unmute [mention]"
};

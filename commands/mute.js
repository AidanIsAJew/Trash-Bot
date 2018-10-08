exports.run = async (client, message, args, level) => {
  const settings = message.settings;
  const user = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!user) return message.reply("Please mention a valid member of this server");
  if (user.user.id === message.author.id) return message.reply("You can not mute yourself");
  const role = message.guild.roles.find(x => x.name === "muted");
  if (!role) {
      await message.guild.createRole({
          name: 'muted'
      });
  }
  const chan = message.guild.channels.find(x => x.type === "voice");
  chan.guild.channels.forEach(function(channel) {
      channel.overwritePermissions(role, { //first you pass the id OR the member OR the user OR a role
          CONNECT: false,
          SPEAK: false
      });
  });
  user.addRole(role);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Administrator"
};

exports.help = {
    name: "mute",
    category: "Moderation",
    description: "Blocks user from speaking in voice channels.",
    usage: "mute [mention]"
};

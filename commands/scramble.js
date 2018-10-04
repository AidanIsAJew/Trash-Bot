exports.run = async (client, message, args, level) => {
  if (message.mentions.members.first()) {
      let nick = message.mentions.members.first().nickname;
      if (!nick) {
          nick = message.mentions.members.first().user.username;
      }
      let user = message.mentions.members.first().id;

      function randomsort(a, b) {
          return Math.random() > .5 ? -1 : 1;
      }
      var arrStr = nick;
      var randomStr = arrStr.split('').sort(randomsort);
      let aft = (randomStr.join(''));

      if (message.guild.members.get(client.user.id).hasPermission("MANAGE_NICKNAMES") && message.guild.members.get(client.user.id).hasPermission("CHANGE_NICKNAME")) {
          await message.guild.members.get(user).setNickname(aft);
          message.react('👌');
      } else {
          message.channel.send("I dont have the permissons to change nicknames in this server.");
      }

  } else {
      message.reply(`Please mention a valid member of this server`);
      return;
  }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["nick", "nickname"],
    permLevel: "Moderator"
};

exports.help = {
    name: "scramble",
    category: "Moderation",
    description: "Scrambles the nickname of a member.",
    usage: "nick [mention]"
};

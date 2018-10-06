exports.run = async (client, message, args, level) => {
  const sayMessage = args.join(" ");
  if (!sayMessage) return message.reply("please enter a message");
  // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
  message.delete().catch(O_o => {});
  // And we get the bot to say the thing:
  message.channel.send(sayMessage);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "say",
    category: "Fun",
    description: "Replys with entered message.",
    usage: "say [message]"
};

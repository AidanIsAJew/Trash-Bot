exports.run = async (client, message, args, level) => {

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["bug"],
    permLevel: "User"
};

exports.help = {
    name: "report",
    category: "System",
    description: "Send a bug report to us. The monkeys will get to it eventualy.",
    usage: "report [content]"
};

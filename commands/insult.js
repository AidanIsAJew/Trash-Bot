const request = require('request');
exports.run = async (client, message, args, level) => {
    const member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.channel.send(`Please mention a valid member of this sever.`);
    request('https://insult.mattbas.org/api/en/insult.txt?who=AAABBDD', async function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const insult = body.replace(/AAABBDD/gi, `${member}`);
            message.channel.send(insult);
        }
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "insult",
    category: "Fun",
    description: "Insults the mentoned user.",
    usage: "insult [mention]"
};

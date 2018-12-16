exports.run = async (client, message, args, level) => {
    const settings = client.getSettings(message.guild.id);
    // return if not enabled
    if (settings.reactToJoin !== "true") return message.reply(`\`reactToJoin\` not enabled in config.`);

    let initialMessage = `**React to the messages below to gain access to the rest of the server.**`;
    const roles = [settings.reactRole];
    const reactions = ["✅"];

    const role = roles.toString();
    if (!message.guild.roles.find(r => r.name === role)) {
        message.guild.createRole({
            name: 'Super Cool People'
        });
    }

    function generateMessages() {
        var messages = [];
        messages.push(initialMessage);
        for (let role of roles) messages.push(`React below to get the **"${role}"** role!`); //DONT CHANGE THIS
        return messages;
    }

    var toSend = generateMessages();
    let mappedArray = [
        [toSend[0], false], ...toSend.slice(1).map((message, idx) => [message, reactions[idx]])
    ];
    for (let mapObj of mappedArray) {
        message.channel.send(mapObj[0]).then(sent => {
            if (mapObj[1]) {
                sent.react(mapObj[1]);
            }
        });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["genreactions", "generatereactions"],
    permLevel: "Server Owner"
};

exports.help = {
    name: "genreact",
    category: "Moderation",
    description: "Generates the reaction message and sets up reaction stuff.",
    usage: "genreact"
};

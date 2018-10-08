exports.run = async (client, message, args, level) => {
    const mesg = args.join(" ");
    const user = client.users.find(x => x.id === client.config.ownerID);
    const time = new Date();
    if (!mesg) {
        return message.reply(`You have to send a bug report. It can't be a empty message.`);
    }
    if (mesg.length > 1800) {
        //console.log(`${mesg.length}\n${1800 - mesg.length}`)
        let msg = mesg.slice(0, 1800 - mesg.length);
        user.send(`= BUG REPORT =
• User    :: ${message.author.tag}
• Message :: ${msg}  ...
• Time    :: ${time}`, {
                code: "asciidoc"
            })
            .then(() => {
                message.channel.send(`Your input is appreciated.`);
                client.guilds.find(x => x.id === client.config.botGuildID).channels.find(x => x.id === client.config.botChannelID).send(`= BUG REPORT =
• User    :: ${message.author.tag}
• Message :: ${msg}  ...
• Time    :: ${time}`, {
                    code: "asciidoc"
                });
            });
    } else {
        let msg = mesg;
        user.send(`= BUG REPORT =
• User    :: ${message.author.tag}
• Message :: ${msg}
• Time    :: ${time}`, {
                code: "asciidoc"
            })
            .then(() => {
                message.channel.send(`Your input is appreciated.`);
                client.guilds.find(x => x.id === client.config.botGuildID).channels.find(x => x.id === client.config.botChannelID).send(`= BUG REPORT =
• User    :: ${message.author.tag}
• Message :: ${msg}
• Time    :: ${time}`, {
                    code: "asciidoc"
                });
            });
    }
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

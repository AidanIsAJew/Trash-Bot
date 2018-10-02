// The EVAL command will execute **ANY** arbitrary javascript code given to it.
// THIS IS PERMISSION LEVEL 10 FOR A REASON! It's perm level 10 because eval
// can be used to do **anything** on your machine, from stealing information to
// purging the hard drive. DO NOT LET ANYONE ELSE USE THIS


// However it's, like, super ultra useful for troubleshooting and doing stuff
// you don't want to put in a command.
const Discord = require("discord.js");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const code = args.join(" ");
    try {
        start = Date.now();
        const evaled = eval(code);
        end = Date.now();
        const clean = await client.clean(client, evaled);
        let evaledE = new Discord.RichEmbed()
            // Set the author
            .setAuthor(client.user.username, client.user.avatarURL)
            // Set time
            .setTimestamp()
            // Set the title of the field
            .setTitle('EVALED')
            // Set the color of the embed
            .setColor(0x2bf21d)
            // Set the main content of the embed
            .setDescription(`Finished evaluating in ${end - start} ms.`)
            .addField('INPUT', `\`\`\`js\n${await client.clean(client, code)}\n\`\`\``)
            .addField('RESULT', `\`\`\`js\n${clean}\n\`\`\``);
        message.channel.send(evaledE);
    } catch (err) {
        let errE = new Discord.RichEmbed()
            // Set the author
            .setAuthor(client.user.username, client.user.avatarURL)
            // Set time
            .setTimestamp()
            // Set the title of the field
            .setTitle('EVALED')
            // Set the color of the embed
            .setColor(0xff4500)
            .addField('INPUT', `\`\`\`js\n${await client.clean(client, code)}\n\`\`\``)
            .addField('ERROR', `\`\`\`js\n${err}\n\`\`\``);
        message.channel.send(errE);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Owner"
};

exports.help = {
    name: "eval",
    category: "System",
    description: "Evaluates arbitrary javascript.",
    usage: "eval [...code]"
};

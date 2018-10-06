const {
    version
} = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
    if (!args[0]) {
        return message.channel.send(`No arguments found. Please enter either *bot* or *server* as argument.`);
    } else {
        let type = args[0];
        if (type === "bot") {
            const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
            message.channel.send(`= BOT STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.size.toLocaleString()}
• Servers    :: ${client.guilds.size.toLocaleString()}
• Channels   :: ${client.channels.size.toLocaleString()}
• Discord.js :: v${version}
• Node       :: ${process.version}`, {
                code: "asciidoc"
            });
        } else if (type === "server" || type === "guild") {
            message.channel.send(`= GUILD/SERVER STATISTICS =
• Name        :: ${message.guild.name}
• ID          :: ${message.guild.id}
• Region      :: ${message.guild.region}
• Owner       :: ${message.guild.owner.user.tag}
• Members     :: ${message.guild.memberCount}
• Created at  :: ${message.guild.createdAt}`, {
                code: "asciidoc"
            });
        } else {
            return message.channel.send(`No stats with name \`${type}\``);
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "stats",
    category: "Miscelaneous",
    description: "Gives some useful statistics.",
    usage: "stats <server/guild/bot>"
};

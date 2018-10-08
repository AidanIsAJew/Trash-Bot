const {
    version
} = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
    if (!args[0]) {
        return message.channel.send(`No arguments found. Please enter either *bot* or *server* or *user* as an argument.`);
    } else {
        const type = args[0];
        const avatar = args[1];
        if (type === "bot") {
            const url = client.user.avatarURL;
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
            if (avatar === "yes" || avatar === "y")
                if (url) {
                    message.channel.send(client.user.avatarURL);
                }
        } else if (type === "server" || type === "guild") {
            const url = message.guild.iconURL;
            message.channel.send(`= GUILD/SERVER STATISTICS =
• Name       :: ${message.guild.name}
• ID         :: ${message.guild.id}
• Region     :: ${message.guild.region}
• Owner      :: ${message.guild.owner.user.tag}
• Members    :: ${message.guild.memberCount}
• Created at :: ${message.guild.createdAt}`, {
                code: "asciidoc"
            });
            if (avatar === "yes" || avatar === "y")
                if (url) {
                    message.channel.send(message.guild.iconURL);
                }
        } else if (type === "user") {
            const author = message.mentions.members.first();
            if (!author) {
                return message.channel.send(`Please mention a valid member of this server.`);
            }
            const url = author.user.avatarURL;
            message.channel.send(`= USER STATISTICS =
• Name         :: ${author.displayName}
• Tag          :: #${author.user.tag.split("#").slice(1)[0]}
• ID           :: ${author.id}
• Highest role :: ${author.highestRole.name}
• Color (hex)  :: ${author.displayHexColor}
• Joined at    :: ${author.joinedAt}`, {
                code: "asciidoc"
            });
            const a = args[2];
            console.log(a);
            if (a === "yes" || a === "y")
                if (url) {
                    message.channel.send(author.user.avatarURL);
                }
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
    description: "Gives some useful statistics, and the avatar if you want.",
    usage: "stats <server/guild/bot/user> [mention] [yes/y]"
};

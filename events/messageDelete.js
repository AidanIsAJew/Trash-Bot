const moment = require("moment");

module.exports = async (client, message) => {

    // Declare the time
    const time = new Date();
    // Load the guild's settings
    const settings = client.getSettings(message.guild.id);
    // return if not enabled
    if (settings.modLogEnabled !== "true") return;

    const logs = message.guild.channels.find(channel => channel.name === settings.modLogChannel);
    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
        message.guild.createChannel(settings.modLogChannel, 'text');
    }
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
        client.logger.warn('The logs channel does not exist and tried to create the channel but I am lacking permissions');
    }
    if (message.channel.name === logs.name) return;
    const entry = await message.guild.fetchAuditLogs({
        type: 'MESSAGE_DELETE'
    }).then(audit => audit.entries.first());
    //console.log(entry);
    let user = "";
    let desc = "";
    let id = "";
    if (entry.extra.channel.id === message.channel.id &&
        (entry.target.id === message.author.id) &&
        (entry.createdTimestamp > (Date.now() - 5000)) &&
        (entry.extra.count >= 1)) {
        user = entry.executor.username;
        desc = entry.executor.discriminator;
        id = entry.executor.id;
    } else {
        user = message.author.username;
        desc = message.author.discriminator;
        id = message.author.id;
    }
    logs.send(`= MESSAGE DELETED =
• Message Author Name :: ${message.author.username}#${message.author.discriminator}
• Message Author ID   :: ${message.author.id}
• Message Channel     :: ${message.channel.name}
• Message Content     :: ${message.content}
= EXECUTOR =
• Executor Name       :: ${user}#${desc}
• Executor ID         :: ${id}
= SYSTEM =
• Time                :: ${time}`, {
        code: "asciidoc"
    });
};

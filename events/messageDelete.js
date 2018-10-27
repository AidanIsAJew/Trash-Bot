const moment = require("moment");

module.exports = async (client, message) => {
    // Load the guild's settings
    const settings = client.getSettings(message.guild.id);

    const logs = message.guild.channels.find(channel => channel.name === settings.modLogChannel);
    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
        message.guild.createChannel(settings.modLogChannel, 'text');
    }
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
        client.logger.warn('The logs channel does not exist and tried to create the channel but I am lacking permissions');
    }
    const entry = await message.guild.fetchAuditLogs({
        type: 'MESSAGE_DELETE'
    }).then(audit => audit.entries.first());
    let user = "";
    if (entry.extra.channel.id === message.channel.id &&
        (entry.target.id === message.author.id) &&
        (entry.createdTimestamp > (Date.now() - 5000)) &&
        (entry.extra.count >= 1)) {
        user = entry.executor.username;
    } else {
        user = message.author.username;
    }
    logs.send(`A message was deleted in **${message.channel.name}** by **${user}**`);
};

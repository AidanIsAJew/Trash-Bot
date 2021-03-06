exports.run = async (client, message, args, level) => {
    let role;
    const settings = client.getSettings(message.guild.id);
    if (settings.reactToJoin == "true") {
      role = message.guild.roles.find(x => x.name == "member");
    }
    else {
      role = message.guild.defaultRole;
    }
    console.log(role);
    if (!role) return client.logger.error(`no defualt role found`)
    message.channel.overwritePermissions(role, { //first you pass the id OR the member OR the user OR a role
        SEND_MESSAGES: false,
        ATTACH_FILES: false
    }).then(message.channel.send(`Successfully locked ${message.channel.name}`));
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["lockdown"],
    permLevel: "Administrator"
};

exports.help = {
    name: "lock",
    category: "Moderation",
    description: "Lockdown the channel.",
    usage: "lock"
};

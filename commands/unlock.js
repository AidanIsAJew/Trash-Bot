exports.run = async (client, message, args, level) => {
    const role;
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
        SEND_MESSAGES: true,
        ATTACH_FILES: true
    }).then(message.channel.send(`Successfully unlocked ${message.channel.name}`));
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["unlockdown"],
    permLevel: "Administrator"
};

exports.help = {
    name: "unlock",
    category: "Moderation",
    description: "End the lockdown on the channel.",
    usage: "lock"
};

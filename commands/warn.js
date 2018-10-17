exports.run = async (client, message, [action, key, ...value], level) => { // eslint-disable-line no-unused-vars
    if (!action) return message.channel.send(`Must specify an action.`);
    const member = message.mentions.members.first() || message.guild.members.get(key);
    if (!member) return message.channel.send(`Must specify an member.`);
    let reason = value.join(' ');
    if (!reason) reason = "No reason provided";
    const time = new Date();

    // Make the unique indentifier
    const ui = `${message.guild.id}-${member.id}`;
    // Returns key's value, or the default given, ensuring that the data is there.
    // This is a shortcut to "if enmap doesn't have key, set it, then get it"
    // which is a very common pattern.
    client.warns.ensure(ui, {
        amount: 0
    });


    if (action === "add") {
        client.warns.inc(ui, "amount");
        let num = `reason${client.warns.get(ui, "amount")}`;
        client.warns.set(ui, reason, num);
        //client.warns.remove(ui, "reason0");
        message.channel.send(`Added warning \`${client.warns.get(ui, "amount")}\` with reason \`${reason}\``);

        // Consequences
        await member.send(`= WARNING =
• Server    :: ${message.guild.name}
• Warned by :: ${message.author.tag}
• For       :: ${reason}
• Time      :: ${time}`, {
            code: "asciidoc"
        });
        if (client.warns.get(ui, "amount") === 1) {
            member.send(`= PENALTY =
• Current :: None
• Next    :: Gag`, {
                code: "asciidoc"
            });
        } else if (client.warns.get(ui, "amount") === 2) {
            member.send(`= PENALTY =
• Current :: Gag (5 minutes)
• Next    :: Kick`, {
                code: "asciidoc"
            });
            const role = message.guild.roles.find(x => x.name === "GARBAGE-gagged");
            if (!role) {
                await message.guild.createRole({
                    name: 'GARBAGE-gagged'
                });
            }
            const chan = message.guild.channels.find(x => x.type === "text");
            chan.guild.channels.forEach(function(channel) {
                channel.overwritePermissions(role, { //first you pass the id OR the member OR the user OR a role
                    SEND_MESSAGES: false,
                    ATTACH_FILES: false
                });
            });
            await member.addRole(role);

            function resolveAfter5Minutes() {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                    }, 5 * 1000 * 60);
                });
            }

            client.logger.log(`Catching`);
            await resolveAfter5Minutes();
            client.logger.log(`Resolved`);
            await member.removeRole(role);


        } else if (client.warns.get(ui, "amount") === 3) {
            await member.send(`= PENALTY =
• Current :: Kick
• Next    :: Ban`, {
                code: "asciidoc"
            });
            member.kick("Exceeded allowed warning amount.");

        } else if (client.warns.get(ui, "amount") === 4) {
            await member.send(`= PENALTY =
• Current :: Ban
• Next    :: None. End of the line`, {
                code: "asciidoc"
            });

            client.warns.set(ui, 0, "amount");
            client.warns.remove(ui, "reason1");
            client.warns.remove(ui, "reason2");
            client.warns.remove(ui, "reason3");
            client.warns.remove(ui, "reason4");

            member.ban("Exceeded allowed warning amount.");

        }
    } else if (action === "remove") {
        // CHeck if member already has no warnings
        if (client.warns.get(ui, "amount") === 0 || client.warns.get(ui, "amount") < 0) {
            return message.channel.send(`Member already has no warnings!`);
        }
        client.warns.dec(ui, "amount");
        let num = `reason${client.warns.get(ui, "amount")+1}`;
        client.warns.remove(ui, num);
        message.channel.send(`Removed \`${num}\``);
    } else {
        // Otherwise, the default action is to return the whole configuration;
        const array = [];
        //console.log(client.warns.get(ui));
        Object.entries(client.warns.get(ui)).forEach(([key, value]) => {
            array.push(`${key}${" ".repeat(20 - key.length)}::  ${value}`);
        });
        const mesg = array.join("\n");
        //console.log(mesg);
        await message.channel.send(`= Current Warnings for ${member.user.tag} =\n${mesg}`, {
            code: "asciidoc"
        });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Moderator"
};

exports.help = {
    name: "warn",
    category: "Moderation",
    description: "Warns.",
    usage: "warn <view/add/remove> [mention] [reason]"
};

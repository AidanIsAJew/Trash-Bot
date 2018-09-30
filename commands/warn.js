const Discord = require("discord.js");
// I dont remeber what this does \_O-O_/
const fs = require("fs")
// Config
const config = require("../settings/config.json");


module.exports = {
    run: async (message, command, args, client, testMessage) => {
        console.log(client.warning);
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) return message.reply("Please mention a valid member of this server");
        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";
        const key = `${message.guild.id}-${member.id}`;
        // Triggers on new users we haven't seen before.
        client.warning.ensure(key, {
            user: member.id,
            guild: message.guild.id,
            level: 0,
            reason0: "No reason provided",
            reason1: "No reason provided",
            reason2: "No reason provided",
            lastSeen: new Date()
        });
        // Increment the points and save them.
        client.warning.inc(key, "level");
        let reasonstr = "reason" + client.warning.get(key, "level");
        client.warning.set(key, reason, reasonstr);
        /*
        if (!client.warning.has(key, reasonstr)) {
            console.log("oh no!");
            client.warning.set(key, "No reason provided", reasonstr);
        }
        */
        message.channel.send(client.warning.get(key, "level"));

        if (client.warning.get(key, "level") == 0) {
            message.channel.send("on level 0");
        }
        if (client.warning.get(key, "level") == 1) {
            message.channel.send("on level 1");
        }
        if (client.warning.get(key, "level") == 2) {
            message.channel.send("on level 2");
        }
        if (client.warning.get(key, "level") > 2) {
            message.channel.send("on level 2+");
            client.warning.set(key, 0, "level");
        }
        //client.warning.dec(key, "level");
        message.channel.send(client.warning.get(key, "reason" + client.warning.get(key, "level")));
        //console.log(client.warning);
    }
}

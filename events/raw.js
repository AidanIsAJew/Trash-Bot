module.exports = async (client, event) => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE") {
        /* For the joining the server */
        const settings = client.getSettings(event.d.guild_id);
        let initialMessage = `**React to the messages below to gain access to the rest of the server.**`;
        const roles = [settings.reactRole];
        const reactions = ["✅"];

        let channel = client.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg => {
            let user = msg.guild.members.get(event.d.user_id);

            if (msg.author.id == client.user.id && msg.content != initialMessage) {

                var re = `\\*\\*"(.+)?(?="\\*\\*)`;
                var role = msg.content.match(re)[1];

                if (user.id != client.user.id) {
                    var roleObj = msg.guild.roles.find(r => r.name === role);
                    var memberObj = msg.guild.members.get(user.id);

                    if (event.t === "MESSAGE_REACTION_ADD") {
                        memberObj.addRole(roleObj);
                    } else {
                        memberObj.removeRole(roleObj);
                    }
                }
            }
        });

        /* Emit all reactions */

        // There's no need to emit if the message is cached, because the event will fire anyway for that
        if (channel.messages.has(event.d.message_id)) return;
        // Since we have confirmed the message is not cached, let's fetch it
        channel.fetchMessage(event.d.message_id).then(msg => {
            // Emojis can have identifiers of name:id format, so we have to account for that case as well
            const emoji = event.d.emoji.id ? `${event.d.emoji.name}:${event.d.emoji.id}` : event.d.emoji.name;
            // This gives us the reaction we need to emit the event properly, in top of the message object
            const reaction = msg.reactions.get(emoji);
            // Check which type of event it is before emitting
            if (event.t === 'MESSAGE_REACTION_ADD') {
                client.emit('messageReactionAdd', reaction, client.users.get(event.d.user_id));
            }
            if (event.t === 'MESSAGE_REACTION_REMOVE') {
                client.emit('messageReactionRemove', reaction, client.users.get(event.d.user_id));
            }
        });
    }
};

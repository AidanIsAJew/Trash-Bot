module.exports = async (client, event) => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE") {

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
        })

    }
};

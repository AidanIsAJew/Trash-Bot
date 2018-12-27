module.exports = {
  run: async function (client, message) {
    const settings = message.settings;
    if (settings.intoduceEnabled === "true") {
      let role;
      if (message.guild.roles.find(x => x.name === "introduced")) {
        role = message.guild.roles.find(x => x.name === "introduced");
      } else {
        role = await message.guild.createRole({
          name: 'introduced',
          color: 0xbc3dbf,
        }).catch(e => client.logger.log(e, "error"));
        const channel = message.guild.channels.find(x => x.name === settings.introduceChannel);
        channel.overwritePermissions(role, { //first you pass the id OR the member OR the user OR a role
            SEND_MESSAGES: false,
            ATTACH_FILES: false
        });
      }
      message.member.addRole(role);
    }
  }
};

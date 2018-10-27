const moment = require("moment");

module.exports = async (client, role) => {
      // Declare the time
      //const time = moment().format('llll');
      const time = new Date();
      // Load the guild's settings
      const settings = client.getSettings(role.guild.id);

      const logs = role.guild.channels.find(channel => channel.name === settings.modLogChannel);
      if (role.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
          role.guild.createChannel(settings.modLogChannel, 'text');
      }
      if (!role.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
          client.logger.warn('The logs channel does not exist and tried to create the channel but I am lacking permissions');
      }
      const entry = await role.guild.fetchAuditLogs({
          type: 'ROLE_CREATE'
      }).then(audit => audit.entries.first());
      console.log(entry);
      let user = "";
      let desc = "";
      let id = "";
      //console.log(entry);
      if (entry.executor.username) {
          user = entry.executor.username;
          desc = entry.executor.discriminator;
      } else {
          user = "UNKNOWN";
          desc = "UNKNOWN";
      }
      if (entry.executor.id) {
          id = entry.executor.id;
      } else {
          id = "UNKNOWN";
      }
      logs.send(`= ROLE CREATED =
• Role Name     :: ${role.name}
• Role ID       :: ${role.id}
• Role Color    :: ${role.color}
= EXECUTOR =
• Executor Name :: ${user}#${desc}
• Executor ID   :: ${id}
= SYSTEM =
• Time          :: ${time}`, {
          code: "asciidoc"
      });
};

// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.getSettings(member.guild.id);

  if (settings.reactRole == "true") {
    member.send(`Hey ${member.user.username}, make sure to read the rules and react to the message to gain access. If you don't, you're not entering.`);
  }

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessageUSER = settings.welcomeMessage.replace(/{{user}}/gi, `**${member.user.tag}**`);
  const welcomeMessageFINAL = welcomeMessageUSER.replace(/{{server}}/gi, `**${member.guild.name}**`);

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  const chan = member.guild.channels.find(c => c.name === settings.welcomeChannel);
  if (!chan) return;
  chan.send(welcomeMessageFINAL).catch(console.error);
};

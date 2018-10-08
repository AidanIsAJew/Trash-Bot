// This event executes when a new member leaves a server. Let's say goodbye to them!

module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.getSettings(member.guild.id);

  // If goodbye is off, don't proceed (don't goodbye the user)
  if (settings.goodbyeEnabled !== "true") return;

  // Replace the placeholders in the goodbye message with actual data
  const goodbyeMessageUSER = settings.goodbyeMessage.replace(/{{user}}/gi, member.user.tag);
  const goodbyeMessageFINAL = goodbyeMessageUSER.replace(/{{server}}/gi, member.guild.name);

  // Send the goodbye message to the goodbye channel
  // There's a place for more configs here.
  member.guild.channels.find(c => c.name === settings.goodbyeChannel).send(goodbyeMessageFINAL).catch(console.error);
};

// This event executes when a new guild (server) is joined.
//module.exports = (client, reaction, user) => {
const Discord = require("discord.js");
module.exports = async (client, reaction, user) => {
    const message = reaction.message;
    const settings = message.settings;

    if (reaction.emoji.name !== '⭐') return;
    const starboardChannel = settings["starboardChannel"];
    const starChannel = message.guild.channels.find(channel => channel.name === starboardChannel)
    if (!starChannel) return message.channel.send(`It appears that you do not have a \`${starboardChannel}\` channel.`);
    const fetchedMessages = await starChannel.fetchMessages({
        limit: 100
    });
    const stars = await fetchedMessages.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(message.id));
    //console.log(stars);
    if (stars) {
        const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
        const foundStar = stars.embeds[0];
        const image = message.attachments.size > 0 ? message.attachments.array()[0].url : '';
        const amt = parseInt(star[1])-1;
        const embed = new Discord.RichEmbed()
            .setColor(foundStar.color)
            .setDescription(foundStar.description)
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter(`⭐ ${amt} | ${message.id}`)
            .setImage(image);
        const starMsg = await starChannel.fetchMessage(stars.id);
        if (amt < 1) {
            await starMsg.delete();
        } else {
            await starMsg.edit({
                embed
            });
        }
    }
};

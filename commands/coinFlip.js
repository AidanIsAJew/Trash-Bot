exports.run = async (client, message, args, level) => {
    function resolveAfter3Seconds() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, 3 * 1000);
        });
    }

    const Discord = require("discord.js");
    const embed = new Discord.RichEmbed()
        .setTitle("Fliping . . .")
        .setColor(0x00AE86)
        .setImage("https://media.giphy.com/media/10bv4HhibS9nZC/giphy.gif")
        .setTimestamp();
    let msg = message.channel.send({
        embed
    }).then(async (msg) => {
        await resolveAfter3Seconds();
        let rand = Math.floor(Math.random() * 2);
        if (rand == 0) {
            msg.embeds[0].title = "Tails!";
            msg.embeds[0].image.url = "https://i.imgur.com/f8cWt53.png";
            msg.edit(new Discord.RichEmbed(msg.embeds[0]));
        } else {
            msg.embeds[0].title = "Heads!";
            msg.embeds[0].image.url = "https://i.imgur.com/5xMbrJU.png";
            msg.edit(new Discord.RichEmbed(msg.embeds[0]));
        }
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["flip", "coin", "flipCoin"],
    permLevel: "User"
};

exports.help = {
    name: "coinFlip",
    category: "Fun",
    description: "Flips a coin.",
    usage: "coinFlip"
};

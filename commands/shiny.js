const Discord = require('discord.js');

exports.run = (client, message, args, level) => {
    let sprite = message.content.toLowerCase().split(' ').slice(1).join(" ");
    let pokemonurl = (`https://play.pokemonshowdown.com/sprites/xyani-shiny/${sprite.replace(/ /g,'-')}.gif`);
    let names = args.slice(0).join(' ');
    if (!sprite) return message.channel.send("You need to write a pokemon name!!");
    const embed = new Discord.RichEmbed()
        .setDescription('You have requested this pokemon:')
        .setImage(pokemonurl)
    message.channel.send(embed);
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'shiny',
    category: "Fun",
    description: 'Shows shiny pokemons',
    usage: 'shiny <pikachu>'
};

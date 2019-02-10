exports.run = async (client, message, args, level) => {
    if (!args[0] || !args[1]) {
      return message.reply(`you need to specify a height and width. ex: minesweeper 9 9`);
    }
    const Minesweeper = require('discord.js-minesweeper');
    let row = parseInt(args[0], 10);
    let col = parseInt(args[1], 10);
    let bomb;
    if (args[2]) {
      bomb = parseInt(args[2], 10);
      if ((row * col) < bomb) {
        return message.reply(`there can't be more mines than tiles :face_palm:`);
      }
      if (3 >= (row * col) / bomb) {
        return message.reply(`the empty tiles to mine ratio needs to be greater than 3`);
      }
      if (bomb <= 0) {
        return message.reply(`there can't be less than 1 mine`);
      }
    } else {
      bomb = Math.floor((row * col) / 8);
    }
    console.log(bomb);
    let msg = await message.channel.send(`Constructing board . . .`);
    const minesweeper = new Minesweeper({
        rows: row,
        columns: col,
        mines: bomb,
    });
    let str;
    str = await minesweeper.start();
    msg.edit(str);

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["minesweeper", "sweeperOfMines"],
    permLevel: "User"
};

exports.help = {
    name: "minesweeper",
    category: "Fun",
    description: "minesweeper with customizable height and width. Optionaly, an amount of mines can be specified",
    usage: "minesweeper <height> <width> [num of mines]"
};

const request = require('request');
exports.run = async (client, message, args, level) => {
    const msg = await message.reply(`Your fortune is...`);
    request('http://fortunecookieapi.herokuapp.com/v1/fortunes?limit=&skip=&page={}', async function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const json = JSON.parse(body);
            const num = Math.floor(Math.random() * 100);
            const wait = async () => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                    }, 2 * 1000);
                });
            }
            await wait();
            msg.edit(`${json[num].message}`);
            //msg.edit();
        }
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "fortune",
    category: "Fun",
    description: "Shows you your fortune.",
    usage: "fortune"
};

const request = require('request');
const TinyURL = require('tinyurl');

exports.run = async (client, message, args, level) => {

    request(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${client.config.newsAPI}`, function(error, response, body) {
        //client.logger.log('error:' + error); // Print the error if one occurred
        //client.logger.log('statusCode:' + response.statusCode); // Print the response status code if a response was received
        //console.log('body:', JSON.parse(body)/*body*/); // Print the JSON for the API request.
        if (!error && response.statusCode == 200) {
            const json = JSON.parse(body);
            const amount = (json.totalResults > 3) ? 3 : json.totalResults;
            //client.logger.log(amount);
            //console.log(json.articles);

            switch (amount) {
                case 0:
                    message.channel.send(`No articles collected`);
                    break;
                case 1:
                    TinyURL.shorten(json.articles[0].url, function(res) {
                        message.channel.send(`= NEWS =
• Collected   :: ${json.totalResults}
• Showing     :: ${amount}
= FIRST =
• Author      :: ${json.articles[0].source.name}
• Title       :: ${json.articles[0].title}
• URL         :: ${res}
• Description :: ${json.articles[0].description}
= POWERD BY NEWS API =`, {
                            code: "asciidoc"
                        });
                    });
                    break;
                case 2:
                    TinyURL.shorten(json.articles[0].url, function(res) {
                        TinyURL.shorten(json.articles[1].url, function(ser) {
                            message.channel.send(`= NEWS =
• Collected   :: ${json.totalResults}
• Showing     :: ${amount}
= FIRST =
• Author      :: ${json.articles[0].source.name}
• Title       :: ${json.articles[0].title}
• URL         :: ${res}
• Description :: ${json.articles[0].description}
= SECOND =
• Author      :: ${json.articles[1].source.name}
• Title       :: ${json.articles[1].title}
• URL         :: ${ser}
• Description :: ${json.articles[1].description}
= POWERD BY NEWS API =`, {
                                code: "asciidoc"
                            });
                        });
                    });
                    break;
                case 3:
                    TinyURL.shorten(json.articles[0].url, function(res) {
                        TinyURL.shorten(json.articles[1].url, function(ser) {
                            TinyURL.shorten(json.articles[2].url, function(ers) {
                                message.channel.send(`= NEWS =
• Collected   :: ${json.totalResults}
• Showing     :: ${amount}
= FIRST =
• Author      :: ${json.articles[0].source.name}
• Title       :: ${json.articles[0].title}
• URL         :: ${res}
• Description :: ${json.articles[0].description}
= SECOND =
• Author      :: ${json.articles[1].source.name}
• Title       :: ${json.articles[1].title}
• URL         :: ${ser}
• Description :: ${json.articles[1].description}
= THIRD =
• Author      :: ${json.articles[2].source.name}
• Title       :: ${json.articles[2].title}
• URL         :: ${ers}
• Description :: ${json.articles[2].description}
= POWERD BY NEWS API =`, {
                                    code: "asciidoc"
                                });
                            });
                        });
                    });
            }
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
    name: "news",
    category: "Fun",
    description: "Shows the news.",
    usage: "news"
};

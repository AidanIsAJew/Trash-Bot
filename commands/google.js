const Discord = require("discord.js");
// I dont remeber what this does \_O-O_/
const fs = require("fs")
// Config
const config = require("../settings/config.json");
// Defualt prefix
const defPrefix = "!";
const cheerio = require('cheerio');
const snekfetch = require('snekfetch');
const querystring = require('querystring');

module.exports = {
    run: async (message, command, args) => {
        // These are our two variables. One of them creates a message while we preform a search,
        // the other generates a URL for our crawler.
        let searchMessage = await message.reply('Searching... Sec.');
        let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(message.content)}`;

        // We will now use snekfetch to crawl Google.com. Snekfetch uses promises so we will
        // utilize that for our try/catch block.
        return snekfetch.get(searchUrl).then((result) => {

            // Cheerio lets us parse the HTML on our google result to grab the URL.
            let $ = cheerio.load(result.text);

            // This is allowing us to grab the URL from within the instance of the page (HTML)
            let googleData = $('.r').first().find('a').first().attr('href');

            // Now that we have our data from Google, we can send it to the channel.
            googleData = querystring.parse(googleData.replace('/url?', ''));
            searchMessage.edit(`Result found!\n${googleData.q}`);

            // If no results are found, we catch it and return 'No results are found!'
        }).catch((err) => {
            searchMessage.edit('No results found! Probably Because google are a bunch of dykes and don\'t allow scraping.');
        });
    }
}

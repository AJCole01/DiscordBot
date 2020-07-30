const {
    Client,
    Attachment
} = require('discord.js');
const bot = new Client();
 
const cheerio = require('cheerio');
 
const request = require('request');
 
 
 //Bot Token from Discord Bot Creator
const token = '********************************************';
 
//Command Prefix
const PREFIX = '!';
 
//Bot Version
var version = '1.3';
var img = '';
 
//Bot Online message
bot.on('ready', () => {
    console.log('This bot is online! ' + version);
 
})
 
 
 
 //Turn bot on
bot.on('message', message => {
 
    let args = message.content.slice(PREFIX.length).split(/ +/);
 
    switch (args[0]) {
        //Image Command
        case 'image':
            for(var i=1; i<=4; i++){
                img += args[i] + ' ';
            }
            image(message);
 
        break;
    }
 
});
 
function image(message){
 
    var options = {
        //Get images of user input
        url: "http://results.dogpile.com/serp?qc=images&q=" + img,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
 
 
 
 
 
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
 
        $ = cheerio.load(responseBody);
 
 
        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
        console.log(urls);
 
        if (!urls.length) {
           
            return;
        }
 
        // Send random result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });
 
 
 
 
 
 
 
 
}
 
bot.login(token);

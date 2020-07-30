const {
    Client,
    Attachment
} = require('discord.js');
const bot = new Client();
 
const cheerio = require('cheerio');
 
const request = require('request');
 
 
 
const token = 'NzEwNjE4MDU4NDgxMjA1MjY4.Xr3S4g.54Jvu_-djR4jhB4M0Jtj4JNEhDw';
 
const PREFIX = '!';
 
var version = '1.3';
var img = '';
 
bot.on('ready', () => {
    console.log('This bot is online! ' + version);
 
})
 
 
 
 
bot.on('message', message => {
 
    let args = message.content.slice(PREFIX.length).split(/ +/);
 
    switch (args[0]) {
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
 
        // Send result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });
 
 
 
 
 
 
 
 
}
 
bot.login(token);
const Discord = require('discord.js');
const bot = new Discord.Client();
const cfg = require('./index.json');
const token = process.env.token;
const prefix = (cfg.prefix);
bot.on('ready', function () {
    console.log("Je suis prêt à être utilisé.")
    bot.user.setActivity('être testé par Fenixor').catch(console.error)
});

bot.on('message', msg => {
    if (msg.content === "bonjour"){
        msg.reply("Heureux de te revoir parmis nous.")
    }
    if (msg.content.match(/salut/i)) {
            msg.reply('Je suis d\'accord avec toi.')
    }
    if (msg.content === prefix + "site"){
        msg.channel.send("https://alexpgm.000webhostapp.com/")
        console.log("Une personne a demandé pour aller sur ton site.")
    }
    if (msg.content.match(/!Fenixor/i)) {
            msg.reply('Fenixor est mon dévelopeur.')
    }
    if (msg.content.match(/!Aide/i)) {
            msg.reply('!bonjour <br> !salut')
    }
client.on('message', message => {
	if (message.content === '!react') {
	message.react('😄');
	}
});
    
}
	    
}
    

});



bot.login(token); 

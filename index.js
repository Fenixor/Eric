const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.token;


bot.on('ready', function () {
    console.log("Je suis prêt à être utilisé.")
    bot.user.setActivity('être testé par Fenixor').catch(console.error)
	
    });

bot.on("message", message => {
	
	
				 
				 
});






bot.login(token);

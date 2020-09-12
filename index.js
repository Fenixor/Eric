const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.token;




bot.on('ready', function () {
    console.log("Je suis prêt à être utilisé.")
    bot.user.setActivity('être testé par Fenixor').catch(console.error)
	
    });

bot.on("message", msg => {
	
	

	
	
	    if (msg.content === "bonjour"){
		    msg.channel.send('Clique sur 🎉')
		    .then(msg => {msg.react('🎉')
				 });
	    }
	
	
	
	
	bot.on('messageReactionAdd', (messageReaction, user) => {
if(user.bot)  return;
const { message, emoji } = messageReaction;

if(emoji.name === "🎉") {
if(message.id === "754328129677426688") {
	msg.channel.send('Sa marche ptn')

  }
 } 
});
	
	
	
	
 
	    
		    
				
	    
		    
 
	    
		    
   
	
	
	


	
	
	
	
	
	
	
});






bot.login(token);

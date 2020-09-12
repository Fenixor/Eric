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
		    message.addReaction("😃")
	    }
		    
        
		
	    
 
		    
  
   
         
	
	
	const filter = (reaction, user) => {
	return ['🎉'].includes(reaction.emoji.name) && user.id === msg.author.id;
};
	msg.awaitReactions(filter, { max: 2, time: 60000})
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '🎉') {
			msg.channel.send('Bravo')
			
		}});
	


	
	
	
	
	
	
	
});






bot.login(token);

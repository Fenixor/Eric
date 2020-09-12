const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.token;




bot.on('ready', function () {
    console.log("Je suis prêt à être utilisé.")
    bot.user.setActivity('être testé par Fenixor').catch(console.error)
	
    });

bot.on('message', msg => {
	const filter = (reaction, user) => {
	return ['👍', '👎'].includes(reaction.emoji.name) && user.id === msg.author.id;
};
    if (msg.content === "bonjour"){
        msg.channel.send('My Message')
	    .then(msg => {msg.react('🎉')
			 }
		  
  });
  
   
 
	
	

    
	
msg.awaitReactions(filter, { max: 1, time: 60000})
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '👍') {
			bot.msg.send("pong");
		} else {
			msg.reply('you reacted with a thumbs down.');
		}

});	
});	



       

bot.login(token); 

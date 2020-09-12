const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;

client.once('ready', () => {
   console.log(‘Félicitations, votre bot Discord a été correctement initialisé !');
});

client.login(token);

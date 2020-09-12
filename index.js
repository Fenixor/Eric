const Discord = require('discord.js');
const client = new Discord.Client();
const token = ‘NzUzMjY1MjMzNTQzNTYxMjQ5.X1jq6g.P3V7_8eUVba-s6l-K3pbdDtN09w’

client.once('ready', () => {
   console.log(‘Félicitations, votre bot Discord a été correctement initialisé !');
});

client.login(token);

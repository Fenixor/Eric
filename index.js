const Discord = require('discord.js');
const bot = new Discord.Client();
const disbut = require('discord-buttons');
const { MessageEmbed } = require('discord.js')
let { prefix , token } = require ('./config.json');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const table = require('table');
const { MessageButton } = require('discord-buttons');
const dbdb = new FileSync("db.json")
const db = low(dbdb)
db.defaults({Infos: []}).write()
//Dbname
const dbdbname = new FileSync("dbname.json")
const dbname = low(dbdbname)
dbname.defaults({Name: []}).write()
//Dbrestock
const dbdbrestock = new FileSync("dbrestock.json")
const dbrestock = low(dbdbrestock)
dbrestock.defaults({Restock: []}).write()
//Dbenv
const dbdbenv = new FileSync("dbenv.json")
const dbenv = low(dbdbenv)
dbenv.defaults({Env: []}).write()
//Dbtrans
const dbdbtrans = new FileSync("dbtrans.json")
const dbtrans = low(dbdbtrans)
dbtrans.defaults({Trans: []}).write()
//Dbcompte
const dbdbcompte = new FileSync("dbcompte.json")
const dbcompte = low(dbdbcompte)
dbcompte.defaults({Compte: []}).write()
//dbconfig
const dbdbconfig = new FileSync("dbconfig.json")
const dbconfig = low(dbdbconfig)
dbconfig.defaults({Config: []}).write()
//dbpremium
const dbdbpremium = new FileSync("dbpremium.json")
const dbpremium = low(dbdbpremium)
dbpremium.defaults({Premium: []}).write()
//Couldown
const usedCommand = new Set();

bot.on('ready', function () {
  console.log("Je suis prêt à être utilisé.")
  i=0
  const activity = [
    "Alpha",
    "Dev par Fenixor#1650"
  ]

  setInterval(() =>{
    bot.user.setActivity(activity[i]).catch(console.error)	
    i++
    if (i > 1){
      i = 0
    }
  }, 5000)
  
});


bot.on("message", async message => {

  if (message.guild === null)return;



  const apremium = `!apremium`

if (message.content.startsWith(apremium)){
  if(message.author.id != "442691719797014528")return;
  const str = message.content.substring(apremium.length).trim().split(/ +/);
  if (str[0] === undefined | str[1] != undefined | str[0] === "")return;

  dbpremium.get("Premium").push({pidserv: str[0]}).write()
}



const amega = `!amega`

if (message.content.startsWith(amega)){
  if(message.author.id != "442691719797014528")return;
  const str = message.content.substring(amega.length).trim().split(/ +/);
  if (str[0] === undefined | str[1] != undefined | str[0] === "")return;

    dbpremium.get("Premium").push({pidserv: str[0]}).write()
    dbpremium.get("Premium").push({midserv: str[0]}).write()
  
  
  
}





  if(dbconfig.get('Config').filter({idserv : message.guild.id}).find("prefix").value()){

    let pref = dbconfig.get("Config").filter({idserv : message.guild.id}).find("prefix").value()  
    let prefvar = Object.values(pref)

    prefix = prefvar[1]
  }

  
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  avatarembed = message.author.displayAvatarURL({size: 1024})


  
  
  if (message.content.startsWith(`${prefix}help`)){
    //if (message.member.hasPermission('ADMINISTRATOR')){

    const helpadmin = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Aides commandes')
        .setDescription(`**⚙️ Administrateur ⚙️**\n\n${prefix}config = Configurez le bot avant l'utilisation\n${prefix}stock *[nom de la catégorie]* = Ajoute des comptes dans une catégorie\n${prefix}admin = Ajoute des catégories de compte\n${prefix}premium = Découvre les avantages premium\n\n**✨ Utilisateur ✨**\n\n${prefix}info = Invite du bot et du serveur discord du bot\n${prefix}gen = Affiche les commandes pour générer\n${prefix}stock = Affiche le stock des comptes restant`)
        .setTimestamp()
        .setFooter(message.author.username, avatarembed);
         
       
        
          message.channel.send(helpadmin)
   // }
  }




  if (message.content.startsWith(`${prefix}info`)){
    



    const config = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Aides commandes info')
        .addFields(
          {
            name: `${prefix}invite`,
            value: `Invite du bot https://discord.com/oauth2/authorize?client_id=833023057882644501&scope=bot&permissions=8589934591`,
            inline: true
        
          },
        {
          name: `${prefix}discord`,
          value: `Invite du discord du bot https://discord.gg/3N4CnssP3j`,
          inline: true
        })
        .setTimestamp()
        .setFooter(message.author.username, avatarembed);
         
       
        
          message.channel.send(config)
  }
  if (message.content.startsWith(`${prefix}invite`)){
message.channel.send("https://discord.com/oauth2/authorize?client_id=833023057882644501&scope=bot&permissions=8589934591")
  }

  if (message.content.startsWith(`${prefix}discord`)){
    message.channel.send("https://discord.gg/3N4CnssP3j")
      }














  if (message.content.startsWith(`${prefix}config`)){
    if (!message.member.hasPermission('ADMINISTRATOR'))return;

////////////////////////////////////////QUESTION 1//////////////////////////////////////////////////////
    const prefixembed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`Le prefix actuel est **${prefix}** ,quelle prefix voulez-vous utilser ? *(tapez **annuler** pour stopper la commande)*`)
    .setTimestamp()
    .setFooter(`${message.author.username} 1/7`);
    message.channel.send(prefixembed)


    const filter = m => m.author.id === message.author.id 
    const collector = message.channel.createMessageCollector(filter, { time: 600000 });
    var question = message.author.id



    collector.on('end', collected => {

      if (question == message.author.id+1111111)return;
    
      const end = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription("La commande a été annulé, vous n'avez pas était assez rapide !")
            .attachFiles("./Time.gif")
            .setImage("attachment://Time.gif")
            .setTimestamp()
            .setFooter(message.author.username, avatarembed);
            message.channel.send(end)
      
    });



    collector.on('collect', m => {

        if (question === m.author.id | question === m.author.id+1 | question === m.author.id+11| question === m.author.id+111| question === m.author.id+1111| question === m.author.id+11111 && m.content === "annuler"){
          const annuler = new Discord.MessageEmbed()
          .setColor('#FF3E30')
          .setDescription(`La commande a été annulé`)
          .attachFiles("./Uncheck.PNG")
          .setImage("attachment://Uncheck.PNG")
          .setTimestamp()
          .setFooter(message.author.username, avatarembed);
          message.channel.send(annuler)
          question = m.author.id +1111111
        }


////////////////////////////////////////Fin//////////////////////////////////////////////////////


if (question === m.author.id+111111){ 
  dbconfig.get("Config").find({idserv: message.guild.id}).assign({idserv: message.guild.id, channel : m.content}).write()


  const finembed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setDescription(`La configuration du bot est maintenant terminé !`)
  .attachFiles("./Check.png")
  .setImage("attachment://Check.png")
  .setTimestamp()
  .setFooter(`${message.author.username} Fin`);
  message.channel.send(finembed)
  

      question = question + 1
    }


////////////////////////////////////////QUESTION 7//////////////////////////////////////////////////////


if (question === m.author.id+11111){ 

  m.attachments.forEach(attachment => {
    const ImageLink = attachment.proxyURL;
    dbconfig.get("Config").find({idserv: message.guild.id}).assign({idserv: message.guild.id, timeimg : ImageLink}).write()
  }); 
  

  if(dbconfig.get('Config').find({idserv : message.guild.id}).get('channel').value()){
    let channel = dbconfig.get("Config").filter({idserv : message.guild.id}).find("channel").value()  
    let channelvar = Object.values(channel)
    const chanelembed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`Le salon actuel est ${channelvar[7]}, dans quelle salon voulez-vous autoriser les générations ? *(tapez **annuler** pour stopper la commande)*`)
    .setTimestamp()
    .setFooter(`${message.author.username} 7/7`);
    message.channel.send(chanelembed)
  }else{
  const chanelembed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setDescription(`Dans quelle salon voulez-vous autoriser les générations ? *(tapez **annuler** pour stopper la commande)*`)
  .setTimestamp()
  .setFooter(`${message.author.username} 7/7`);
  message.channel.send(chanelembed)
  }

      question = question + 1
    }



////////////////////////////////////////QUESTION 6//////////////////////////////////////////////////////


if (question === m.author.id+1111){ 
  dbconfig.get("Config").find({idserv: message.guild.id}).assign({idserv: message.guild.id, time : m.content}).write()

  if(dbconfig.get('Config').find({idserv : message.guild.id}).get('timeimg').value()){
    let timeimg = dbconfig.get("Config").filter({idserv : message.guild.id}).find("timeimg").value()  
    let timeimgvar = Object.values(timeimg)
    const timeimgembed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`L'image afficher quand les membres ne peuvent pas générer à cause du temps est celle-ci, par quelle image voulez-vous la remplacer ? *(tapez **annuler** pour stopper la commande)*`)
    .setImage(timeimgvar[6])
    .setTimestamp()
    .setFooter(`${message.author.username} 6/7`);
    message.channel.send(timeimgembed)
  }else{
  const timeimgembed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setDescription(`Quelle image voulez-vous afficher quand les membres ne peuvent pas générer à cause du temps ? *(tapez **annuler** pour stopper la commande)*`)
  .setTimestamp()
  .setFooter(`${message.author.username} 6/7`);
  message.channel.send(timeimgembed)
  }

      question = question + 1
    }

  ////////////////////////////////////////QUESTION 5//////////////////////////////////////////////////////
  if (question === m.author.id+111){  


    m.attachments.forEach(attachment => {
      const ImageLink = attachment.proxyURL;
      dbconfig.get("Config").find({idserv: message.guild.id}).assign({idserv: message.guild.id, gen : ImageLink}).write()
    }); 

      
   
    if(dbconfig.get('Config').find({idserv : message.guild.id}).get('time').value()){
      let time = dbconfig.get("Config").filter({idserv : message.guild.id}).find("time").value()  
      let timevar = Object.values(time)
      const timeembed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`Le temps actuel est de ${timevar[5]} minutes, combien de temps (en minutes) minimum voulez-vous mettre entre chaque génération ? *(tapez **annuler** pour stopper la commande)*`)
      .setTimestamp()
      .setFooter(`${message.author.username} 5/7`);
      message.channel.send(timeembed)
    }else{
    const timeembed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`Combien de temps (en minutes) minimum voulez-vous mettre entre chaque génération ? *(tapez **annuler** pour stopper la commande)*`)
    .setTimestamp()
    .setFooter(`${message.author.username} 5/7`);
    message.channel.send(timeembed)
    }

    question = question + 1
  }


////////////////////////////////////////QUESTION 4//////////////////////////////////////////////////////
  
  
if (question === m.author.id+11){  

  m.attachments.forEach(attachment => {
    const ImageLink = attachment.proxyURL;
    dbconfig.get("Config").find({idserv: message.guild.id}).assign({idserv: message.guild.id, rupture : ImageLink}).write()
  }); 
  

    

  if(dbconfig.get('Config').find({idserv : message.guild.id}).get('gen').value()){
    let gen = dbconfig.get("Config").filter({idserv : message.guild.id}).find("gen").value()  
    let genvar = Object.values(gen)
    const genembed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`Voici l'image actuelle, quelle image voulez-vous mettre à la place de celle-ci quand un membre générera un compte? *(tapez **annuler** pour stopper la commande)*`)
    .setImage(genvar[4])
    .setTimestamp()
    .setFooter(`${message.author.username} 4/7`);
    message.channel.send(genembed)
  }else{
  const genembed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setDescription(`Quelle image voulez-vous mettre quand un membre générera un compte ? *(tapez **annuler** pour stopper la commande)*`)
  .setTimestamp()
  .setFooter(`${message.author.username} 4/7`);
  message.channel.send(genembed)
  }
  question = question + 1
}












////////////////////////////////////////QUESTION 3//////////////////////////////////////////////////////
      




if (question === m.author.id+1){      

    dbconfig.get("Config").find({idserv: message.guild.id}).assign({idserv: message.guild.id, restock : m.content}).write()


  if(dbconfig.get('Config').find({idserv : message.guild.id}).get('rupture').value()){
    let rupture = dbconfig.get("Config").filter({idserv : message.guild.id}).find("rupture").value()  
    let rupturevar = Object.values(rupture)
    const rupturembed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`Voici l'image actuelle, quelle image voulez-vous mettre à la place de celle-ci quand le stock est vide? *(tapez **annuler** pour stopper la commande)*`)
    .setImage(rupturevar[3])
    .setTimestamp()
    .setFooter(`${message.author.username} 3/7`);
    message.channel.send(rupturembed)
  }else{
  const rupturembed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setDescription(`Quelle image voulez-vous mettre quand le stock est vide ? *(tapez **annuler** pour stopper la commande)*`)
  .setTimestamp()
  .setFooter(`${message.author.username} 3/7`);
  message.channel.send(rupturembed)
  }

  question = question + 1

}

////////////////////////////////////////QUESTION 2//////////////////////////////////////////////////////

      if (question === m.author.id){

          if(dbconfig.get('Config').find({idserv : message.guild.id}).value()){
            dbconfig.get("Config").find({idserv: message.guild.id}).assign({idserv: message.guild.id, prefix : m.content}).write()
          }else{
            dbconfig.get('Config').push({idserv :message.guild.id ,prefix : m.content}).write();
          }



          if(dbconfig.get('Config').filter({idserv : message.guild.id}).find('restock').value()){

            let restock = dbconfig.get("Config").filter({idserv : message.guild.id}).find("restock").value()  
            let restockvar = Object.values(restock)

            const restockembed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`Le salon actuel est ${restockvar[2]}, quelle salon voulez-vous utiliser a chaque fois qu'un admin stock des comptes ? *(tapez **annuler** pour stopper la commande)*`)
            .setTimestamp()
            .setFooter(`${message.author.username} 2/7`);
            message.channel.send(restockembed)
          }else{
          const restockembed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setDescription(`Quelle salon voulez-vous utiliser a chaque fois qu'un admin stock des comptes ? *(tapez **annuler** pour stopper la commande)*`)
          .setTimestamp()
          .setFooter(`${message.author.username} 2/7`);
          message.channel.send(restockembed)
          }
          question = question + 1
        }

    });

  }

  











  if (message.content.startsWith(`${prefix}admin`)){
    if (!message.member.hasPermission('ADMINISTRATOR'))return;

    if(db.get('Infos').find({idserv : message.guild.id}).value()){
    let db1= db.get("Infos").filter({idserv : message.guild.id}).find("Inv").value()  
    let db2 = Object.values(db1)
    let Nbrcat = Object.values(db2[1])
    //Nbrcat.length = le nombre de cat du serveur
    
        
    if(!dbpremium.get('Premium').find({midserv : message.guild.id}).value() && Nbrcat.length > 9){
        const annuler1 = new Discord.MessageEmbed()
        .setColor('#FF3E30')
        .setDescription("Vous avez atteint la limite de 10 catégories de comptes différent. `!premium` pour devenir Méga-Premium !")
        .attachFiles("./Uncheck.PNG")
        .setImage("attachment://Uncheck.PNG")
        .setTimestamp()
        .setFooter(message.author.username, avatarembed);
        message.channel.send(annuler1)
  }else{
    

      if(!dbpremium.get('Premium').find({pidserv : message.guild.id}).value() && Nbrcat.length > 2){
          const annuler = new Discord.MessageEmbed()
          .setColor('#FF3E30')
          .setDescription("Vous avez atteint la limite de 3 catégories de comptes différent. `!premium` pour devenir Premium !")
          .attachFiles("./Uncheck.PNG")
          .setImage("attachment://Uncheck.PNG")
          .setTimestamp()
          .setFooter(message.author.username, avatarembed);
          message.channel.send(annuler)
      }else{





        

      
    



        
   
        
         
  
    
    
    const addcat1 = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription("Quelle catégorie de compte voulez vous ajoutez ? *(NordVPN, Auchan, Minecraft, Spotify ...)* *(tapez **annuler** pour stopper la commande)*")
        .setImage("https://alteem.fr/wp-content/uploads/2018/01/deposer_une_marques_alteem.jpg")
        .setTimestamp()
        .setFooter(`${message.author.username} 1/2`);
        message.channel.send(addcat1)



const filter = m => m.author.id === message.author.id 
const collector = message.channel.createMessageCollector(filter, { time: 120000 });
var question = message.author.id


collector.on('end', collected => {

  if (question == message.author.id+11)return;

	const end = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription("La commande a été annulé, vous n'avez pas était assez rapide !")
        .attachFiles("./Time.gif")
        .setImage("attachment://Time.gif")
        .setTimestamp()
        .setFooter(message.author.username, avatarembed);
        message.channel.send(end)
  
});

collector.on('collect', m => {





  if (question === m.author.id | question === m.author.id+1  && m.content === "annuler"){
    const annuler = new Discord.MessageEmbed()
    .setColor('#FF3E30')
    .setDescription(`La commande a été annulé`)
    .attachFiles("./Uncheck.PNG")
    .setImage("attachment://Uncheck.PNG")
    .setTimestamp()
    .setFooter(message.author.username, avatarembed);
    message.channel.send(annuler)
    question = m.author.id +11
  }







  

      





         
        
          
  
 
  
  if (question === m.author.id + 1){
    
    let name = dbname.get("Name").filter({id : message.author.id}).find("name").value()  
    let namevar = Object.values(name)
    m.attachments.forEach(attachment => {
      const ImageLink = attachment.proxyURL;
      db.get('Infos').find({idserv : message.guild.id}).get('Inv').push({ name : namevar[1],env : ImageLink, restock : ImageLink}).write()
      const addcat2 = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`La catégorie **${namevar[1]}** a été ajouté avec succès !`)
      .setImage(ImageLink)
      .setTimestamp()
      .setFooter(message.author.username, avatarembed);
      message.channel.send(addcat2)
      question = question + 1
    
    
    }); 
    
   
    
 



          
  }

if (question === m.author.id){
  
  const str = m.content.substring(m.length).trim().split(/ +/);//commande
  const Categorie = str[0]
  if(dbname.get("Name").find({id: message.author.id}).value()){
    dbname.get('Name').remove({id : message.author.id}).write()  
  }

  dbname.get("Name").push({id : message.author.id, name : Categorie}).write() 
  
  const addcat2 = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`Quelle image voulez vous utiliser pour représenter **${Categorie}** ? *(tapez **annuler** pour stopper la commande)*`)
        .setTimestamp()
        .setFooter(`${message.author.username} 2/2`);
        message.channel.send(addcat2)
        question = question + 1

        
        
}




}); 
}}}else{


  const addcat1 = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription("Quelle catégorie de compte voulez vous ajoutez ? *(NordVPN, Auchan, Minecraft, Spotify ...)* *(tapez **annuler** pour stopper la commande)*")
        .setImage("https://alteem.fr/wp-content/uploads/2018/01/deposer_une_marques_alteem.jpg")
        .setTimestamp()
        .setFooter(`${message.author.username} 1/2`);
        message.channel.send(addcat1)



const filter = m => m.author.id === message.author.id 
const collector = message.channel.createMessageCollector(filter, { time: 120000 });
var question = message.author.id


collector.on('end', collected => {

  if (question == message.author.id+11)return;

	const end = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription("La commande a été annulé, vous n'avez pas était assez rapide !")
        .attachFiles("./Time.gif")
        .setImage("attachment://Time.gif")
        .setTimestamp()
        .setFooter(message.author.username, avatarembed);
        message.channel.send(end)
  
});

collector.on('collect', m => {





  if (question === m.author.id | question === m.author.id+1  && m.content === "annuler"){
    const annuler = new Discord.MessageEmbed()
    .setColor('#FF3E30')
    .setDescription(`La commande a été annulé`)
    .attachFiles("./Uncheck.PNG")
    .setImage("attachment://Uncheck.PNG")
    .setTimestamp()
    .setFooter(message.author.username, avatarembed);
    message.channel.send(annuler)
    question = m.author.id +11
  }







  

      





         
        
          
  
 
  
  if (question === m.author.id + 1){
    
    let name = dbname.get("Name").filter({id : message.author.id}).find("name").value()  
    let namevar = Object.values(name)
    db.get('Infos').push({idserv : message.guild.id, Inv : []}).write()


    m.attachments.forEach(attachment => {
      const ImageLink = attachment.proxyURL;
      db.get('Infos').find({idserv : message.guild.id}).get('Inv').push({ name : namevar[1],env : ImageLink, restock : ImageLink}).write()
      const addcat2 = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription(`La catégorie **${namevar[1]}** a été ajouté avec succès !`)
      .setImage(ImageLink)
      .setTimestamp()
      .setFooter(message.author.username, avatarembed);
      message.channel.send(addcat2)
      question = question + 1
    
    
    }); 
    
   
    
 



          
  }

if (question === m.author.id){
  
  const str = m.content.substring(m.length).trim().split(/ +/);//commande
  const Categorie = str[0]
  if(dbname.get("Name").find({id: message.author.id}).value()){
    dbname.get('Name').remove({id : message.author.id}).write()  
  }

  dbname.get("Name").push({id : message.author.id, name : Categorie}).write() 
  
  const addcat2 = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`Quelle image voulez vous utiliser pour représenter **${Categorie}** ? *(tapez **annuler** pour stopper la commande)*`)
        .setTimestamp()
        .setFooter(`${message.author.username} 2/2`);
        message.channel.send(addcat2)
        question = question + 1

        
        
}});

}}




if (message.content.startsWith(`${prefix}premium`)){


  const premiumembed = new Discord.MessageEmbed()
  .setTitle("Les avantages premium")
  .setColor('RANDOM')
  .setDescription("```- Licence gratuite 🚁:\n\n- 3 catégories de comptes max\n- 1 salon de génération max``````fix\n- Premium 🚀: 5€/Vie\n\n- Logs (Bientôt disponible)\n- 10 catégories de comptes max\n- 3 salon de génération (Bientôt disponible)\n- Possibilité de nommer un grade qui aura accès a d'avantages de catégories de comptes (Bientôt disponible)\n- Grade premium sur le discord``````diff\n- Méga-Premium 🛰️: 12€/Vie\n\n- Logs (Bientôt disponible)\n- Pas de limite de catégories de comptes max\n- Pas de limite de salon de génération (Bientôt disponible)\n- Possibilité de nommer 3 grades qui auront accès a d'avantages de catégories de comptes (Bientôt disponible)\n- Grade méga-premium sur le discord```**Pour tous achat contactez Fenixor#1650 en mp !**")
  .setTimestamp()
  .setFooter(message.author.username, avatarembed);
  message.channel.send(premiumembed)



}










const commandestock = `${prefix}stock`

if (message.content.startsWith(commandestock)){
  if (!message.member.hasPermission('ADMINISTRATOR')){}else{
  const str = message.content.substring(commandestock.length).trim().split(/ +/);//commande
  if (str[0] === undefined | str[1] != undefined)return;
  if(db.get('Infos').find({idserv : message.guild.id}).value()){
    let Inventaire = db.get("Infos").filter({idserv : message.guild.id}).find("Inv").value()  
    let Inventaire1 = Object.values(Inventaire)
    let Inventaire2 = Object.values(Inventaire1[1])
    let i = 0
    while (i < Inventaire2.length){

      let Inventaire3 = Inventaire2[i]
      let Inventairevar = Object.values(Inventaire3)

      if(str[0] === Inventairevar[0]){
        if(dbconfig.get('Config').filter({idserv : message.guild.id}).find("restock").value()){
        const stock = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`Entrez les **${str[0]}** que vous-voulez stocker **en revenant a la ligne entre chaque compte** \n\n*compte1\ncompte2\ncompte3\ncompte4\netc...*`)
        .setImage(Inventairevar[2])
        .setTimestamp()
        .setFooter(message.author.username, avatarembed);
        message.channel.send(stock)

        if(dbtrans.get("Trans").find({id: message.author.id}).value()){
          dbtrans.get('Trans').remove({id : message.author.id}).write()  
        }
        dbtrans.get("Trans").push({id : message.author.id, trans : str[0]}).write() //dbauchan  //Auchan 


        const filter = m => m.author.id === message.author.id 
        const collector = message.channel.createMessageCollector(filter, { time: 120000 });
        var question = message.author.id
        
        
        collector.on('end', collected => {
        
          if (question == message.author.id+1)return;
        
          const end = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription("La commande a été annulé, vous n'avez pas était assez rapide !")
                .attachFiles("./Time.gif")
                .setImage("attachment://Time.gif")
                .setTimestamp()
                .setFooter(message.author.username, avatarembed);
                message.channel.send(end)
          
        });
        
        collector.on('collect', m => {

          
          if (question === m.author.id){
            const str = m.content.substring(m.length).trim().split(/\n+/);//commande
            var i = 0
            while (i < 2000){
              
              
              if (str[i] === undefined){
                const Fin = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Restock 💎')
                .setDescription(`**${i}** comptes **${Inventairevar[0]}** viennent d'être stocké`)
                .setImage(Inventairevar[2])
                .setTimestamp()
                .setFooter(message.author.username, avatarembed);
                message.channel.send(Fin)

                let restock = dbconfig.get("Config").filter({idserv : message.guild.id}).find("restock").value()  
                let restockvar = Object.values(restock)

                const finchannel = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Restock 💎')
                .setDescription(`**${i}** comptes **${Inventairevar[0]}** viennent d'êtres stocké`) 
                .setImage(Inventairevar[2]) 
                .setTimestamp()
                .setFooter(message.author.username, avatarembed);
                message.guild.channels.cache.get(restockvar[2].slice(2, -1)).send(finchannel).catch(console.error()).then(function(message) { 
                message.react('💎')
                })
                i = 2001
              }else{
              //Ajouter les comptes
              let trans = dbtrans.get("Trans").filter({id : message.author.id}).find("trans").value()  
              let transvar = Object.values(trans)
              dbcompte.get("Compte").push({idserv : message.guild.id, name : transvar[1],acc :str[i] }).write()
              
              
              i++
              }
            }
            question = question + 1

          }
          
                  
              


        });



      }else{
  const e = "`"
  const mcommande = `${e}${prefix}config${e}`
  const annuler = new Discord.MessageEmbed()
        .setColor('#FF3E30')
        .setDescription(`Vous devez d'abord paramétrer le salon restock !${mcommande}`)
        .attachFiles("./Uncheck.PNG")
        .setImage("attachment://Uncheck.PNG")
        .setTimestamp()
        .setFooter(message.author.username, avatarembed);
        message.channel.send(annuler)
}
    

    
    
    
    
    
    
    
    
    
    
    
    }
      i++
    }
  }else{
    const e = "`"
    const mcommande = `${e}${prefix}admin${e}`
    const annuler = new Discord.MessageEmbed()
        .setColor('#FF3E30')
        .setDescription(`Vous devez d'abord crée une catégorie de compte !${mcommande}`)
        .attachFiles("./Uncheck.PNG")
        .setImage("attachment://Uncheck.PNG")
        .setTimestamp()
        .setFooter(message.author.username, avatarembed);
        message.channel.send(annuler)
  }
}}











const commandegen = `${prefix}gen`
if (message.content.startsWith(commandegen)){
  const str = message.content.substring(commandegen.length).trim().split(/ +/);//commande
  if (str[0] === undefined | str[1] != undefined)return;
  if(db.get('Infos').find({idserv : message.guild.id}).value()){  
    let Inventaire = db.get("Infos").filter({idserv : message.guild.id}).find("Inv").value()  
    let Inventaire1 = Object.values(Inventaire)
    let Inventaire2 = Object.values(Inventaire1[1])
    let i = 0
    while (i < Inventaire2.length){

      let Inventaire3 = Inventaire2[i]
      let Inventairevar = Object.values(Inventaire3)

      if(str[0] === Inventairevar[0]){
        if(dbconfig.get('Config').filter({idserv : message.guild.id}).find("channel").value()){
          let chan = dbconfig.get("Config").filter({idserv : message.guild.id}).find("channel").value()  
          let chanvar = Object.values(chan)
          if(message.channel.id === chanvar[7].slice(2, -1)){
        if(dbconfig.get('Config').filter({idserv : message.guild.id}).find("gen").value()){
        if (dbcompte.get("Compte").find({idserv : message.guild.id, name : str[0]}).value()){




       
          //if (!message.member.hasPermission('ADMINISTRATOR')){
            if(!usedCommand.has(message.author.id+message.guild.id)){
              
         
        let time = dbconfig.get("Config").filter({idserv : message.guild.id}).find("time").value()  
        let timevar = Object.values(time)
        let timemilli = parseInt(timevar[5]) * 1000 * 60
        usedCommand.add(message.author.id+message.guild.id);
      setTimeout(() => {
        usedCommand.delete(message.author.id+message.guild.id);
          
      }, timemilli);
            
            
            
          //mettre code ici
          

          let i = 0
          let un = dbcompte.get("Compte").value()
          let deux = Object.values(un)
          let trouver = []
          while (i < deux.length){
          
          let trois = Object.values(deux[i])



          if (trois[0] === message.guild.id && trois[1] === str[0]){ 
            trouver.push(trois[2])
          }
          
          i++
          
          
        
          }
        const r = Math.floor(Math.random() * trouver.length)
        const compte = trouver[r]
        dbcompte.get("Compte").remove({idserv : message.guild.id, name : str[0], acc : compte}).write()




        const mpembed = new Discord.MessageEmbed() 
        .setColor('RANDOM')
        .setTitle(`Voici ton compte **${str[0]}**`) 
        .setDescription(`${compte}`)
        .setImage(Inventairevar[1])
        .setTimestamp()
          .setFooter(message.author.username, avatarembed);
      
        message.author.createDM().then(message =>{
          message.send(mpembed).then(function(message) { 
            message.react('✅')
          })
        })
      

        let image = dbconfig.get("Config").filter({idserv : message.guild.id}).find("gen").value()  
        let imagevar = Object.values(image)

        const embedgen = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`Votre compte a été généré avec sucès !`)
        .setImage(imagevar[4])
        .setTimestamp()
        .setFooter(message.author.username, avatarembed);
        message.channel.send(embedgen)


      }else{
        if(dbconfig.get('Config').filter({idserv : message.guild.id}).find("timeimg").value()){
          let timeimg = dbconfig.get("Config").filter({idserv : message.guild.id}).find("timeimg").value()  
          let timeimgvar = Object.values(timeimg)
          let time = dbconfig.get("Config").filter({idserv : message.guild.id}).find("time").value()  
          let timevar = Object.values(time)
          const cdembed = new Discord.MessageEmbed()
          .setColor('#FF3E30')
          .setDescription(`Vous devez attendre ${timevar[5]} minutes entre chaque génération`)
          .setImage(timeimgvar[6])
          .setTimestamp()
          .setFooter(message.author.username, avatarembed);
          message.channel.send(cdembed)

        }else{
          let time = dbconfig.get("Config").filter({idserv : message.guild.id}).find("time").value()  
          let timevar = Object.values(time)
          const cdembed = new Discord.MessageEmbed()
          .setColor('#FF3E30')
          .setDescription(`Vous devez attendre ${timevar[5]} minutes entre chaque génération`)
          .attachFiles("./Uncheck.PNG")
          .setImage("attachment://Uncheck.PNG")
          .setTimestamp()
          .setFooter(message.author.username, avatarembed);
          message.channel.send(cdembed)
        }

        


    }
  
            
      }else{

        if(dbconfig.get('Config').filter({idserv : message.guild.id}).find("rupture").value()){

          let rupture = dbconfig.get("Config").filter({idserv : message.guild.id}).find("rupture").value()  
          let rupturevar = Object.values(rupture)
    
          const rupturembed = new Discord.MessageEmbed()
          .setColor('#FF3E30')
          .setDescription(`Il n'y a actuellement plus de compte en stock`)
          .setImage(rupturevar[3])
          .setTimestamp()
          .setFooter(message.author.username, avatarembed);
          message.channel.send(rupturembed)
        
        }else{
    

          const e = "`"
          const mcommande = `${e}${prefix}config${e}`
    
          const annuler = new Discord.MessageEmbed()
          .setColor('#FF3E30')
          .setDescription(`Vous devez d'abord paramétrer l'image quand le stock est vide ${mcommande}`)
          .attachFiles("./Uncheck.PNG")
          .setImage("attachment://Uncheck.PNG")
          .setTimestamp()
          .setFooter(message.author.username, avatarembed);
          message.channel.send(annuler)
        }
       
      }
    }else{



      const e = "`"
      const mcommande = `${e}${prefix}config${e}`
      const annuler = new Discord.MessageEmbed()
                .setColor('#FF3E30')
                .setDescription(`Vous devez d'abord paramétrer l'image quand un membre génére un compte ${mcommande}`)
                .attachFiles("./Uncheck.PNG")
                .setImage("attachment://Uncheck.PNG")
                .setTimestamp()
                .setFooter(message.author.username, avatarembed);
                message.channel.send(annuler)




          

        }
      }else{
        let chan = dbconfig.get("Config").filter({idserv : message.guild.id}).find("channel").value()  
        let chanvar = Object.values(chan)
        const annuler = new Discord.MessageEmbed()
        .setColor('#FF3E30')
        .setDescription(`Vous ne pouvez pas éffectuer cette commande ici, le seul salon autorisé est **${chanvar[7]}**`)
        .attachFiles("./Uncheck.PNG")
        .setImage("attachment://Uncheck.PNG")
        .setTimestamp()
        .setFooter(message.author.username, avatarembed);
        message.channel.send(annuler)
      }}}
      i++
    }
  }



}







if(message.content === `${prefix}gen`){
  if(!db.get('Infos').find({idserv : message.guild.id}).value())return;

    let Inventaire = db.get("Infos").filter({idserv : message.guild.id}).find("Inv").value()  
    let Inventaire1 = Object.values(Inventaire)
    let Inventaire2 = Object.values(Inventaire1[1])
    let i = 0
    let commande = []
    while (i < Inventaire2.length){


      let Inventaire3 = Inventaire2[i]
      let Inventairevar = Object.values(Inventaire3)
      commande.push(`${prefix}gen ${Inventairevar[0]}`)
      i++
      
    }
    if (commande.length > 150){
      const fin = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setDescription("Vous avez atteint la limite de 150 catégories de compte !")
      .attachFiles("./Uncheck.PNG")
      .setImage("attachment://Uncheck.PNG")
      .setTimestamp()
      .setFooter(message.author.username, avatarembed);
      message.channel.send(fin)
    }else{

    const gen = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`Voici la liste des commandes de génération`)
    .setDescription(commande)
    .setTimestamp()
    .setFooter(message.author.username, avatarembed);
    message.channel.send(gen)
    }}






    const commandesupprimer = `${prefix}supprimer`
    if (message.content.startsWith(commandesupprimer)){
      const str = message.content.substring(commandesupprimer.length).trim().split(/ +/)

        let db1= db.get("Infos").filter({idserv : message.guild.id}).find("Inv").value()  
        let db2 = Object.values(db1)
        let Nbrcat = Object.values(db2[1])
        console.log(Nbrcat.length)
        let i = 0
        while(Nbrcat.length > i){
          let name = Object.values(Nbrcat[i])
          console.log(name[0])
          if (name[0] === str[0]){
            message.channel.send("Trouver")
            question = question+1
            i = 100000000
          }
          i++

        }
      
      }












      if(message.content === `${prefix}stock`){
  
        if(!db.get('Infos').find({idserv : message.guild.id}).value())return;
      
      
      var i = 0
      let un =  db.get('Infos').find({idserv : message.guild.id}).get('Inv').value()
      let deux = Object.values(un)
      const tableau1 = [['Compte', 'Stock']]
      const tableau2 = [['Compte', 'Stock']]
      const tableau3 = [['Compte', 'Stock']]
      const tableau4 = [['Compte', 'Stock']]
      const tableau5 = [['Compte', 'Stock']]
      const tableau6 = [['Compte', 'Stock']]
      const tableau7 = [['Compte', 'Stock']]
      const tableau8 = [['Compte', 'Stock']]
      const tableau9 = [['Compte', 'Stock']]
      const tableau10 = [['Compte', 'Stock']]
      
      
        while (i < deux.length){
      
        let trois = Object.values(deux[i])
      
      
      
        if (dbcompte.get("Compte").find({idserv : message.guild.id, name : trois[0]}).value()){
      
          let ideux = 0
      
          let quatre = dbcompte.get("Compte").value()
          let cinq = Object.values(quatre)
          var c = 0
      
          while (ideux < cinq.length){       
            let six = Object.values(cinq[ideux])
            if (six[0] === message.guild.id && six[1] === trois[0]){ 
              c++
            }
            ideux++
            }
          var nbr = c
        }else{
          var nbr = 0
        }
      
      
      
      
      
        if(tableau10.length <= 15 && tableau9.length === 16){
          tableau10.push([trois[0], nbr]) 
        }
        if(tableau9.length <= 15 && tableau8.length === 16){
          tableau9.push([trois[0], nbr]) 
        }
        if(tableau8.length <= 15 && tableau7.length === 16){
          tableau8.push([trois[0], nbr]) 
        }
        if(tableau7.length <= 15 && tableau6.length === 16){
          tableau7.push([trois[0], nbr]) 
        }
        if(tableau6.length <= 15&& tableau5.length === 16){
          tableau6.push([trois[0], nbr]) 
      
        }
      
      
      
      
      
      
        if(tableau5.length <= 15 && tableau4.length === 16){
          tableau5.push([trois[0], nbr]) 
        }
        if(tableau4.length <= 15 && tableau3.length === 16){
          tableau4.push([trois[0], nbr]) 
        }
        if(tableau3.length <= 15 && tableau2.length === 16){
          tableau3.push([trois[0], nbr]) 
        }
        if(tableau2.length <= 15&& tableau1.length === 16){
          tableau2.push([trois[0], nbr]) 
      
        }
        if (tableau1.length <=15){
        tableau1.push([trois[0], nbr]) 
        //16 enregistré
        }
      
        i++
        }
      
      
      
        const stock1 = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Stock', `\`\`\`${table.table(tableau1)}\`\`\``)
            .setTimestamp()
            .setFooter(message.author.username, avatarembed);
      
      
            const stock2 = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Stock', `\`\`\`${table.table(tableau2)}\`\`\``)
            .setTimestamp()
      
      
            const stock3 = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Stock', `\`\`\`${table.table(tableau3)}\`\`\``)
            .setTimestamp()
            .setFooter(message.author.username, avatarembed);
      
      
            const stock4 = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Stock', `\`\`\`${table.table(tableau4)}\`\`\``)
            .setTimestamp()
            .setFooter(message.author.username, avatarembed);
      
            
            const stock5 = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Stock', `\`\`\`${table.table(tableau5)}\`\`\``)
            .setTimestamp()
            .setFooter(message.author.username, avatarembed);
      
      
      
            const stock6 = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Stock', `\`\`\`${table.table(tableau6)}\`\`\``)
            .setTimestamp()
            .setFooter(message.author.username, avatarembed);
      
      
            const stock7 = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Stock', `\`\`\`${table.table(tableau7)}\`\`\``)
            .setTimestamp()
            .setFooter(message.author.username, avatarembed);
      
      
            const stock8 = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Stock', `\`\`\`${table.table(tableau8)}\`\`\``)
            .setTimestamp()
            .setFooter(message.author.username, avatarembed);
        
      
            const stock9 = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Stock', `\`\`\`${table.table(tableau9)}\`\`\``)
            .setTimestamp()
            .setFooter(message.author.username, avatarembed);
      
            
            const stock10 = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Stock', `\`\`\`${table.table(tableau10)}\`\`\``)
            .setTimestamp()
            .setFooter(message.author.username, avatarembed);
      
      
      
            const stockfin = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription("Vous avez atteint la limite de 150 catégories de compte stocké !")
            .attachFiles("./Uncheck.PNG")
            .setImage("attachment://Uncheck.PNG")
            .setTimestamp()
            .setFooter(message.author.username, avatarembed);
      
      
      if (tableau1.length <= 15){
        message.channel.send(stock1)
      }else{
      
      if (tableau1.length === 16 && tableau3.length === 1){
        const page = [stock1,stock2]
        const emojis = ["◀️", "▶️"];
        pagination(message,page,emojis)
      }
      if (tableau2.length === 16 && tableau4.length === 1){
        const page = [stock1,stock2,stock3]
        const emojis = ["◀️", "▶️"];
        pagination(message,page,emojis)
      }
      
      
      if (tableau3.length === 16 && tableau5.length === 1){
        const page = [stock1,stock2,stock3,stock4]
        const emojis = ["◀️", "▶️"];
        pagination(message,page,emojis)
      }
      
      
      if (tableau4.length === 16&& tableau6.length === 1){
        const page = [stock1,stock2,stock3,stock4,stock5]
        const emojis = ["◀️", "▶️"];
        pagination(message,page,emojis)
      }
      
      if (tableau5.length === 16&& tableau7.length === 1){
        const page = [stock1,stock2,stock3,stock4,stock5,stock6]
        const emojis = ["◀️", "▶️"];
        pagination(message,page,emojis)
      }
      
      if (tableau6.length === 16&& tableau8.length === 1){
        const page = [stock1,stock2,stock3,stock4,stock5,stock6,stock7]
        const emojis = ["◀️", "▶️"];
        pagination(message,page,emojis)
      }
      
      if (tableau7.length === 16&& tableau9.length === 1){
        const page = [stock1,stock2,stock3,stock4,stock5,stock6,stock7,stock8]
        const emojis = ["◀️", "▶️"];
        pagination(message,page,emojis)
      }
      
      if (tableau8.length === 16&& tableau10.length === 1){
        const page = [stock1,stock2,stock3,stock4,stock5,stock6,stock7,stock8,stock9]
        const emojis = ["◀️", "▶️"];
        pagination(message,page,emojis)
      }
      
      
      if (tableau9.length === 16 && tableau10.length > 1 && tableau10.length <=15){
        const page = [stock1,stock2,stock3,stock4,stock5,stock6,stock7,stock8,stock9,stock10]
        const emojis = ["◀️", "▶️"];
        pagination(message,page,emojis)
      }
      
      if (tableau10.length === 16 ){
        const page = [stock1,stock2,stock3,stock4,stock5,stock6,stock7,stock8,stock9,stock10,stockfin]
        const emojis = ["◀️", "▶️"];
        pagination(message,page,emojis)
      }}}
      








if(message.content === "!t"){

  const embed1 = new MessageEmbed()
  .setAuthor(`${message.author.username} Used Buttons`, message.author.displayAvatarURL({ dynamic: true }))
  .setTimestamp()
  .setColor('RANDOM')
  .setDescription(`
New Discord Buttons!
Click On Each For More Info
  `)
  

  // First Button(WithOut Disabled)
  const button1 = new disbut.MessageButton()
  .setID('button1') // ID Of Button So We Can Do WhatEver We Want To When User Clicks It
  .setLabel('Button 1') // Label Of Button, i.e: Description
  .setStyle('red') // Style Of Button, Their Are 5 Styles Currently
  // .setDisabled() // Disabled, We Can't Click Button

  // Second Button(WithOut Disabled)
  const button2 = new disbut.MessageButton()
  .setID('button2') // ID Of Button So We Can Do WhatEver We Want To When User Clicks It
  .setLabel('Button 2') // Label Of Button, i.e: Description
  .setStyle('green') // Style Of Button, Their Are 5 Styles Currently
  
  const button3 = new disbut.MessageButton()        
  .setLabel('Button 3 - Subscribe') // Label Of Button, i.e: Description
  .setStyle('url') // Style Of Button, Their Are 5 Styles Currently
  .setURL('https://youtube.com/techtipcyber')

  const button4 = new disbut.MessageButton()
  .setID('button4') // ID Of Button So We Can Do WhatEver We Want To When User Clicks It
  .setLabel('Button 4') // Label Of Button, i.e: Description
  .setStyle('blurple') // Style Of Button, Their Are 5 Styles Currently

  message.channel.send('Buttons', {
      buttons: [
          button1, button2, button3, button4
      ],
      embed: embed1
  })
}








if (message.content.startsWith("avatar")){
  const avatar = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setDescription("Quelle avatar voulez vous mettre pour le bot ?")
  .attachFiles("./Uncheck.PNG")
  .setImage("attachment://Uncheck.PNG")
  .setTimestamp()
  .setFooter(message.author.username, avatarembed);
  message.channel.send(avatar)
  client.user.setAvatar("https://d1fmx1rbmqrxrr.cloudfront.net/cnet/optim/i/edit/2019/04/eso1644bsmall__w770.jpg")
}






})
















bot.login(token)

const { Client, Intents, WebhookClient, Permissions } = require("discord.js");
const { token } = require("./config.json");
const fs = require('fs');

var Channel1 = "979009790695047171"
var Channel2 = "979009748055785545"
var Enabled = false

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});


client.once("ready", () => {
    console.log("Ready!");
});


client.on("messageCreate", (message) => {

  if (Enabled == true) {
  if (message.channel.id == Channel2) {
    const web1Data = fs.readFileSync('./Web1URL.txt',
    {encoding:'utf8', flag:'r'});

    if (web1Data == '') return message.channel.send('Web1URL is empty')

    const webhookClient = new WebhookClient({ url: web1Data });

    if (message.author.bot) return;
    if (message.webhookId) return;
    if (message.content.includes("@everyone" || "@here")) return message.delete()
    if (message.attachments.size > 0) {
        message.attachments.forEach(attachment => {
            const ImageLink = attachment.proxyURL;
            
            if (message.member.nickname == null) {
                webhookClient.send({
                  content: ImageLink,
                  username: message.author.username,
                  avatarURL: message.member.displayAvatarURL(),
                });
              } else {
                webhookClient.send({
                  content: ImageLink,
                  username: message.member.nickname,
                  avatarURL: message.member.displayAvatarURL(),
                });
              }
        });
    }
    
    if (message.content == null || undefined) return;
    if (message.content == "") return;
    if (message.member.nickname == null) {
      webhookClient.send({
        content: message.content,
        username: message.author.username,
        avatarURL: message.member.displayAvatarURL(),
      });
    } else {
      webhookClient.send({
        content: message.content,
        username: message.member.nickname,
        avatarURL: message.member.displayAvatarURL(),
      });
    }
  }
  

  if (message.channel.id == Channel1) {

    const web2Data = fs.readFileSync('./Web2URL.txt',
    {encoding:'utf8', flag:'r'});

    if (web2Data == '') return message.channel.send('Web2URL is empty')

    const webhookClient = new WebhookClient({ url: web2Data });

    if (message.author.bot) return;
    if (message.webhookId) return;
    if (message.content.includes("@everyone" || "@here")) return message.delete()
    if (message.attachments.size > 0) {
        message.attachments.forEach(attachment => {
            const ImageLink = attachment.proxyURL;
            
            if (message.member.nickname == null) {
                webhookClient.send({
                  content: ImageLink,
                  username: message.author.username,
                  avatarURL: message.member.displayAvatarURL(),
                });
              } else {
                webhookClient.send({
                  content: ImageLink,
                  username: message.member.nickname,
                  avatarURL: message.member.displayAvatarURL(),
                });
              }
        });
    }

    if (message.content == null || undefined) return;
    if (message.content == "") return;
    if (message.member.nickname == null) {
      webhookClient.send({
        content: message.content,
        username: message.author.username,
        avatarURL: message.member.displayAvatarURL(),
      });
    } else {
      webhookClient.send({
        content: message.content,
        username: message.member.nickname,
        avatarURL: message.member.displayAvatarURL(),
      });
    }
  }
  }


  if (message.author.bot) return;
  if (message.webhookId) return;
  if (message.content.match('~createWeb1')) {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return
    
    message.channel.createWebhook("Webhook1")
    .then(wb => {

      fs.writeFile('./Web1URL.txt', wb.url, err => {
        if (err) {
          console.error(err);
        }
      });
      
    })
    .catch(console.error);

  } else if (message.content.match('~createWeb2')) {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return

    message.channel.createWebhook("Webhook2")
    .then(wb => {

      fs.writeFile('./Web2URL.txt', wb.url, err => {
        if (err) {
          console.error(err);
        }
      });
    
    })
    .catch(console.error);
  }

  if (message.content.match('~Channel1')) {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return

      Channel1 = message.channel.id
      console.log(Channel1)

    
    } else if (message.content.match('~Channel2')) {
      if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return

        Channel2 = message.channel.id
        console.log(Channel2)

    } else if (message.content.match('~Disable')) {
      if (message.author.id !== '346939348530495489') return
        Enabled = false
    } else if (message.content.match('~Enable')) {
      if (message.author.id !== '346939348530495489') return

        Enabled = true
    }
    else if (message.content.match('~RESET')) {
      if (message.author.id !== '346939348530495489') return
      client.destroy()
    }

});

client.login(token);

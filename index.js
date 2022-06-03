const { Client, Intents, WebhookClient } = require("discord.js");
const { token, spiderToken, goblinToken } = require("./config.json");

let spiderManMessagesDelete = [];
let goblinMessagesDelete = [];

let gTrans = "979009790695047171";
let sTrans = "979009748055785545";


const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

client.once("ready", () => {
    console.log("Ready!");
  // client.guilds.cache.get("979009790695047168").channels.cache.get("979009790695047171").send("bridge is up");
  // client.guilds.cache.get("979009748055785542").channels.cache.get("979009748055785545").send("bridge is up");
  setInterval(() => {
    if(spiderManMessagesDelete.length === 0 && goblinMessagesDelete.length === 0) return;
    let spiderMan = client.guilds.cache.get("979009748055785542").channels.cache.get(sTrans);
    let goblin = client.guilds.cache.get("979009790695047168").channels.cache.get(gTrans); 

    spiderMan.bulkDelete(spiderManMessagesDelete);
    goblin.bulkDelete(goblinMessagesDelete);

    goblinMessagesDelete = [];
    spiderManMessagesDelete = [];

  }, 2000) 
});


client.on("messageCreate", (message) => {

  if (message.channel.id == gTrans) {

    let tokenW = spiderToken;
    let idW = "982306134763376642";
    const webhookClient = new WebhookClient({ id: idW, token: tokenW });

    if (message.author.bot) return;
    if (message.webhookId) return;
    if (message.content.includes("@everyone" || "@here"))
      return goblinMessagesDelete.push(message);
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

  if (message.channel.id == sTrans) {

    let tokenW = goblinToken;
    let idW = "982310906941812758";
    const webhookClient = new WebhookClient({ id: idW, token: tokenW });

    if (message.author.bot) return;
    if (message.webhookId) return;
    if (message.content.includes("@everyone" || "@here"))
    return spiderManMessagesDelete.push(message);
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



});

client.login(token);

const { Client, Intents, WebhookClient, Permissions, MessageEmbed  } = require("discord.js");
const { token } = require("./config.json");
const fs = require('fs');

var Enabled = true


const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});


client.once("ready", () => {
    console.log("Ready!");

    client.user.setActivity('~Help');

  });


client.on("messageCreate", (message) => {

  if (Enabled == true) {

    const Channel2Data = fs.readFileSync('./Channel2.txt', {encoding:'utf8', flag:'r'});

  if (message.channel.id == Channel2Data) {

    const web1Data = fs.readFileSync('./Web1URL.txt', {encoding:'utf8', flag:'r'});

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
  
  const Channel1Data = fs.readFileSync('./Channel1.txt',
  {encoding:'utf8', flag:'r'});
  if (message.channel.id == Channel1Data) {

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
  if (message.content.match('~Channel1')) {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return

      message.channel.createWebhook("Webhook1")
    .then(wb => {

      fs.writeFile('./Web1URL.txt', wb.url, err => {
        if (err) {
          console.error(err);
        }
      });

      fs.writeFile('./Channel1.txt', message.channel.id, err => {
        if (err) {
          console.error(err);
        }
      });

    })
    .catch(console.error);
    console.log(`setup channel ${message.channel.id} (Channel1)`)
    message.channel.send('setup Channel1') 

    } else if (message.content.match('~Channel2')) {
      if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return

  
        message.channel.createWebhook("Webhook2")
        .then(wb => {
    
          fs.writeFile('./Web2URL.txt', wb.url, err => {
            if (err) {
              console.error(err);
            }
          });

          fs.writeFile('./Channel2.txt', message.channel.id, err => {
            if (err) {
              console.error(err);
            }
          });
        
        })
        .catch(console.error);
        console.log(`setup channel ${message.channel.id} (Channel2)`)
        message.channel.send('setup Channel2')

    } else if (message.content.match('~Disable')) {
      if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return

        message.channel.send('bridge has been disabled')
    
        Enabled = false

    } else if (message.content.match('~Enable')) {
      if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return

      message.channel.send('bridge has been enabled')

        Enabled = true

    } else if (message.content.match('~delChannel1')) {

      const web1Data = fs.readFileSync('./Web1URL.txt',
      {encoding:'utf8', flag:'r'});
      const webhookClient = new WebhookClient({ url: web1Data });

      webhookClient.delete()
      message.channel.send('disconnected Channel1')

    } else if (message.content.match('~delChannel2')) {

      const web2Data = fs.readFileSync('./Web2URL.txt',
      {encoding:'utf8', flag:'r'});
      const webhookClient = new WebhookClient({ url: web2Data });

      webhookClient.delete()
      message.channel.send('disconnected Channel2')

    } else if (message.content.match('~RESET')) {
    if (message.author.id !== '346939348530495489') return
    client.destroy()


    } else if (message.content.match('~Help')) {

      const helpEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Commands list')
      .setThumbnail('https://cdn.discordapp.com/attachments/967452904590024715/982716254500565022/unknown.png')
      .addFields(
        { name: '~Help', value: 'shows this menu' },
        { name: '~Channel1', value: 'setups first connected channel', inline: true },
        { name: '~Channel2', value: 'setups second connected channel', inline: true },
        { name: '~Enable', value: 'Enables the server link (enabled by default)', inline: true },
        { name: '~Disable', value: 'disables the server link', inline: true },
        { name: '~delChannel1', value: 'disconnects the first channel', inline: true },
        { name: '~delChannel2', value: 'disconnects the second channel', inline: true },
      )
      .setTimestamp()
      .setFooter({ text: 'Asptu#0003', iconURL: 'https://cdn.discordapp.com/avatars/982712671847735346/b6e7e5166bb0105777891a0e070c710f.webp?size=80' });
    
    message.channel.send({ embeds: [helpEmbed] });


    }
});

client.login(token);

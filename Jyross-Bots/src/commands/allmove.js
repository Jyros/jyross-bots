const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const { ErrorCodes } = require("../operations/errorcodes")
module.exports = {
conf: {
name: "allmove",
aliases: ["toplutaşı","toplutasi","toplu-taşı"],
description: "Bulunduğunuz sesteki üyeleri belirttiğiniz kanala taşır.",
examples:`${config.PREFIX}allmove <Kanal-ID> `,
category: "Yönetim",
help: "allmove",
enabled: true,
ownerOnly: false,
adminOnly: true,
cmdTest: false,
dmCmd: false,
cooldown: 25000,
},
run: async (client, message, args, embed, prefix) => {

if (!args[0]) {
    message.channel.send(embed.setDescription(`Üyelerin taşınacağı bir kanal ID'si girmelisin!`).setFooter(`Hata kodu: ${ErrorCodes.KelimeHata.code}`))
    message.react(emojis.no)
    return;
}

if (!message.member.voice.channelID) {
    message.channel.send(embed.setDescription(`Bu komutu kullanmak için üyelerin taşınacağı seste olman gerekiyor!`))
    message.react(emojis.no)
    return;
}

if (message.member.voice.channelID) {

    const channel = message.member.voice.channel;

    channel.members.forEach((x, index) => {
      client.wait(index * 1000);
      x.voice.setChannel(args[0]);
    });
    message.channel.send(embed.setDescription(`\`${channel.name}\` kanalındaki tüm üyeler \`${message.guild.channels.cache.get(args[0]).name}\` adlı kanala taşındı!`));
  
    //cmd-genel >>>
 client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${message.author} (\`${message.author.id}\`) adlı kullanıcı <#${message.channel.id}> adlı kanalda \`${config.PREFIX}allmove\` komutu ile bulunduğu sesteki tüm kişileri başka bir kanala taşıdı!`)

} else {
    
    const channel = message.guild.channels.cache.get(args[0]);
    
    channel.members.forEach((x, index) => {
      client.wait(index * 1000);
      x.voice.setChannel(args[1]);
    });
    message.channel.send(embed.setDescription(`\`${channel.name}\` kanalındaki tüm üyeler \`${message.guild.channels.cache.get(args[1]).name}\` adlı kanala taşındı!`));
  
        //cmd-genel >>>
 client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${message.author} (\`${message.author.id}\`) adlı kullanıcı <#${message.channel.id}> adlı kanalda \`${config.PREFIX}allmove\` komutu ile bulunduğu sesteki tüm kişileri başka bir kanala taşıdı!`)

}

}};
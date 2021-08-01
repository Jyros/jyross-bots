const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
module.exports = {
conf: {
name: "allunmute",
aliases: ["all-unmute"],
description: "Bulunduğunuz kanaldaki tüm kullanıcıların susturulmasını açar.",
examples:`${config.PREFIX}allunmute`,
category: "Kurucu",
help: "allunmute",
enabled: true,
ownerOnly: true,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 10000,
},
run: async (client, message, args, embed, prefix) => {

    let channel = message.guild.channels.cache.get(args[0]) || message.member.voice.channel;
   
    if (!channel) return message.channel.send("Bir kanal ID girmeli ya da bir sesli kanalda bulunmalısın!");
   
    channel.members.forEach((x, index) => {
      client.wait(index * 1000);
      x.voice.setMute(false);
    });

    message.channel.send(embed.setDescription(`\`${channel.name}\` kanalındaki tüm üyelerin susturulması kaldırıldı!`));
 
    //cmd-genel >>>
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${message.author} (\`${message.author.id}\`) adlı kullanıcı <#${message.channel.id}> adlı kanalda \`${config.PREFIX}allunmute\` komutu ile bulunduğu sesteki tüm kişilerin susturulmasını kaldırdı!`)

}};
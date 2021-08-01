const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
module.exports = {
conf: {
name: "allmute",
aliases: ["all-mute"],
description: "Bulunduğunuz kanaldaki herkesi susturur.",
examples:`${config.PREFIX}allmute`,
category: "Kurucu",
help: "allmute",
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
    
    channel.members.filter((x) => !x.hasPermission("ADMINISTRATOR"))
      .forEach((x, index) => {
        client.wait(index * 1000);
        x.voice.setMute(true);
      });
    
      message.channel.send(embed.setDescription(`\`${channel.name}\` kanalındaki tüm üyeler susturuldu!`));

    //cmd-genel >>>
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${message.author} (\`${message.author.id}\`) adlı kullanıcı <#${message.channel.id}> adlı kanalda \`${config.PREFIX}allmute\` komutu ile bulunduğu sesteki tüm kişileri susturdu!`)

}};
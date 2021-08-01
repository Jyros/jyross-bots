const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
module.exports = {
conf: {
name: "sesli",
aliases: ["seslisay"],
description: "Açıklama Belirtilmemiş.",
examples:`${config.PREFIX}sesli `,
category: "Yetkili",
help: "sesli",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
staffLevel: 1,
},
run: async (client, message, args, embed, prefix) => {

    let pub = message.guild.members.cache.filter(x => x.voice.channel).filter(x => x.voice.channel.parentID === cnls["category-public"]).size
    let priv = message.guild.members.cache.filter(x => x.voice.channel).filter(x => x.voice.channel.parentID === cnls["category-private"]).size
    let teyit = message.guild.members.cache.filter(x => x.voice.channel).filter(x => x.voice.channel.parentID === cnls["category-registry"]).size
    
    message.channel.send(embed.setDescription(`
    Sesli kanallarda toplam \`${message.guild.members.cache.filter(x => x.voice.channel).size}\` üye bulunmakta.
    
    Teyit kategorisinde **${teyit}** üye bulunmakta.
    Public kategorisinde **${pub}** üye bulunmakta.
    Private kategorisinde **${priv}** üye bulunmakta.
    `)).then(m => m.delete({ timeout: 15000 }))
    message.react(emojis.yes)

}};
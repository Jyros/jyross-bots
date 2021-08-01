const emojis = require("../base/emojis.json");
const config = require("../base/config.json");
module.exports = {
conf: {
name: "say",
aliases: ["sayy"],
description: "Açıklama Belirtilmemiş.",
examples:`${config.PREFIX}say`,
category: "Yetkili",
help: "say",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
staffLevel: 1,
},
run: async (client, message, args, embed, prefix) => {

    message.channel.send(embed.setDescription(`
    Seste toplam \`${message.guild.members.cache.filter(x => x.voice.channel).size}\` kullanıcı var.
    Toplam \`${message.guild.members.cache.filter(x => x.user.username.includes(config.tag)).size}\` kişi tagımıza sahip.
    Sunucumuzda toplam \`${message.guild.memberCount}\` üye var.
    Sunucumuza toplam \`${message.guild.premiumSubscriptionCount}\` takviye yapılmış. (\`${message.guild.premiumTier}\`. seviye.)
    Sunucumuzda toplam \`${message.guild.members.cache.filter(x => x.presence.status !== "offline").size}\` çevrimiçi üye var.
    `)).then(m => m.delete({ timeout: 10000 }))
    message.react(emojis.yes)

}};
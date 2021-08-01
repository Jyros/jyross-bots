const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
module.exports = {
conf: {
name: "toplamcezalı",
aliases: ["toplam-cezalı","toplamceza","cezatoplam","cezalıtoplam"],
description: "Sunucudaki toplam ceza almış kullanıcıların sayısını gösterir.",
examples:`${config.PREFIX}toplamcezalı`,
category: "Yönetim",
help: "toplamcezalı",
enabled: true,
ownerOnly: false,
adminOnly: true,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
},
run: async (client, message, args, embed, prefix) => {

    message.guild.fetchBans()
    .then(banlı => {
    let bans = (`\`${banlı.size}\``)
    let jails = message.guild.members.cache.filter(y => y.roles.cache.has(roles["u-jail"])).size;
    let şüpheliler = message.guild.members.cache.filter(y => y.roles.cache.has(roles["u-şüpheli"])).size;
    let bannedtags = message.guild.members.cache.filter(y => y.roles.cache.has(roles["u-yasaklıtag"])).size;
    let cezalıkategori = jails+şüpheliler+bannedtags
    let cmutes = message.guild.members.cache.filter(j => j.roles.cache.has(roles["u-muted"])).size;
    let vmutes = message.guild.members.cache.filter(j => j.roles.cache.has(roles["u-vmuted"])).size;
    let mutes = cmutes+vmutes
    let warns = message.guild.members.cache.filter(j => j.roles.cache.has(roles["u-warn"].warn_1)).size;

    message.channel.send(embed.setDescription(`
Toplam Yasaklanmış Üye: ${bans || "0"}
Cezalı Kategorisinde Bulunan Üye: \`${cezalıkategori || "0"}\` (Jail: \`${jails || "0"}\` - Şüpheli: \`${şüpheliler || "0"}\` - Yasaklı Tag: \`${bannedtags || "0"}\`)
Toplam Susturulan Üye: \`${mutes || "0"}\` (Yazı: \`${cmutes || "0"}\` - Ses: \`${vmutes || "0"}\`)
Toplam Uyarılmış Üye: \`${warns || "0"}\`
`))
    })

}};
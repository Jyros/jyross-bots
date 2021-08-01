const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const db = require("quick.db");
const kdb = new db.table("kullanıcı")
const ydb = new db.table("yetkili")
module.exports = {
conf: {
name: "ytbilgi",
aliases: ["ybilgi"],
description: "Yetkili bilgilerinizi sıralar.",
examples:`${config.PREFIX}ytbilgi`,
category: "Yetkili",
help: "ytbilgi",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
staffLevel: 1,
},
run: async (client, message, args, embed, prefix) => {

    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    let member = message.guild.member(jyros)

    let cezapuan = await kdb.fetch(`cezapuan.${member.id}`)
    let kızteyits = await ydb.get(`teyit.${jyros.id}.kiz`)
    let erkekteyits = await ydb.get(`teyit.${jyros.id}.erkek`)
    let ktoplam = erkekteyits+kızteyits
    let ycmutes = await ydb.get(`muteler.${member.id}.chat`)
    let yvmutes = await ydb.get(`muteler.${member.id}.voice`) 
    let ybans = await ydb.get(`banlar.${member.id}`) 
    let yjails = await ydb.get(`jailler.${member.id}`)
    let ywarns = await ydb.get(`uyarilar.${member.id}`) 
    let ytoplam = ycmutes+yvmutes+ybans+yjails+ywarns

    message.channel.send(embed.setDescription(`

**Yetkili Bilgileri:**

Kullanıcı: ${member} (\`${member.id}\`)
Ceza Puanı: \`${cezapuan || "0"}\`

**Kayıt Bilgileri:**

Toplam \`${ktoplam || "0"}\` kişiyi kayıt etmiş.

\`>\` Toplam Erkek Teyit: \`${erkekteyits || "0"}\`
\`>\` Toplam Kız Teyit: \`${kızteyits || "0"}\`

**Ceza Bilgileri:**

Toplam \`${ytoplam || "0"}\` ceza komutu kullanmış.

\`>\` Toplam Uyarma: \`${ywarns || "0"}\`
\`>\` Toplam Chat Mute: \`${ycmutes || "0"}\`
\`>\` Toplam Voice Mute: \`${yvmutes || "0"}\`
\`>\` Toplam Cezalandırma: \`${yjails || "0"}\`
\`>\` Toplam Yasaklama: \`${ybans || "0"}\`
`))

}};
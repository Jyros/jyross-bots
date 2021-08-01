const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const jyrosData = require("../operations/jyrosData");
const { MessageEmbed } = require("discord.js")
const db = require("quick.db");
const kdb = new db.table("kullanıcı")
const ydb = new db.table("yetkili");
const ms = require("ms");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
module.exports = {
conf: {
name: "profil",
aliases: ["p","pme","prof","kb","kbilgi"],
description: "Belirlenen kullanıcının veya kendiniz ile alakalı deyatlı bilgileri sıralar.",
examples:`${config.PREFIX}profil <@Jyross/ID> `,
category: "Genel",
help: "profil",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 2000,
},
run: async (client, message, args, embed, prefix) => {

    let jyros = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
    let member = message.guild.member(jyros)
    let bans = await kdb.get(`banlar.${member.id}`) 
    let jails = await kdb.get(`jailler.${member.id}`) 
    let cmutes = await kdb.get(`muteler.${member.id}.chat`)
    let vmutes = await kdb.get(`muteler.${member.id}.voice`) 
    let mutes = cmutes+vmutes 
    let warns = await kdb.get(`uyarilar.${member.id}`) 
    let ads = await kdb.get(`ads.${jyros.id}`) 
    let toplamcezalar = bans+jails+cmutes+vmutes+warns+ads
    let cezapuan = await kdb.fetch(`cezapuan.${member.id}`)
    let kızteyits = await ydb.get(`teyit.${jyros.id}.kiz`)
    let erkekteyits = await ydb.get(`teyit.${jyros.id}.erkek`)
    let ktoplam = erkekteyits+kızteyits
    let ycmutes = await ydb.get(`muteler.${member.id}.chat`)
    let yvmutes = await ydb.get(`muteler.${member.id}.voice`) 
    let ymutes = ycmutes+yvmutes
    let ybans = await ydb.get(`banlar.${member.id}`) 
    let yjails = await ydb.get(`jailler.${member.id}`)
    let ywarns = await ydb.get(`uyarilar.${member.id}`) 
    let ytoplamkomut = ycmutes+yvmutes+ybans+yjails+ywarns+kızteyits+erkekteyits

if((member.hasPermission('ADMINISTRATOR') || message.member.roles.cache.has(roles["cmd-botcommands"]) )) {

  embed.addField(
`**❯ Yetkili Bilgileri:**`,
`
Yetkili, toplamda \`${ytoplamkomut || "0"}\` komut kullanmış.

**❯ Teyit Bilgileri:**
\`•\` Toplam Kayıt: \`${ktoplam || "0"}\`
\`•\` Toplam Erkek Kayıt: \`${erkekteyits || "0"}\`
\`•\` Toplam Kız Kayıt: \`${kızteyits || "0"}\`

**❯ Cezalandırma Bilgileri**
\`•\` Toplam Uyarma: \`${ywarns || "0"}\`
\`•\` Toplam Susturma: \`${ymutes || "0"}\` (Yazı: \`${ycmutes || "0"}\` - Ses: \`${yvmutes || "0"}\`)
\`•\` Toplam Cezalandırma: \`${yjails || "0"}\`
\`•\` Toplam Yasaklama: \`${ybans || "0"}\`
`)

}

message.channel.send(embed
    .setFooter(`${config.embed.footer}`)
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setThumbnail(jyros.avatarURL({dynamic: true}))
    .setDescription(`
    **❯ ${jyros} kişisinin bilgileri:**

    **❯ Kullanıcı Bilgileri:**
    \`•\` Hesap: ${jyros}
    \`•\` ID: \`${jyros.id}\`
    \`•\` Oluşturulma Tarihi: \`${moment(member.user.createdAt).format("DD/MM/YY")}\` - (${moment(member.user.createdAt).fromNow()})
    ─────────────────────
    **❯ Sunucu Bilgileri:**
    \`•\` Takma Adı: ${member.displayName.replace("`", "")}
    \`•\` Katılma Tarihi: \`${moment(member.joinedAt).format("DD/MM/YY")}\`
    \`•\` Katılım Sıralaması: \`${(message.guild.members.cache.filter(a => a.joinedTimestamp <= message.guild.members.cache.get(jyros.id).joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}\` - (${moment(member.joinedAt).fromNow()})

    \`•\` Rolleri (${member.roles.cache.filter(x => x.name !== "@everyone").size}): ${member.roles.cache.size > 10 ? `Çok fazla rolün bulunmakta! (${member.roles.cache.size})` : member.roles.cache.filter(x => x.name !== "@everyone").map(roles => roles).join(",") }
    ─────────────────────
    **❯ Ceza Bilgileri:**
    \`•\` Toplam Susturulma: \`${mutes || "0"}\` (Yazı: \`${cmutes || "0"}\` - Ses: \`${vmutes || "0"}\`)
    \`•\` Toplam Cezalandırılma: \`${jails || "0"}\`
    \`•\` Toplam Yasaklanma: \`${bans || "0"}\`
    \`•\` Toplam Uyarılma: \`${warns || "0"}\`
    \`•\` Toplam Aldığı Cezalar: \`${toplamcezalar || "0"}\`
    \`•\` Ceza Puanı: \`${cezapuan || "0"}\`
    `))

}};
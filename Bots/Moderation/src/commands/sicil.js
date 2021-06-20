const { MessageEmbed } = require('discord.js')
const moment = require("moment");
moment.locale("tr")
const db = require("quick.db")
const kdb = new db.table("kullanıcı");
const settings = require("../settings/settings.json");
const config = require("../settings/config.json");
module.exports = {
conf: {
aliases: ["sc","geçmiş", "ceza-geçmişi"],
name: "sicil",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
let user = message.guild.member(jyros)
let puan = await kdb.fetch(`cezapuan.${user.id}`) || "0"
let x = await kdb.fetch(`sicil.${user.id}`)
if (args[0] === "sıfırla" ) {
if (!message.member.roles.cache.some(r => [(settings.roles.owner)].includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")){message.channel.send(embed.setDescription(`${settings.emojis.no} Bu komutu kullanmak için yeterli yetkiniz bulunmamakta.`)).then(x => x.delete(5000)); return; }
kdb.delete(`sicil.${user.id}`)
kdb.delete(`cezapuan.${user.id}`)
message.channel.send(embed.setDescription(`${user} adlı kullanıcının ${message.author} tarafından başarıyla sicil geçmişi ve ceza puanı silindi.`).setColor(`${config.embed.color.green}`))
message.guild.channels.cache.get(settings.channels.logs.cezaPuanLog).send(`${user}, sicil geçmişiniz ve ceza puanınız sıfırlandı. Yetkili: ${message.author}`)
message.react(settings.emojis.yes)}
if (!args[0]) {
if (!x) return message.channel.send(embed.setDescription(`
${user} Kullanıcısının sicil geçmişi temiz.
`).setFooter(`Daha fazlası için: ${config.PREFIX}profil @Jyros`)).then(m => m.delete({ timeout: 7000 }))
let sicil = x.map((data, index) => `**[${data.Tip|| "belirtilmemiş"}]** <@!${data.Yetkili|| "belirtilmemiş"}> tarafından cezalandırıldı. \`#${data.cezaID || "Bulunamadı"}\``)
message.channel.send(embed.setDescription(`
${sicil.join("\n") || "Bu kullanıcının sicili temiz."}

**Toplam Ceza puanı:** \`${puan}\`

\`>\` Kullanıcı hakkındaki daha fazla bilgi için: \`${config.PREFIX}profil\`
`).setFooter(`${config.embed.footer}`)).then(m => m.delete({ timeout: 20000 }))}
}}
const { MessageEmbed } = require('discord.js')
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const db = require("quick.db")
const kdb = new db.table("kullanıcı");
const config = require("../settings/config.json");
module.exports = {
conf: {
aliases: ["p","pme","prof","kb","kbilgi"],
name: "profil",
},
run: async (client, message, args) => {
if (!message.guild) return;
const jyros = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
let user = message.guild.member(jyros)
let member = message.guild.member(jyros)
let mutes = await kdb.get(`muteler.${user.id}`) || "0"
let bans = await kdb.get(`banlar.${user.id}`) || "0"
let jails = await kdb.get(`jailler.${user.id}`) || "0"
let toplamcezalar = mutes+bans+jails
let cezapuan = await kdb.fetch(`cezapuan.${user.id}`) || "0"
const embed = new MessageEmbed()
message.channel.send(embed
.setColor(`${config.embed.color.white}`)
.setFooter(`${config.embed.footer}`)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setThumbnail(jyros.avatarURL({dynamic: true}))
.setDescription(`
${client.users.cache.get(jyros.id).username} (<@${jyros.id}>) kişisinin bilgileri:
─────────────────────
**Kullanıcı Bilgileri:**
\`•\` Hesap: ${jyros}
\`•\` Kullanıcı ID: \`${jyros.id}\`
\`•\` Kuruluş Tarihi: \`${moment(member.user.createdAt).format("DD/MM/YY")}\` - (${moment(member.user.createdAt).fromNow()})
─────────────────────
**Sunucu Bilgileri:**
\`•\` Katılım Sıralaması: \`${(message.guild.members.cache.filter(a => a.joinedTimestamp <= message.guild.members.cache.get(jyros.id).joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()}\` - (${moment(member.joinedAt).fromNow()})
\`•\` Katılma Tarihi: \`${moment(member.joinedAt).format("DD/MM/YY")}\`
\`•\` Takma Adı: ${member.displayName.replace("`", "")}

\`•\` Rolleri (${member.roles.cache.size}): ${member.roles.cache.size > 10 ? `Çok fazla rolün bulunmakta! (${member.roles.cache.size})` : member.roles.cache.filter(x => x.name !== "@everyone").map(roles => roles).join(",") }
─────────────────────
**Ceza Bilgileri:**
\`•\` Toplam Susturulma: \`${mutes}\`
\`•\` Toplam Cezalandırılma: \`${jails}\`
\`•\` Toplam Yasaklanma: \`${bans}\`
\`•\` Toplam Aldığı Cezalar: \`${toplamcezalar}\`
\`•\` Ceza Puanı: \`${cezapuan}\``))
}}
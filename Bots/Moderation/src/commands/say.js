const { MessageEmbed } = require('discord.js')
const settings = require('../settings/settings.json');
const config = require("../settings/config.json");
module.exports = {
conf: {
aliases: ["say"],
name: "say",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setColor("#fdfdf9").setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
if (!message.member.roles.cache.some(r => [(settings.roles.staff.botCommands)].includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")){message.channel.send(embed.setDescription(`${settings.emojis.no} Bu komutu kullanmak için yeterli yetkiniz bulunmamakta.`)).then(m => m.delete({ timeout: 7000 })); return; }
let toplam = message.guild.memberCount;
let members = message.guild.members.cache.size
let pub = message.guild.members.cache.filter(x => x.voice.channel).filter(x => x.voice.channel.parentID === settings.channels.categories.public).size
let priv = message.guild.members.cache.filter(x => x.voice.channel).filter(x => x.voice.channel.parentID === settings.channels.categories.secret).size
let alone = message.guild.members.cache.filter(x => x.voice.channel).filter(x => x.voice.channel.parentID === settings.channels.categories.alone).size
let teyit = message.guild.members.cache.filter(x => x.voice.channel).filter(x => x.voice.channel.parentID === settings.channels.categories.registry).size
let ses = message.guild.members.cache.filter(x => x.voice.channel).size
let taglı = message.guild.members.cache.filter(x => x.user.username.includes(settings.tag.tag)).size
let aktif = message.guild.members.cache.filter(x => x.presence.status !== "offline").size
let boost = message.guild.premiumSubscriptionCount
let boostlevel = message.guild.premiumTier
if (args[0] === "yüzde") {
message.channel.send(embed.setDescription(`
Sunucumuzdaki toplam kullanıcı: **${toplam}**
Sunucumuzdaki toplam taglı: **${taglı}** - \`%${parseInt(((members - taglı) / members) * 100)}\`
Sunucumuzdaki toplam çevrimiçi: **${aktif}** - \`%${parseInt(((members - aktif) / members) * 100)}\`
`)).then(m => m.delete({ timeout: 15000 }))
message.react(settings.emojis.yes)}
if (args[0] === "kategori") {
message.channel.send(embed.setDescription(`
Sesli kanallarda toplam \`${ses}\` üye bulunmakta.

Teyit kategorisinde **${teyit}** üye bulunmakta.
Public kategorisinde **${pub}** üye bulunmakta.
Priv kategorisinde **${priv}** üye bulunmakta.
Alone kategorisinde **${alone}** üye bulunmakta.
`)).then(m => m.delete({ timeout: 15000 }))
message.react(settings.emojis.yes)}
if (!args[0]) {
message.channel.send(embed.setDescription(`
Seste toplam \`${ses}\` kullanıcı var.
Toplam \`${taglı}\` kişi tagımıza sahip.
Sunucumuzda toplam \`${toplam}\` üye var.
Sunucumuza toplam \`${boost}\` takviye yapılmış. (\`${boostlevel}\`. seviye.)
Sunucumuzda toplam \`${aktif}\` çevrimiçi üye var.
`)).then(m => m.delete({ timeout: 7000 }))
message.react(settings.emojis.yes)}
}}
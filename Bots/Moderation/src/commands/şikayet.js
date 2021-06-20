const { MessageEmbed } = require('discord.js')
const moment = require("moment");
moment.locale("tr")
const db = require("quick.db")
const kdb = new db.table("kullanıcı");
const settings = require("../settings/settings.json");
const config = require("../settings/config.json");
module.exports = {
conf: {
aliases: ["şikayet","sikayet","şkyt"],
name: "şikayet",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if (!jyros){message.channel.send(`${settings.emojis.no} ${message.author}, Şikayetçi olduğun kişiyi etiketleyip şikayetini yazmalısın. \`${config.PREFIX}şikayet @Jyros/ID <chat-sesli-taciz-dm-diğer>\``).then(m => m.delete({ timeout: 7000 })); message.react(settings.emojis.no)}
if(message.author.id === jyros) return message.channel.send(`Hatalı Kullanım!`).then(amınakoy => amınakoy.delete({timeout: 5000}));
let tür = args[1];
let şikayet = args.slice(2).join(' ');
let puan = await kdb.fetch(`cezapuan.${jyros.id}`) || "0"
if(tür !== "chat" && tür !== "sesli" && tür !== "taciz" && tür !== "dm" && tür !== "diğer") return message.channel.send(`Eksik argüman! \`${config.PREFIX}şikayet <@Jyros/ID> <chat-sesli-taciz-dm-diğer>\``).then(x => x.delete({timeout: 5000})); 
if (!şikayet){message.channel.send(`${settings.emojis.no} ${message.author}, eksik argüman! \`${config.PREFIX}şikayet @Jyros/ID <chat-sesli-taciz-dm-diğer>\``).then(m => m.delete({ timeout: 9000 })); message.react(settings.emojis.no)}
kdb.add(`cezapuan.${jyros.id}`, 15)
message.channel.send(embed.setDescription(`${settings.emojis.yes} ${message.author}, şikayetiniz başarıyla sunucu sorumlularına iletilmiştir. En kısa zamanda sonuçlandırılacaktır.`)).then(m => m.delete({ timeout: 12000 })); message.react(settings.emojis.yes)
message.guild.channels.cache.get(settings.channels.logs.şikayetler).send(embed.setColor(`${config.embed.color.white}`).setTitle(`Bir Üye Şikayet Edildi!`).setDescription(`${jyros} adlı üye ${message.author} tarafından **${tür}** türü nedeniyle şikayet edildi.

Şikayet edilen: ${jyros}
ID: \`(${jyros.id})\`
─────────────────────
Şikayetçi: ${message.author}
ID: \`(${message.author.id})\`
Şikayetçi Ceza Puanı: **${puan}** (+15)
─────────────────────
Şikayet: **${şikayet}**
Şikayet Türü: ${tür}
Şikayet Tarihi: \`${moment(Date.now()).format("LLL")}\``))
}}
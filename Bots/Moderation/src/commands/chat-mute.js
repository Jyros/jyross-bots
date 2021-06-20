const { MessageEmbed } = require('discord.js')
const ms = require("ms");
const moment = require("moment");
moment.locale("tr");
const db = require("quick.db");
const kdb = new db.table("kullanıcı");
const settings = require("../settings/settings.json");
const config = require("../settings/config.json");
module.exports = {
conf: {
aliases: ["cmute","c-mute","chatm","chatmute","chat-mute","chat-m","c-m","sustur","yazı-sustur"],
name: "mute",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`)
if (!message.member.roles.cache.some(r => [(settings.roles.staff.chatMuteHammer)].includes(r.id)) && !message.member.hasPermission("MUTE_MEMBERS") && !message.member.hasPermission("ADMINISTRATOR")){message.channel.send(embed.setDescription(`${settings.emojis.no} Bu komutu kullanmak için yeterli yetkiniz bulunmamakta.`).setColor(`${config.embed.color.red}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))).then(x => x.delete({ timeout: 5000 })); return }
let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!jyros) return message.channel.send(embed.setDescription(`${settings.emojis.no} Lütfen susturulacak kişiyi etiketleyiniz. \`${config.PREFIX}mute @Jyros 1s/m/h/d <sebep>\``).setColor(`${config.embed.color.red}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))).then(x => x.delete({ timeout: 5000 }));
if (jyros.id === message.author.id) return message.channel.send(embed.setDescription(`${settings.emojis.no} Kendinizi susturamazsınız.`).setColor(`${config.embed.color.red}`)).then(x => x.delete({ timeout: 5000 }));
if (jyros.id === message.author.id) return message.react(settings.emojis.no);
let time = args[1].replace("s", " Saniye").replace("m", " Dakika").replace("h", " Saat").replace("d", " Gün")
let reason = args.splice(2).join(" ")
if (!time) return message.channel.send(embed.setDescription(`${settings.emojis.no} Geçerli bir süre belirtiniz. \`${config.PREFIX}mute @Jyros 1s/m/h/d <sebep>\``).setColor(`${config.embed.color.red}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))).then(x => x.delete({ timeout: 5000 }));
if(!reason) return message.channel.send(embed.setDescription(`${settings.emojis.no} Geçerli bir sebep giriniz. \`${config.PREFIX}mute @Jyros 1s/m/h/d <sebep>\``).setColor(`${config.embed.color.red}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))).then(x => x.delete({ timeout: 5000 }));
jyros.roles.add(settings.roles.chatMuted)
let cezaID = db.get(`cezaid.${message.guild.id}`) + 1
let puan = await kdb.fetch(`cezapuan.${jyros.id}`) || "0"
kdb.add(`muteler.${jyros.id}`, 1)
db.add(`cezaid.${message.guild.id}`, +1)
kdb.add(`cezapuan.${jyros.id}`, 10)
kdb.set(`chatmuted.${jyros.id}`, "chatmuted");
kdb.push(`sicil.${jyros.id}`, {Sebep: reason, Yetkili: message.author.id, Tip: "CHAT-MUTE", cezaID: cezaID})
message.channel.send(embed.setDescription(`${settings.emojis.yes} ${jyros} adlı kullanıcı ${message.author} tarafından \`${reason}\` sebebiyle \`${time}\` boyunca yazı kanallarında başarıyla susturuldu. \`#${cezaID}\``).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(`${config.embed.color.green}`)).then(x => x.delete({ timeout: 9000 }));
client.channels.cache.get(settings.channels.logs.cezaPuanLog).send(`${jyros}, aldığınız **#${cezaID}** ID'li ceza ile **${puan}** ceza puanına ulaştınız.`)
message.guild.channels.cache.get(settings.channels.logs.chatMuteLog).send(embed.setColor(`${config.embed.color.white}`).setTitle(`Bir Üye Yazı Kanallarında Susturuldu!`).setDescription(`
Susturulan Üye: ${jyros} - \`${jyros.id}\`
Yetkili: ${message.author} - \`${message.author.id}\`
Ceza Sebebi: \`${reason}\`
Ceza Süresi: \`${time}\`
Ceza Tarihi: \`${moment(Date.now()).format("LLL")}\`
Ceza ID: \`${cezaID}\``))
setTimeout(async() => {
jyros.roles.remove(settings.roles.chatMuted)
kdb.delete(`chatmuted.${jyros.id}`, "chatmuted");
message.guild.channels.cache.get(settings.channels.logs.chatMuteLog).send(embed.setColor(`${config.embed.color.white}`).setTitle(`Bir Üyenin Yazı kanallarında Susturulması Sona Erdi!`).setDescription(`
Cezası Kalkan Üye: ${jyros} - \`${jyros.id}\`
Yetkili: ${message.author} - \`${message.author.id}\`
Ceza Sebebi: \`${reason}\`
Biten Ceza Süresi: \`${time}\`
Ceza ID: \`${cezaID}\``))
}, ms(args[1]))
}}
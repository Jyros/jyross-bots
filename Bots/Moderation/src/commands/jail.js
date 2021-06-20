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
aliases: ["ceza","cezalı"],
name: "jail",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`)
if (!message.member.roles.cache.some(r => [(settings.roles.staff.jailHammer)].includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")){message.channel.send(embed.setDescription(`${settings.emojis.no} Bu komutu kullanmak için yeterli yetkiniz bulunmamakta.`).setColor(`${config.embed.color.red}`)).then(x => x.delete({ timeout: 5000 })); return }
let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!jyros) return message.channel.send(embed.setDescription(`${settings.emojis.no} Geçerli bir üye belirtiniz. \`${config.PREFIX}jail @Jyros 1s/m/h/d <sebep>\``).setColor(`${config.embed.color.red}`)).then(x => x.delete({ timeout: 5000 }));
const time = args[1].replace("s", " Saniye").replace("m", " Dakika").replace("h", " Saat").replace("d", " Gün")
const reason = args.slice(2).join(' ')
if(!time) { message.channel.send(embed.setDescription(`${settings.emojis.no} Geçerli bir süre giriniz. \`${config.PREFIX}jail @Jyros 1s/m/h/d <sebep>\``).setColor(`${config.embed.color.red}`)).then(x => x.delete({ timeout: 5000 }))
message.react(settings.emojis.no)};
if (!reason) { message.channel.send(embed.setDescription(`${settings.emojis.no} Geçerli bir sebep giriniz. \`${config.PREFIX}jail @Jyros 1s/m/h/d <Sebep>\``).setColor(`${config.embed.color.red}`)).then(x => x.delete({ timeout: 5000 }))
message.react(settings.emojis.no)};
jyros.roles.add(settings.roles.jail);
jyros.roles.cache.forEach(r => {
jyros.roles.remove(r.id)
db.add(`cezaid.${message.guild.id}`, +1)
kdb.add(`cezapuan.${jyros.id}`, 15)
db.set(`${message.guild.id}.jail.${jyros.id}.roles.${r.id}`, r.id )})
kdb.add(`jailler.${jyros.id}`, 1)
kdb.set(`cezalı.${jyros.id}`, "cezalı");
kdb.push(`sicil.${user.id}`, { Sebep: reason, Yetkili: message.author.id, Tip: "JAİL", cezaID: cezaID })
let cezaID = db.get(`cezaid.${message.guild.id}`) + 1
let puan = kdb.fetch(`cezapuan.${jyros.id}`) || "0"
message.channel.send(embed.setDescription(`${settings.emojis.yes} ${jyros} isimli üye \`${reason}\` sebebiyle başarıyla cezalıya atıldı! \`#${cezaID}\`
Üyenin ceza puanı: ${puan}`)).then(x => x.delete({ timeout: 5000 }));
client.channels.cache.get(settings.channels.logs.cezaPuanLog).send(`${jyros}, aldığınız \`#${cezaID}\` ID'li ceza ile \`${puan}\` ceza puanına ulaştınız.`)
message.guild.channels.cache.get(settings.channels.logs.jailLog).send(embed.setColor(`${config.embed.color.white}`).setTitle(`Bir Kullanıcı Cezalıya Atıldı!`).setDescription(`
Cezalıya Atılan Üye: ${jyros} - \`${jyros.id}\` 
Cezalıya Atan Yetkili: ${message.author} - \`${message.author.id}\`
Ceza Sebebi: \`${reason}\`
Ceza Süresi: \`${time}\`
Ceza Tarihi: \`${moment(Date.now()).format("LLL")}\`
Ceza ID: \`#${cezaID}\``))
setTimeout(function(){
jyros.roles.remove(settings.roles.jail);
message.guild.channels.cache.get(settings.channels.logs.jailLog).send(embed.setColor(`${config.embed.color.white}`).setTitle(`Bir Kullanıcının Cezası Bitti!`).setDescription(`
Cezası Biten Üye: ${jyros} - \`${jyros.id}\`
Cezayı Atan Yetkili: ${message.author} - \`${message.author.id}\`
Neden Ceza Almıştı: \`${reason}\`
Ceza ID: \`#${cezaID}\`
Biten Süre: \`${time}\``))}, ms(time))
setTimeout(async () =>{
message.guild.roles.cache.forEach(async r => {
const roller = await db.fetch(`${message.guild.id}.jail.${jyros.id}.roles.${r.id}` )
if(roller != r.id)  return ;
if(roller){jyros.roles.add(roller)}
db.delete(`${message.guild.id}.jail.${jyros.id}.roles.${r.id}`)})}, ms(time))
kdb.delete(`cezalı.${jyros.id}`, "cezalı");
}}
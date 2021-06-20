const { MessageEmbed } = require("discord.js");
const db = require('quick.db')
const kdb = new db.table("kullanıcı");
const config = require("../settings/config.json")
const settings = require("../settings/settings.json")
module.exports = (jyros) => {
let embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setColor(`${config.embed.color.white}`).setTimestamp()
let puan = kdb.fetch(`cezapuan.${jyros.id}`) || "0"
if (db.fetch(`cezalı.${jyros.id}`)) {
kdb.add(`cezapuan.${jyros.id}`, 10)
jyros.roles.set([settings.roles.jail])
message.guild.channels.cache.get(settings.channels.logs.jailLog).send(embed.setTitle(`Bir Cezalı Çıkıp Girdiği İçin Tekrar Cezalandırıldı!`).setDescription(`
Cezalı: ${jyros} - \`${jyros.id}\`
Cezalıyken sunucudan çıkıp girdiği için ceza puanı \`${puan}\` oldu.`))
message.guild.channels.cache.get(settings.channels.logs.cezaPuanLog).send(`${jyros}, cezalıyken sunucudan çıkıp girdiğiniz için \`${puan}\` ceza puanına ulaştınız.`)}
if (db.fetch(`chatmuted.${jyros.id}`)) {
kdb.add(`cezapuan.${jyros.id}`, 5)
jyros.roles.add(settings.roles.chatMuted)
message.guild.channels.cache.get(settings.channels.logs.chatMuteLog).send(embed.setTitle(`Bir Cezalı Çıkıp Girdiği İçin Tekrar Cezalandırıldı!`).setDescription(`
Cezalı: ${jyros} - \`${jyros.id}\`
Cezalıyken sunucudan çıkıp girdiği için ceza puanı \`${puan}\` oldu.`))
message.guild.channels.cache.get(settings.channels.logs.cezaPuanLog).send(`${jyros}, cezalıyken sunucudan çıkıp girdiğiniz için \`${puan}\` ceza puanına ulaştınız.`)}
if (db.fetch(`voicemuted.${jyros.id}`)) {
kdb.add(`cezapuan.${jyros.id}`, 5)
jyros.roles.add(settings.roles.voiceMuted)
message.guild.channels.cache.get(settings.channels.logs.voiceMuteLog).send(embed.setTitle(`Bir Cezalı Çıkıp Girdiği İçin Tekrar Cezalandırıldı!`).setDescription(`
Cezalı: ${jyros} - \`${jyros.id}\`
Cezalıyken sunucudan çıkıp girdiği için ceza puanı \`${puan}\` oldu.`))
message.guild.channels.cache.get(settings.channels.logs.cezaPuanLog).send(`${jyros}, cezalıyken sunucudan çıkıp girdiğiniz için \`${puan}\` ceza puanına ulaştınız.`)}
}
module.exports.conf = {
name: "guildMemberAdd",
};
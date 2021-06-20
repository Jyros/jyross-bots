const db = require("quick.db");
const kdb = new db.table("kullanıcı");
const { MessageEmbed } = require('discord.js')
const settings = require('../settings/settings.json');
const config = require("../settings/config.json");
const moment = require("moment");
moment.locale("tr");
module.exports = {
conf: {
aliases: ["ses-susturma-kaldır","unvoicemute","un-vmute"],
name: "unvmute",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
if (!message.member.roles.cache.some(r => [(settings.roles.staff.voiceMuteHammer)].includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")){message.channel.send(embed.setColor(`${config.embed.color.red}`).setDescription(`${settings.emojis.no} Bu komutu kullanmak için yeterli yetkiniz bulunmamakta.`)).then(x => x.delete({ timeout: 5000 })); return; }
let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!jyros) return message.channel.send(embed.setColor(`${config.embed.color.red}`).setDescription(`${settings.emojis.no} Ses kanallarındaki susturulması çıkarılacak üyeyi belirtmelisin!`)).then(x => x.delete({ timeout: 5000 }));
jyros.roles.remove(settings.roles.voiceMuted)
kdb.delete(`voicemuted.${member.id}`, "voicemuted");
message.channel.send(embed.setColor(`${config.embed.color.green}`).setDescription(`${message.author} Başarılı bir şekilde ${jyros} adlı kullanıcının ses kanallarındaki susturulmasını çıkardı!`)).then(x => x.delete({ timeout: 5000 }));
message.guild.channels.cache.get(settings.channels.logs.voiceMuteLog).send(embed.setColor(`${config.embed.color.white}`).setTitle(`Bir Üyenin Ses kanallarında Susturulması Kaldırıldı!`).setDescription(`
Cezası Kalkan Üye: ${jyros} - \`${jyros.id}\`
Yetkili: ${message.author} - \`${message.author.id}\`
Tarih: \`${moment(Date.now()).format("LLL")}\`
`))}}
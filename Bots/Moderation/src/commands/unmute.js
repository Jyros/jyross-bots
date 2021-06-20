const db = require("quick.db")
const kdb = new db.table("kullanıcı");
const { MessageEmbed } = require('discord.js')
const settings = require('../settings/settings.json');
const config = require("../settings/config.json");
const moment = require("moment");
moment.locale("tr");
module.exports = {
conf: {
aliases: ["uncmute","unchatmute","un-cmute"],
name: "unmute",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
if (!message.member.roles.cache.some(r => [(settings.roles.staff.chatMuteHammer)].includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MUTE_MEMBERS")){message.channel.send(embed.setDescription(`${settings.emojis.no} Bu komutu kullanmak için yeterli yetkiniz bulunmamakta.`).setColor(`${config.embed.color.red}`)).then(x => x.delete({ timeout: 5000 })); return; }
let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!jyros) return message.channel.send(embed.setDescription(`${settings.emojis.no} Yazı kanallarındaki susturulması çıkarılacak üyeyi belirtmelisin!`).setColor(`${config.embed.color.red}`)).then(x => x.delete({ timeout: 5000 }));
if (jyros.id === message.author.id) return message.react(settings.emojis.no);
if (jyros.id === client.user.id) return message.react(settings.emojis.no);
jyros.roles.remove(settings.roles.chatMuted);
kdb.delete(`chatmuted.${jyros.id}`, "chatmuted");
message.channel.send(embed.setDescription(`${settings.emojis.yes} ${message.author} Başarılı Bir Şekilde ${jyros} adlı kullanıcının yazı kanallarındaki susturulmasını çıkardı!`).setColor(`${config.embed.color.green}`)).then(x => x.delete({ timeout: 5000 }));
message.guild.channels.cache.get(settings.channels.logs.chatMuteLog).send(embed.setColor(`${config.embed.color.white}`).setTitle(`Bir Üyenin Yazı kanallarında Susturulması Kaldırıldı!`).setDescription(`
Cezası Kaldırılan Üye: ${jyros} - \`${jyros.id}\`
Yetkili: ${message.author} - \`${message.author.id}\`
Tarih: \`${moment(Date.now()).format("LLL")}\``))
}}
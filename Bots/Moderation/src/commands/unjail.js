const { MessageEmbed } = require('discord.js')
const db = require('quick.db');
const kdb = new db.table("kullanıcı");
const settings = require('../settings/settings.json');
const config = require("../settings/config.json");
const moment = require("moment");
moment.locale("tr");
module.exports = {
conf: {
aliases: ["uncezalı","cezalıçıkar","cezalı-çıkar"],
name: "unjail",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
if (!message.member.roles.cache.some(r => [(settings.roles.staff.jailHammer)].includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")){message.channel.send(jrsembed.setDescription(`${ayarlar.emoji.no} Bu komutu kullanmak için yeterli yetkiniz bulunmamakta.`).setColor(`${config.embed.color.red}`)).then(x => x.delete({ timeout: 5000 })); return; }
let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!jyros) return message.channel.send(embed.setDescription(`${settings.emojis.no} Cezalıdan çıkarılacak üyeyi belirtmelisin!`).setColor(`${config.embed.color.red}`)).then(x => x.delete({ timeout: 5000 }));
if (jyros.id === message.author.id) return message.react(settings.emojis.no);
if (jyros.id === client.user.id) return message.react(settings.emojis.no);
jyros.roles.remove(settings.roles.jail);
message.guild.roles.cache.forEach(async r => {
let roles = db.fetch(`${message.guild.id}.jail.${jyros.id}.roles.${r.id}`)
if(roles != r.id) return;
if(roles){jyros.roles.add(roles)}});
kdb.delete(`cezalı.${jyros.id}`, "cezalı");
message.channel.send(embed.setDescription(`${settings.emojis.yes} ${jyros} Adlı üye başarıyla cezası kaldırıldı!`).setColor(`${config.embed.color.yes}`)).then(x => x.delete({ timeout: 5000 }));
message.guild.channels.cache.get(settings.channels.logs.jailLog).send(embed.setColor(`${config.embed.color.white}`).setTitle(`Bir Üyenin Cezası Kaldırıldı!`).setDescription(`
Cezası Biten Üye: ${jyros} - \`${jyros.id}\`
Cezayı Bitiren Yetkili: ${message.author} - \`${message.author.id}\`
Bitiş Tarihi: \`${moment(Date.now()).format("LLL")}\``))
}}
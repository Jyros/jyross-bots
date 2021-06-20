const { MessageEmbed } = require('discord.js')
const moment = require("moment");
moment.locale("tr")
const settings = require("../settings/settings.json");
const config = require("../settings/config.json");
module.exports = {
conf: {
aliases: ["unsg","unsie","bankaldır","un-ban","yasak-kaldır"],
name: "unban",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
if (!message.member.roles.cache.some(r => [(settings.roles.staff.banHammer)].includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")){message.channel.send(embed.setDescription(`${settings.emojis.no} Bu komutu kullanmak için yeterli yetkiniz bulunmamakta.`).setColor(`${config.embed.color.red}`)).then(x => x.delete({ timeout: 5000 })); return }
let jyros = await client.users.fetch(args[0]);
if(!jyros) return message.channel.send(embed.setDescription(`${message.author} bir ID belirtmelisin.`)).then(x => x.delete({timeout: 5000}));
if(jyros === client.user.id){ message.channel.send(embed.setDescription(`${message.author}, Bir botun yasağını kaldıramazsın.`).setColor(`${config.embed.color.red}`)).then(x => x.delete({ timeout: 5000 }));
message.react(settings.emojis.no)}
message.guild.members.unban(jyros.id)
message.channel.send(embed.setDescription(`${message.author} tarafından ${jyros} adlı kullanıcının sunucu yasağı kaldırıldı.`).setColor(`${config.embed.color.green}`)).then(x => x.delete({ timeout: 5000}))
message.guild.channels.cache.get(settings.channels.logs.banLog).send(embed.setColor(`${config.embed.color.white}`).setTitle(`Bir Kullanıcının Banı Kaldırıldı!`).setDescription(`
Üye: ${jyros} - \`${jyros.id}\`
Yetkili: ${message.author} - \`${message.author.id}\`
Tarih: \`${moment(Date.now()).format("LLL")}\``))
}}
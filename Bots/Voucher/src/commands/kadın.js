const config = require("../settings/config.json");
const settings = require("../settings/settings.json");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const kdb = new db.table("kullanıcı")
const ydb = new db.table("yetkili")
const moment = require("moment")
moment.locale("tr")
module.exports = {
conf: {
aliases: ["kadın","kız","karı","gacı","woman"],
name: "k",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}));
let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!message.member.roles.cache.some(r => (settings.roles.staff.register).includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")) {message.channel.send(embed.setDescription(`${message.author}, bu komutu kullanmak için yeterli yetkiniz bulunmamakta.`).setColor(`${config.embed.color.red}`)).then(x => x.delete({timeout: 7000})); message.react(settings.emojis.no); return };
if (!jyros){message.channel.send(embed.setDescription(`Eksik Argüman! \`${config.PREFIX}k @Jyros/ID\``).setColor(`${config.embed.color.red}`)).then(mal => mal.delete({timeout: 7000})); message.react(settings.emojis.no);}
if (db.fetch(`taglıAlım.${message.guild.id}`)) {
if(!jyros.user.username.includes(settings.tag.tag) && !jyros.roles.cache.has(settings.roles.special) && !jyros.roles.cache.has(settings.roles.booster)) {
message.channel.send(embed.setDescription(`${settings.emojis.no} ${jyros} isimli üye tagımızı almadığı için kayıt işlemi tamamlanamadı.`).setColor(`${config.embed.color.red}`)).then(pırt => pırt.delete({timeout: 7000})); message.react(settings.emojis.no)}};
ydb.add(`kızTeyit.${message.author.id}`, 1);
ydb.add(`topTeyit.${message.author.id}`, 1);
jyros.roles.remove(settings.roles.unregistered);
jyros.roles.remove(settings.roles.jail);
jyros.roles.remove(settings.roles.yasaklıTag);
jyros.roles.remove(settings.roles.şüpheli);
jyros.roles.add(settings.roles.womanRoles);
message.react(settings.emojis.yes);
message.channel.send(embed.setDescription(`${settings.emojis.yes} ${jyros} isimli üye başarıyla kayıt edildi.`).setColor(`${config.embed.color.green}`)).then(pırt => pırt.delete({timeout: 14000})); 
client.guilds.cache.get(config.guildID).channels.cache.get(settings.channels.chat).send(`${jyros}, sunucumuza hoş geldin! Kuralları okumayı unutma!`).then(pırt => pırt.delete({timeout: 15000})); 
client.guilds.cache.get(config.guildID).channels.cache.get(settings.channels.logs.kayıtKızLog).send(embed.setColor(`${config.embed.color.white}`).setTitle(`Bir Üye Kayıt Edildi!`).setDescription(`
Üye: ${jyros} (\`${jyros.id}\`)
Yetkili: ${message.author} (\`${message.author.id}\`)
Kayıt Tarihi: \`${moment(Date.now()).format("LLL")}\``));
}}
const config = require("../settings/config.json");
const settings = require("../settings/settings.json");
const db = require("quick.db");
const ydb = new db.table("yetkili")
const { MessageEmbed } = require("discord.js");
module.exports = {
conf: {
aliases: ["teyit-sıfırla"],
name: "teyitsıfırla",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}));
let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!message.member.roles.cache.some(r => (settings.roles.owner).includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")) {message.channel.send(embed.setDescription(`${message.author}, bu komutu kullanmak için yeterli yetkiniz bulunmamakta.`).setColor(`${config.embed.color.red}`)).then(x => x.delete({timeout: 7000})); message.react(settings.emojis.no); return };
if(!jyros) {message.channel.send(embed.setDescription(`${settings.emojis.no} Geçerli bir üye belirtmelisiniz.`).setColor(`${config.embed.color.red}`)).then(x => x.delete({timeout: 7000})); message.react(settings.emojis.no)};
if (jyros) {
ydb.delete(`topTeyit.${jyros.id}`)
ydb.delete(`kızTeyit.${jyros.id}`)
ydb.delete(`erkekTeyit.${jyros.id}`)
message.channel.send(embed.setDescription(`${jyros} Üyesinin Kayıt Verileri Sıfırlandı`))};
}}
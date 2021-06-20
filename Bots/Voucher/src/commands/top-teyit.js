const config = require("../settings/config.json");
const settings = require("../settings/settings.json");
const db = require("quick.db");
const ydb = new db.table("yetkili")
const { MessageEmbed } = require("discord.js");
module.exports = {
conf: {
aliases: ["topteyit","topt"],
name: "top-teyit",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`)
if (!message.member.roles.cache.some(r => (settings.roles.staff.register).includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")) {message.channel.send(embed.setDescription(`${message.author}, bu komutu kullanmak için yeterli yetkiniz bulunmamakta.`).setColor(`${config.embed.color.red}`)).then(x => x.delete({timeout: 7000})); message.react(settings.emojis.no); return };
let top = message.guild.members.cache.filter(uye => ydb.get(`topTeyit.${uye.id}`)).array().sort((uye1, uye2) => Number(ydb.get(`topTeyit.${uye2.id}`))-Number(ydb.get(`topTeyit.${uye1.id}`))).slice(0, 15).map((uye, index) => (index+1)+" • <@"+ uye +"> | \`" + ydb.get(`topTeyit.${uye.id}`) +"\` adet kayıta sahip.").join('\n');
message.channel.send(embed.setAuthor("Toplam Teyit Listesi", message.guild.iconURL({dynamic: true})).setTimestamp().setDescription(top));
}}
const config = require("../settings/config.json");
const settings = require("../settings/settings.json");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const kdb = new db.table("kullanıcı")
module.exports = {
conf: {
aliases: ["geçmiş-isimler"],
name: "isimler",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}));
let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
let isimler = kdb.get(`isimler.${jyros.id}`) || [];
isimler = isimler.reverse();
let isimListesi = isimler.length > 0 ? isimler.map((value) => `${value.isim} | ${value.Yaş} ( <@!${value.Yetkili}> )`).join("\n") : `${settings.emojis.no} ${jyros} ( \`${jyros.id}\` ) kullanıcısının geçmiş isimleri bulunamadı.`;
message.react(settings.emojis.yes);
message.channel.send(embed.setColor(`${config.embed.color.white}`).setDescription(`${settings.emojis.yes} ${jyros} ( \`${jyros.id}\` ) isimli kullanıcının geçmiş isimleri:

${isimListesi}`))
}}
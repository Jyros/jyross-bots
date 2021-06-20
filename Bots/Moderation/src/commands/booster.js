const { MessageEmbed } = require('discord.js')
const settings = require('../settings/settings.json');
const config = require("../settings/config.json");
module.exports = {
conf: {
aliases: ["bisim","bnick","rich","zengin","bme"],
name: "booster",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
if (!message.member.roles.cache.some(r => [(settings.roles.booster)].includes(r.id))){message.channel.send(embed.setColor(`${config.embed.color.red}`).setDescription(`${settings.emojis.no} Bu komutu kullanmak için sunucumuza takviye yapmanız gerekiyor.`)).then(x => x.delete({ timeout: 5000 })); return; }
let jrsname = args.slice(0).join(' ');
if(!jrsname) return message.reply(`${settings.emojis.no} Lütfen yeni isminizi giriniz.`)
if(jrsname.length > 32) return message.reply(`${settings.emojis.no} Lütfen **32** karakteri geçmeyen bir isim giriniz!`)
let jyros = message.guild.member(message.author);
let jyrosname;
jyrosname = `${jyros.user.username.includes(settings.tag.tag) ? settings.tag.tag : (settings.tag.unTag ? settings.tag.unTag : (settings.tag.tag || ""))} ${jrsname}`;
if(jyros.manageable) jyros.setNickname(`${jyrosname}`).catch();
message.channel.send(`${settings.emojis.yes} ${jyros}, Sunucu içindeki isminiz başarıyla \`${jyrosname}\` olarak değiştirildi.`) 
message.guild.channels.cache.get(settings.channels.logs.boosterNickLog).send(embed.setColor(`${config.embed.color.white}`).setDescription(`${jyros} \`(${jyros.id})\` adlı kullanıcının ismi başarı ile \`${jyrosname}\` olarak güncellendi!`))
}}
const { MessageEmbed } = require('discord.js')
const settings = require("../settings/settings.json");
const config = require("../settings/config.json");
module.exports = {
conf: {
aliases: ["temizle","tmzle","sill","delete"],
name: "sil",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
const m = args.join(' ');
if(!m) return message.channel.send('Mesaj miktarı girin.');
if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_MESSAGES")){message.channel.send(embed.setDescription(`${settings.emojis.no} Bu komutu kullanmak için yeterli yetkiniz bulunmamakta.`)).then(m => m.delete({ timeout: 7000 })); return; }
if(m < 2) return message.reply('En az 2 mesaj silinebilir.').then(m => m.delete({ timeout: 5000 }));
if(m>100) return message.reply('En fazla 100 mesaj silinebilir.').then(m => m.delete({ timeout: 5000 }));
message.channel.bulkDelete(m);
message.channel.send(embed.setDescription('Başarıyla __'+m+'__ mesaj silindi!')).then(m => m.delete({ timeout: 7000 }));
}}
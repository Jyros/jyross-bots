const { MessageEmbed } = require('discord.js')
const settings = require("../settings/settings.json");
const config = require("../settings/config.json");
module.exports = {
conf: {
aliases: ["role-info","rol-info","rolinfo","roleinfo","role-bilgi","rol-bilgi","rolbilgi"],
name: "role-info",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]); 
if (!message.member.roles.cache.some(r => [(settings.roles.owner)].includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")){message.channel.send(embed.setDescription(`${settings.emojis.no} Bu komutu kullanmak için yeterli yetkiniz bulunmamakta.`)).then(m => m.delete({ timeout: 7000 })); return; }
if (!role) { message.channel.send(embed.setDescription(`${message.author}, eksik argüman!`))}
let array = new Array();
if (!args[1]) {
message.channel.send((`
${role} rol bilgileri;
Rol ID: \`${role.id}\` 
Rol Kişi Sayısı: \`${role.members.size}\`
─────────────────
Roldeki kişiler:
${role.members.size <= 100 ? array.join("\n") : `Listelenemedi! ( **${role.members.size}** kişi var! )`}`)); return }
if (args[1] === "sayı") { message.channel.send((`${role} ( \`${role.id}\` ) adlı rolde toplam **${role.members.size}** kişi bulunmaktadır!`)); return 
} else if (args[1] === "id") { message.channel.send((`${role} ( \`${role.name}\` ) adlı rolün ID'si: \`${role.id}\``)); return 
} else if (args[1] === "renk") { message.channel.send((`${role} ( \`${role.id}\` ) adlı rolün renk kodu: \`${role.hexColor}\``)); return
} else if (args[1] === "üyeler") { message.channel.send((`
${role} ( \`${role.id}\` ) adlı rolündeki kişiler:
─────────────────
${role.members.size <= 100 ? array.join("\n") : `Listelenemedi! ( **${role.members.size}** kişi var! )`}`)); return }
}}
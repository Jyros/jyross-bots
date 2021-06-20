const { MessageEmbed } = require('discord.js')
const settings = require("../settings/settings.json");
const config = require("../settings/config.json");
module.exports = {
conf: {
aliases: ["rol"],
name: "rol",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`)
let jyros = message.mentions.users.first() || message.guild.members.cache.get(args[1])
let user = message.guild.member(jyros);
let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(a => a.name == args.slice(2).join(' '));
if (!message.member.roles.cache.some(r => [(settings.roles.staff.roleManager)].includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")){message.channel.send(embed.setDescription(`${settings.emojis.no} Bu komutu kullanmak için yeterli yetkiniz bulunmamakta.`)).then(m => m.delete({ timeout: 7000 })); return; }
if(args[0] !== "ver" && args[0] !== "al") return message.channel.send(embed.setDescription(`Hata: Bir üyeye rol verip almak için lütfen __argümanları__ doldurun Örn: \`${config.PREFIX}rol ver/al @Jyros/ID <EtiketRol/RolID>\``)).then(x => x.delete({timeout: 5000}));
if (!jyros){message.channel.send(embed.setDescription(`${message.author}, Hatalı Kullanım! \`${config.PREFIX}rol ver/al @Jyros/ID <EtiketRol/RolID>\``)).then(x => x.delete({timeout: 5000}));}
if (!rol){message.channel.send(embed.setDescription(`${message.author}, Hatalı Kullanım! \`${config.PREFIX}rol ver/al @Jyros/ID <EtiketRol/RolID>\``)).then(x => x.delete({timeout: 5000}));}
if (message.member.roles.highest.comparePositionTo(rol) < 1) {
return message.channel.send(`Hata: \`Vermek istediğiniz rol sizin rollerinizden üstün!\` hatası sebebiyle işlem yapılamadı!`).then(x => x.delete({timeout: 6000}))}
if(args[0] === "ver") {
await (user.roles.add(rol.id).catch())
message.channel.send(embed.setDescription(`${settings.emojis.yes} ${jyros} (\`${jyros.id}\`) isimli üyeye \`${rol.name}\` adlı rolü __başarıyla__ verdin.`)).then(x => x.delete({timeout: 5000}));
message.guild.channels.cache.get(settings.channels.logs.roleLog).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı yetkili ${rol} adlı rolü ${jyros} (\`${jyros.id}\`) kişisine verdi.`))
message.react(settings.emojis.yes)}
if(args[0] === "al") {
await (user.roles.remove(rol.id).catch())
message.channel.send(embed.setDescription(`${settings.emojis.yes} ${jyros} (\`${jyros.id}\`) isimli üyeden \`${rol.name}\` adlı rolü __başarıyla__ aldın.`)).then(x => x.delete({timeout: 5000}));
message.guild.channels.cache.get(settings.channels.logs.roleLog).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı üye ${rol} adlı rolü ${jyros} (\`${jyros.id}\`) kişisinden rolü geri aldı.`))
message.react(settings.emojis.yes)}
}}
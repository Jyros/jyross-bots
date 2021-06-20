const { MessageEmbed } = require('discord.js')
const settings = require("../settings/settings.json");
const config = require("../settings/config.json");
module.exports = {
conf: {
aliases: ["staff","yt"],
name: "yetkili",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
if (!message.member.roles.cache.some(r => [(settings.roles.owner)].includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")){message.channel.send(embed.setColor(`${config.embed.color.red}`).setDescription(`${settings.emojis.no} Bu komutu kullanmak için yeterli yetkiniz bulunmamakta.`)).then(x => x.delete({ timeout: 5000 })); return; }
let staff = message.guild.roles.cache.get(settings.roles.staff.register)
let staffs = message.guild.members.cache.filter(s => s.roles.highest.position >= staff.position && !s.user.bot)
let voicestaff = staffs.filter(s => s.voice.channel)
let unsesyt = staffs.filter(s => !s.voice.channel)
let onlinestaff = staffs.filter(s => s.presence.status !== 'offline')
let offlineyt = staffs.filter(s => s.presence.status === 'offline')
let onlinevstaff = staffs.filter(s => s.presence.status !== 'offline').filter(x => !x.voice.channel)
if (args[0] === "say") {
message.channel.send(embed.setDescription(`
Sunucumuzdaki toplam yetkili sayısı: **${staffs.size}**
Sunucumuzdaki aktif yetkili sayısı: **${onlinestaff.size}**
Sunucumuzdaki sesteki yetkili sayısı: **${voicestaff.size}**
Sunucumuzdaki aktif olup seste olmayan yetkili sayısı: **${onlinevstaff.size}**
`)).then(m => m.delete({ timeout: 10000 }))}
if (args[0] === "dm") {
let jyros = message.guild.members.cache.filter(s => s.roles.cache.has(settings.roles.staff.register)).filter(s => !s.voice.channel).size
for(var i = 0;i < jyros;i++){
let a = message.guild.members.cache.filter(s => s.roles.cache.has(settings.roles.staff.register)).filter(s => !s.voice.channel).map(a => a)[i]
const userDM = await a.createDM(); try {
await userDM.send(`Müsaitsen sunucumuzdaki ses kanallarından herhangi birisine geçer misin? Müsait değilsen AFK ya da Alone odalarına geçebilirsin. ${config.guildLink}`)
} catch { await message.channel.send(`<@${a.user.id}> adlı kullanıcının dm kutusu kapalı. Müsait isen public odalara değil isen alone odalarına geçiş yapabilirsin.`)}}}
if (args[0] === "ses") {
let ytks = message.guild.members.cache.filter(u => { return (u.roles.cache.some(r => settings.roles.staff.register.includes(r.id)) && !u.voice.channel && u.presence.status !== "offline")}).map(u => u.user);
message.channel.send(`**Aktif olup seste olmayan yetkililer : \n \n** ${ytks.join(" ")}`);}
if (!args[0]) {
message.channel.send(embed.setDescription(`
Yetkili komutları:

\`•\` **${config.PREFIX}yetkili say**
Yetkililer hakkında detaylı bilgili verir.

\`•\` **${config.PREFIX}yetkili dm**
Aktif olup seste olmayan yetkililere dm atar.

\`•\` **${config.PREFIX}yetkili ses**
Aktif olup seste olmayan yetkilileri listeler.
`)).then(m => m.delete({ timeout: 7000 }))}
}}
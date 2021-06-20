const { MessageEmbed } = require('discord.js')
const settings = require('../settings/settings.json');
const config = require("../settings/config.json");
module.exports = {
conf: {
aliases: ["n","nerde","sesk","sk","seskontrol","ses-kontrol"],
name: "nerede",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setColor("#fdfdf9").setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp()
if (!message.member.roles.cache.has(settings.roles.staff.botCommands) && !message.member.hasPermission(8)) return message.react(settings.emojis.no)
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
let user = message.guild.member(member)
if (!user) return message.react(settings.emojis.no)
if (!user.voice.channel) return message.react(settings.emojis.no)
let kanal = user.voice.channel
let mute = user.voice.selfMute ? "\`Kapalı\`" : "\`Açık\`"
let deaf = user.voice.selfDeaf ? "\`Kapalı\`" : "\`Açık\`"
let stream = user.voice.streaming ? "\`Açık\`" : "\`Kapalı\`"
let camera = user.voice.selfVideo ? "\`Açık\`" : "\`Kapalı\`"
let kanalinfo = user.voice.channel.userLimit
let kanaldakiler = message.guild.members.cache.filter(x => x.voice.channel && x.voice.channel.id === kanal.id).size
if (kanal && user.voice.channel) {
message.channel.send(embed.setDescription(`
${settings.emojis.yes} ${user} Adlı kullanıcı \`${kanal.name}\` adlı ses kanalında.
Mikrofonu: ${mute}
Kulaklığı: ${deaf}
Yayın Bilgisi: ${stream}
Kamera Bilgisi: ${camera}
Kanal Bilgisi: \`${kanaldakiler}/${kanalinfo}\`
`)).then(m => m.delete({ timeout: 7000 }))} 
message.react(settings.emojis.yes)
}}
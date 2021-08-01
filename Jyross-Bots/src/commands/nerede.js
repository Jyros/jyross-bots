const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
module.exports = {
conf: {
name: "nerede",
aliases: ["n","voice","v","sk","sesk","seskontrol"],
description: "Belirlenen üyenin bulunduğu kanaldaki ses bilgilerini gösterir.",
examples:`${config.PREFIX}n <@Jyross/ID> `,
category: "Yetkili",
help: "nerede",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
},
run: async (client, message, args, embed, prefix) => {

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.guild.member(member)
    
    if (!user) return message.react(emojis.no)
    if (!user.voice.channel) return message.react(emojis.no)

    let kanal = user.voice.channel
    let mute = user.voice.selfMute ? "\`Kapalı\`" : "\`Açık\`"
    let deaf = user.voice.selfDeaf ? "\`Kapalı\`" : "\`Açık\`"
    let stream = user.voice.streaming ? "\`Açık\`" : "\`Kapalı\`"
    let camera = user.voice.selfVideo ? "\`Açık\`" : "\`Kapalı\`"
    let kanalinfo = user.voice.channel.userLimit
    let kanaldakiler = message.guild.members.cache.filter(x => x.voice.channel && x.voice.channel.id === kanal.id).size
    
    if (kanal && user.voice.channel) {
    message.channel.send(embed.setDescription(`
    ${emojis.yes} ${user} Adlı kullanıcı \`${kanal.name}\` adlı ses kanalında.
    Mikrofonu: ${mute}
    Kulaklığı: ${deaf}
    Yayın Bilgisi: ${stream}
    Kamera Bilgisi: ${camera}
    Kanal Bilgisi: \`${kanaldakiler}/${kanalinfo}\`
    `)).then(a => a.delete({ timeout: 13000 }))} 
    message.react(emojis.yes)

}};
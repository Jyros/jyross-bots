const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const jyrosData = require("../operations/jyrosData");
const { ErrorCodes } = require("../operations/errorcodes")
const db = require("quick.db");
const kdb = new db.table("kullanıcı")
const ms = require("ms");
const moment = require("moment");
moment.locale("tr")
module.exports = {
conf: {
name: "vmute",
aliases: ["vmute","v-mute","voicem","voicemute","voice-mute","voice-m","v-m","sustur","ses-sustur"],
description: "Belirtilen üye verilen süre kadar ses kanallarında susturulur.",
examples:`${config.PREFIX}vmute <@Jyross/ID> <1 s/m/h/d/w> <sebep>`,
category: "Yetkili",
help: "voicemute",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 10000,
staffLevel: 4,
},
run: async (client, message, args, embed, prefix) => {

    let cezano = jyrosData.cezanoVer() + 1;
    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!jyros) return message.channel.send(embed.setDescription(`${emojis.no} Lütfen susturulacak kişiyi etiketleyiniz. \`${config.PREFIX}vmute @Jyros 1s/m/h/d <sebep>\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`).setColor(`${config.embed.color.red}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))).then(x => x.delete({ timeout: 5000 }));
    if (jyros.id === message.author.id) return message.channel.send(embed.setDescription(`${emojis.no} Kendinizi susturamazsınız.`).setColor(`${config.embed.color.red}`)).then(x => x.delete({ timeout: 5000 }));
    if(message.member.roles.highest.position <= jyros.roles.highest.position) return message.react(emojis.no);
    if (jyros.id === client.user.id) { 
        message.channel.send(embed.setDescription(`${emojis.no} Bir botu susturamazsınız!`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))).then(x => x.delete({ timeout: 5000 }));
        message.react(emojis.no)
        return;
};

    let time = args[1]
    let reason = args.splice(2).join(" ")
    if (!time) return message.channel.send(embed.setDescription(`${emojis.no} Geçerli bir süre belirtiniz. \`${config.PREFIX}vmute @Jyros 1s/m/h/d <sebep>\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`).setColor(`${config.embed.color.red}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))).then(x => x.delete({ timeout: 5000 }));
    if(!reason) return message.channel.send(embed.setDescription(`${emojis.no} Geçerli bir sebep giriniz. \`${config.PREFIX}vmute @Jyros 1s/m/h/d <sebep>\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`).setColor(`${config.embed.color.red}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))).then(x => x.delete({ timeout: 5000 }));
    time = time
.replace("s", " Saniye")
.replace("m", " Dakika")
.replace("h", " Saat")
.replace("d", " Gün")
.replace("w", " Hafta")
    
let cezapuan = await kdb.fetch(`cezapuan.${jyros.id}`) || "0"
if(jyros.voice.channel) jyros.voice.kick()
jyros.roles.add(roles["u-vmuted"])
jyrosData.cezaVer(cezano, jyros, message.author, reason, time, "Susturulma", "VOICE-MUTE")
message.channel.send(embed.setDescription(`${emojis["c-muted"]} ${jyros} (\`${jyros.id}\`) adlı kullanıcı ${message.author} (\`${message.author.id}\`) tarafından \`${reason}\` sebebiyle \`${time}\` boyunca ses kanallarında başarıyla susturuldu. \`#${cezano}\``).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(`${config.embed.color.green}`)).then(x => x.delete({ timeout: 9000 }));
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-cezapuan"]).send(`${jyros}, aldığınız \`#${cezano}\` ID'li ceza ile \`${cezapuan}\` ceza puanına ulaştınız.`)
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-vmute"]).send(embed
    .setColor(`${config.embed.color.white}`)
    .setFooter(`Ceza Numarası: ${cezano}`)
    .setDescription(`
${jyros} (\`${jyros.id}\`) kişisi ${time} boyunca ses kanallarında susturuldu.

Susturulan ceza puanı: \`${cezapuan}\`
Yetkili: ${message.author} (\`${message.author.id}\`)
─────────────────────
Susturulma sebebi: \`${reason}\`
Susturulma atılma tarihi: \`${moment(Date.now()).format("LLL")}\`
Susturulma bitiş tarihi: \`${moment(Date.now()+ms(args[1])).format('LLL')}\`
`))

setTimeout(async() => {
    
    jyros.roles.remove(roles["u-vmuted"])
    jyrosData.vmuteKaldır(jyros)
    
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-unvmute"]).send(embed
        .setColor(`${config.embed.color.white}`)
        .setFooter(`Ceza Numarası: #${cezano}`)
        .setDescription(`
${jyros} (\`${jyros.id}\`) kişisi ${time} boyunca süren ses kanallarında susturulması sonlandırıldı.
    
Susturulan ceza puanı: \`${cezapuan}\`
Yetkili: ${message.author} (\`${message.author.id}\`)
─────────────────────
Susturulma Sebebi: \`${reason}\`
Susturulma Bitiş Tarihi: \`${moment(Date.now()).format('LLL')}\`
`))
    }, ms(args[1]))

//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıyı <#${message.channel.id}> adlı kanalda \`${config.PREFIX}vmute\` komutu ile ses kanallarında susturdu.`)

}};
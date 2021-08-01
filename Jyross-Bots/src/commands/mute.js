const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const roles = require("../base/roles.json");
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
name: "mute",
aliases: ["chat-mute","chatmute","cmute","c-mute","tempmute","temp-mute"],
description: "Belirtilen üye verilen süre kadar metin kanallarında susturulur.",
examples:`${config.PREFIX}mute <@Jyross/ID> <1 s/m/h/d/w> <sebep>`,
category: "Yetkili",
help: "mute",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 5000,
staffLevel: 3,
},
run: async (client, message, args, embed, prefix) => {

    let cezano = jyrosData.cezanoVer() + 1;
    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!jyros) return message.channel.send(embed.setDescription(`${emojis.no} Lütfen susturulacak kişiyi etiketleyiniz. \`${config.PREFIX}mute @Jyros 1s/m/h/d <sebep>\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`).setColor(`${config.embed.color.red}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))).then(x => x.delete({ timeout: 5000 }));
    if (jyros.id === message.author.id) return message.channel.send(embed.setDescription(`${emojis.no} Kendinizi susturamazsınız.`).setColor(`${config.embed.color.red}`)).then(x => x.delete({ timeout: 5000 }));
    if(message.member.roles.highest.position <= jyros.roles.highest.position) return message.react(emojis.no);
    let time = args[1]
    let reason = args.splice(2).join(" ")
    if (!time) return message.channel.send(embed.setDescription(`${emojis.no} Geçerli bir süre belirtiniz. \`${config.PREFIX}mute @Jyros 1s/m/h/d <sebep>\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`).setColor(`${config.embed.color.red}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))).then(x => x.delete({ timeout: 5000 }));
    if(!reason) return message.channel.send(embed.setDescription(`${emojis.no} Geçerli bir sebep giriniz. \`${config.PREFIX}mute @Jyros 1s/m/h/d <sebep>\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`).setColor(`${config.embed.color.red}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))).then(x => x.delete({ timeout: 5000 }));
    time = time
.replace("s", " Saniye")
.replace("m", " Dakika")
.replace("h", " Saat")
.replace("d", " Gün")
.replace("w", " Hafta")
    let cezapuan = await kdb.fetch(`cezapuan.${jyros.id}`) || "0"
    jyros.roles.add(roles["u-muted"])
    jyrosData.cezaVer(cezano, jyros, message.author, reason, time, "Susturulma", "CHAT-MUTE")
    message.channel.send(embed.setDescription(`${emojis["c-muted"]} ${jyros} (\`${jyros.id}\`) adlı kullanıcı ${message.author} (\`${message.author.id}\`) tarafından \`${reason}\` sebebiyle \`${time}\` boyunca yazı kanallarında başarıyla susturuldu. \`#${cezano}\``)).then(x => x.delete({ timeout: 15000 }));
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-cezapuan"]).send(`${jyros}, aldığınız \`#${cezano}\` numaralı ceza ile \`${cezapuan}\` ceza puanına ulaştınız.`)
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-chatmute"]).send(embed
        .setFooter(`Ceza Numarası: #${cezano}`)
        .setDescription(`
${jyros} (\`${jyros.id}\`) kişisi ${time} boyunca metin kanallarında susturuldu.

Susturulan ceza puanı: \`${cezapuan}\`
Yetkili: ${message.author} (\`${message.author.id}\`)
─────────────────────
Susturulma sebebi: \`${reason}\`
Chat Mute atılma tarihi: \`${moment(Date.now()).format("LLL")}\`
Chat Mute bitiş tarihi: \`${moment(Date.now()+ms(args[1])).format('LLL')}\`
`))

//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıyı <#${message.channel.id}> adlı kanalda \`${config.PREFIX}mute\` komutu ile metin kanallarında susturdu.`)

setTimeout(async() => {
    jyros.roles.remove(roles["u-muted"])
jyrosData.cmuteKaldır(jyros)
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-unchatmute"]).send(embed
    .setFooter(`Ceza Numarası: #${cezano}`)
    .setDescription(`
${jyros} (\`${jyros.id}\`) kişisi ${time} boyunca süren metin kanallarında susturulması sonlandırıldı.

Susturulan ceza puanı: \`${cezapuan}\`
Yetkili: ${message.author} (\`${message.author.id}\`)
─────────────────────
Ceza Sebebi: \`${reason}\`
Ceza Bitiş Tarihi: \`${moment(Date.now()+ms(args[1])).format('LLL')}\`
`))
    }, ms(args[1]))

}};
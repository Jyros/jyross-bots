const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const jyrosData = require("../operations/jyrosData");
const db = require("quick.db");
const { ErrorCodes } = require("../operations/errorcodes")
const kdb = new db.table("kullanıcı")
const moment = require("moment");
moment.locale("tr")
module.exports = {
conf: {
name: "warn",
aliases: ["uyarı","uyar"],
description: "Belirlenen kullanıyı uyarırsınız.",
examples:`${config.PREFIX}warn <@Jyross/ID> <Sebep> `,
category: "Yetkili",
help: "warn",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
staffLevel: 6,
},
run: async (client, message, args, embed, prefix) => {

    let cezano = jyrosData.cezanoVer() + 1;
    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!jyros) return message.channel.send(embed.setDescription(`${emojis.no} Lütfen uyarılacak kişiyi etiketleyiniz. \`${config.PREFIX}warn <@Jyross/ID> <sebep>\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`).setColor(`${config.embed.color.red}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))).then(x => x.delete({ timeout: 5000 }));
    if (jyros.id === message.author.id) return message.channel.send(embed.setDescription(`${emojis.no} Kendinizi uyaramazsınız.`).setColor(`${config.embed.color.red}`)).then(x => x.delete({ timeout: 5000 }));
    if(message.member.roles.highest.position <= jyros.roles.highest.position) return message.react(emojis.no);
    if (!jyros.manageable) return message.react(emojis.no)
    if (jyros.id === client.user.id) { 
   message.channel.send(embed.setDescription(`${emojis.no} Bir botu uyaramazsınız!`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))).then(x => x.delete({ timeout: 7000 }));
   message.react(emojis.no)
   return;
};

let reason = args.slice(1).join(" ") 
if (!reason) return message.channel.send(embed.setDescription(`${emojis.no} ${message.author}, geçerli bir sebep giriniz.`).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`)).then(x => x.delete({ timeout: 7000 }))

let cezapuan = await kdb.fetch(`cezapuan.${jyros.id}`) || "0"
let warnData = await kdb.fetch(`uyarilar.${jyros.id}`) || "0"


if (3 < warnData) {

    message.channel.send(embed.setDescription(`${message.author}, belirtilen kullanıcı uyarı limitini geçtiği için tekrardan uyarılamıyor.`)).then(x => x.delete({ timeout: 7000 }))
    message.react(emojis.no)
    return;
}

jyrosData.cezaVer(cezano, jyros, message.author, reason, "Uyarı", "Uyarılma", "WARN")

if(warnData == 1) {
    jyros.roles.add(roles["u-warn"].warn_1)
    message.channel.send(embed.setDescription(`${emojis["c-warn"]} ${jyros} (\`${jyros.id}\`) kişisi **${reason}** nedeni ile uyarıldı. Toplam Uyarılma: \`1\` (Ceza Numarası: \`#${cezano}\`)`)).then(x => x.delete({ timeout: 15000 }))
    message.react(emojis.yes)
    jyros.send(`**${config.guildNAME}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle uyarıldınız! Toplam Uyarılma: \`1\` (Ceza Numaranız: \`#${cezano}\`)`).catch(() => {});
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-warn"]).send(embed
        .setFooter(`Ceza Numarası: #${cezano}`)
        .setDescription(`
${jyros} (\`${jyros.id}\`) kişisi ${message.author} (\`${message.author.id}\`) tarafından uyarıldı.

Uyarılan ceza puanı: \`${cezapuan}\`
Toplam uyarılma: \`1\`
Uyarılma Sebebi: **${reason}**
Uyarılma Tarihi: \`${moment(Date.now()).format("LLL")}\`
`))

//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıyı ${reason} sebebi ile <#${message.channel.id}> adlı kanalda \`${config.PREFIX}warn\` komutu ile uyardı.
Kullanıcının Toplam Uyarılma Sayısı: **1**`)

}

if(warnData == 2) {
    jyros.roles.add(roles["u-warn"].warn_2)
    message.channel.send(embed.setDescription(`${emojis["c-warn"]} ${jyros} (\`${jyros.id}\`) kişisi **${reason}** nedeni ile uyarıldı. Toplam Uyarılma: \`2\` (Ceza Numarası: \`#${cezano}\`)`))
    message.react(emojis.yes)
    jyros.send(`**${config.guildNAME}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle uyarıldınız! Toplam Uyarılma: \`2\` (Ceza Numaranız: \`#${cezano}\`)`).catch(() => {});
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-warn"]).send(embed
        .setFooter(`Ceza Numarası: #${cezano}`)
        .setDescription(`
${jyros} (\`${jyros.id}\`) kişisi ${message.author} (\`${message.author.id}\`) tarafından uyarıldı.

Uyarılan ceza puanı: \`${cezapuan}\`
Toplam uyarılma: \`2\`
Uyarılma Sebebi: **${reason}**
Uyarılma Tarihi: \`${moment(Date.now()).format("LLL")}\`
`))

//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıyı ${reason} sebebi ile <#${message.channel.id}> adlı kanalda \`${config.PREFIX}warn\` komutu ile uyardı.
Kullanıcının Toplam Uyarılma Sayısı: **2**`)

}

if(warnData == 3) {
    jyros.roles.add(roles["u-warn"].warn_3)
    message.channel.send(embed.setDescription(`${emojis["c-warn"]} ${jyros} (\`${jyros.id}\`) kişisi **${reason}** nedeni ile uyarıldı. Toplam Uyarılma: \`3\` (Ceza Numarası: \`#${cezano}\`)`))
    message.react(emojis.yes)
    jyros.send(`**${config.guildNAME}** sunucusunda, **${message.author.tag}** tarafından, **${reason}** sebebiyle uyarıldınız! Toplam Uyarılma: \`3\` (Ceza Numaranız: \`#${cezano}\`)`).catch(() => {});
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-warn"]).send(embed
        .setFooter(`Ceza Numarası: #${cezano}`)
        .setDescription(`
${jyros} (\`${jyros.id}\`) kişisi ${message.author} (\`${message.author.id}\`) tarafından uyarıldı.

Uyarılan ceza puanı: \`${cezapuan}\`
Toplam uyarılma: \`3\`
Uyarılma Sebebi: **${reason}**
Uyarılma Tarihi: \`${moment(Date.now()).format("LLL")}\`
`))

//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıyı ${reason} sebebi ile <#${message.channel.id}> adlı kanalda \`${config.PREFIX}warn\` komutu ile uyardı.
Kullanıcının Toplam Uyarılma Sayısı: **3**`)

}

}};
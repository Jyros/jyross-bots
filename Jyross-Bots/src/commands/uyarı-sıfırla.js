const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const jyrosData = require("../operations/jyrosData");
const { ErrorCodes } = require("../operations/errorcodes")
const db = require("quick.db");
const kdb = new db.table("kullanıcı");
const cdb = new db.table("cezalar")
const moment = require("moment");
moment.locale("tr")
module.exports = {
conf: {
name: "uyarısıfırla",
aliases: ["uyarı-sıfırla","warn-sıfırla","warnsıfırla"],
description: "Belirtilen üyenin sisteme kayıtlı olan uyarı geçmişini sıfırlar.",
examples:`${config.PREFIX}uyarısıfırla <@Jyross/ID>`,
category: "Yönetim",
help: "uyarısıfırla",
enabled: true,
ownerOnly: true,
adminOnly: true,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
},
run: async (client, message, args, embed, prefix) => {

    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!jyros) return message.channel.send(embed.setDescription(`${emojis.no} Lütfen uyarı geçmişi sıfırlanacak üyeyi etiketleyiniz. \`${config.PREFIX}uyarılar <@Jyross/ID>\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`).setColor(`${config.embed.color.red}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))).then(x => x.delete({ timeout: 5000 }));
    
    jyrosData.uyarıKaldır(jyros)
    jyros.roles.remove(roles["u-warn"].warn_1)
    jyros.roles.remove(roles["u-warn"].warn_2)
    jyros.roles.remove(roles["u-warn"].warn_3)

    message.channel.send(embed.setDescription(`${jyros} (\`${jyros.id}\`) adlı kullanıcının sisteme kayıtlı olan uyarı geçmişi sıfırlandı.`))

//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcının sisteme kayıtlı olan uyarı geçmişini <#${message.channel.id}> adlı kanalda \`${config.PREFIX}uyarısıfırla\` komutu ile sıfırladı.`)

}};
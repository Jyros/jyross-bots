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
name: "uyarılar",
aliases: ["warns"],
description: "Belirtilen kullanıcının sisteme kayıtlı olan uyarılarını görürsünüz.",
examples:`${config.PREFIX}warns <@Jyross/ID>`,
category: "Yönetim",
help: "uyarılar",
enabled: true,
ownerOnly: false,
adminOnly: true,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
staffLevel: 6,
},
run: async (client, message, args, embed, prefix) => {

    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!jyros) return message.channel.send(embed.setDescription(`${emojis.no} Lütfen uyarı geçmişine bakılacak üyeyi etiketleyiniz. \`${config.PREFIX}uyarılar <@Jyross/ID>\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`).setColor(`${config.embed.color.red}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))).then(x => x.delete({ timeout: 5000 }));
    
    let uyarı = cdb.get(`uyarilar.${jyros.id}`)

    if(!uyarı) {
        message.channel.send(embed.setDescription(`${jyros} adlı kullanıcının sisteme kayıtlı uyarı geçmişi bulunamadı.`).setFooter(`Hata Kodu: ${ErrorCodes.DataHata.code}`))
        message.react(emojis.no);
        return;
    }

    var uyarılar = uyarı.map((data, index) => `\`${index+1}.\` ${data}`).join("\n")

     message.channel.send(embed.setDescription(`${jyros} (\`${jyros.id}\`) adlı kullanıcının sisteme kayıtlı uyarı geçmişi:

     ${uyarılar}`))

}};
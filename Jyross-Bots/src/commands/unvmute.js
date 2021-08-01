const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const jyrosData = require("../operations/jyrosData")
const { ErrorCodes } = require("../operations/errorcodes")
const db = require("quick.db");
const kdb = new db.table("kullanıcı")
const moment = require("moment");
moment.locale("tr")
module.exports = {
conf: {
name: "unvmute",
aliases: ["unvoicemute","un-vmute"],
description: "Belirtilen üyenin ses kanallarındaki susturulmasını kaldırırsınız.",
examples:`${config.PREFIX}unvmute <@Jyross/ID>`,
category: "Yetkili",
help: "vmute",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 10000,
staffLevel: 3,
},
run: async (client, message, args, embed, prefix) => {

    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!jyros) {
        message.channel.send(embed.setDescription(`${emojis.no} Ses kanallarındaki susturulması çıkarılacak üyeyi belirtmelisin!`).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`).setColor(`${config.embed.color.red}`)).then(x => x.delete({ timeout: 5000 }));
        message.react(emojis.no);
        return;
    }
   
    if (jyros.id === message.author.id) return message.react(emojis.no);
    if (jyros.id === client.user.id) return message.react(emojis.no);
    if(message.member.roles.highest.position <= jyros.roles.highest.position) return message.react(emojis.no);

    let cezapuan = await kdb.fetch(`cezapuan.${jyros.id}`) || "0"

jyros.roles.remove(roles["u-vmuted"])
jyrosData.vmuteKaldır(jyros)
message.channel.send(embed.setDescription(`${emojis["c-unmute"]} ${message.author} (\`${message.author.id}\`) Başarılı Bir Şekilde ${jyros} (\`${jyros.id}\`) adlı kullanıcının ses kanallarındaki susturulmasını kaldırdı!`));
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-unvmute"]).send(embed
    .setDescription(`
${jyros} (\`${jyros.id}\`) kişisinin ses kanallarındaki aktif susturulması sonlandırıldı.

Susturulan ceza puanı: \`${cezapuan}\`
Yetkili: ${message.author} (\`${message.author.id}\`)
Ceza Kaldırılma Tarihi: \`${moment(Date.now()).format("LLL")}\`
`))

//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcının ses kanallarındaki susturulmasını <#${message.channel.id}> adlı kanalda \`${config.PREFIX}unvmute\` komutu ile kaldırdı.`)

}};
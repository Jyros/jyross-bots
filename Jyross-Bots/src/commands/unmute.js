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
name: "unmute",
aliases: ["uncmute","unchatmute"],
description: "Belirtilen üyenin metin kanallarındaki susturulmasını kaldırırsınız.",
examples:`${config.PREFIX}unmute <@Jyross/ID>`,
category: "Yetkili",
help: "unmute",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 10000,
staffLevel: 3,
},
run: async (client, message, args, prefix) => {

    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let cezapuan = await kdb.fetch(`cezapuan.${jyros.id}`) || "0"

    if (!jyros) {
        message.channel.send(embed.setDescription(`${emojis.no} Metin kanallarındaki susturulması çıkarılacak üyeyi belirtmelisin!`).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`).setColor(`${config.embed.color.red}`)).then(x => x.delete({ timeout: 5000 }));
        message.react(emojis.no);
        return;
    }
   
    if (jyros.id === message.author.id) return message.react(emojis.no);
    if (jyros.id === client.user.id) return message.react(emojis.no);
    if (jyros.manageable) return message.react(emojis.no);
    if(message.member.roles.highest.position <= jyros.roles.highest.position) return message.react(emojis.no);

jyros.roles.remove(roles["u-muted"]);
jyrosData.cmuteKaldır(jyros)
message.channel.send(embed.setDescription(`${emojis["c-unmute"]} ${message.author} (\`${message.author.id}\`) Başarılı Bir Şekilde ${jyros} (\`${jyros.id}\`) adlı kullanıcının yazı kanallarındaki susturulmasını kaldırdı!`));
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-unchatmute"]).send(embed
    .setColor(config.embed.color.white)
    .setDescription(`
${jyros} (\`${jyros.id}\`) kişisinin metin kanallarındaki aktif susturulması sonlandırıldı.

Susturulan ceza puanı: \`${cezapuan}\`
Yetkili: ${message.author} (\`${message.author.id}\`)
Ceza Kaldırılma Tarihi: \`${moment(Date.now()).format("LLL")}\`
`))

//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcının metin kanallarındaki susturulmasını <#${message.channel.id}> adlı kanalda \`${config.PREFIX}unmute\` komutu ile kaldırdı.`)

}};
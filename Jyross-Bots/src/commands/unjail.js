const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const jyrosData = require("../operations/jyrosData");
const { ErrorCodes } = require("../operations/errorcodes")
const db = require("quick.db");
const kdb = new db.table("kullanıcı")
const moment = require("moment");
moment.locale("tr")
module.exports = {
conf: {
name: "unjail",
aliases: ["uncezalı","cezakaldır"],
description: "Cezalı kategorisindeki belirtilen üyenin cezasını kaldırır.",
examples:`${config.PREFIX}unjail <Jyross/ID>`,
category: "Yetkili",
help: "unjail",
enabled: true,
ownerOnly: false,
adminOnly: true,
cmdTest: false,
dmCmd: false,
cooldown: 5000,
staffLevel: 8,
},
run: async (client, message, args, embed, prefix) => {

    let cezano = jyrosData.cezanoVer() + 1;
    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!jyros) return message.channel.send(embed.setDescription(`${emojis.no} Cezalıdan çıkarılacak üyeyi belirtmelisin!`).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`).setColor(`${config.embed.color.red}`)).then(x => x.delete({ timeout: 5000 }));
    if (jyros.id === message.author.id) return message.react(emojis.no);
    if (jyros.id === client.user.id) return message.react(emojis.no);
    if(message.member.roles.highest.position <= jyros.roles.highest.position) return message.react(emojis.no);

    let cezapuan = await kdb.fetch(`cezapuan.${jyros.id}`) || "0"
    jyros.roles.remove(roles["u-jail"]);
    jyrosData.jailKaldır(jyros);
    message.guild.roles.cache.forEach(async r => {
        let roles = db.fetch(`${config.guildID}.jail.${jyros.id}.roles.${r.id}`)
        if(roles != r.id) return;
        if(roles){
            jyros.roles.add(roles)
        };
    });
    message.channel.send(embed.setDescription(`${emojis.yes} ${jyros} (\`${jyros.id}\`) adlı kullanıcının cezası ${message.author} (\`${message.author.id}\`) adlı yetkili tarafından başarıyla kaldırıldı! Ceza Numarası: **#${cezano}**`).setColor(`${config.embed.color.green}`)).then(x => x.delete({ timeout: 10000 }));
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-unjail"]).send(embed
        .setFooter(`Ceza Numarası: #${cezano}`)
        .setColor(config.embed.color.white)
        .setDescription(`
${jyros} (\`${jyros.id}\`) kişisinin aktif cezası sonlandırıldı.

Cezalı ceza puanı: \`${cezapuan}\`
Cezayı sonlandıran yetkili: ${message.author} (\`${message.author.id}\`)
Ceza Kaldırılma Tarihi: \`${moment(Date.now()).format("LLL")}\`
`))

//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${jyros} (\`${jyros.id}\`) adlı kullanıcının cezası ${message.author} (\`${message.author.id}\`) adlı yetkili tarafından <#${message.channel.id}> adlı kanalda \`${config.PREFIX}unjail\` komutu ile kaldırıldı.`)

}};
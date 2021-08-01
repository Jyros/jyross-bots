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
name: "unban",
aliases: ["unsg","unsie","bankaldır","un-ban","yasak-kaldır"],
description: "Belirtilen üyenin sunucudaki yasağını kaldırır.",
examples:`${config.PREFIX}unban <ID> `,
category: "Yetkili",
help: "unban",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 30000,
permLevel: 4,
},
run: async (client, message, args, embed, prefix) => {

    let jyros = await client.users.fetch(args[0]);
    let cezano = jyrosData.cezanoVer() + 1;
    let cezapuan = await kdb.fetch(`cezapuan.${jyros.id}`) || "0"
   
    if(!jyros){ 
        message.channel.send(embed.setDescription(`${message.author} bir ID belirtmelisin.`).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`)).then(x => x.delete({timeout: 7000}));
        message.react(emojis.no) 
        return;
    };

    if(jyros === client.user.id) { 
        message.channel.send(embed.setDescription(`${message.author}, Bir botun yasağını kaldıramazsın.`)).then(x => x.delete({ timeout: 7000 }));
        message.react(emojis.no)
        return;
    };

    message.guild.members.unban(jyros.id)
    message.channel.send(embed.setDescription(`${emojis["c-banned"]} ${message.author} tarafından ${jyros} adlı kullanıcının sunucu yasağı kaldırıldı.`)).then(x => x.delete({ timeout: 9000 }));
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-unban"]).send(embed
    .setColor(config.embed.color.white)
    .setFooter(`Ceza Numarası: #${cezano}`)
    .setDescription(`
${jyros} (\`${jyros.id}\`) kişisinin aktif yasaklanması sonlandırıldı.

Cezalı ceza puanı: \`${cezapuan}\`
Cezayı sonlandıran yetkili: ${message.author} (\`${message.author.id}\`)
Ceza Kaldırılma Tarihi: \`${moment(Date.now()).format("LLL")}\`
`))

//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${jyros} (\`${jyros.id}\`) adlı kullanıcının yasağı ${message.author} (\`${message.author.id}\`) adlı yetkili tarafından <#${message.channel.id}> adlı kanalda \`${config.PREFIX}unban\` komutu ile kaldırıldı.`)

}};
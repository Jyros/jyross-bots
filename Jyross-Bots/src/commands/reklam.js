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
moment.locale("tr");
module.exports = {
conf: {
name: "reklam",
aliases: ["ads","req"],
description: "Sunucu içindeki üyelere özelden reklam yapanlar için kullanılan bir komut. Ceza Süresi: 7 gün Yasaklanma",
examples:`${config.PREFIX}reklam <@Jyross/ID> <Sebep>`,
category: "Yönetim",
help: "reklam",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
},
run: async (client, message, args, embed, prefix) => {

    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(" ") || "Reklam"

    if (!message.member.roles.cache.has(roles.yönetim) && !message.member.hasPermission("ADMINISTRATOR")){
        message.channel.send(embed.setDescription(`${emojis.no} ${message.author}, bu komutu kullanmak için <@&${roles.yönetim}> yetkisine sahip olmanız gerekiyor.`).setFooter(`Hata Kodu: ${ErrorCodes.YetersizYetki.code}`)); 
        message.react(emojis.no);
        return;
    }

    if (!jyros) { 
        return message.channel.send(embed.setColor(`${config.embed.color.red}`).setDescription(`${emojis.no} Hatalı Kullanım! \`${prefix}reklam <@Jyros/ID>\` `).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`)).then(x => x.delete({ timeout: 7000 })); 
    }

    if(jyros.id === message.author.id) {
        return message.channel.send(embed.setColor(`${config.embed.color.red}`).setDescription(`${emojis.no} ${message.author}, Kendini sunucudan yasaklayamazsın.`)).then(x => x.delete({ timeout: 7000 }));
    }
    
    if(message.member.roles.highest.position <= jyros.roles.highest.position) {
        return message.channel.send(embed.setColor(`${config.embed.color.red}`).setDescription(`${emojis.no} ${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`)).then(x => x.delete({ timeout: 7000 }));
    }
    
    let cezano = jyrosData.cezanoVer() + 1;
    jyrosData.cezaVer(cezano, jyros, message.author, reason, "7 Gün Yasaklama", "Yasaklama", "ADS")
    let cezapuan = await kdb.fetch(`cezapuan.${jyros.id}`) || "0"
    jyros.send(`${message.author} (\`${message.author.id}\`) isimli yetkili tarafından **REKLAM** sebebiyle sunucudan yasaklandın! ( __Ceza Numaran: #${cezano}__ )`).catch(jrs => {});
    message.guild.members.ban(jyros.id, { reason: `Yasaklayan Kişi ID: ${message.author.id} Sebep: REKLAM`}).catch(() => {});
    message.channel.send(embed
    .setDescription(`${emojis["c-banned"]}  ${jyros} (\`${jyros.id}\`) adlı kullanıcı **Reklam** nedeniyle sunucudan 7 gün boyunca yasaklandı. 
          (Ceza Numarası: \`#${cezano}\`)`)).then(x => x.delete({ timeout: 60000 }));
          message.react(emojis.yes);
          client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-cezapuan"]).send(`${jyros}, aldığınız \`#${cezano}\` numaralı ceza ile \`${cezapuan}\` ceza puanına ulaştınız.`)
          client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-ads"]).send(embed
            .setFooter(`Ceza Numarası: #${cezano}`)
            .setDescription(`
${jyros} (\`${jyros.id}\`) kişisi reklam yaptığı için 7 gün boyunca yasaklandı.

Cezalı ceza puanı: \`${cezapuan}\`
Yetkili: ${message.author} (\`${message.author.id}\`)
─────────────────────
Ceza Sebebi: \`${reason}\`
Ceza Başlangıç Tarihi: \`${moment(Date.now()).format("LLL")}\`
Ceza Bitiş Tarihi: \`${moment(Date.now()+ms("7d")).format('LLL')}\`
`))

//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${jyros} (\`${jyros.id}\`) adlı kullanıcı ${message.author} (\`${message.author.id}\`) adlı yetkili tarafından <#${message.channel.id}> adlı kanalda \`${config.PREFIX}reklam\` komutu ile 7 gün boyunca sunucudan yasaklandı.`)

setTimeout(async() => {
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-unads"]).send(embed
    .setFooter(`Ceza Numarası: #${cezano}`)
    .setDescription(`
${jyros} (\`${jyros.id}\`) kişisinin yasaklanması sona erdi.

Cezalı ceza puanı: \`${cezapuan}\`
Yetkili: ${message.author} (\`${message.author.id}\`)
─────────────────────
Ceza Sebebi: \`${reason}\`
Ceza Bitiş Tarihi: \`${moment(Date.now()+ms("7d")).format('LLL')}\`
`))
    }, ms("7d"))

}};
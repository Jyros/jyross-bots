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
name: "jail",
aliases: ["cezalı","tempjail"],
description: "Belirlenen üyeyi belirtilen süre kadar sunucudaki cezalı kategorisine atar.",
examples:`${config.PREFIX}jail <Jyross/ID> <1 s/m/h/d/w> <sebep>`,
category: "Yetkili",
help: "jail",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 10000,
staffLevel: 8,
},
run: async (client, message, args, embed, prefix) => {

    let cezano = jyrosData.cezanoVer() + 1;
    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!jyros) return message.channel.send(embed.setDescription(`${emojis.no} Geçerli bir üye belirtiniz. \`${config.PREFIX}jail @Jyros 1s/m/h/d <sebep>\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`).setColor(`${config.embed.color.red}`)).then(x => x.delete({ timeout: 5000 }));
    let time = args[1]
    let reason = args.slice(2).join(' ')
   
    if(!time) { 
        message.channel.send(embed.setDescription(`${emojis.no} Geçerli bir süre giriniz. \`${config.PREFIX}jail @Jyros 1s/m/h/d <sebep>\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`).setColor(`${config.embed.color.red}`)).then(x => x.delete({ timeout: 5000 }))
        message.react(emojis.no)
        return;
    };

    if (!reason) { 
        message.channel.send(embed.setDescription(`${emojis.no} Geçerli bir sebep giriniz. \`${config.PREFIX}jail @Jyros 1s/m/h/d <Sebep>\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`).setColor(`${config.embed.color.red}`)).then(x => x.delete({ timeout: 5000 }))
        message.react(emojis.no)
        return;
    };
   
    time2 = time
    .replace("s", " Saniye")
    .replace("m", " Dakika")
    .replace("h", " Saat")
    .replace("d", " Gün")
    .replace("w", " Hafta")
    
    let cezapuan = await kdb.fetch(`cezapuan.${jyros.id}`) || "0"
    jyros.roles.add(roles["u-jail"])
    jyros.roles.cache.forEach(r => {
        jyros.roles.remove(r.id)
        db.set(`${config.guildID}.jail.${jyros.id}.roles.${r.id}`, r.id )
    })
    jyrosData.cezaVer(cezano, jyros, message.author, reason, time2, "Cezalandırılma", "TEMP-JAIL")
   
    message.channel.send(embed.setDescription(`${emojis["c-jail"]} ${jyros} (\`${jyros.id}\`) adlı kullanıcı \`${reason}\` sebebiyle \`${time2}\` boyunca cezalı kategorisine atıldı. \`#${cezano}\``)).then(x => x.delete({ timeout: 60000 }));
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-cezapuan"]).send(`${jyros}, aldığınız \`#${cezano}\` numaralı ceza ile \`${cezapuan}\` ceza puanına ulaştınız.`)
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-jail"]).send(embed
        .setFooter(`Ceza Numarası: #${cezano}`)
        .setDescription(`
${jyros} (\`${jyros.id}\`) kişisi ${time2} boyunca cezalandırıldı.

Cezalandırılan ceza puanı: \`${cezapuan}\`
Yetkili: ${message.author} (\`${message.author.id}\`)
─────────────────────
Cezalandırılma sebebi: \`${reason}\`
Ceza başlangıç tarihi: \`${moment(Date.now()).format("LLL")}\`
Ceza bitiş tarihi: \`${moment(Date.now()+ms(args[1])).format('LLL')}\`
`))

//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${jyros} (\`${jyros.id}\`) adlı kullanıcı ${message.author} (\`${message.author.id}\`) adlı yetkili tarafından <#${message.channel.id}> adlı kanalda \`${config.PREFIX}jail\` komutu ile cezalı kategorisine atıldı.`)

setTimeout(function() {
jyros.roles.remove(roles["u-jail"])
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-unjail"]).send(embed
    .setFooter(`Ceza Numarası: #${cezano}`)
    .setDescription(`
${jyros} (\`${jyros.id}\`) adlı kullanıcının ${time2} boyunca süren cezası sonlandırıldı.

Cezalandırılan ceza puanı: \`${cezapuan}\`
Yetkili: ${message.author} (\`${message.author.id}\`)
─────────────────────
Ceza Sebebi: \`${reason}\`
Ceza Bitiş Tarihi: \`${moment(Date.now()+ms(args[1])).format('LLL')}\`
`))
jyrosData.jailKaldır(jyros);
   }, ms(time))

setTimeout(async() =>{ 
 message.guild.roles.cache.forEach(async r => {

    const roller = await db.fetch(`${config.guildID}.jail.${jyros.id}.roles.${r.id}`)
       
    if(roller != r.id)  return;
    if(roller){
        jyros.roles.add(roller)
    };
db.delete(`${message.guild.id}.jail.${jyros.id}.roles.${r.id}`)
})
    }, ms(time));

}};
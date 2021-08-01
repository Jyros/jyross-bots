const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const jyrosData = require("../operations/jyrosData");
const { ErrorCodes } = require("../operations/errorcodes")
const db = require("quick.db");
const kdb = new db.table("kullanıcı")
const moment = require("moment");
moment.locale("tr");
module.exports = {
conf: {
name: "ban",
aliases: ["ban","yasakla","sg","söndür","sie"],
description: "Etiketilenen kullanıcıyı sunucudan yasaklar.",
examples:`${config.PREFIX}ban <@Jyros/ID> <Sebep>`,
category: "Yetkili",
help: "ban",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 5000,
staffLevel: 9,
},
run: async (client, message, args, embed, prefix) => {

    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.splice(1).join(" ")
    const gifs = ["https://media1.tenor.com/images/ed33599ac8db8867ee23bae29b20b0ec/tenor.gif?itemid=14760307", "https://media.giphy.com/media/fe4dDMD2cAU5RfEaCU/giphy.gif", "https://media1.tenor.com/images/4732faf454006e370fa9ec6e53dbf040/tenor.gif?itemid=14678194"];
   

if (!jyros) { 
    return message.channel.send(embed.setColor(`${config.embed.color.red}`).setDescription(`${emojis.no} Hatalı Kullanım! \`${prefix}ban <@Jyros/ID> <sebep>\` `).setFooter(`Hata kodu: ${ErrorCodes.KelimeHata.code}`)).then(x => x.delete({ timeout: 7000 })); 
}

if (!jyros || !reason) { 
    return message.channel.send(embed.setColor(`${config.embed.color.red}`).setDescription(`${emojis.no} Hatalı Kullanım! \`${prefix}ban <@Jyros/ID> <sebep>\` `).setFooter(`Hata kodu: ${ErrorCodes.KelimeHata.code}`)).then(x => x.delete({ timeout: 7000 })); 
}

if(jyros.id === message.author.id) {
    return message.channel.send(embed.setColor(`${config.embed.color.red}`).setDescription(`${emojis.no} ${message.author}, Kendini sunucudan yasaklayamazsın.`)).then(x => x.delete({ timeout: 7000 }));
}

if(message.member.roles.highest.position <= jyros.roles.highest.position) {
    return message.channel.send(embed.setColor(`${config.embed.color.red}`).setDescription(`${emojis.no} ${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`)).then(x => x.delete({ timeout: 7000 }));
}

let cezano = jyrosData.cezanoVer() + 1;
jyrosData.cezaVer(cezano, jyros, message.author, reason, "Yasaklama", "Yasaklama", "BAN");
let cezapuan = await kdb.fetch(`cezapuan.${jyros.id}`) || "0"
jyros.send(`${message.author} (\`${message.author.id}\`) isimli yetkili tarafından **${reason}** sebebiyle sunucudan yasaklandın! ( __Ceza Numaran: #${cezano}__ )`).catch(jrs => { console.log(`Error Code: ${ErrorCodes.MesajHata.code}`) });
 message.guild.members.ban(jyros.id, { reason: `Yasaklayan Kişi ID: ${message.author.id} Sebep: ${reason}`}).catch(() => {});
  message.channel.send(embed
.setImage(gifs.random())
.setDescription(`${emojis["c-banned"]}  ${jyros} (\`${jyros.id}\`) adlı kullanıcı **${reason}** nedeniyle sunucudan yasaklandı. 
  (Ceza Numarası: \`#${cezano}\`)`)).then(x => x.delete({ timeout: 60000 }));
  message.react(emojis.yes);
   client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-cezapuan"]).send(`${jyros}, aldığınız \`#${cezano}\` numaralı ceza ile \`${cezapuan}\` ceza puanına ulaştınız.`)
  client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-ban"]).send(embed
    .setColor(`${config.embed.color.white}`)
    .setFooter(`Ceza Numarası: #${cezano}`)
    .setDescription(`
${jyros} (\`${jyros.id}\`) kişisi ${reason} sebebiyle sunucudan yasaklandı.

Yasaklanan ceza puanı: \`${cezapuan}\`
Yetkili: ${message.author} (\`${message.author.id}\`)
Ceza Tarihi: \`${moment(Date.now()).format("LLL")}\`
`))

//cmd-genel >>>
 client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${jyros} (\`${jyros.id}\`) adlı kullanıcı ${message.author} (\`${message.author.id}\`) adlı yetkili tarafından <#${message.channel.id}> adlı kanalda \`${config.PREFIX}ban\` komutu ile sunucudan yasaklandı.`)

}};
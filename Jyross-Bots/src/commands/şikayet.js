const roles = require("../base/roles.json");
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
name: "şikayet",
aliases: ["sikayet","şkyt"],
description: "Belirtilen üyeyi herhangi bir sebep ötürüyle şikayet edersiniz.",
examples:`${config.PREFIX}şikayet <@Jyross/ID> <chat-sesli-taciz-dm-diğer> <Şikayet>`,
category: "Genel",
help: "şikayet",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 10000,
},
run: async (client, message, args, embed, prefix) => {

    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let tür = args[1];
    let şikayet = args.slice(2).join(' ');

    if (!jyros) {
        message.channel.send(embed.setDescription(`${emojis.no} ${message.author}, Şikayetçi olduğun kişiyi etiketleyip şikayetini yazmalısın. \`${prefix}şikayet <@Jyross/ID> <chat-sesli-taciz-dm-diğer> <Şikayet>\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`)).then(m => m.delete({ timeout: 10000 })); 
        message.react(emojis.no)
        return;
    }
    
if(tür !== "chat" && tür !== "sesli" && tür !== "taciz" && tür !== "dm" && tür !== "diğer") { 
    message.channel.send(embed.setDescription(`${emojis.no} Eksik argüman! \`${prefix}şikayet <@Jyross/ID> <chat-sesli-taciz-dm-diğer> <Şikayet>\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`)).then(x => x.delete({timeout: 7000})); 
    message.react(emojis.no)
    return;
}

if (!şikayet) {
    message.channel.send(embed.setDescription(`${emojis.no} ${message.author}, eksik argüman! \`${prefix}şikayet <@Jyross/ID> <chat-sesli-taciz-dm-diğer> <Şikayet>\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`)).then(m => m.delete({ timeout: 9000 })); 
    message.react(emojis.no)
    return;
}

if(message.author.id === jyros.id) { 
    message.channel.send(embed.setDescription(`Hatalı Kullanım! \`${prefix}şikayet <@Jyross/ID> <chat-sesli-taciz-dm-diğer> <Şikayet>\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`)).then(ğ => ğ.delete({timeout: 7000}));
    message.react(emojis.no)
    return;
}

let sikayetciCP = await kdb.fetch(`cezapuan.${message.author.id}`) || "0"
let sikayetedilenCP = await kdb.fetch(`cezapuan.${jyros.id}`) || "0"

message.channel.send(embed.setDescription(`${emojis.yes} ${message.author}, şikayetiniz başarıyla sunucu sorumlularına iletilmiştir. En kısa zamanda sonuçlandırılacaktır.`)).then(m => m.delete({ timeout: 12000 })); 
message.react(emojis.yes)
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-şikayet"]).send(embed
    .setTimestamp()
    .setDescription(`
${jyros} (\`${jyros.id}\`) kişisi ${message.author} (\`${message.author.id}\`) tarafından şikayet edildi.

Şikayetçi ceza puanı: \`${sikayetciCP}\`
Şikayet edilen ceza puanı: \`${sikayetedilenCP}\`
─────────────────────
Şikayet Türü: ${tür}
Şikayet: ${şikayet}
`))

//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${jyros} (\`${jyros.id}\`) adlı kullanıcı ${message.author} (\`${message.author.id}\`) adlı kullanıcı tarafından <#${message.channel.id}> adlı kanalda \`${config.PREFIX}şikayet\` komutu ile şikayet edildi.`)

}};
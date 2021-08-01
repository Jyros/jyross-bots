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
name: "cezalar",
aliases: ["sicil","cezabilgi","ceza-bilgi"],
description: "Açıklama Belirtilmemiş.",
examples:`${config.PREFIX}cezalar <@Jyross/ID>`,
category: "Genel",
help: "cezalar",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
staffLevel: 8,
},
run: async (client, message, args, embed, prefix) => {

    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    let user = message.guild.member(jyros)
    let x = jyrosData.cezaGetir(jyros) || []

    if (args[1] === "sıfırla" ) {
       
        if (!message.member.roles.cache.some(r => [(roles.owner)].includes(r.id))) {
            message.channel.send(embed.setDescription(`${emojis.no} Bu komutu kullanmak için yeterli yetkiniz bulunmamakta.`).setFooter(`Hata kodu: ${ErrorCodes.YetersizYetki.code}`)).then(x => x.delete(8000));
            message.react(emojis.no)
            return;
        }

        jyrosData.cezaVeriKaldır(jyros)
        message.channel.send(embed.setDescription(`${user} adlı kullanıcının ${message.author} tarafından başarıyla sicil geçmişi ve ceza puanı silindi.`).setColor(`${config.embed.color.green}`))
        message.guild.channels.cache.get(cnls["cmd-cezapuan"]).send(`${user}, sicil geçmişiniz ve ceza puanınız sıfırlandı. Yetkili: ${message.author}`)
        message.react(emojis.yes)
    
        //cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcının sicil geçmişinde sisteme kayıtlı verileri <#${message.channel.id}> adlı kanalda \`${config.PREFIX}sicil sıfırla\` komutu ile silindi.`)

    }

  if (!args[1]) {

    if(!x) {
        message.channel.send(embed.setDescription(`${jyros} (\`${jyros.id}\`) adlı kullanıcının sicil geçmişinde herhangi bir ceza bulunamadı.`).setFooter(`Hata Kodu: ${ErrorCodes.DataHata.code}`))
        message.react(emojis.no)
        return;
    }   

        let sicil = x.map((data, index) => `
        **Tip:** [${data.Tip || "Belirtilmemiş."}]
        **Yetkili:** <@${data.Yetkili || "Belirtilmemiş."}> (\`${data.Yetkili || "ID Bulunamadı."}\`)
        **Zaman:** ${moment(data.Zaman).format("LLL")}
        **Sebep:** ${data.Sebep || "Belirtilmemiş."}
        **Tür:** ${data.cezaTuru || "Belirtilmemiş."}
        **No:** \`#${data.cezaid || "Bulunamadı."}\``)

        message.channel.send(embed.setDescription(`
        ${jyros} (\`${jyros.id}\`) adlı kullanıcının Ceza Geçmişi:

        ${sicil.join("\n") || `${jyros} (\`${jyros.id}\`) adlı kullanıcının sicil geçmişinde sisteme kayıtlı herhangi bir ceza bulunamadı.`}
        
        \`>\` Kullanıcı hakkındaki daha fazla bilgi için: \`${prefix}profil\`
        `))
  }

}};
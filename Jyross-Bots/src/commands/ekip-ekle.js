const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const { ErrorCodes } = require("../operations/errorcodes")
const moment = require("moment");
moment.locale("tr");
module.exports = {
conf: {
name: "ekipekle",
aliases: ["ekip-ekle"],
description: "Sunucunuza ekip eklersiniz. Belirtilen ekibin özelliklerine göre uygun bir rol açar ve etiketi taşıyanları tespit edip rolleri dağıtır.",
examples:`${config.PREFIX}ekipekle <Ekipİsim-Tag> <Etiket> <Ekip Yöneticisi-Sorumlusu>`,
category: "Kurucu",
help: "ekipekle",
enabled: true,
ownerOnly: true,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 10000,
},
run: async (client, message, args, embed, prefix) => {

    let colors = ["RANDOM","#ff0000","#0aff00","#a7f8fe","#240d2e","#050706","#d66a16","#f17979","#094d11","#ece761","#61ec6b","#24806c","#962e30","#2295f7","#22f726"]
    let Ekipİsim = args[0];
    let EkipEtiket = args[1];
    let yönetici = message.mentions.members.first() || message.guild.members.cache.get(args.slice(2).join(` `));
    
    if (!Ekipİsim) {
        message.channel.send(embed.setDescription(`${emojis.no} Hatalı Kullanım! Örnek: \`${prefix}ekipekle Lil 1956 @Jyross.\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`))
        message.react(emojis.no)
        return
    }

    if (!EkipEtiket || isNaN(EkipEtiket)) {
        message.channel.send(embed.setDescription(`${emojis.no} Hatalı Kullanım! Örnek: \`${prefix}ekipekle Lil 1956 @Jyross.\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`))
        message.react(emojis.no)
        return
    } 
    
    if (!yönetici) {
        message.channel.send(embed.setDescription(`${emojis.no} Hatalı Kullanım! Örnek: \`${prefix}ekipekle Lil 1956 @Jyross.\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`))
        message.react(emojis.no)
        return
    }

    message.guild.roles.create({
        data: {
            name: `${Ekipİsim} #${EkipEtiket}`,
            color: `${colors.random()}`,
            mentionable: false
        },
        reason: "Ekip Ekleme Sistemi"
    }).then(async (role) => {
  
       let tagdakiler = await message.guild.members.cache.filter(m => m.user.username.toLowerCase().includes(Ekipİsim)).size
       let etikettekiler = await message.guild.members.cache.filter(m => m.user.discriminator.includes(EkipEtiket)).size

        message.channel.send(embed.setDescription(`
${emojis.yes} **Ekip başarı ile oluşturuldu!**

**Ekip Bilgileri**

Ekip Tagı: **${Ekipİsim}**
Ekip Etiket Tagı: **${EkipEtiket}**
Ekip Sorumlusu-Yöneticisi: ${yönetici}
Ekibin Sunucuya Katıldığı Tarih: \`${moment(Date.now()).format("LLL")}\`
Ekip Rolü: <@&${role.id}> 

**Ekip tagındaki üyeler:**

Tagda (${Ekipİsim}) bulunan kişi sayısı: **${tagdakiler}** kişi!
Etiket tagında (${EkipEtiket}) bulunan kişi sayısı **${etikettekiler}** kişi!

Toplam tag ve etiket tagında bulunan **${etikettekiler+tagdakiler}** kişi tespit edildi. Kişilere <@&${role.id}> Rolü dağıtılıyor!
`))
        message.guild.members.cache.forEach(jyross => {
            if (jyross.user.username.includes(Ekipİsim)) {
                jyross.roles.add(role.id)
            }
        })
        message.guild.members.cache.forEach(jyross => {
            if (jyross.user.discriminator.includes(EkipEtiket)) {
                jyross.roles.add(role.id)
            }
        })

    //cmd-genel >>>
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`
    ${message.author} (\`${message.author.id}\`) tarafından ${message.channel.name} kanalında \`${prefix}ekipekle\` komutu ile ${Ekipİsim} adı altında yeni bir ekip oluşturuldu. 
    Detaylı Bilgiler: ${Ekipİsim} - ${EkipEtiket} - ${yönetici}
    `)

})

}};
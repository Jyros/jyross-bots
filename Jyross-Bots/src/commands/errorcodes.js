const config = require("../base/config.json");
const { ErrorCodes } = require("../operations/errorcodes")
const emojis = require("../base/emojis.json");
module.exports = {
conf: {
name: "hatakodu",
aliases: ["hatakod","errorcode","errorcodes"],
description: "Açıklama Belirtilmemiş.",
examples:`${config.PREFIX}errorcodes <HataKodu>`,
category: "Yetkili",
help: "hatakodu",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
staffLevel: 3,
},
run: async (client, message, args, embed, prefix) => {

let no = args[0]

if(ErrorCodes.YetersizYetki.code === no) {
        message.channel.send(`\`\`\`${ErrorCodes.YetersizYetki.code} | ${ErrorCodes.YetersizYetki.message}\`\`\``).then(j => j.delete({ timeout: 15000 }));
        message.react(emojis.yes)
}

if(ErrorCodes.RolHata.code === no) {
        message.channel.send(`\`\`\`${ErrorCodes.RolHata.code} | ${ErrorCodes.RolHata.message} \`\`\``).then(j => j.delete({ timeout: 15000 }));
        message.react(emojis.yes)
}

if(ErrorCodes.MesajHata.code === no) {
        message.channel.send(`\`\`\`${ErrorCodes.MesajHata.code} | ${ErrorCodes.MesajHata.message}\`\`\``).then(j => j.delete({ timeout: 15000 }));
        message.react(emojis.yes)
}

if(ErrorCodes.BilinmeyenHata.code === no) {
        message.channel.send(`\`\`\`${ErrorCodes.BilinmeyenHata.code} | ${ErrorCodes.BilinmeyenHata.message}\`\`\``).then(j => j.delete({ timeout: 15000 }));
        message.react(emojis.yes)
}

if(ErrorCodes.KanalHata.code === no) {
        message.channel.send(`\`\`\`${ErrorCodes.KanalHata.code} | ${ErrorCodes.KanalHata.message}\`\`\``).then(j => j.delete({ timeout: 15000 }));
        message.react(emojis.yes)
}

if(ErrorCodes.KelimeHata.code === no) {
        message.channel.send(`\`\`\`${ErrorCodes.KelimeHata.code} | ${ErrorCodes.KelimeHata.message}\`\`\``).then(j => j.delete({ timeout: 15000 }));
        message.react(emojis.yes)
}

if(ErrorCodes.DataHata.code === no) {
        message.channel.send(`\`\`\`${ErrorCodes.DataHata.code} | ${ErrorCodes.DataHata.message}\`\`\``).then(j => j.delete({ timeout: 15000 }));
        message.react(emojis.yes)
}

if(ErrorCodes.SesHata.code === no) {
        message.channel.send(`\`\`\`${ErrorCodes.SesHata.code} | ${ErrorCodes.SesHata.message}\`\`\``).then(j => j.delete({ timeout: 15000 }));
        message.react(emojis.yes)
}

if(ErrorCodes.KullanıcıHata.code === no) {
        message.channel.send(`\`\`\`${ErrorCodes.KullanıcıHata.code} | ${ErrorCodes.KullanıcıHata.message}\`\`\``).then(j => j.delete({ timeout: 15000 }));
        message.react(emojis.yes)
}

if(ErrorCodes.KullanıcıHata2.code === no) {
        message.channel.send(`\`\`\`${ErrorCodes.KullanıcıHata2.code} | ${ErrorCodes.KullanıcıHata2.message}\`\`\``).then(j => j.delete({ timeout: 15000 }));
        message.react(emojis.yes)
}

if(ErrorCodes.KullanıcıHata3.code === no) {
        message.channel.send(`\`\`\`${ErrorCodes.KullanıcıHata3.code} | ${ErrorCodes.KullanıcıHata3.message}\`\`\``).then(j => j.delete({ timeout: 15000 }));
        message.react(emojis.yes)
}

if(ErrorCodes.KullanıcıHata4.code === no) {
        message.channel.send(`\`\`\`${ErrorCodes.KullanıcıHata4.code} | ${ErrorCodes.KullanıcıHata4.message}\`\`\``).then(j => j.delete({ timeout: 15000 }));
        message.react(emojis.yes)
}

if(!no) {

        if (message.member.hasPermission("ADMINISTRATOR")) {

        message.channel.send(embed.setDescription(`
        **${ErrorCodes.YetersizYetki.code}** | ${ErrorCodes.YetersizYetki.message} 
        **${ErrorCodes.RolHata.code}** | ${ErrorCodes.RolHata.message} 
        **${ErrorCodes.MesajHata.code}** | ${ErrorCodes.MesajHata.message} 
        **${ErrorCodes.BilinmeyenHata.code}** | ${ErrorCodes.BilinmeyenHata.message} 
        **${ErrorCodes.KanalHata.code}** | ${ErrorCodes.KanalHata.message} 
        **${ErrorCodes.KelimeHata.code}** | ${ErrorCodes.KelimeHata.message} 
        **${ErrorCodes.DataHata.code}** | ${ErrorCodes.DataHata.message} 
        **${ErrorCodes.SesHata.code}** | ${ErrorCodes.SesHata.message}
        **${ErrorCodes.KullanıcıHata.code}** | ${ErrorCodes.KullanıcıHata.message}
        **${ErrorCodes.KullanıcıHata2.code}** | ${ErrorCodes.KullanıcıHata2.message} 
        **${ErrorCodes.KullanıcıHata3.code}** | ${ErrorCodes.KullanıcıHata3.message} 
        **${ErrorCodes.KullanıcıHata4.code}** | ${ErrorCodes.KullanıcıHata4.message} 
        
        `).setFooter(`Hata Almaya Devam Ediyorsan Botun Sahibiyle İletişime Geç! ${config.Jyross.name}`))
} else {
message.channel.send(`Bir hata kodu girmelisin! \`${config.PREFIX}${module.exports.conf.name} ${ErrorCodes.YetersizYetki.code}\``)
  }

}

    
}};
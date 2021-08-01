const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const { ErrorCodes } = require("../operations/errorcodes")
module.exports = {
conf: {
name: "rolbilgi",
aliases: ["role-info","rol-info","rolinfo","roleinfo","role-bilgi","rol-bilgi"],
description: "Belirlenen rolün detaylı bilgilerini görürsünüz.",
examples:`${config.PREFIX}rolbilgi <EtiketRol/ID> `,
category: "Yönetim",
help: "rolbilgi",
enabled: true,
ownerOnly: true,
adminOnly: true,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
},
run: async (client, message, args, embed, prefix) => {

    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]); 
    let array = new Array();

    if (!role) { 
        message.channel.send(embed.setDescription(`${message.author}, eksik argüman!`).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`))
        message.react(emojis.no)
        return;
    }

    if (!args[1]) {
    
        message.channel.send((`
    ${role} rol bilgileri;
    Rol ID: \`${role.id}\` 
    Rol Kişi Sayısı: \`${role.members.size}\`
    ─────────────────
    Roldeki kişiler:
    ${role.members.size <= 100 ? array.join("\n") : `Listelenemedi! ( **${role.members.size}** kişi var! )`}`));
     return 
    }

    if (args[1] === "sayı") { 
        message.channel.send((`${role} ( \`${role.id}\` ) adlı rolde toplam **${role.members.size}** kişi bulunmaktadır!`));
        return; 
    } else if (args[1] === "id") { 
        message.channel.send((`${role} ( \`${role.name}\` ) adlı rolün ID'si: \`${role.id}\``));
        return;
    } else if (args[1] === "renk") { 
        message.channel.send((`${role} ( \`${role.id}\` ) adlı rolün renk kodu: \`${role.hexColor}\``)); 
        return;
    } else if (args[1] === "üyeler") { 
        message.channel.send((`
    ${role} ( \`${role.id}\` ) adlı rolündeki kişiler:
    ─────────────────
    ${role.members.size <= 100 ? array.join("\n") : `Listelenemedi! ( **${role.members.size}** kişi var! )`}`)); 
       return; 
  };
    
}};
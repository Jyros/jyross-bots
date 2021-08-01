const config = require("../base/config.json");
const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const { ErrorCodes } = require("../operations/errorcodes");
module.exports = {
conf: {
name: "taglı",
aliases: ["tagli","family"],
description: "Açıklama Belirtilmemiş.",
examples:`${config.PREFIX}taglı <Jyross/ID>`,
category: "Yönetim",
help: "taglı",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
},
run: async (client, message, args, embed, prefix) => {

    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!message.member.roles.cache.has(roles.yönetim) && !message.member.hasPermission("ADMINISTRATOR")){
        message.channel.send(embed.setDescription(`${emojis.no} ${message.author}, bu komutu kullanmak için <@&${roles.yönetim}> yetkisine sahip olmanız gerekiyor.`).setFooter(`Hata Kodu: ${ErrorCodes.YetersizYetki.code}`)); 
        message.react(emojis.no);
        return;
    }

    if (!jyros) {
        message.channel.send(embed.setDescription(`${emojis.no} Hatalı Kullanım! \`${module.exports.conf.examples}\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`)).then(j => j.delete({ timeout: 10000 }));
        message.react(emojis.no);
        return;
    }

    if (message.author.id === jyros.id) {
        message.channel.send(embed.setDescription(`${emojis.no} Hatalı Kullanım!`).setFooter(`Hata Kodu: ${ErrorCodes.KullanıcıHata2.code}`)).then(j => j.delete({ timeout: 10000 }));
        message.react(emojis.no);
        return;
    }
/*
    if (jyros.manageable) {
        message.channel.send(embed.setDescription(`${emojis.no} Hatalı Kullanım!`).setFooter(`Hata Kodu: ${ErrorCodes.KullanıcıHata3.code}`)).then(j => j.delete({ timeout: 10000 }));
        message.react(emojis.no);
        return;
    }
*/
    if(message.member.roles.highest.position <= jyros.roles.highest.position) {
        message.channel.send(embed.setDescription(`${emojis.no} Hatalı Kullanım!`).setFooter(`Hata Kodu: ${ErrorCodes.KullanıcıHata4.code}`)).then(j => j.delete({ timeout: 10000 }));
        message.react(emojis.no);
        return;
    }

    if(!jyros.roles.cache.has(roles["u-taglı"])) {
    message.react(emojis.yes)
    jyros.roles.add(roles["u-taglı"])
    client.guilds.cache.get(config.guildID).members.cache.get(jyros.id).setNickname(client.guilds.cache.get(config.guildID).members.cache.get(jyros.id).displayName.replace(config.untag, config.tag));
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-tag"]).send(`${jyros} (\`${jyros.id}\`) adlı kullanıcıya ${message.author} (\`${message.author.id}\`) tarafından taglı rolü verildi.`)
} else {}

}};
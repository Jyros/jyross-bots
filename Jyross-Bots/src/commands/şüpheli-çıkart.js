const config = require("../base/config.json");
const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const { ErrorCodes } = require("../operations/errorcodes");
module.exports = {
conf: {
name: "şüpheliçıkart",
aliases: ["şüpheli-çıkar","şüpheliçıkar","şüpheli-çıkart"],
description: "Yeni Hesap kategorisinde bulunan kullanıcıyı kayıtsız kategorisine atar.",
examples:`${config.PREFIX}şüpheliçıkart <@Jyross/ID>`,
category: "Yönetim",
help: "şüpheliçıkart",
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
    
    if (jyros.roles.cache.has(roles["u-şüpheli"])) {

    jyros.roles.add(roles["u-unreg"]);
    jyros.roles.remove(roles["u-şüpheli"]);

    if (jyros.user.username.includes(config.tag)) {
        jyros.setNickname(`${config.tag} İsim | Yaş`);
        jyros.roles.add(roles["u-taglı"]);
        
    } else if (!jyros.user.username.includes(config.tag)) {
        jyros.setNickname(`${config.untag} İsim | Yaş`)

    };

        message.react(emojis.yes);
        message.channel.send(embed.setDescription(`${jyros} (\`${jyros.id}\`) adlı kullanıcı ${message.author} (\`${message.author.id}\`) tarafından yeni hesap kategorisinden çıkarılıp kayıtsız kategorisine atıldı!`)).then(j => j.delete({ timeout: 10000 }));
        client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-şüpheli"]).send(embed.setDescription(`${jyros} (\`${jyros.id}\`) adlı kullanıcı ${message.author} (\`${message.author.id}\`) tarafından yeni hesap kategorisinden çıkarılıp kayıtsız kategorisine atıldı!`).setTimestamp());
        
    } else {
        message.channel.send(`Belirtilen kullanıcı zaten şüpheli kategorisinde bulunmuyor.`).then(j => j.delete({ timeout: 10000 }));
        message.react(emojis.no)
    }

}};
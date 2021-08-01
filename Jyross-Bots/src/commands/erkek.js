const config = require("../base/config.json");
const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const jyrosData = require("../operations/jyrosData");
const db = require("quick.db");
const ydb = new db.table("yetkili");
const { ErrorCodes } = require("../operations/errorcodes");
const moment = require("moment");
moment.locale("tr")
module.exports = {
conf: {
name: "erkek",
aliases: ["e"],
description: "Sunucunuzdaki kayıtsız kategorisindeki kullanıcıları erkek olarak kayıt eder.",
examples:`${config.PREFIX}e <@Jyross/ID> <İsim> <Yaş>`,
category: "Yetkili",
help: "erkek",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
staffLevel: 1,
},
run: async (client, message, args, embed, prefix) => {

    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    
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

    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    
    if(!isim || !yaş) { 
        message.channel.send(embed.setDescription(`Hatalı Kullanım! \`${module.exports.conf.examples}\``)).setFooter(`Hata Kodu: ${ErrorCodes.KullanıcıHata3.code}`).then(j => j.delete({ timeout: 10000 }));
        message.react(emojis.no);
        return;
    }

   let setName = `${jyros.user.username.includes(config.tag) ? config.tag : (config.untag ? config.untag : (config.tag || ""))} ${isim} | ${yaş}`;
   
   if (jyros.roles.cache.has(roles["u-jail"]) || jyros.roles.cache.has(roles["u-şüpheli"]) || jyros.roles.cache.has(roles["u-yasaklıtag"])) {
    message.channel.send(embed.setDescription(`${emojis.no} Belirtilen kullanıcı cezalı kategorisinde bulunuyor.`)).then(j => j.delete({ timeout: 10000 }));
    message.react(emojis.no)
    return;
}

   jyros.setNickname(`${setName}`).catch(err => message.channel.send(`Belirtilen isim değiştirilemiyor.`));

   if (!jyros.roles.cache.has(roles["u-male"]) || !jyros.roles.cache.has(roles["u-female"])) {
    await jyrosData.erkekTeyitVer(message.author)
    await jyros.roles.add(roles["u-male"])
    await jyros.roles.remove(roles["u-unreg"])
       message.channel.send(embed.setDescription(`${jyros} adlı kullanıcı ismi "${setName}" olarak değiştirildi ve **Erkek** olarak kayıt edildi.`)).then(j => j.delete({ timeout: 15000 }));
       client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-chat"]).send(`${jyros}, aramıza yeni katıldı. Hadi ona hoş geldin diyelim!`).then(j => j.delete({ timeout: 10000 }));
       client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-erkekkayıt"]).send(embed
        .setColor(`${config.embed.color.white}`)
        .setDescription(`
${jyros} (\`${jyros.id}\`) kişisinin ismi "${setName}" olarak değiştirildi ve **Erkek** olarak kayıt edildi.

Kayıt eden yetkili: ${message.author} (\`${message.author.id}\`)
Kayıt Tarihi: \`${moment(Date.now()).format("LLL")}\`
`))

}

}};
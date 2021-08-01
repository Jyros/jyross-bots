const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const { Perms } = require("../operations/permissions")
const { ErrorCodes } = require("../operations/errorcodes")
module.exports = {
conf: {
name: "temizle",
aliases: ["sil","sill","tmzle"],
description: "Belirlenen miktar kadar mesaj silersiniz.",
examples:`${config.PREFIX}sil <1/100> `,
category: "Kurucu",
help: "temizle",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 10000,
},
run: async (client, message, args, embed, prefix) => {

    const m = args[0]

    if (!message.member.hasPermission("MANAGE_MESSAGES")) { 
        message.channel.send(embed.setDescription(`${emojis.no} ${message.author}, bu komutu kullanmak için "${Perms.MANAGE_MESSAGES}" yetkisine sahip olmanız gerekiyor.`).setFooter(`Hata Kodu: ${ErrorCodes.YetersizYetki.code}`)).then(m => m.delete({ timeout: 7000 }));
        message.react(emojis.no)
        return;
}

if(!m) { 
    message.channel.send('Hatalı Kullanım! Bir mesaj miktarı girin!').then(m => m.delete({ timeout: 7000 }));
    message.react(emojis.no)
    return;
}

if(m < 2) return message.reply('En az 2 mesaj silinebilir.').then(m => m.delete({ timeout: 5000 }));
if(m>100) return message.reply('En fazla 100 mesaj silinebilir.').then(m => m.delete({ timeout: 5000 }));

message.channel.bulkDelete(m);
message.channel.send(embed.setDescription('Başarıyla __'+m+'__ mesaj silindi!')).then(m => m.delete({ timeout: 7000 }));

//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${message.author} (\`${message.author.id}\`) adlı kullanıcı <#${message.channel.id}> adlı kanalda \`${config.PREFIX}temizle\` komutu ile ${m} adet mesaj sildi.`)

}};
const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const { Perms } = require("../operations/permissions")
const { ErrorCodes } = require("../operations/errorcodes")
const db = require("quick.db")
const moment = require("moment");
moment.locale("tr")
module.exports = {
conf: {
name: "snipe",
aliases: ["silinenmesaj","sonmsj"],
description: "Komutun kullanıldığı kanal da en son silinmiş mesajın içeriğini ve tarihini gösterir.",
examples:`${config.PREFIX}snipe`,
category: "Yönetim",
help: "snipe",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
},
run: async (client, message, args, embed, prefix) => {

let hedefMesaj = await db.fetch(`snipe.mesaj.icerik.${config.guildID}`)
let hedefKisi = await db.fetch(`snipe.kisi.${config.guildID}`)
let yazilmatarih = await db.fetch(`snipe.mesaj.yazilmatarih.${config.guildID}`)
let silinmetarih = await db.fetch(`snipe.mesaj.silinmetarih.${config.guildID}`)
let jyros = client.users.cache.get(hedefKisi);

    if (!message.member.hasPermission("MANAGE_MESSAGES")) { 
        message.channel.send(embed.setDescription(`${emojis.no} ${message.author}, bu komutu kullanmak için "${Perms.MANAGE_MESSAGES}" yetkisine sahip olmanız gerekiyor.`).setFooter(`Hata Kodu: ${ErrorCodes.YetersizYetki.code}`)).then(m => m.delete({ timeout: 7000 }));
        message.react(emojis.no)
        return;
}

 if (!hedefMesaj) {

    message.channel.send(embed.setDescription(`Sisteme kayıtlı silinen bir mesaj bulunamadı.`).setFooter(`Hata Kodu: ${ErrorCodes.DataHata.code}`))
    message.react(emojis.no)
    return;

 } else {

    message.channel.send(embed.setDescription(`
    Sisteme Kayıtlı Son Silinen Mesaj Bilgileri:

    Mesajı Silen Kullanıcı: ${jyros} (\`${jyros.id}\`)
    Mesaj Yazılma Tarihi: ${moment.duration(Date.now() - yazilmatarih).format("D [gün], H [saat], m [dakika], s [saniye]")} önce
    Mesaj Silinme Tarihi:  ${moment.duration(Date.now() - silinmetarih).format("D [gün], H [saat], m [dakika], s [saniye]")} önce
    Mesaj İçeriği: **${hedefMesaj}**
    `))

 }

}};
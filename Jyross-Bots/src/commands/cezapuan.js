const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const db = require('quick.db')
const kdb = new db.table("kullanıcı");
module.exports = {
conf: {
name: "cezapuan",
aliases: ["cpuan"],
description: "Açıklama Belirtilmemiş.",
examples:`${config.PREFIX}cezapuan <Jyross/ID>`,
category: "Genel",
help: "cezapuan",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
staffLevel: 1,
},
run: async (client, message, args, embed, prefix) => {

    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if (!jyros) return
    let cezapuan = kdb.fetch(`cezapuan.${jyros.id}`) || "0"

    message.channel.send(embed.setDescription(`${jyros} adlı kullanıcının ceza puanı: **${cezapuan}**`))

}};
const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
module.exports = {
conf: {
name: "banlist",
aliases: ["banliste","ban-liste","ban-list"],
description: "Açıklama Belirtilmemiş.",
examples:`${config.PREFIX}banlist`,
category: "Yönetim",
help: "banlist",
enabled: true,
ownerOnly: true,
adminOnly: true,
cmdTest: false,
dmCmd: false,
cooldown: 10000,
},
run: async (client, message, args, embed, prefix) => {

    message.guild.fetchBans(true).then(banned => {

        let list = banned.map(jyros => `${jyros.user.id} | ${jyros.user.tag}`).join('\n');
        message.channel.send(embed.setDescription(`${list}\n\nSunucuda toplamda ${banned.size} yasaklı kullanıcı bulunmakta.`))

    })

}};
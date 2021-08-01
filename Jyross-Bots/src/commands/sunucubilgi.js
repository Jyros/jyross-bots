const config = require("../base/config.json");
module.exports = {
conf: {
name: "sunucubilgi",
aliases: ["sbilgi","sunucub","sunucubilgi","sb","sunucu"],
description: "Sunucu bilgilerini gösterir.",
examples:`${config.PREFIX}sunucubilgi`,
category: "Yönetim",
help: "sunucubilgi",
enabled: true,
ownerOnly: false,
adminOnly: true,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
},
run: async (client, message, args, embed, prefix) => {

message.channel.send(embed
    .setDescription(`
    \`•\` Sunucudaki **toplam** üye sayısı: **${message.guild.memberCount}**
    \`•\` Sunucuya son **1** saatte giren üye sayısı: **${message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 3600000).size}**
    \`•\` Sunucuya bugün **giriş** yapan üye sayısı: **${message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 86400000).size}**
    \`•\` Sunucuya bu **hafta** giriş yapan üye sayısı: **${message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 604800000).size}**
    \`•\` Sunucuya bu **ay** giriş yapan üye sayısı: **${message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 2629800000).size}**    
    `))

}};
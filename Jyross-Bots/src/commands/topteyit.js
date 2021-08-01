const config = require("../base/config.json");
const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const qdb = require("quick.db")
const ydb = new qdb.table("yetkili")
module.exports = {
conf: {
name: "topteyit",
aliases: ["toplamteyit","top-teyit"],
description: "Açıklama Belirtilmemiş.",
examples:`${config.PREFIX}topteyit`,
category: "Yetkili",
help: "topteyit",
enabled: true,
ownerOnly: false,
adminOnly: true,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
},
run: async (client, message, args, embed, prefix) => {

    let data = await ydb.get("teyit") || {};
    let arr = Object.keys(data);
    let listedMembers = arr.filter(dat => message.guild.members.cache.has(dat)).sort((a,b) => Number((data[b].erkek || 0) + (data[b].kiz || 0)) - Number((data[a].erkek || 0) + (data[a].kiz || 0))).map((value, index) => `\`${index + 1}.\` ${message.guild.members.cache.get(value)} | \`${((data[value].erkek || 0) + (data[value].kiz || 0))}\` | Erkek : \`${((data[value].erkek || 0))}\` | Kadın : \`${((data[value].kiz || 0))}\` `).splice(0, 30);
    message.channel.send(embed.setDescription(`**Top Teyit Listesi**\n\n${listedMembers.join("\n") || "Teyit verisi bulunamadı!"}`)).catch();
  
}};
const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
module.exports = {
conf: {
name: "dağıt",
aliases: [""],
description: "Toplantıda veya toplu olarak olan herhangi bir odada komutu kullanınca publiclere dağıtacak ve kulaklığı kapalı olanları da sleep atacak.",
examples:`${config.PREFIX}dağıt`,
category: "Yönetim",
help: "dağıt",
enabled: true,
ownerOnly: true,
adminOnly: true,
cmdTest: false,
dmCmd: false,
cooldown: 20000,
},
run: async (client, message, args, embed, prefix) => {

    let pubatılcaklar = message.guild.members.cache.filter(s => s.voice.channel && s.voice.channel.id === message.member.voice.channel.id).filter(x => x.voice.selfDeaf === false)
    let sleep = message.guild.members.cache.filter(s => s.voice.channel && s.voice.channel.id === message.member.voice.channel.id).filter(x => x.voice.selfDeaf === true)
    let kanallar = message.guild.channels.cache.filter(s => s.parentID === cnls["category-public"])

    sleep.array().forEach(async(member, index) => {
        setTimeout(() => {
            member.voice.setChannel(cnls["v-afkroom"])
        }, index * 2000)
    })
    pubatılcaklar.array().forEach(async(member, index) => {
        setTimeout(() => {
            member.voice.setChannel(kanallar.random())
        }, index * 2000)
    })
    
    message.channel.send(embed.setDescription(`${sleep.size} Adet kullanıcı sleep odalara taşındı. 
    ${pubatılcaklar.size} Adet kullanıcı public odalara dağıtıldı.`))

//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${message.author} (\`${message.author.id}\`) adlı kullanıcı <#${message.channel.id}> adlı kanalda \`${config.PREFIX}dağıt\` komutunu kullanarak bulunduğu sesteki tüm kullanıcıları public/afk kategorilerine dağıttı.`)

}};
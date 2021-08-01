const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
module.exports = {
conf: {
name: "yetkili",
aliases: ["staff"],
description: "Sunucudaki yetkililerin bilgilerini verir.",
examples:`${config.PREFIX}yetkili <say-dm-ses>`,
category: "Kurucu",
help: "yetkili",
enabled: true,
ownerOnly: true,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 10000,
permLevel: 4,
},
run: async (client, message, args, embed, prefix) => {

    let staff = message.guild.roles.cache.get(roles["cmd-botcommands"])
    let staffs = message.guild.members.cache.filter(s => s.roles.highest.position >= staff.position && !s.user.bot)
    let voicestaff = staffs.filter(s => s.voice.channel)
    let unsesyt = staffs.filter(s => !s.voice.channel)
    let onlinestaff = staffs.filter(s => s.presence.status !== 'offline')
    let offlineyt = staffs.filter(s => s.presence.status === 'offline')
    let onlinevstaff = staffs.filter(s => s.presence.status !== 'offline').filter(x => !x.voice.channel)
    
    if (args[0] === "say") {
    
        message.channel.send(embed.setDescription(`
    Sunucumuzdaki toplam yetkili sayısı: **${staffs.size}**
    Sunucumuzdaki aktif yetkili sayısı: **${onlinestaff.size}**
    Sunucumuzdaki sesteki yetkili sayısı: **${voicestaff.size}**
    Sunucumuzdaki aktif olup seste olmayan yetkili sayısı: **${onlinevstaff.size}**
    `)).then(m => m.delete({ timeout: 10000 }))
}
    
    if (args[0] === "dm") {
    
    let jyros = message.guild.members.cache.filter(s => s.roles.cache.has(roles["cmd-botcommands"])).filter(s => !s.voice.channel).size
    for (var i = 0;i < jyros;i++) {
    let a = message.guild.members.cache.filter(s => s.roles.cache.has(roles["cmd-botcommands"])).filter(s => !s.voice.channel).map(a => a)[i]
    const userDM = await a.createDM(); try {
    await userDM.send(`Müsaitsen sunucumuzdaki ses kanallarından herhangi birisine geçer misin? Müsait değilsen AFK ya da Alone odalarına geçebilirsin. ${config.guildURL}`)
    
} catch { 
        await message.channel.send(`<@${a.user.id}> adlı kullanıcının dm kutusu kapalı. Müsait isen public odalara değil isen alone odalarına geçiş yapabilirsin.`)
    }
        }

//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${message.author} (\`${message.author.id}\`) adlı kullanıcı <#${message.channel.id}> adlı kanalda \`${config.PREFIX}yetkili dm\` komutu ile seste olmayan tüm yetkililere dm attı.`)

    }
    
        if (args[0] === "ses") {

    let ytks = message.guild.members.cache.filter(u => { return (u.roles.cache.some(r => roles["cmd-botcommands"].includes(r.id)) && !u.voice.channel && u.presence.status !== "offline")}).map(u => u.user);
    message.channel.send(`**Aktif olup seste olmayan yetkililer:** 
    ${ytks.join(" ")}
    `);

  //cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${message.author} (\`${message.author.id}\`) adlı kullanıcı <#${message.channel.id}> adlı kanalda \`${config.PREFIX}yetkili ses\` komutu ile seste olmayan tüm yetkilileri etiketledi.`)

}

        if (!args[0]) {

    message.channel.send(embed.setDescription(`
    Yetkili komutları:
    
    \`•\` **${prefix}yetkili say**
    Yetkililer hakkında detaylı bilgili verir.
    
    \`•\` **${prefix}yetkili dm**
    Aktif olup seste olmayan yetkililere dm atar.
    
    \`•\` **${prefix}yetkili ses**
    Aktif olup seste olmayan yetkilileri listeler.
    `)).then(m => m.delete({ timeout: 7000 }))
}

}};
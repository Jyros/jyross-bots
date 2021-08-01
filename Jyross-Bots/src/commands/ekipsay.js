const config = require("../base/config.json");
module.exports = {
conf: {
name: "ekipsay",
aliases: ["ekip-say"],
description: "Sunucunuzdaki ekiplerin istatistiklerini görüntüler.",
examples:`${config.PREFIX}ekipsay`,
category: "Yönetim",
help: "ekipsay",
enabled: true,
ownerOnly: true,
adminOnly: true,
cmdTest: false,
dmCmd: false,
cooldown: 20000,
permLevel: 4,
},
run: async (client, message, args, embed, prefix) => {

    let Ekip = "EKİP_ROL_1" 
    let Ekip2 = "EKİP_ROL_2"
    let Ekip3 = "EKİP_ROL_3"

    let EkipTotal = message.guild.roles.cache.get(Ekip).members.size; 
    let EkipOnline = message.guild.members.cache.filter(u => u.roles.cache.get(Ekip)).filter(u => u.presence.status !== "offline").size;
    let EkipVoice = message.guild.members.cache.filter(u => u.roles.cache.get(Ekip)).filter(s => s.voice.channel).size;
    
    let EkipTotal2 = message.guild.roles.cache.get(Ekip2).members.size; 
    let EkipOnline2 = message.guild.members.cache.filter(u => u.roles.cache.get(Ekip2)).filter(u => u.presence.status !== "offline").size;
    let EkipVoice2 = message.guild.members.cache.filter(u => u.roles.cache.get(Ekip2)).filter(s => s.voice.channel).size;
    
    let EkipTotal3 = message.guild.roles.cache.get(Ekip3).members.size; 
    let EkipOnline3 = message.guild.members.cache.filter(u => u.roles.cache.get(Ekip3)).filter(u => u.presence.status !== "offline").size;
    let EkipVoice3 = message.guild.members.cache.filter(u => u.roles.cache.get(Ekip3)).filter(s => s.voice.channel).size;
    

    message.channel.send(embed.setDescription(`
    <@&${Ekip}> **Bilgilendirme;**
    ⦁ Toplam üye sayısı; \`${EkipTotal}\`
    ⦁ Çevrimiçi üye sayısı; \`${EkipOnline}\`
    ⦁ Sesteki üye sayısı; \`${EkipVoice}\`
    
    <@&${Ekip2}> **Bilgilendirme;**
    ⦁ Toplam üye sayısı; \`${EkipTotal2}\`
    ⦁ Çevrimiçi üye sayısı; \`${EkipOnline2}\`
    ⦁ Sesteki üye sayısı; \`${EkipVoice2}\`
    
    <@&${Ekip3}> **Bilgilendirme;**
    ⦁ Toplam üye sayısı; \`${EkipTotal3}\`
    ⦁ Çevrimiçi üye sayısı; \`${EkipOnline3}\`
    ⦁ Sesteki üye sayısı; \`${EkipVoice3}\`
    
    `))
    
}};
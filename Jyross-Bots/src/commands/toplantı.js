const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const { ErrorCodes } = require("../operations/errorcodes")
module.exports = {
conf: {
name: "toplantı",
aliases: [""],
description: "Açıklama Belirtilmemiş.",
examples:`${config.PREFIX}toplantı `,
category: "Yönetim",
help: "toplantı",
enabled: true,
ownerOnly: true,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
},
run: async (client, message, args, embed, prefix) => {

if (!args[0]) {
    message.channel.send(embed.setDescription(`Hatalı Kullanım! \`${prefix}toplantı çağır <yönetim>\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`))
}

if (args[0] === "çağır") {

if (!args[1]) {

    let staffRole = message.guild.roles.cache.get(roles["cmd-botcommands"]);
    let staffs = message.guild.members.cache.filter(uye => !uye.user.bot && uye.roles.highest.position >= staffRole.position && uye.presence.status !== "offline" && !uye.voice.channel).array();
    if (staffs.length == 0) return message.inlineReply('Aktif olup, seste olmayan yetkili bulunmuyor.');
    let mesaj = await message.channel.send(`**${staffs.length}** yetkiliye sese gelme çağırısı yapılıyor.`);

    staffs.forEach((yetkili, index) => {
          setTimeout(() => {
            yetkili.send(message.guild.name+' Sunucusunda toplantı başladı. Yetkili olduğun halde toplantıda değilsin. Eğer toplantıya girmezsen yetki yükseltimin göz önünde bulundurulacaktır.').then(x => mesaj.edit(embed.setDescription(`${yetkili} yetkilisine özelden mesaj atıldı!`)))
            .catch(err => message.channel.send(`${yetkili}, Sunucusunda toplantı başladı. Yetkili olduğun halde toplantıda değilsin. Eğer toplantıya girmezsen yetki yükseltimin göz önünde bulundurulacaktır.`).then(x => mesaj.edit(embed.setDescription(`${yetkili} yetkilisine özelden mesaj atılamadığı için kanalda etiketlendi!`))));
          
        }, index*1000);
    });

} 

if (["yönetim","yonetim","adminOnly"].includes(args[1])) {

    let role = message.guild.roles.cache.get(roles.yönetim);
    let yöneticiler = message.guild.members.cache.filter(uye => !uye.user.bot && uye.roles.highest.position >= role.position && uye.presence.status !== "offline" && !uye.voice.channel).array();
    if (yöneticiler.length == 0) return message.inlineReply('Aktif olup, seste olmayan yönetim yetkilisi bulunmuyor.');
    let mesaj = await message.channel.send(`**${yöneticiler.length}** yönetim yetkilisine sese gelme çağırısı yapılıyor.`);

    yöneticiler.forEach((yetkili, index) => {
        setTimeout(() => {
          yetkili.send(message.guild.name+' Sunucusunda yönetim toplantısı başladı. Yetkili olduğun halde toplantıda değilsin. Eğer toplantıya girmezsen yetki yükseltimin göz önünde bulundurulacaktır.').then(x => mesaj.edit(embed.setDescription(`${yetkili} yetkilisine özelden mesaj atıldı!`)))
          .catch(err => message.channel.send(`${yetkili}, Sunucusunda toplantı başladı. Yetkili olduğun halde toplantıda değilsin. Eğer toplantıya girmezsen yetki yükseltimin göz önünde bulundurulacaktır.`).then(x => mesaj.edit(embed.setDescription(`${yetkili} yetkilisine özelden mesaj atılamadığı için kanalda etiketlendi!`))));
        
      }, index*1000);
  })

 } 

}

}};
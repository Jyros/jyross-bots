const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const { ErrorCodes } = require("../operations/errorcodes")
module.exports = {
conf: {
name: "rol",
aliases: ["role"],
description: "Açıklama Belirtilmemiş.",
examples:`${config.PREFIX}rol ver/al <@Jyross/ID> <EtiketRol/RolID>`,
category: "Yönetim",
help: "rol",
enabled: true,
ownerOnly: true,
adminOnly: true,
cmdTest: false,
dmCmd: false,
cooldown: 10000,
},
run: async (client, message, args, embed, prefix) => {

    let jyros = message.mentions.users.first() || message.guild.members.cache.get(args[1])
    let user = message.guild.member(jyros);
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(a => a.name == args.slice(2).join(' '));
    
    if(args[0] !== "ver" && args[0] !== "al") {
        message.channel.send(embed.setDescription(`${message.author}, Hatalı Kullanım! \`${prefix}rol ver/al <@Jyross/ID> <EtiketRol/RolID>\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`)).then(m => m.delete({ timeout: 7000 }))
        message.react(emojis.no)
        return;
    }

    if (!jyros) {
        message.channel.send(embed.setDescription(`${message.author}, Hatalı Kullanım! \`${prefix}rol ver/al <@Jyross/ID> <EtiketRol/RolID>\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`)).then(x => x.delete({timeout: 7000}));
        message.react(emojis.no)
        return;
    }
   
    if (!rol) {
        message.channel.send(embed.setDescription(`${message.author}, Hatalı Kullanım! \`${prefix}rol ver/al <@Jyross/ID> <EtiketRol/RolID>\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`)).then(x => x.delete({timeout: 7000}));
        message.react(emojis.no)
        return;
    }
    
    if (message.member.roles.highest.comparePositionTo(rol) < 1) {
        message.channel.send(`Vermek istediğiniz rol sizin rollerinizden üstün!`).then(x => x.delete({timeout: 7000}))
        message.react(emojis.no)
        return;
    }
        
    if(args[0] === "ver") {

        await (user.roles.add(rol.id).catch())
        message.channel.send(embed.setDescription(`${emojis.yes} ${jyros} (\`${jyros.id}\`) isimli üyeye \`${rol.name}\` adlı rolü başarıyla verdin.`)).then(x => x.delete({timeout: 7000}));
        message.guild.channels.cache.get(cnls["cmd-role"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı yetkili ${rol} adlı rolü ${jyros} (\`${jyros.id}\`) kişisine verdi.`))
        message.react(emojis.yes)
        //cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${jyros} (\`${jyros.id}\`) adlı kullanıcıya ${message.author} (\`${message.author.id}\`) adlı kullanıcı tarafından \`${rol.name}\` adlı rol <#${message.channel.id}> adlı kanalda \`${config.PREFIX}rol ver\` komutu ile verildi.`)

    }
       
        if(args[0] === "al") {
        await (user.roles.remove(rol.id).catch())
        message.channel.send(embed.setDescription(`${emojis.yes} ${jyros} (\`${jyros.id}\`) isimli üyeden \`${rol.name}\` adlı rolü başarıyla aldın.`)).then(x => x.delete({timeout: 7000}));
        message.guild.channels.cache.get(cnls["cmd-role"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı üye ${rol} adlı rolü ${jyros} (\`${jyros.id}\`) kişisinden rolü geri aldı.`))
        message.react(emojis.yes)
    //cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${jyros} (\`${jyros.id}\`) adlı kullanıcıda bulunan \`${rol.name}\` adlı rolü ${message.author} (\`${message.author.id}\`) adlı kullanıcı tarafından <#${message.channel.id}> adlı kanalda \`${config.PREFIX}rol al\` komutu ile alındı.`)

    }



}};
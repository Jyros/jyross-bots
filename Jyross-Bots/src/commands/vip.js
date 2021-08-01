const config = require("../base/config.json");
const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
module.exports = {
conf: {
name: "vip",
aliases: ["özel","özelüye"],
description: "Açıklama Belirtilmemiş.",
examples:`${config.PREFIX}vip <@Jyross/ID>`,
category: "Yönetim",
help: "vip",
enabled: true,
ownerOnly: false,
adminOnly: true,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
},
run: async (client, message, args, embed, prefix) => {

    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!jyros) { 
        message.channel.send(embed.setDescription(`${emojis.no} Geçerli bir üye belirtmelisiniz.`).setColor(`${config.embed.color.red}`)).then(x => x.delete({timeout: 7000})); 
        message.react(emojis.no)
        return;
    };
    
    if(!jyros.roles.cache.has(roles["u-vip"])) {
        jyros.roles.add(roles["u-vip"])
        message.channel.send(embed.setDescription(`${jyros} kişisine <@&${roles["u-vip"]}> rolü verildi.`)).then(x => x.delete({timeout: 7000})); 
        message.react(emojis.yes)
        client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-role"]).send(`${jyros} (\`${jyros.id}\`) kullanıcısına \`${message.guild.roles.cache.get(roles["u-vip"]).name}\` rolü eklendi.`) 
    } else {
        jyros.roles.remove(roles["u-vip"])
        message.channel.send(embed.setDescription(`${jyros} kişisinden <@&${roles["u-vip"]}> rolü alındı.`)).then(x => x.delete({timeout: 7000})); 
        message.react(emojis.yes)
        client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-role"]).send(`${jyros} (\`${jyros.id}\`) kullanıcısından \`${message.guild.roles.cache.get(roles["u-vip"]).name}\` rolü alındı.`) 
    }
    
}};
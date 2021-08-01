const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
module.exports = {
conf: {
name: "etiket-tara",
aliases: ["etikettara"],
description: "Belirtilen etikete sahip üyelere belirtilen rolden verir.",
examples:`${config.PREFIX}etiket-tara <Etiket> <Rol>`,
category: "Kurucu",
help: "etiket-tara",
enabled: true,
ownerOnly: true,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
},
run: async (client, message, args, embed, prefix) => {

    let tag = args[0];
    let etiket = args[1]; 
    let rol = message.guild.roles.cache.get(args[2]);

    message.guild.members.cache.filter(s => s.user.discriminator === etiket || s.user.username.includes(tag) && !s.roles.cache.has(rol)).forEach(m => m.roles.add(rol))
    
    message.channel.send(embed.setDescription(`Kullanıcı adında \`${tag}\` ve etiketinde \`#${etiket}\` bulunduran kullanıcılara \`${rol.name}\` adlı rol veriliyor.`))

//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`Kullanıcı adında \`${tag}\` ve "${etiket}" etiketine sahip üyelere **${rol.name}** rolü verildi.`)

}};
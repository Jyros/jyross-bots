const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
module.exports = {
conf: {
name: "cihaz",
aliases: [""],
description: "Belirttiğiniz kullanıcının discorda hangi cihazdan girdiğini görürsünüz.",
examples:`${config.PREFIX}cihaz <Jyross/ID>`,
category: "Genel",
help: "cihaz",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 15000,
},
run: async (client, message, args, embed, prefix) => {

    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    const jyross = message.guild.member(user) || message.guild.members.cache.get(args[0])
    
    if(jyross.presence.status === "offline") { 
        message.channel.send(embed.setDescription(`\`${jyross.user.tag}\` kullanıcısı çevrimdışı olduğundan dolayı cihaz bilgisini tespit edemiyorum.`))
        message.react(emojis.no)
        return
    }

    let p = Object.keys(jyross.presence.clientStatus).join(',') 
    let cihazisim = p
    .replace(`mobile`,`Mobil Telefon`)
    .replace(`desktop`,`Bilgisayar (Uygulama)`)
    .replace(`web`,`İnternet Tarayıcısı`)
    
    message.channel.send(`${jyross.user.tag.replace("`","")} adlı kullanıcının şuan da kullandığı cihaz: \`${cihazisim}\``);

}};
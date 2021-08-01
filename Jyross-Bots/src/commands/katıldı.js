const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
module.exports = {
conf: {
name: "katıldı",
aliases: [""],
description: "Toplantıda olanlara katıldı rolü verir veya alır.",
examples:`${config.PREFIX}katıldı <ver/al>`,
category: "Kurucu",
help: "katıldı",
enabled: true,
ownerOnly: true,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
},
run: async (client, message, args, embed, prefix) => {

    if(!args[0]) return message.channel.send(`Bir argüman belirtmelisin \`ver/al\``);
    
    if(args[0] === "ver"){
        
        let members =  message.guild.members.cache.filter(member => member.roles.cache.has(roles["cmd-botcommands"]) && member.voice.channelID === cnls["v-meeting"]);
        
        members.array().forEach(jyros => {
        setTimeout(async() => {
    await jyros.roles.add(roles["u-katıldı"]);
    },3000)
    })

};
    
    if(args[0] === "al"){
        let members =  message.guild.members.cache.filter(member => member.roles.cache.has(roles["cmd-botcommands"]));
        members.array().forEach(jyros => {
        setTimeout(async() => {
    await jyros.roles.remove(roles["u-katıldı"]);
    },3000)
    })
    
}

}};
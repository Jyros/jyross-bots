const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
module.exports = {
conf: {
name: "avatar",
aliases: ["pp"],
description: "Belirtilen kullanıcının veya kendinizin profil resmini gösterir.",
examples:`${config.PREFIX}avatar <@Jyross>`,
category: "Genel",
help: "avatar",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
},
run: async (client, message, args, embed, prefix) => {

    let jyros = args.length > 0 ? message.mentions.users.first() || await this.client.users.fetch(args[0]) || message.author : message.author
    
    message.channel.send(`${jyros.displayAvatarURL({ dynamic: true, size: 4096 })}`)

}};
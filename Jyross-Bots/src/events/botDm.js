/*
const { MessageEmbed } = require("discord.js");
module.exports = (message) => {

    let embed = new MessageEmbed()
    if(message.channel.type === "dm") {
    
        if(message.author.id === client.user.id) return;
        client.channels.cache.get("BOTDMLOGID").send(embed.setTitle(`${client.user.username}`)
    .setTimestamp()
    .setColor("RED")
    .setThumbnail(`${message.author.avatarURL()}`)
    .addField("Gönderen", message.author.tag)
    .addField("Gönderen ID", message.author.id)
    .addField("Gönderilen Mesaj", message.content))
    
  };

};

module.exports.conf = {
name: "message",
c_name:"botDmLog",
};

*/
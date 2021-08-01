const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const db = require("quick.db")
module.exports = (message) => {

    let jyros = message.mentions.users.first();
    if (!message.guild || message.author.bot || message.content.startsWith(`${config.PREFIX}`)) return;
    
    if (message.mentions.users.size >= 1) {
    
    if (db.get(`${jyros.id}_afkReason`)) {
    message.channel.send(embed.setDescription(`${jyros} adlı üye **${db.get(`${jyros.id}_afkReason`)}** sebebi ile AFK!`)).then(x => x.delete({ timeout: 3000 }))
    }
      } else {
    
    const nick = db.fetch(`afkNick_${message.author.id}_${config.guildID}`)
    
    if(db.get(`${message.author.id}_afkReason`)) {
    db.delete(`${message.author.id}_afkReason`)
    db.delete(`afkNick_${message.author.id}_${config.guildID}`)
    
    message.member.setNickname(nick)
    message.channel.send("Hoşgeldin artık AFK değilsin").then(x => x.delete({ timeout: 5000 }))
       }
    }

};

module.exports.conf = {
name: "message",
c_name:"afk",
};
const data = require("quick.db");
const config = require("../base/config.json");
module.exports = (message) => {
    if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
    
    data.set(`snipe.mesaj.icerik.${config.guildID}`, message.content)
    data.set(`snipe.kisi.${config.guildID}`, message.author.id)
    data.set(`snipe.mesaj.yazilmatarih.${config.guildID}`, message.createdTimestamp)
    data.set(`snipe.mesaj.silinmetarih.${config.guildID}`, Date.now())
    
};

module.exports.conf = {
name: "messageDelete",
c_name:"snipe",
};
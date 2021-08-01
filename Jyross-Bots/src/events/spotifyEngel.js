const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db")
module.exports = (jyros) => {

    let embed = new MessageEmbed().setFooter(`${config.embed.footer}`)
    let spoEngel =  db.fetch(`spotify.engel.${config.guildID}`);

    if (!jyros.activity) return;
    if(jyros.webhookID || jyros.author.bot || jyros.channel.type === "dm") return;
    if(jyros.channel.id == cnls["cmd-spotify"]) return;
    if (!spoEngel) return;
        
    if (spoEngel) {

    if (jyros.activity.partyID.startsWith("spotify:")) {
        jyros.delete();
        jyros.channel.send(embed.setDescription(`${emojis.no} Spotify parti daveti paylaşmak yasak.`)).then(x => x.delete({ timeout: 10000 }))
    }

}

};

module.exports.conf = {
name: "message",
c_name:"spotifyEngel",
};
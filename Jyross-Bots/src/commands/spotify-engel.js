const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const jyrosData = require("../operations/jyrosData");
const db = require("quick.db");
const kdb = new db.table("kullanıcı")
const moment = require("moment");
moment.locale("tr");
module.exports = {
conf: {
name: "spotify-engel",
aliases: ["spotifyengel","spotify","spotyengel","spoengel","spo-engel"],
description: "Açıklama Belirtilmemiş.",
examples:`${config.PREFIX} `,
category: "Kurucu",
help: "spotify-engel",
enabled: true,
ownerOnly: true,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 10000,
},
run: async (client, message, args, embed, prefix) => {

let spoEngel = await db.fetch(`spotify.engel.${config.guildID}`)

if (!spoEngel) {

    db.set(`spotify.engel.${config.guildID}`, true);
    message.channel.send(embed.setDescription(`Spotify engel başarıyla aktif edildi!`));
    message.react(emojis.yes)
    return;
    
} else if (spoEngel) {
    db.delete(`spotify.engel.${config.guildID}`);
    message.channel.send(embed.setDescription(`Spotify engel başarıyla devre dışı bırakıldı!`));
    message.react(emojis.no)
    return;
    
}

}};
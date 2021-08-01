const { MessageEmbed } = require("discord.js");
const db = require('quick.db')
const kdb = new db.table("kullanıcı");
const roles = require("../base/roles.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json")
module.exports = (jyros) => {

let embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setColor(`${config.embed.color.white}`).setTimestamp()
let puan = kdb.fetch(`cezapuan.${jyros.id}`) || "0"

    if (db.fetch(`chatmuted.${jyros.id}`)) {

        kdb.add(`cezapuan.${jyros.id}`, 5)
        jyros.roles.add(roles["u-muted"])
        message.guild.channels.cache.get(cnls["cmd-chatmute"]).send(embed
            .setTitle(`Bir Cezalı Çıkıp Girdiği İçin Tekrar Cezalandırıldı!`)
            .setDescription(`
        Cezalı: ${jyros} (\`${jyros.id}\`)
        Cezalıyken sunucudan çıkıp girdiği için ceza puanı \`${puan}\` oldu.
        `))
        message.guild.channels.cache.get(cnls["cmd-cezapuan"]).send(`${jyros}, cezalıyken sunucudan çıkıp girdiğiniz için \`${puan}\` ceza puanına ulaştınız.`)
        }

}
module.exports.conf = {
name: "guildMemberAdd",
c_name:"chatMuteControl",
};
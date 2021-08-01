const config = require("../base/config.json");
const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const moment = require("moment");
moment.locale("tr")
module.exports = (jyros) => {

let fake = Date.now()-jyros.user.createdTimestamp < 1000*60*60*24*7;

if(!fake) {

    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-registry"]).send(`
:tada: :tada: Sunucumuza hoş geldin ${jyros}! Seninle beraber **${jyros.guild.memberCount}** kişiye ulaştık!
    
Hesabınız \`${moment(jyros.user.createdAt).format('DD/MM/YYYY')} (${moment(jyros.user.createdAt).fromNow()})\` tarihinde oluşturulmuş. ${fake ? `${emojis.no}` : `${emojis.yes}`}
    
Sunucu kurallarımız <#${cnls["cmd-rules"]}> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.
    
<#${cnls["cmd-bilgilendirme"]}> kanalına göz atmayı unutmayınız. <@&${roles["cmd-botcommands"]}> sizinle ilgilenecektir.
    
Tagımızı (\`${config.tag}\`) alarak bizlere destek olabilirsin! Kayıt olmak için teyit odalarına girip ses teyit vermen gerekiyor yetkililerimiz seninle ilgilenecektir! İyi eğlenceler. :tada: :tada:`);
        
} else {

    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-registry"]).send(`${jyros} (\`${jyros.id}\`) üyesi sunucumuza katıldı fakat hesabı yeni olduğu için cezalandırıldı!`)
        
}

};

module.exports.conf = {
name: "guildMemberAdd",
c_name:"welcomeMessage",
};
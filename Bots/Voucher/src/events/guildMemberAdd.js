const config = require("../settings/config.json");
const settings = require("../settings/settings.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("tr");
module.exports = (jyros) => {
let fake = Date.now()-jyros.user.createdTimestamp < 1000*60*60*24*7;
if (jyros.user.username.includes(settings.tag.tag)) {
jyros.setNickname(`${settings.tag.tag} İsim | Yaş`);
jyros.roles.add(settings.roles.taggesrole);
client.channels.cache.get(settings.channels.logs.taglog).send(`${jyros} (\`${jyros.id}\`) adlı kullanıcı sunucumuza taglı şekilde katıldı, isminde **${settings.tag.tag}** sembolü bulunuyor.`)
} else if (!jyros.user.username.includes(settings.tag.tag)) {
jyros.setNickname(`${settings.tag.untag} İsim | Yaş`)};
jyros.roles.add(settings.roles.unregistered);
client.guilds.cache.get(config.guildID).channels.cache.get(settings.channels.registryChat).send(`
:tada: :tada: Sunucumuza hoş geldin ${jyros}! Seninle beraber **${jyros.guild.memberCount}** kişiye ulaştık!

Hesabınız \`${moment(jyros.user.createdAt).format('DD/MM/YYYY')} (${moment(jyros.user.createdAt).fromNow()})\` tarihinde oluşturulmuş. ${fake ? `${settings.emojis.no}` : `${settings.emojis.yes}`}

Sunucu kurallarımız <#${settings.channels.rulesChannel}> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.

<#${settings.channels.bilgilendirmeKanalı}> kanalına göz atmayı unutmayınız. <@&${settings.roles.staff.register}> sizinle ilgilenecektir.

Tagımızı (\`${settings.tag.tag}\`) alarak bizlere destek olabilirsin! Kayıt olmak için teyit odalarına girip ses teyit vermen gerekiyor yetkililerimiz seninle ilgilenecektir! İyi eğlenceler. :tada: :tada:`);
if (fake) {
jyros.roles.set([settings.roles.şüpheli])
client.channels.cache.get(settings.channels.logs.şüpheliLog).send(`${jyros} (\`${jyros.id}\`) adlı kullanıcının hesabı 1 haftadan önce açıldığı için Fake Hesap kategorisine atıldı.`)
client.channels.cache.get(settings.channels.registryChat).send(`${jyros} (\`${jyros.id}\`) üyesi sunucumuza katıldı fakat hesabı yeni olduğu için cezalandırıldı!`)
client.channels.cache.get(settings.channels.şüpheliChat).send(`
<@${jyros.id}> sunucumuza hoşgeldin.
Hesabın 1 haftadan önce açıldığı için cezalıya düştün.
Eğer kayıt olmak istiyorsan yetkililer ile iletişime geçebilirsin.
Hesabın açılma tarihi: \`${moment(jyros.user.createdAt).format("LLL")}\``)};

// Yasaklı Tag Kısmı | Kullanmıyorsan sil.
if(jyros.user.username.includes(settings.tag.bannedtag1) 
// Eğer 2. yasaklı tagınız yoksa // sembolü arasındaki kodu silin.
&& (jyros.user.username.includes(settings.tag.bannedtag2))
//
){
jyros.roles.set([settings.roles.yasaklıTag]);
jyros.roles.remove(settings.roles.unregistered);
client.channels.cache.get(settings.channels.logs.yasaklıTagLog).send(`${jyros} (\`${jyros.id}\`) sunucumuzun yasaklı taglarından birisinde bulunduğu için yasaklı tag rolü verildi.`)
client.channels.cache.get(settings.channels.yasaklıTagChat).send(`${jyros} (\`${jyros.id}\`) sunucumuza hoş geldin. Fakat kullanıcı adın sunucumuzun yasaklı taglarından birini içerdiği için cezalıya atıldın!`)
}
};
module.exports.conf = {
name: "guildMemberAdd",
};
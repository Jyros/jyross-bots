const config = require("../base/config.json");
const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
module.exports = (jyros) => {

    let fake = Date.now()-jyros.user.createdTimestamp < 1000*60*60*24*7;
   
    if (jyros.user.username.includes(config.tag)) {
   
        jyros.setNickname(`${config.tag} İsim | Yaş`);
    jyros.roles.add(roles["u-taglı"]);
    client.channels.cache.get(cnls["cmd-tag"]).send(`${jyros} (\`${jyros.id}\`) adlı kullanıcı sunucumuza taglı şekilde katıldı, isminde **${config.tag}** sembolü bulunuyor.`)
   
} else if (!jyros.user.username.includes(config.tag)) {

    jyros.setNickname(`${config.untag} İsim | Yaş`)
};
    jyros.roles.add(roles["u-unreg"]);

    if (fake) {

        jyros.roles.set([roles["u-şüpheli"]])
        
        client.channels.cache.get(cnls["cmd-şüpheli"]).send(`${jyros} (\`${jyros.id}\`) adlı kullanıcının hesabı 1 haftadan önce açıldığı için Fake Hesap kategorisine atıldı.`)

        client.channels.cache.get(cnls["cmd-şüphelichat"]).send(`
<@${jyros.id}> sunucumuza hoşgeldin.
Hesabın 1 haftadan önce açıldığı için cezalıya düştün.
Eğer kayıt olmak istiyorsan yetkililer ile iletişime geçebilirsin.
Hesabın açılma tarihi: \`${moment(jyros.user.createdAt).format("LLL")}\`
`)
    };
    
};

module.exports.conf = {
name: "guildMemberAdd",
c_name:"newMemberControl",
};
const config = require("../base/config.json");
const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
module.exports = (oldUser, newUser) => {

    let user = client.guilds.cache.get(config.guildID).members.cache.get(oldUser.id);
    if(!user) return;

    if(newUser.username.includes(config.tag) && !user.roles.cache.has(roles["u-taglı"])) {

      if ((roles["u-unreg"] && roles["u-unreg"].some(rol => user.roles.cache.has(rol))) || (roles["u-jail"] && user.roles.cache.has(roles["u-jail"]))) return;
      
      if(user.manageable && config.untag) {
          user.setNickname(user.displayName.replace(config.untag, config.tag)).catch();
        }

      if(roles["u-taglı"]) {
          user.roles.add(roles["u-taglı"]).catch();
        }
        client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-tag"]).send(`${user} kişisi ismine \`${config.tag}\` sembolünü alarak ekibimize katıldı!`).catch();
        client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-chat"]).send(`${user} ${config.tag} tagımızı alarak ailemize katıldı. Hoşgeldin dostum!`).then(x=> x.delete({timeout: 60000})).catch();
    
    } else if (!newUser.username.includes(config.tag) && user.roles.cache.has(roles["u-taglı"])) {

      if(user.manageable && config.untag) { 
          user.setNickname(user.displayName.replace(config.tag, config.untag)).catch();
}
      if(roles["u-taglı"]) {
        let ekipRol = client.guilds.cache.get(config.guildID).roles.cache.get(roles["u-taglı"]);
        user.roles.remove(user.roles.cache.filter(rol => ekipRol.position <= rol.position)).catch();
      }

     client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-untag"]).send(`${user} kişisi isminden \`${config.tag}\` sembolünü çıkararak ekibimizden ayrıldı!`).catch();
     
     if(config.taglıalım) {
      
        if(user.voice.channel) {
          user.voice.kick()
      }

      user.setNickname(`${config.untag} İsim | Yaş`)
      user.roles.set(roles["u-unreg"]) 
}
    }

};

module.exports.conf = {
name: "userUpdate",
c_name:"tagLog",
};
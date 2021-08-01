const config = require("../base/config.json");
const roles = require("../base/roles.json");
module.exports = () => {

setInterval(() => {
    client.guilds.cache.get(config.guildID).members.cache.forEach(async jyros => {
if (!jyros.user.username.includes(config.tag)) {
    jyros.setNickname(jyros.displayName.replace(config.tag, config.untag));
           await jyros.roles.remove(roles["u-taglı"]).catch(() => {})
       }
   })
}, 60 * 1000)

client.guilds.cache.get(config.guildID).members.cache.filter(uye => uye.user.username.includes(config.tag) && !uye.roles.cache.has(roles["u-booster"]) && (!uye.roles.cache.has(roles["u-taglı"]) || !uye.displayName.startsWith(config.tag))).array().forEach((uye, index) => {
 setTimeout(() => {
   uye.setNickname(uye.displayName.replace(config.untag, config.tag));
   if (roles["u-taglı"]) uye.roles.add(roles["u-taglı"]);
 }, index*30000);

});

setInterval(() => {
    client.guilds.cache.get(config.guildID).members.cache.forEach(async jyros => {
        let jyrosrol = client.guilds.cache.get(config.guildID).members.cache.filter(m => m.roles.cache.filter(r => r.id !== config.guildID).size == 0)
    if(!jyrosrol) return;
if (jyrosrol) {
    jyrosrol.forEach(r => {
        r.roles.add(roles["u-unreg"])
        })
    } 
})
}, 60 * 1000)

/*
setInterval(() => {
    client.guilds.cache.get(config.guildID).members.cache.forEach(async jyros => {
 if (jyros.user.username.includes("YASAKLI_TAG")) {
            await jyros.roles.set([roles["u-yasaklıtag"]]).catch(() => {})

       }
    })
}, 60 * 1000)
*/

}

module.exports.conf = {
    name: "ready",
    c_name:"memberControl",
};
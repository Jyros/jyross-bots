const config = require("../base/config.json");
const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
module.exports = (message) => {

    const kufurler = ["oç","aq", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq",];
    const reklam = [".com", ".tk", ".xyz", ".pw", ".io", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz",".rf.gd", ".az", ".party", "discord.gg",];

    let kelimeler = message.content.split(' ');
    kelimeler.forEach(kelime=> {
     if(kufurler.some(küfür => küfür === kelime))  {
      try {   
        if (!message.member.hasPermission("ADMINISTRATOR")) {
              message.delete();    
                  return message.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(j => j.delete({ timeout: 5000 }));
      }              
      } catch(err) {
        console.log(err);
      }
    }
})

if (reklam.some(word => message.content.includes(word))) {
  try {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
          message.delete();
            return message.reply('Reklam yapman yasak lütfen reklam yapmamaya dikkat et!').then(x => x.delete({timeout: 5000}));

    }              
  } catch(err) {
    console.log(err);
  }
}

};

module.exports.conf = {
name: "message",
c_name:"messageControl",
};
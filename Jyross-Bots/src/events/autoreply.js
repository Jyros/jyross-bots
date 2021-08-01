const db = require('quick.db')
const kdb = new db.table("kullanıcı");
const { tag } = require("../base/config.json")
module.exports = (message) => {

    let cezapuan = kdb.fetch(`cezapuan.${message.author.id}`) || "0"
    if([".cezapuan","cezapuan","ceza-puan"].includes(message.content.toLowerCase())) { 
return message.channel.send(`${message.author}, toplam ceza puanınız: **${cezapuan}**`).then(x => x.delete({ timeout: 12000 }))
    }

    if(["sa", "selam", "selamın aleyküm", "selamın aleykum", "sea", "sA", "selamın aleykm", "selamün aleyküm", "selamun aleykum"].includes(message.content.toLowerCase())) { 
return message.channel.send(`${message.author}, Aleyküm selam hoş geldin.`).then(x => x.delete({ timeout: 10000 }))
    }

    if(["ping",".ping"].includes(message.content.toLowerCase())) { 
        return message.channel.send(`${client.ws.ping}`).then(x => x.delete({ timeout: 12000 }))
            }

            if(["tag",".tag","Tag","!tag"].includes(message.content.toLowerCase())) { 
                return message.channel.send(`${tag}`).then(x => x.delete({ timeout: 12000 }))
                    }
};

module.exports.conf = {
name: "message",
c_name:"autoreply",
};
const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const jyrosData = require("../operations/jyrosData");
const { ErrorCodes } = require("../operations/errorcodes")
const db = require("quick.db");
const kdb = new db.table("kullanıcı")
const moment = require("moment");
moment.locale("tr");
module.exports = {
conf: {
name: "ceza",
aliases: [""],
description: "Belirtilen ceza numarasının ceza bilgilerini ve kime ait olduğunu gösterir.",
examples:`${config.PREFIX}ceza bilgi #<cezano> `,
category: "Genel",
help: "ceza",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
staffLevel: 8,
},
run: async (client, message, args, embed, prefix) => {

    let sorgu = args[0];
    let ceza = jyrosData.cezaBilgi(args[1])

    if(sorgu == "bilgi" || sorgu == "info") {

   if(!args[1]) return message.channel.send(embed.setDescription(`${message.author}, geçerli bir ceza numarası giriniz.`).setFooter(`Hata kodu: ${ErrorCodes.KelimeHata.code}`))

   if(Number(args[1]) && args[1].length < 15) {

    if(!ceza) {
        message.channel.send(`Sisteme kayıtlı ceza verilerinde **#${args[1]}** numaralı ceza bulunamadı.`)
        message.react(emojis.no)
        return;
    }

    let jyros = client.users.cache.get(ceza.Cezalı);
    let staff = client.users.cache.get(ceza.Yetkili); 
    let time = `${moment(ceza.Zaman).format("LLL")}` || "Belirtilmemiş."
    let cezaSüresi = ceza.Süre || "Belirtilmemiş."
    let cezaTipi = ceza.Tip || "Belirtilmemiş."
    let cezaSebep = ceza.Sebep || "Belirtilmemiş."

    let cezalıBilgi;
    if(jyros != `\`Bulunamayan Üye\`` && jyros.username) cezalıBilgi = `${jyros} (\`${jyros.id}\`)`;
    if(!cezalıBilgi) cezalıBilgi = "<@"+ceza.Cezalı+">" + `(\`${ceza.Cezalı}\`)`
    let yetkiliBilgi;
    if(staff != `\`Bulunamayan Üye\`` && staff.username) yetkiliBilgi = `${staff} (\`${staff.id}\`)`;
    if(!yetkiliBilgi) yetkiliBilgi = "Bilinmiyor"
    

   message.channel.send(embed.setDescription(`
Ceza Tipi: **${cezaTipi}**

Cezalı Bilgisi: 
${cezalıBilgi}

Yetkili Bilgisi: 
${yetkiliBilgi}

Ceza Tarihi: \`${time}\`
Ceza Süresi: ${cezaSüresi}
Ceza Sebebi: ${cezaSebep}
`)).then(x => x.delete({ timeout: 15000 }));

}

return;

}

}};
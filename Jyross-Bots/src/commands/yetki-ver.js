const config = require("../base/config.json");
const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const { ErrorCodes } = require("../operations/errorcodes")
module.exports = {
conf: {
name: "yetkiver",
aliases: ["yetkibaslat","yetkibaşlat","yetkiver"],
description: "Belirtilen kullanıcıyı ilk yetkili kademesinden başlatır.",
examples:`${config.PREFIX}yetkiver <Jyross/ID>`,
category: "Yönetim",
help: "yetkiver",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
staffLevel: 0,
permLevel: 0,
},
run: async (client, message, args, embed, prefix) => {

    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    
    if (!jyros) {
        message.channel.send(embed.setDescription(`${emojis.no} Hatalı Kullanım! \`${module.exports.conf.examples}\``).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`)).then(j => j.delete({ timeout: 10000 }));
        message.react(emojis.no);
        return;
    }

    if(!jyros.user.username.includes(config.tag)) {
        message.channel.send(embed.setDescription(`${emojis.no} Belirttiğiniz kullanıcı sunucu tagına sahip olmadığı için yetki verme işlemi uyguluyamazsın.`)).then(j => j.delete({ timeout: 10000 }));
        message.react(emojis.no);
        return;
    }

    let map = new Map([


        ["-rookies", ["810097100381224989", "810097100305072153", "810097100305072154"]],
        ["-dark", ["810097100397608961", "810097100305072153", "810097100305072156", "810097100305072154"]],
        ["-gladyo", ["810097100397608962", "810097100305072153", "810097100305072156", "810097100305072154"]],
        ["-master", ["810097100397608963", "810097100305072153", "810097100305072156", "810097100305072157", "810097100305072154"]]
    
    
    ])

    let metin = ""
    let arr = []
        
    for (let [k, v] of map) {
            if (args[0] == k) return
            v.map(x => {
                arr.push(x)
            })
        }
        
    for (let [k, v] of map) {
            metin = metin + `\`${k}\` - ${v.filter(x => x !== roles["cmd-botcommands"]).map(x => `<@&${x}>`)}\n`
        }

        let values = args[1]
        const embed2 = embed
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setColor("RANDOM")
            .setDescription(`Belirttiğiniz rol geçerli değil lütfen aşağıdaki verilere göre komutu uygulayınız.
            
            ${metin}
            
            Örnek kullanım: \`${config.PREFIX}${module.exports.conf.name} <@Jyross/ID> -master\``)
        if (!values) return message.channel.send(embed2)
        if (!map.has(values.toLowerCase())) return message.channel.send(embed2)
        const roller = map.get(values)
        await jyros.roles.add(roller)
        let arrx = arr.filter(function (item, pos) {
            return arr.indexOf(item) == pos;
        })
        arrx.map(async (x) => {
            if (jyros.roles.cache.has(x)) {
                if (roller.includes(x)) return
                await jyros.roles.remove(x)
            }
        })
        embed2.setDescription(`${jyros} kullanıcısına <@&${roller[0]}> yetkisi verildi.`)
        message.channel.send(embed2)

}};
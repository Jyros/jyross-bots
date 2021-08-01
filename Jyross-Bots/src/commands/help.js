const config = require("../base/config.json");
module.exports = {
conf: {
name: "yardım",
aliases: ["help"],
description: "Botun komutlarının kullanım şekillerini, kategorilerini vb. öğrenirsiniz.",
examples: `${config.PREFIX}yardım <Komut-İsmi>`,
category: "Genel",
help: "yardım",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 30000,
permLevel: 1,
},
run: async (client, message, args, embed, prefix) => {

let command =  args[0] || args.splice(0).join(" ") 
    if (client.commands.has(command)) {
  
        command = client.commands.get(command)

message.channel.send(embed.setDescription(`
**Komut Adı:**
${command.conf.name}
**Açıklaması:**
${command.conf.description}
**Kullanımı:**
${command.conf.examples}
**Alternatifler:**
${command.conf.aliases[0] ? command.conf.aliases.join(', ') : 'Alternatif Belirtilmemiş.'}`))

}

if (!args[0]) {
    message.channel.send(embed.setTitle(`Tüm Komutlar`)
.setDescription(client.commands.filter((x) => x.conf.help)
    .sort((a, b) => b.conf.help - a.conf.help)
    .map((x) => `${x.conf.category} | **${prefix}${x.conf.help}** | ${x.conf.description} | ${x.conf.examples}`)
    .join("\n\n")
    ))
};

}};
const emojis = require("../base/emojis.json");
const config = require("../base/config.json");
const { ErrorCodes } = require("../operations/errorcodes")
const cnls = require("../base/channels.json");
module.exports = {
conf: {
name: "çek",
aliases: ["cek","gel","getir"],
description: "Belirtilen üyeyi bulunduğunuz ses kanalına çekersiniz.",
examples:`${config.PREFIX}çek <@Jyross/ID> `,
category: "Genel",
help: "çek",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 5000,
},
run: async (client, message, args, embed, prefix) => {

    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
   
    if (!jyros) {
        message.channel.send(embed.setDescription(`${emojis.no} Ses odana çekilecek üyeyi belirtmelisin!`).setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`)).then(x => x.delete({timeout: 7000}));
        message.react(emojis.no);
        return;
    }

    if (!message.member.voice.channel || !jyros.voice.channel || message.member.voice.channelID == jyros.voice.channelID) { 
        message.channel.send(embed.setDescription(`${emojis.no} Belirtilen üyenin ve kendinin ses kanalında olduğundan emin ol!`)).then(x => x.delete({timeout: 7000}));
        message.react(emojis.no);
        return;
    }

    if(jyros.id === client.user.id) { 
        message.channel.send(embed.setDescription(`${emojis.no} ${message.author}, Bir botu ses kanalına çekemezsin.`)).then(x => x.delete({ timeout: 7000 }));
        message.react(emojis.no);
        return;
    }

    const reactionFilter = (reaction, user) => {
    
        return ['✅'].includes(reaction.emoji.name) && user.id === jyros.id };
    message.channel.send(`${jyros}`, {embed: embed.setDescription(`${message.author} seni kendi ses odasına çekmek için izin istiyor, eğerki onaylamıyorsan bişey yapmana gerek yok.`)}).then(async msj => {
    await msj.react('✅');
    msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
    let cevap = c.first();
    if (cevap) {
    jyros.voice.setChannel(message.member.voice.channelID);
    msj.delete();
    return message.channel.send("İşlem onaylandı.").then(x => x.delete({ timeout: 7000 }));
    }
})
  });

//cmd-genel >>>
 client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcının bulunduğu kanala \`${prefix}çek\` komutu ile çekildi.`)

}};
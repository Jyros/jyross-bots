const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
const { ErrorCodes } = require("../operations/errorcodes")
module.exports = {
conf: {
name: "git",
aliases: ["götür"],
description: "Belirlenen kullanıcının bulunduğu ses kanalına davet yollarsınız.",
examples:`${config.PREFIX}git <@Jyross/ID>`,
category: "Genel",
help: "git",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 3000,
},
run: async (client, message, args, embed, prefix) => {

    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    
    if (!jyros) { 
        message.channel.send(embed.setColor(`${config.embed.color.red}`).setDescription("Ses odasına gidilecek üyeyi belirtmelisin!").setFooter(`Hata Kodu: ${ErrorCodes.KelimeHata.code}`)).then(x => x.delete({timeout: 7000}));
        message.react(emojis.no);
        return;
    }

    if (!message.member.voice.channel || !jyros.voice.channel || message.member.voice.channelID == jyros.voice.channelID) { 
        message.channel.send(embed.setColor(`${config.embed.color.red}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription("Belirtilen üyenin ve kendinin ses kanalında olduğundan emin ol!")).then(x => x.delete({timeout: 7000}));
        message.react(emojis.no);
        return;
    }

    const reactionFilter = (reaction, jyros) => {
    
        return ['✅'].includes(reaction.emoji.name) && jyros.id === jyros.id;
    };
    message.channel.send(`${jyros}`, {embed: embed.setColor(`${config.embed.color.white}`).setAuthor(jyros.displayName, jyros.user.avatarURL({dynamic: true, size: 2048})).setDescription(`${message.author} senin bulunduğun ses odasına girmek için izin istiyor, eğerki onaylamıyorsan bişey yapmana gerek yok.`)}).then(async msj => { await msj.react('✅');
    
    msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
    
        let cevap = c.first();
        if (cevap) {
    message.member.voice.setChannel(jyros.voice.channelID);
    msj.delete();
    return message.channel.send("İşlem onaylandı.").then(x => x.delete({timeout: 10000}));
    }
})
   });

   //cmd-genel >>>
 client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcının bulunduğu kanala \`${prefix}git\` komutu ile çekildi.`)

}};
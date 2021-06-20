const { MessageEmbed } = require('discord.js')
const moment = require("moment");
moment.locale("tr")
const db = require("quick.db")
const kdb = new db.table("kullanıcı");
const settings = require("../settings/settings.json");
const config = require("../settings/config.json");
module.exports = {
conf: {
aliases: ["banned","yasak","yasakla","banla","yargı","sg","sie"],
name: "ban",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
if (!message.member.roles.cache.some(r => [(settings.roles.staff.banHammer)].includes(r.id)) && !message.member.hasPermission("BAN_MEMBERS") && !message.member.hasPermission("ADMINISTRATOR")){message.channel.send(embed.setDescription(`${settings.emojis.no} Bu komutu kullanmak için yeterli yetkiniz bulunmamakta.`)).then(x => x.delete({ timeout: 5000 })); return; }
let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let reason = args.splice(1).join(" ")
if (args[0] && (args[0].includes('bilgi') || args[0].includes('info'))){
if(!args[1] || isNaN(args[1])) return message.channel.send(embed.setDescription(`${message.author}, Geçerli bir ban yemiş kullanıcı ID'si belirtmelisin.`)).then(x => x.delete({timeout: 5000}));
return message.guild.fetchBan(args.slice(1).join(' ')).then(({ user, reason }) => message.channel.send(embed.setDescription(`**Banlanan Üye:** <@${user.id}> (\`${user.id}\`)\n**Ban Sebebi:** ${reason ? reason : "Belirtilmemiş!"}`))).catch(err => message.channel.send(embed.setDescription("Belirtilen ID numarasına sahip bir ban bulunamadı!")).then(x => x.delete({timeout: 5000})));}
if (!jyros) { return message.channel.send(embed.setColor(`${config.embed.color.red}`).setDescription(`${settings.emojis.no} Hatalı Kullanım! \`${config.PREFIX}ban @Jyros <sebep>\` `)).then(x => x.delete({ timeout: 5000 })); }
if(message.member.roles.highest.position <= jyros.roles.highest.position) return message.channel.send(embed.setColor(`${config.embed.color.red}`).setDescription(`${settings.emojis.no} ${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`)).then(x => x.delete({ timeout: 5000 }));
if(!jyros.bannable) return message.channel.send(embed.setColor(`${config.embed.color.red}`).setDescription(`${settings.emojis.no} ${message.author}, Etiketlenen kullanıcı yasaklanamaz.`)).then(x => x.delete({ timeout: 5000 }));
if(jyros.id === message.author.id) return message.channel.send(embed.setColor(`${config.embed.color.red}`).setDescription(`${settings.emojis.no} ${message.author}, Kendini sunucudan yasaklayamazsın.`)).then(x => x.delete({ timeout: 5000 }));
if(jyros.id === client.user.id) return message.channel.send(embed.setColor(`${config.embed.color.red}`).setDescription(`${settings.emojis.no} ${message.author}, Bir botu sunucudan yasaklayamazsın.`)).then(x => x.delete({ timeout: 5000 }));
if(jyros.id === config.GUILD_OWNERS) return message.channel.send(embed.setColor(`${config.embed.color.red}`).setDescription(`${settings.emojis.no} ${message.author}, Sunucu sahibini yasaklayamazsın.`)).then(x => x.delete({ timeout: 5000 }));
if(jyros.id === config.BOT_OWNER) return message.channel.send(embed.setColor(`${config.embed.color.red}`).setDescription(`${message.author}, Aptal Botçu Değilim. Kendi botumdan mı banlanıcam xd?xd?`)).then(x => x.delete({ timeout: 5000 }));
let puan = await kdb.fetch(`cezapuan.${jyros.id}`) || "0"
let cezaID = db.get(`cezaid.${message.guild.id}`) + 1
kdb.add(`cezapuan.${jyros.id}`, 20)
kdb.add(`banlar.${jyros.id}`, 1)
kdb.push(`sicil.${jyros.id}`, { Sebep: reason, Yetkili: message.author.id, Tip: "BAN", cezaID: cezaID })
db.add(`cezaid.${message.guild.id}`, +1)
jyros.send(`**${message.guild.name}** sunucusundan, **${message.author.tag}** tarafından, **${reason}** sebebiyle banlandınız! \`#${cezaID}\``).catch(() => {});
message.channel.send(embed.setDescription(`${settings.emojis.yes} ${jyros} adlı kullanıcı ${message.author} tarafından \`${reason}\` sebebiyle sunucudan yasaklandı! \`#${cezaID}\``).setImage("https://media1.tenor.com/images/ed33599ac8db8867ee23bae29b20b0ec/tenor.gif?itemid=14760307"));
client.channels.cache.get(settings.channels.logs.cezaPuanLog).send(`${jyros}, aldığınız \`#${cezaID}\` ID'li ceza ile \`${puan}\` ceza puanına ulaştınız.`)
message.guild.channels.cache.get(settings.channels.logs.banLog).send(embed.setTitle(`Bir Kullanıcı Yasaklandı!`).setDescription(`          
Üye: ${jyros} - \`${jyros.id}\`
Yetkili: ${message.author} - \`${message.author.id}\`
Ceza Tarihi: \`${moment(Date.now()).format("LLL")}\`
Ceza Sebebi: \`${reason}\`
Ceza ID: \`#${cezaID}\`
`).setImage("https://media1.tenor.com/images/ed33599ac8db8867ee23bae29b20b0ec/tenor.gif?itemid=14760307"));
jyros.ban({reason: reason}).catch(() => {});
}}
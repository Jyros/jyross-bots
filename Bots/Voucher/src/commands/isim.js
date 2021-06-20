const config = require("../settings/config.json");
const settings = require("../settings/settings.json");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const kdb = new db.table("kullanıcı")
module.exports = {
conf: {
aliases: ["i","name","nick"],
name: "isim",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}));
let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
args = args.filter(a => a !== "" && a !== " ").splice(1);
let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
let yaş = args.filter(arg => !isNaN(arg))[0] || "16"; // yaş girilmezse 16 koyacak.
if (!message.member.roles.cache.some(r => (settings.roles.staff.register).includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")) {message.channel.send(embed.setDescription(`${message.author}, bu komutu kullanmak için yeterli yetkiniz bulunmamakta.`).setColor(`${config.embed.color.red}`)).then(x => x.delete({timeout: 7000})); message.react(settings.emojis.no); return };
if (!jyros){message.channel.send(embed.setDescription(`Eksik Argüman! \`${config.PREFIX}isim @Jyros/ID İsim Yaş\``).setColor(`${config.embed.color.red}`)).then(mal => mal.delete({timeout: 7000})); message.react(settings.emojis.no);}
if(!isim || !yaş) {message.channel.send(`${settings.emojis.no}`)}
if (db.fetch(`taglıAlım.${message.guild.id}`)) {
if(!jyros.user.username.includes(settings.tag.tag) && !jyros.roles.cache.has(settings.roles.special) && !jyros.roles.cache.has(settings.roles.booster)) {
message.channel.send(embed.setDescription(`${settings.emojis.no} ${jyros} isimli üye tagımızı almadığı için kayıt işlemi tamamlanamadı.`).setColor(`${config.embed.color.red}`)).then(pırt => pırt.delete({timeout: 7000})); message.react(settings.emojis.no)}};
message.react(settings.emojis.yes);
if (jyros.user.username.includes(settings.tag.tag)) {
jyros.setNickname(`${settings.tag.tag} ${isim} | ${yaş}`);
} else if (!jyros.user.username.includes(settings.tag.tag)) {
jyros.setNickname(`${settings.tag.untag} ${isim} | ${yaş}`)};
message.channel.send(embed.setDescription(`${settings.emojis.yes} ${jyros} kullanıcısının ismi **${isim} | ${yaş}** olarak değiştirildi.`).setColor(`${config.embed.color.green}`)).then(pırt => pırt.delete({timeout: 7000})); message.react(settings.emojis.yes)
kdb.push(`isimler.${jyros.id}`, {isim: isim, Yaş: yaş, Yetkili: message.author.id})
}}
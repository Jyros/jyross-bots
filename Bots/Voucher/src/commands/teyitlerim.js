const config = require("../settings/config.json");
const settings = require("../settings/settings.json");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ydb = new db.table("yetkili")
module.exports = {
conf: {
aliases: ["teyitlerim","teyit","teyits","kayıtlar","kayıtlarım","kayıts"],
name: "teyit",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}));
if (!message.member.roles.cache.has(settings.roles.staff.register) && !message.member.hasPermission("ADMINISTRATOR")) { message.react(settings.emojis.no)};
let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
let kızTeyit = ydb.fetch(`kızTeyit.${jyros.id}`) || "0"
let erkekTeyit = ydb.fetch(`erkekTeyit.${jyros.id}`) || "0";
let topTeyit = ydb.fetch(`topTeyit.${jyros.id}`) || "0";
if (!args[1]) {
message.react(settings.emojis.yes);
message.channel.send(embed.setDescription(`
${settings.emojis.yes} ${jyros} ( \`${jyros.id}\` ) isimli kullanıcının teyit bilgileri:
    
Erkek teyit: **${erkekTeyit}**
Kız teyit: **${kızTeyit}**
Toplam teyit: **${topTeyit}**`))};
if (args[1] === "kız") {
message.react(settings.emojis.yes);
message.channel.send(embed.setDescription(`
${settings.emojis.yes} ${jyros} ( \`${jyros.id}\` ) isimli kullanıcının teyit bilgileri:
    
Kız teyit: **${kızTeyit}**`))}; 
if (args[1] === "erkek") {
message.react(settings.emojis.yes);
message.channel.send(embed.setDescription(`
${settings.emojis.yes} ${jyros} ( \`${jyros.id}\` ) isimli kullanıcının teyit bilgileri:
        
Erkek teyit: **${erkekTeyit}**`))}; 
if (args[1] === "toplam") {
message.react(settings.emojis.yes);
message.channel.send(embed.setDescription(`
${settings.emojis.yes} ${jyros} ( \`${jyros.id}\` ) isimli kullanıcının teyit bilgileri:
            
Erkek teyit: **${topTeyit}**`))}; 
}}
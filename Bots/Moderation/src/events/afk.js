const Discord = require("discord.js")
const config = require("../settings/config.json")
const db = require('quick.db')
module.exports = async (message) => {
if (!message.guild || message.author.bot || message.content.startsWith('.')) return;
let embed = new Discord.MessageEmbed().setColor(config.embed.color.red).setFooter(`${config.embed.footer}`)
if (message.mentions.users.size >= 1) {
let jyros = message.mentions.users.first();
if (db.get(`${jyros.id}_afkReason`)) {
message.channel.send(embed.setDescription(`${jyros} adlı üye **${db.get(`${jyros.id}_afkReason`)}** sebebi ile AFK!`)).then(x => x.delete({ timeout: 3000 }))}} else {
const nick = db.fetch(`afkNick_${message.author.id}_${message.guild.id}`)
if(db.get(`${message.author.id}_afkReason`)){
db.delete(`${message.author.id}_afkReason`)
db.delete(`afkNick_${message.author.id}_${message.guild.id}`)
message.member.setNickname(nick)
message.channel.send("Hoşgeldin artık AFK değilsin").then(x => x.delete({ timeout: 5000 }))}         
}}
module.exports.conf = {
name: "message"
}
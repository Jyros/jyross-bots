const settings = require("../settings/settings.json");
const db = require('quick.db')
const kdb = new db.table("kullanıcı");
let selamlar = ["sa", "selam", "selamın aleyküm", "selamın aleykum", "sea", "sA", "selamın aleykm", "selamün aleyküm", "selamun aleykum"]
module.exports = async (message) => {
if (message.author.bot) return;
if (selamlar.some(s => message.content.toLowerCase() === s)) {
message.channel.send(`${message.author}, Aleyküm selam hoş geldin.`)}
let cezapuan = await kdb.fetch(`cezapuan.${message.author.id}`) || "0"
if([".cezapuan","cezapuan","ceza-puan"].includes(message.content.toLowerCase())){ 
return message.channel.send(`${message.author}, toplam ceza puanınız: ${cezapuan}`)}}
};
module.exports.conf = {
name: "message"
}
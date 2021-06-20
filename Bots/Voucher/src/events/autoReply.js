const config = require("../settings/config.json");
const settings = require("../settings/settings.json");
const { MessageEmbed } = require("discord.js");
module.exports = (message) => {
if(["tag",".tag","?tag","TAG",].includes(message.content.toLowerCase())){ 
return message.channel.send(`${settings.tag.tag}`)};
if(["ping",".ping"].includes(message.content.toLowerCase())){ 
return message.channel.send(`${client.ws.ping}`)};
};
module.exports.conf = {
name: "message",
};
const { MessageEmbed } = require("discord.js")
const settings = require("../settings/settings.json")
module.exports = async (oldState, newState) => {
let embed = new MessageEmbed().setTimestamp()
const channel = newState.guild.channels.cache.get(settings.channels.logs.voiceLog);
if (!channel) return;
if (!oldState.channel && newState.channel) return channel.send(embed.setDescription(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanala girdi!`).setFooter(`Girdiği Saat`));
if (oldState.channel && !newState.channel) return channel.send(embed.setDescription(`${newState.member.displayName} üyesi \`${oldState.channel.name}\` adlı sesli kanaldan ayrıldı!`).setFooter(`Ayrıldığı Saat`));
if (oldState.channelID && newState.channelID && oldState.channelID != newState.channelID) return channel.send(embed.setDescription(`${newState.member.displayName} adlı kullanıcı \`${oldState.channel.name}\` adlı ses kanalından çıkıp \`${newState.channel.name}\` adlı ses kanalına girdi.`).setFooter(`Girdiği Saat`));
if (oldState.channel.id && oldState.selfMute && !newState.selfMute) return channel.send(embed.setDescription(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendi susturmasını kaldırdı!`).setFooter(`Susturmasını Kaldırdığı Saat`));
if (oldState.channel.id && !oldState.selfMute && newState.selfMute) return channel.send(embed.setDescription(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendini susturdu!`).setFooter(`Susturduğu Saat`));
if (oldState.channel.id && oldState.selfDeaf && !newState.selfDeaf) return channel.send(embed.setDescription(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendi sağırlaştırmasını kaldırdı!`).setFooter(`Sağırlaştırmasını Kaldırdığı Saat`));
if (oldState.channel.id && !oldState.selfDeaf && newState.selfDeaf) return channel.send(embed.setDescription(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kendini sağırlaştırdı!`).setFooter(`Sağırlaştığı Saat`));
if (oldState.channel.id && !oldState.streaming && newState.channel.id && newState.streaming) return channel.send(embed.setDescription(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda yayın açtı!`).setFooter(`Yayın Açtığı Saat`));
if (oldState.channel.id && oldState.streaming && newState.channel.id && !newState.streaming) return channel.send(embed.setDescription(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda yayını kapattı!`).setFooter(`Yayını Kapattığı Saat`));
if (oldState.channel.id && !oldState.selfVideo && newState.channel.id && newState.selfVideo) return channel.send(embed.setDescription(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kamerasını açtı!`).setFooter(`Kamerasını Açtığı Saat`));
if (oldState.channel.id && oldState.selfVideo && newState.channel.id && !newState.selfVideo) return channel.send(embed.setDescription(`${newState.member.displayName} üyesi \`${newState.channel.name}\` adlı sesli kanalda kamerasını kapattı!`).setFooter(`Kamerasını Kapattığı Saat`));
};
module.exports.conf = {
name: "voiceStateUpdate",
};
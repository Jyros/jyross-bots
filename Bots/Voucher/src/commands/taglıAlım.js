const config = require("../settings/config.json");
const settings = require("../settings/settings.json");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
module.exports = {
conf: {
aliases: ["taglıalım","taglı-alım"],
name: "taglıalım",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}));
if (!message.member.roles.cache.has(settings.roles.owner) && !message.member.hasPermission("ADMINISTRATOR")) { message.react(settings.emojis.no)};
if(!args[0]) {message.react(settings.emojis.no); message.channel.send(embed.setDescription(`${settings.emojis.no} Eksik Argüman! \`${config.PREFIX}taglıalım aç/kapat\``).setColor(`${config.embed.color.red}`)).then(mal => mal.delete({timeout: 7000}))};
if (args[0] === "aç") {
if( db.fetch(`taglıAlım.${message.guild.id}`)){message.channel.send(embed.setDescription(`${settings.emojis.no} Taglı alım sistemi zaten aktif!`)).then(mal => mal.delete({timeout: 7000})); message.react(settings.emojis.no)};
db.set(`taglıAlım.${message.guild.id}`, "taglıAlım")
message.channel.send(embed.setDescription(`${settings.emojis.no} Taglı alım sistemi aktif edildi!`))
message.react(settings.emojis.yes); return;
} else if (args[0] === "kapat") {
if(!db.fetch(`taglıAlım.${message.guild.id}`)){message.channel.send(embed.setDescription(`${settings.emojis.no} Taglı alım sistemi zaten devre dışı!`)).then(mal => mal.delete({timeout: 7000})); message.react(settings.emojis.no)};
db.delete(`taglıAlım.${message.guild.id}`);
message.channel.send(embed.setDescription(`${settings.emojis.no} Taglı alım sistemi devre dışı bırakıldı!`))
message.react(settings.emojis.yes); return };
}}
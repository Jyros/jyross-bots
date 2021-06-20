const config = require("../settings/config.json");
const settings = require("../settings/settings.json");
const { MessageEmbed } = require("discord.js");
module.exports = {
conf: {
aliases: ["şüpheliçıkart","şüpheli-çıkar"],
name: "şüpheli-çıkart",
},
run: async (client, message, args) => {
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}));
let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!message.member.roles.cache.some(r => (settings.roles.staff.yönetim).includes(r.id)) && !message.member.hasPermission("ADMINISTRATOR")) {message.channel.send(embed.setDescription(`${message.author}, bu komutu kullanmak için yeterli yetkiniz bulunmamakta.`).setColor(`${config.embed.color.red}`)).then(x => x.delete({timeout: 7000})); message.react(settings.emojis.no); return };
if(!jyros) {message.channel.send(embed.setDescription(`${settings.emojis.no} Geçerli bir üye belirtmelisiniz.`).setColor(`${config.embed.color.red}`)).then(x => x.delete({timeout: 7000})); message.react(settings.emojis.no)};
jyros.roles.add(settings.roles.unregistered);
jyros.roles.remove(settings.roles.şüpheli);
if (jyros.user.username.includes(settings.tag.tag)) {
jyros.setNickname(`${settings.tag.tag} İsim | Yaş`);
jyros.roles.add(settings.roles.taggesrole);
} else if (!jyros.user.username.includes(settings.tag.tag)) {
jyros.setNickname(`${settings.tag.untag} İsim | Yaş`)};
message.react(settings.emojis.yes);
message.channel.send(embed.setDescription(`${jyros} adlı kullanıcıya ${message.author} tarafından şüpheli kategorisinden çıkarılıp kayıtsız rolü verildi!`));
client.guilds.cache.get(config.guildID).channels.cache.get(settings.channels.logs.şüpheliLog).send(embed.setDescription(`${jyros} (\`${jyros.id}\`) adlı kullanıcıya ${message.author} (\`${message.author.id}\`) tarafından şüpheli kategorisinden çıkarılıp kayıtsız rolü verildi`));
}}
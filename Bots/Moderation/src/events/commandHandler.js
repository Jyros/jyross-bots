const config = require("../settings/config.json");
const { MessageEmbed } = require("discord.js");
const client = global.client;
let sended = false;
setInterval(() => {
client.cooldown.forEach((x, index) => {
if (Date.now() - x.lastUsage > x.cooldown) client.cooldown.delete(index);
});
}, 5000);
module.exports = async (message) => {
let prefix = config.PREFIX.find((x) => message.content.toLowerCase().startsWith(x));
if (message.author.bot || !message.guild || !prefix) return;
let args = message.content.substring(prefix.length).trim().split(" ");
let commandName = args[0].toLowerCase();
const embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setColor(message.member.displayHexColor).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, size: 2048 }));
args = args.splice(1);
let cmd = client.commands.has(commandName) ? client.commands.get(commandName) : client.commands.get(client.aliases.get(commandName));
if (cmd) {
if (cmd.conf.owner && !config.BOT_OWNER.includes(message.author.id) && !config.GUILD_OWNERS.includes(message.author.id) ) return;
const cooldown = cmd.conf.cooldown || 3000;
const cd = client.cooldown.get(message.author.id);
if (cd) {
const diff = Date.now() - cd.lastUsage;
if (diff < cooldown)
if (!sended) {
sended = true;
return message.channel.send(embed.setDescription(`Bu komutu tekrar kullanabilmek için **${Number(((cooldown - diff) / 1000).toFixed(2))}** daha beklemelisin!`)).then((x) => x.delete({ timeout: cooldown - diff }))}
} else client.cooldown.set(message.author.id, { cooldown: cooldown, lastUsage: Date.now() });
cmd.run(client, message, args, embed, prefix);
}};
module.exports.conf = {
name: "message",
};
const config = require("../base/config.json");
const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const { Perms } = require("../operations/permissions.js")
const { ErrorCodes } = require("../operations/errorcodes")
const { MessageEmbed } = require("discord.js");
const client = global.client;
let sended = false;

setInterval(() => {
client.cooldown.forEach((x, index) => {
if (Date.now() - x.lastUsage > x.cooldown) client.cooldown.delete(index)})}, 5000);

module.exports = async (message) => {

let prefix = config.PREFIX.find((x) => message.content.toLowerCase().startsWith(x));
if (message.author.bot || !message.guild || !prefix) return;
let args = message.content.substring(prefix.length).trim().split(" ");
let commandName = args[0].toLowerCase();

const jyross = await client.users.fetch("796032235085627422");
const embed = new MessageEmbed().setColor(message.member.displayHexColor).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, size: 2048 })).setFooter("Developed by Jyross", jyross.avatarURL({ dynamic: true }));    

args = args.splice(1);

let cmd = client.commands.has(commandName) ? client.commands.get(commandName) : client.commands.get(client.aliases.get(commandName));

if (cmd) {
if (cmd.conf.ownerOnly && !config.BOT_OWNERS.includes(message.author.id) && !config.GUILD_OWNERS.includes(message.author.id)) return;
if (message.member.roles.cache.has(roles["u-jail"]) || roles["u-unreg"].some(rol => message.member.roles.cache.has(rol))) return;

const cooldown = cmd.conf.cooldown || 3000;
const cd = client.cooldown.get(message.author.id);

if (cd) {
const diff = Date.now() - cd.lastUsage;
if (diff < cooldown)
if (!sended) {
sended = true;

return message.channel.send(embed.setDescription(`${emojis.no} Bu komutu tekrar kullanabilmek için **${Number(((cooldown - diff) / 1000).toFixed(2))}** daha beklemelisin!`)).then((x) => x.delete({ timeout: cooldown - diff }))}
} else client.cooldown.set(message.author.id, { cooldown: cooldown, lastUsage: Date.now() });

if(cmd.conf.enabled === false){
    if (!message.member.roles.cache.has(roles["cmd-botcommands"])) return message.channel.send(embed.setDescription("Bu komut geçici olarak kullanıma kapalıdır.").setFooter(`Hata Kodu: ${ErrorCodes.YetersizYetki.code}`)).then(x => x.delete({ timeout: 7000 }));
}

if(cmd.conf.cmdTest === true){
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription("Bu komut test aşamasındadır.").setFooter(`Hata Kodu: ${ErrorCodes.YetersizYetki.code}`)).then(x => x.delete({ timeout: 7000 }));
}

if(cmd.conf.adminOnly === true){
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`${emojis.no} Bu komutu sadece yöneticiler kullanabilir!`).setFooter(`Hata Kodu: ${ErrorCodes.YetersizYetki.code}`));
}

if (cmd.conf.dmCmd && (message.channel.type !== 'dm')) { 
return message.channel.send(embed.setDescription(`${emojis.no} Bu komut bir DM komutudur!`));
}

if (cmd.conf.staffLevel == 1 && !message.member.roles.cache.has(roles["cmd-botcommands"]) && !message.member.hasPermission("ADMINISTRATOR")){ 

    message.channel.send(embed.setDescription(`${emojis.no} ${message.author}, bu komutu kullanmak için <@&${roles["cmd-botcommands"]}> yetkisine sahip olmanız gerekiyor.`).setFooter(`Hata Kodu: ${ErrorCodes.YetersizYetki.code}`)); 
    message.react(emojis.no);
    return;
}

if (cmd.conf.staffLevel == 2 && !message.member.roles.cache.has(roles["cmd-transport"]) && !message.member.hasPermission("ADMINISTRATOR")){ 

    message.channel.send(embed.setDescription(`${emojis.no} ${message.author}, bu komutu kullanmak için <@&${roles["cmd-transport"]}> yetkisine sahip olmanız gerekiyor.`).setFooter(`Hata Kodu: ${ErrorCodes.YetersizYetki.code}`)); 
    message.react(emojis.no);
    return;
}

if (cmd.conf.staffLevel == 3 && !message.member.roles.cache.has(roles["cmd-chatmutehammer"]) && !message.member.hasPermission("MUTE_MEMBERS") && !message.member.hasPermission("ADMINISTRATOR")){ 
    message.channel.send(embed.setDescription(`${emojis.no} ${message.author}, bu komutu kullanmak için <@&${roles["cmd-chatmutehammer"]}> yetkisine sahip olmanız gerekiyor.`).setFooter(`Hata Kodu: ${ErrorCodes.YetersizYetki.code}`)); 
    message.react(emojis.no);
    return;
}

if (cmd.conf.staffLevel == 4 && !message.member.roles.cache.has(roles["cmd-voicemutehammer"]) && !message.member.hasPermission("MUTE_MEMBERS") && !message.member.hasPermission("ADMINISTRATOR")){
     message.channel.send(embed.setDescription(`${emojis.no} ${message.author}, bu komutu kullanmak için <@&${roles["cmd-voicemutehammer"]}> yetkisine sahip olmanız gerekiyor.`).setFooter(`Hata Kodu: ${ErrorCodes.YetersizYetki.code}`)); 
     message.react(emojis.no);
     return;
}

if (cmd.conf.staffLevel == 5 && !message.member.roles.cache.has(roles["cmd-rolemanager"]) && !message.member.hasPermission("MANAGE_ROLES") && !message.member.hasPermission("ADMINISTRATOR")){
    message.channel.send(embed.setDescription(`${emojis.no} ${message.author}, bu komutu kullanmak için <@&${roles["cmd-rolemanager"]}> yetkisine sahip olmanız gerekiyor.`).setFooter(`Hata Kodu: ${ErrorCodes.YetersizYetki.code}`)); 
    message.react(emojis.no);
    return;
}

if (cmd.conf.staffLevel == 6 && !message.member.roles.cache.has(roles["cmd-warnhammer"]) && !message.member.hasPermission("ADMINISTRATOR")){
    message.channel.send(embed.setDescription(`${emojis.no} ${message.author}, bu komutu kullanmak için <@&${roles["cmd-warnhammer"]}> yetkisine sahip olmanız gerekiyor.`).setFooter(`Hata Kodu: ${ErrorCodes.YetersizYetki.code}`)); 
    message.react(emojis.no);
    return;
}

if (cmd.conf.staffLevel == 7 && !message.member.roles.cache.has(roles["cmd-kickhammer"]) && !message.member.hasPermission("KICK_MEMBERS") && !message.member.hasPermission("ADMINISTRATOR")){
    message.channel.send(embed.setDescription(`${emojis.no} ${message.author}, bu komutu kullanmak için <@&${roles["cmd-kickhammer"]}> yetkisine sahip olmanız gerekiyor.`).setFooter(`Hata Kodu: ${ErrorCodes.YetersizYetki.code}`)); 
    message.react(emojis.no);
    return;
}

if (cmd.conf.staffLevel == 8 && !message.member.roles.cache.has(roles["cmd-jailhammer"]) && !message.member.hasPermission("ADMINISTRATOR")){
    message.channel.send(embed.setDescription(`${emojis.no} ${message.author}, bu komutu kullanmak için <@&${roles["cmd-jailhammer"]}> yetkisine sahip olmanız gerekiyor.`).setFooter(`Hata Kodu: ${ErrorCodes.YetersizYetki.code}`)); 
    message.react(emojis.no);
    return;
}

if (cmd.conf.staffLevel == 9 && !message.member.roles.cache.has(roles["cmd-banhammer"]) && !message.member.hasPermission("BAN_MEMBERS") && !message.member.hasPermission("ADMINISTRATOR")){
    message.channel.send(embed.setDescription(`${emojis.no} ${message.author}, bu komutu kullanmak için <@&${roles["cmd-banhammer"]}> yetkisine sahip olmanız gerekiyor.`).setFooter(`Hata Kodu: ${ErrorCodes.YetersizYetki.code}`)); 
    message.react(emojis.no);
    return;
}

if (cmd.conf.permLevel == 1 && !message.member.hasPermission("KICK_MEMBERS") && !message.member.hasPermission("ADMINISTRATOR")) { 
    message.channel.send(`${emojis.no} ${message.author}, bu komutu kullanmak için "${Perms.KICK_MEMBERS}" yetkisine sahip olmanız gerekiyor.`); 
    message.react(emojis.no);
    return;
}

if (cmd.conf.permLevel == 2 && !message.member.hasPermission("BAN_MEMBERS") && !message.member.hasPermission("ADMINISTRATOR")) { 
    message.channel.send(`${emojis.no} ${message.author}, bu komutu kullanmak için "${Perms.BAN_MEMBERS}" yetkisine sahip olmanız gerekiyor.`); 
    message.react(emojis.no);
    return;
}

if (cmd.conf.permLevel == 3 && !message.member.hasPermission("ADMINISTRATOR")) { 
    message.channel.send(`${emojis.no} ${message.author}, bu komutu kullanmak için "${Perms.ADMINISTRATOR}" yetkisine sahip olmanız gerekiyor.`); 
    message.react(emojis.no);
    return;
}

if (cmd.conf.permLevel == 4 && !config.GUILD_OWNERS.includes(message.author.id) && !message.member.roles.cache.has(roles.owner) && message.author.id !== message.guild.ownerID) { 
    message.channel.send(`${emojis.no} ${message.author}, bu komutu kullanmak için sunucunun sahip(ler)inden biri olmalısınız.`); 
    message.react(emojis.no);
    return;
}

if (cmd.conf.permLevel == 5 && !config.BOT_OWNERS.includes(message.author.id)){ 
    message.channel.send(`${emojis.no} ${message.author}, bu komutu kullanmak için botun sahip(ler)inden olmalısınız.`); 
    message.react(emojis.no);
    return;
}

cmd.run(client, message, args, embed, prefix);
}};

module.exports.conf = {
name: "message",
c_name:"cmdHandler",
};
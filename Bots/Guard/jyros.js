const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
const client2 = new Discord.Client();
const client3 = new Discord.Client();
const config = require("./src/settings/config.json");
const settings = require("./src/settings/settings.json");

let embed = new MessageEmbed().setFooter(`${config.embed.footer}`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}));

const yetkiPermleri = [
"ADMINISTRATOR",
"MANAGE_ROLES",
"MANAGE_CHANNELS",
"MANAGE_GUILD",
"BAN_MEMBERS",
"KICK_MEMBERS",
"MANAGE_NICKNAMES",
"MANAGE_EMOJIS",
"MANAGE_WEBHOOKS"
];

function guvenli(jyrosID) {
let jyros = client.guilds.cache.get(config.guildID).members.cache.get(jyrosID);
let guvenliler = settings.whitelist || [];
settings.whitelist = guvenliler;
if (!jyros || jyros.id === client.user.id || jyros.id === config.BOT_OWNER || jyros.id === config.GUILD_OWNERS || jyros.id === jyros.guild.owner.id || guvenliler.some(g => jyros.id === g.slice(1) || jyros.roles.cache.has(g.slice(1))))
return true;
else return false;
}

function cezalandir(jyrosID, tür) {
let jyros = client.guilds.cache.get(config.guildID).members.cache.get(jyrosID);
if (!jyros) return;
if (tür == "cezalandır")
return jyros.roles.cache.has(settings.roles.booster) ? jyros.roles.set([settings.roles.booster, settings.roles.jail]) : jyros.roles.set([settings.roles.jail])
};

// GUARD #1 (GENEL)

client.on("guildMemberRemove", async jyros => {
let yetkili = await jyros.guild.fetchAuditLogs({ type: "MEMBER_KICK" }).then(audit => audit.entries.first());
if (!yetkili || !yetkili.executor || Date.now() - yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !settings.guard.kick) return;
cezalandir(yetkili.executor.id, "cezalandır");
kickGuardLog = settings.channels.logs.kickGuardLog
if (!kickGuardLog) return;
if (kickGuardLog) {client.guilds.cache.get(config.guildID).channels.cache.get(kickGuardLog).send(embed.setDescription(`
${yetkili.executor}(\`${yetkili.executor.id}\`) tarafından **\`${new Date().toTurkishFormatDate()}\`** zamanında ${jyros} (\`${jyros.id}\`) adında **kullanıcı sunucudan atıldı** sebebiyle yetkili **jaile** atıldı.`)).catch();
}});

client.on("guildBanAdd", async (guild, jyros) => {
let yetkili = await guild.fetchAuditLogs({ type: "MEMBER_BAN_ADD" }).then(audit => audit.entries.first());
if (!yetkili || !yetkili.executor || guvenli(yetkili.executor.id) || !settings.guard.ban) return;
cezalandir(yetkili.executor.id, "cezalandır");
guild.members.unban(jyros.id).catch(console.error);
let banGuardLog = settings.channels.logs.banGuardLog
if (banGuardLog) {
client.guilds.cache.get(config.guildID).channels.cache.get(banGuardLog).send(embed.setDescription(`
${yetkili.executor}(\`${yetkili.executor.id}\`) tarafından **\`${new Date().toTurkishFormatDate()}\`** zamanında ${jyros} (\`${jyros.id}\`) adında **kullanıcı banlandı**. **Banlanan kullanıcının banını kaldırılıp**, yetkili **jaile** atıldı.`)).catch()
}});

client.on("guildMemberAdd", async (jyros) => {
let yetkili = await jyros.guild.fetchAuditLogs({ type: "BOT_ADD" }).then(audit => audit.entries.first());
if (!jyros.user.bot || !yetkili || !yetkili.executor || Date.now() - yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !settings.guard.bot) return;
cezalandir(yetkili.executor.id, "cezalandır");
jyros.ban({reason: 'bb'})
let botGuardLog = settings.channels.logs.botGuardLog
if (botGuardLog) {
client.guilds.cache.get(config.guildID).channels.cache.get(botGuardLog).send(embed.setDescription(`
${yetkili.executor}(\`${yetkili.executor.id}\`) tarafından **\`${new Date().toTurkishFormatDate()}\`** zamanında ${jyros} (\`${jyros.id}\`) adında **sunucuya bot eklendi**. **Eklenen bot banlanıp**, yetkili **jaile** atıldı.`)).catch();
}});

client.on("guildUpdate", async (oldGuild, newGuild) => {
let yetkili = await newGuild.fetchAuditLogs({ type: "GUILD_UPDATE" }).then(audit => audit.entries.first());
if (!yetkili || !yetkili.executor || Date.now() - yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !settings.guard.guild) return;
cezalandir(yetkili.executor.id, "cezalandır");
if (newGuild.name !== oldGuild.name) newGuild.setName(oldGuild.name);
if (newGuild.iconURL({ dynamic: true, size: 2048 }) !== oldGuild.iconURL({ dynamic: true, size: 2048 }))
newGuild.setIcon(oldGuild.iconURL({ dynamic: true, size: 2048 }));
let guildGuardLog = settings.channels.logs.guildGuardLog
if (guildGuardLog) {
client.guilds.cache.get(config.guildID).channels.cache.get(guildGuardLog).send(embed.setDescription(`
${yetkili.executor}(\`${yetkili.executor.id}\`) tarafından **\`${new Date().toTurkishFormatDate()}\`** zamanında **sunucunun ayarları değiştirildi**. **Sunucu ayarlarını eski haline getirildi**, yetkili **jaile** atıldı.`)).catch();
}});

// GUARD #2 (KANAL)

client2.on("channelCreate", async (channel) => {
let yetkili = await channel.guild.fetchAuditLogs({ type: "CHANNEL_CREATE" }).then(audit => audit.entries.first());
if (!yetkili || !yetkili.executor || Date.now() - yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !settings.guard.channel) return;
channel.delete({ reason: null });
cezalandir(yetkili.executor.id, "cezalandır");
let channelGuardLog = settings.channels.logs.channelGuardLog
if (channelGuardLog) {
client2.guilds.cache.get(config.guildID).channels.cache.get(channelGuardLog).send(embed.setDescription(
`${yetkili.executor}(\`${yetkili.executor.id}\`) tarafından **\`${new Date().toTurkishFormatDate()}\`** zamanında **bir kanal oluşturuldu**. **Açılan kanal silindi**, yetkili **jaile atıldı.**`)).catch();
}});

client2.on("channelUpdate", async (oldChannel, newChannel) => {
let yetkili = await newChannel.guild.fetchAuditLogs({ type: "CHANNEL_UPDATE" }).then(audit => audit.entries.first());
if (!yetkili || !yetkili.executor || !newChannel.guild.channels.cache.has(newChannel.id) || Date.now() - yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !settings.guard.channel) return;
cezalandir(yetkili.executor.id, "cezalandır");
if (newChannel.type !== "category" && newChannel.parentID !== oldChannel.parentID)
newChannel.setParent(oldChannel.parentID);
if (newChannel.type === "category") {
newChannel.edit({
name: oldChannel.name
});
} else if (newChannel.type === "text") {
newChannel.edit({
name: oldChannel.name,
topic: oldChannel.topic,
nsfw: oldChannel.nsfw,
rateLimitPerUser: oldChannel.rateLimitPerUser
});
} else if (newChannel.type === "voice") {
newChannel.edit({
name: oldChannel.name,
bitrate: oldChannel.bitrate,
userLimit: oldChannel.userLimit
})};
oldChannel.permissionOverwrites.forEach(perm => {
let thisPermOverwrites = {};
perm.allow.toArray().forEach(p => {
thisPermOverwrites[p] = true;
});
perm.deny.toArray().forEach(p => {
thisPermOverwrites[p] = false;
});
newChannel.createOverwrite(perm.id, thisPermOverwrites)});
let channelGuardLog = settings.channels.logs.channelGuardLog
if (channelGuardLog) {
client2.guilds.cache.get(config.guildID).channels.cache.get(channelGuardLog).send(embed.setDescription(`
${yetkili.executor}(\`${yetkili.executor.id}\`) tarafından **\`${new Date().toTurkishFormatDate()}\`** zamanında **bir kanalın ayarları değiştirildi**. **Ayarları değiştirilen kanal eski haline getirilip**, yetkili **jaile atıldı.**`)).catch();
}});

client2.on("channelDelete", async (channel) => {
let yetkili = await channel.guild.fetchAuditLogs({ type: "CHANNEL_DELETE" }).then(audit => audit.entries.first());
if (!yetkili || !yetkili.executor || Date.now() - yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !settings.guard.channel) return;
cezalandir(yetkili.executor.id, "cezalandır");
await channel.clone({ reason: "Kanal Koruma Sistemi" }).then(async kanal => {
if (channel.parentID != null) await kanal.setParent(channel.parentID);
await kanal.setPosition(channel.position);
if (channel.type == "category")
await channel.guild.channels.cache.filter(k => k.parentID == channel.id).forEach(x => x.setParent(kanal.id))});
let channelGuardLog = settings.channels.logs.channelGuardLog
if (channelGuardLog) {
client2.guilds.cache.get(config.guildID).channels.cache.get(channelGuardLog).send(embed.setDescription(`
${yetkili.executor}(\`${yetkili.executor.id}\`) tarafından **\`${new Date().toTurkishFormatDate()}\`** zamanında **bir kanal silindi**. **Silinen kanalı tekrar açıldı ve izinleri eski haline getirildi**, yetkiliyi **jaile atıldı.**`)).catch();
}});

// GUARD #3 (ROL)

client3.on("roleDelete", async role => {
let yetkili = await role.guild.fetchAuditLogs({ type: "ROLE_DELETE" }).then(audit => audit.entries.first());
if (!yetkili || !yetkili.executor || Date.now() - yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !settings.guard.role) return;
cezalandir(yetkili.executor.id, "cezalandır");
let roleGuardLog = settings.channels.logs.roleGuardLog
if (roleGuardLog) {
client3.guilds.cache.get(config.guildID).channels.cache.get(roleGuardLog).send(embed.setDescription(`
${yetkili.executor}(\`${yetkili.executor.id}\`) tarafından **\`${new Date().toTurkishFormatDate()}\`** zamanında **bir rol silindi**. Yetkili **jaile atıldı.**`)).catch();
}});

client3.on("guildMemberUpdate", async (oldMember, newMember) => {
if (newMember.roles.cache.size > oldMember.roles.cache.size) {
let yetkili = await newMember.guild.fetchAuditLogs({ type: "MEMBER_ROLE_UPDATE" }).then(audit => audit.entries.first());
if (!yetkili || !yetkili.executor || Date.now() - yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !settings.guard.role) return;
if (yetkiPermleri.some(p => !oldMember.hasPermission(p) && newMember.hasPermission(p))) {
cezalandir(yetkili.executor.id, "cezalandır");
newMember.roles.set(oldMember.roles.cache.map(r => r.id));
let roleGuardLog = settings.channels.logs.roleGuardLog
if (roleGuardLog) {
client3.guilds.cache.get(config.guildID).channels.cache.get(roleGuardLog).send(embed.setDescription(`
${yetkili.executor}(\`${yetkili.executor.id}\`) tarafından **\`${new Date().toTurkishFormatDate()}\`** zamanında ${newMember} (\`${newMember.id}\`) adlı kullanıcıya **rol verdi**. **Verilen rol kullanıcıdan alındı**, yetkili **jaile atıldı**.`)).catch()};
}}});

client3.on("roleCreate", async (role) => {
let yetkili = await role.guild.fetchAuditLogs({ type: "ROLE_CREATE" }).then(audit => audit.entries.first());
if (!yetkili || !yetkili.executor || Date.now() - yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !settings.guard.role) return;
role.delete({ reason: "Rol Koruma" });
cezalandir(yetkili.executor.id, "cezalandır");
let roleGuardLog = settings.channels.logs.roleGuardLog
if (roleGuardLog) {
client3.guilds.cache.get(config.guildID).channels.cache.get(roleGuardLog).send(embed.setDescription(`
${yetkili.executor}(\`${yetkili.executor.id}\`) tarafından **\`${new Date().toTurkishFormatDate()}\`** zamanında **bir rol oluşturuldu**. **Açılan rolü silindi**, yetkili **jaile atıldı.**`)).catch()};
});

// READY 

client.on("ready", async () => {
client.user.setStatus(`${config.BOT.ACTIVITY.STATUS}`);
setInterval(() => {
const ready = config.BOT.ACTIVITY.NAME
const index = Math.floor(Math.random() * (ready.length));
client.user.setActivity(`${ready[index]}`, {type: `${config.BOT.ACTIVITY.TYPE}`})}, 10000);
client.channels.cache.get(config.BOT.VOICECHANNEL).join().catch(err => console.error("[#1] [ERROR] Bot failed to connect to voice channel."));
});

client2.on("ready", async () => {
client2.user.setStatus(`${config.BOT.ACTIVITY.STATUS}`);
setInterval(() => {
const ready = config.BOT.ACTIVITY.NAME
const index = Math.floor(Math.random() * (ready.length));
client2.user.setActivity(`${ready[index]}`, {type: `${config.BOT.ACTIVITY.TYPE}`})}, 10000);
client2.channels.cache.get(config.BOT.VOICECHANNEL).join().catch(err => console.error("[#2] [ERROR] Bot failed to connect to voice channel."));
});

client3.on("ready", async () => {
client3.user.setStatus(`${config.BOT.ACTIVITY.STATUS}`);
setInterval(() => {
const ready = config.BOT.ACTIVITY.NAME
const index = Math.floor(Math.random() * (ready.length));
client3.user.setActivity(`${ready[index]}`, {type: `${config.BOT.ACTIVITY.TYPE}`})}, 10000);
client3.channels.cache.get(config.BOT.VOICECHANNEL).join().catch(err => console.error("[#3] [ERROR] Bot failed to connect to voice channel."));
});

// LOGIN

client.login(config.TOKEN_1).then(() => console.log("[#1] [BOT] Bot connected!")).catch(() => console.log("[#1] [BOT] Bot can't connected!"));
client2.login(config.TOKEN_2).then(() => console.log("[#2] [BOT] Bot connected!")).catch(() => console.log("[#2] [BOT] Bot can't connected!"));
client3.login(config.TOKEN_3).then(() => console.log("[#3] [BOT] Bot connected!")).catch(() => console.log("[#3] [BOT] Bot can't connected!"));

// TIME DEFINITION

Date.prototype.toTurkishFormatDate = function(format) {
let date = this,
day = date.getDate(),
weekDay = date.getDay(),
month = date.getMonth(),
year = date.getFullYear(),
hours = date.getHours(),
minutes = date.getMinutes(),
seconds = date.getSeconds();

let monthNames = new Array("Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık");
let dayNames = new Array("Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi");
if (!format) {
format = "dd MM yyyy | hh:ii:ss";
}
format = format.replace("mm", month.toString().padStart(2, "0"));
format = format.replace("MM", monthNames[month]);

if (format.indexOf("yyyy") > -1) {
format = format.replace("yyyy", year.toString());
} else if (format.indexOf("yy") > -1) {
format = format.replace("yy", year.toString().substr(2, 2));
}

format = format.replace("dd", day.toString().padStart(2, "0"));
format = format.replace("DD", dayNames[weekDay]);

if (format.indexOf("HH") > -1)
format = format.replace("HH", hours.toString().replace(/^(\d)$/, "0$1"));
if (format.indexOf("hh") > -1) {
if (hours > 12) hours -= 12;
if (hours === 0) hours = 12;
format = format.replace("hh", hours.toString().replace(/^(\d)$/, "0$1"));
}
if (format.indexOf("ii") > -1)
format = format.replace("ii", minutes.toString().replace(/^(\d)$/, "0$1"));
if (format.indexOf("ss") > -1)
format = format.replace("ss", seconds.toString().replace(/^(\d)$/, "0$1"));
return format;
};

client.tarihHesapla = date => {
const startedAt = Date.parse(date);
var msecs = Math.abs(new Date() - startedAt);

const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
msecs -= years * 1000 * 60 * 60 * 24 * 365;
const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
msecs -= months * 1000 * 60 * 60 * 24 * 30;
const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
msecs -= days * 1000 * 60 * 60 * 24;
const hours = Math.floor(msecs / (1000 * 60 * 60));
msecs -= hours * 1000 * 60 * 60;
const mins = Math.floor(msecs / (1000 * 60));
msecs -= mins * 1000 * 60;
const secs = Math.floor(msecs / 1000);
msecs -= secs * 1000;

var string = "";
if (years > 0) string += `${years} yıl ${months} ay`;
else if (months > 0)
string += `${months} ay ${weeks > 0 ? weeks + " hafta" : ""}`;
else if (weeks > 0)
string += `${weeks} hafta ${days > 0 ? days + " gün" : ""}`;
else if (days > 0)
string += `${days} gün ${hours > 0 ? hours + " saat" : ""}`;
else if (hours > 0)
string += `${hours} saat ${mins > 0 ? mins + " dakika" : ""}`;
else if (mins > 0)
string += `${mins} dakika ${secs > 0 ? secs + " saniye" : ""}`;
else if (secs > 0) string += `${secs} saniye`;
else string += `saniyeler`;

string = string.trim();
return `\`${string} önce\``;
};
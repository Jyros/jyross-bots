const config = require("../settings/config.json");
const settings = require("../settings/settings.json");
const db = require("quick.db");
module.exports = (oldUser, newUser) => {
if (oldUser.username !== newUser.username) {
if (newUser.username.includes(settings.tag.tag) && !client.guilds.cache.get(config.guildID).members.cache.get(newUser.id).roles.cache.has(settings.roles.taggesrole)) {
client.guilds.cache.get(config.guildID).members.cache.get(newUser.id).roles.add(settings.roles.taggesrole);
client.guilds.cache.get(config.guildID).members.cache.get(newUser.id).setNickname(client.guilds.cache.get(config.guildID).members.cache.get(newUser.id).displayName.replace(settings.tag.untag, settings.tag.tag));
client.guilds.cache.get(config.guildID).channels.cache.get(settings.channels.logs.taglog).send(`${newUser} (\`${newUser.id}\`) adlı kullanıcı **${settings.tag.tag}** sembolünü kullanıcı adına ekleyerek ailemize katıldı.`)};
if (!newUser.username.includes(settings.tag.tag) && client.guilds.cache.get(config.guildID).members.cache.get(newUser.id).roles.cache.has(settings.roles.taggesrole)) {
if (db.fetch(`taglıAlım.${config.guildID}`)) {client.guilds.cache.get(config.guildID).members.cache.get(newUser.id).roles.remove(settings.roles.taggesrole);
client.guilds.cache.get(config.guildID).members.cache.get(newUser.id).roles.set([settings.roles.unregistered] || [])};
client.guilds.cache.get(config.guildID).members.cache.get(newUser.id).roles.remove(settings.roles.taggesrole);
client.guilds.cache.get(config.guildID).members.cache.get(newUser.id).setNickname(client.guilds.cache.get(config.guildID).members.cache.get(newUser.id).displayName.replace(settings.tag.untag, settings.tag.tag));
client.guilds.cache.get(config.guildID).channels.cache.get(settings.channels.logs.taglog).send(`${newUser} (\`${newUser.id}\`) adlı kullanıcı **${settings.tag.tag}** sembolünü kullanıcı adından kaldırarak ailemizden ayrıldı.`)}};
}
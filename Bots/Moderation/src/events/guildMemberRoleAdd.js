const settings = require("../settings/settings.json");
module.exports = async (member, role) => {
message.guild.channels.cache.get(settings.channels.logs.roleLog).send(`${member.user.tag} (\`${member.id}\`) kullanıcısına \`${role.name}\` rolü eklendi.`)
}
module.exports.conf = {
name: "guildMemberRoleAdd",
};
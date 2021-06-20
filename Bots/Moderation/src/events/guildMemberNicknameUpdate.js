const settings = require("../settings/settings.json");
module.exports = async (member, oldNickname, newNickname) => {
message.guild.channels.cache.get(settings.channels.logs.nickNameLog).send(`${member.user.tag} \`${member.user.id}\` kullanıcısının sunucu içi ismi değişti.
\` ${oldNickname} > ${newNickname} \``);
}
module.exports.conf = {
name: "guildMemberNicknameUpdate",
};
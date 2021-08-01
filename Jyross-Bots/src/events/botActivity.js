const config = require("../base/config.json")
const roles = require("../base/roles.json");
const { ErrorCodes } = require("../operations/errorcodes")
module.exports = () => {

client.user.setStatus(`${config.BOT.ACTIVITY.STATUS}`);

setInterval(() => {
const ready = config.BOT.ACTIVITY.NAME
const index = Math.floor(Math.random() * (ready.length));

client.user.setActivity(`${ready[index]}`, {type: `${config.BOT.ACTIVITY.TYPE}`})},
 10000);

client.channels.cache.get(config.BOT.VOICECHANNEL).join()
.catch(err => console.error("\x1b[41m",`[ERROR] Bot failed to connect to voice channel. Error Code: ${ErrorCodes.SesHata.code}`));

};

module.exports.conf = {
name: "ready",
c_name:"botActivity",
};
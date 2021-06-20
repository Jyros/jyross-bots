const config = require("../settings/config.json")
module.exports = () => {
client.user.setStatus(`${config.BOT.ACTIVITY.STATUS}`);
setInterval(() => {
const ready = config.BOT.ACTIVITY.NAME
const index = Math.floor(Math.random() * (ready.length));
client.user.setActivity(`${ready[index]}`, {type: `${config.BOT.ACTIVITY.TYPE}`});
}, 10000);
client.channels.cache.get(config.BOT.VOICECHANNEL).join().catch(err => console.error("[ERROR] Bot failed to connect to voice channel."));
}
module.exports.conf = {
name: "ready",
};
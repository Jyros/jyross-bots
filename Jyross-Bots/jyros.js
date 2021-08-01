const { Client, Collection } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const config = require("./src/base/config.json");
client.commands = new Collection();
client.aliases = new Collection();
client.cooldown = new Map();
require("./src/operations/commandHandler");
require("./src/operations/eventHandler");
require("./src/operations/functions")(client)

client.login(config.TOKEN)
.then(() => console.log("\x1b[42m","\x1b[30m","[BOT] Bot connected!"))
.catch(() => console.log("\x1b[41m","\x1b[30m","[BOT] Bot can't connected!"));
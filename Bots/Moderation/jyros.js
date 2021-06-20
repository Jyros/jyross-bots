const { Client, Collection } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const config = require("./src/settings/config.json");
client.commands = new Collection();
client.aliases = new Collection();
client.cooldown = new Map();
require("./src/handlers/commandHandler");
require("./src/handlers/eventHandler");(client)
client.login(config.TOKEN).then(() => console.log("[BOT] Bot connected!")).catch(() => console.log("[BOT] Bot can't connected!"));
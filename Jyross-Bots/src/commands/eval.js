const config = require("../base/config.json");
module.exports = {
conf: {
name: "eval",
aliases: ["eval","evkirala","evsat"],
description: "Bota kod eklersiniz.",
examples:`${config.PREFIX}eval  client.commands`,
category: "Kurucu",
help: "eval",
enabled: true,
ownerOnly: true,
adminOnly: false,
cmdTest: false,
dmCmd: false,
cooldown: 5000,
permLevel: 5,
},
run: async (client, message, args, embed, prefix) => {
  if (!args[0]) return;
let code = args.join(" ");
 try {
var result = clean(await eval(code));
  if (result.includes(client.token))
return message.channel.send("Tokenimin sadece sahibimin bildiğini biliyor muydun?");
message.channel.send(result, {
code: "js",
split: true,
});
 } catch (err) {
message.channel.send(err, { code: "js", split: true })}},
  };

  function clean(text) {
if (typeof text !== "string")
text = require("util").inspect(text, { depth: 0 });
text = text
.replace(/`/g, "`" + String.fromCharCode(8203))
.replace(/@/g, "@" + String.fromCharCode(8203));
return text;
}
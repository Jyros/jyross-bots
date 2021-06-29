module.exports = {
conf: {
aliases: ["help", "y", "h"],
name: "yardım",
},
run: async (client, message, args, embed, prefix) => {
let list = client.commands
.filter((x) => x.conf.name)
.sort((a, b) => b.conf.name - a.conf.name)
.map((x) => `\`${prefix}${x.conf.name}\``)
.join("\n");
message.channel.send(embed.setDescription(list));
}
};

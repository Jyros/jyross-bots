const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const config = require("../base/config.json");
module.exports = {
conf: {
name: "yetenek",
aliases: ["ability","skill"],
description: "Belirtilen üyeye belirlenen yetenek rolünden verir.",
examples:`${config.PREFIX}yetenek <@Jyross/ID> <YetenekRol> `,
category: "Yönetim",
help: "yetenek",
enabled: true,
ownerOnly: false,
adminOnly: false,
cmdTest: false, // bu komutu denemedim olmuyosa bu satırdaki false yazan yeri true yapablrsn öd bb tşk
dmCmd: false,
cooldown: 3000,
},
run: async (client, message, args, embed, prefix) => {

    let jyros = message.mentions.members.first() || message.guild.members.cache.get(args[0]); 
    let role = args[1];

    if (!message.member.roles.cache.has(roles["cmd-rolemanager"]) && !message.member.roles.cache.has(roles["cmd-abilitymanager"]) && !message.member.hasPermission("MANAGE_ROLES") && !message.member.hasPermission("ADMINISTRATOR")){
        message.channel.send(embed.setDescription(`${emojis.no} ${message.author}, bu komutu kullanmak için <@&${roles["cmd-abilitymanager"]}> yetkisine sahip olmanız gerekiyor.`)); 
        message.react(emojis.no);
        return;
    }

    if(!jyros) {
        message.channel.send(embed.setDescription(`${emojis.no} ${message.author}, yetenek rolü verilecek geçerli bir üye giriniz. \`${prefix}yetenek <@Jyross/ID> <YetenekRol>\``)); 
        message.react(emojis.no);
        return;
    }

    if(!args[1]) {

        message.channel.send(embed.setDescription(`
Belirttiğiniz rol geçerli değil! Lütfen aşağıdaki verilenlere göre komutu uygulayınız.
        
Yetenek Rolleri;

\`yazılım\` - <@&${roles["rub-developer"]}>,
\`ressam\` - <@&${roles["rub-ressam"]}>,
\`vokal\` - <@&${roles["rub-vocal"]}>
\`yazar\` - <@&${roles["rub-yazar"]}>,
\`youtuber\` - <@&${roles["rub-youtuber"]}>,
\`instagrammer\` - <@&${roles["rub-instagrammer"]}>
\`temsilci\` - <@&${roles["rub-envoy"]}>,
\`tasarım\` - <@&${roles["rub-designer"]}>
\`müzisyen\` - <@&${roles["rub-musician"]}>,
\`yayıncı\` - <@&${roles["rub-streamer"]}>,
    
Örnek kullanım;
\`${prefix}yetenek <@Jyross/ID> yazılım\`
`)).then(x => x.delete({ timeout: 31000 }))

}

if(role === "yazılım") {
    jyros.roles.cache.has(roles["rub-developer"]) ? jyros.roles.remove(roles["rub-developer"]) : jyros.roles.add(roles["rub-developer"]) 
    message.react(emojis.yes)
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-ability"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıya "Yazılım" rolünü aldı/verdi.`))
//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıya "Yazılım" rolünü aldı/verdi.`))

}

if(role === "ressam") {
    jyros.roles.cache.has(roles["rub-ressam"]) ? jyros.roles.remove(roles["rub-ressam"]) : jyros.roles.add(roles["rub-ressam"]) 
    message.react(emojis.yes)
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-ability"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıya "Ressam" rolünü aldı/verdi.`))
//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıya "Ressam" rolünü aldı/verdi.`))

}

if(role === "vokal") {
    jyros.roles.cache.has(roles["rub-vocal"]) ? jyros.roles.remove(roles["rub-vocal"]) : jyros.roles.add(roles["rub-vocal"]) 
    message.react(emojis.yes)
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-ability"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıya "Vokal" rolünü aldı/verdi.`))
//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıya "Vokal" rolünü aldı/verdi.`))

}

if(role === "yazar") {
    jyros.roles.cache.has(roles["rub-yazar"]) ? jyros.roles.remove(roles["rub-yazar"]) : jyros.roles.add(roles["rub-yazar"]) 
    message.react(emojis.yes)
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-ability"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıya "Yazar" rolünü aldı/verdi.`))
//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıya "Yazar" rolünü aldı/verdi.`))

}

if(role === "youtuber") {
    jyros.roles.cache.has(roles["rub-youtuber"]) ? jyros.roles.remove(roles["rub-youtuber"]) : jyros.roles.add(roles["rub-youtuber"]) 
    message.react(emojis.yes)
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-ability"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıya "Youtuber" rolünü aldı/verdi.`))
//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıya "Youtuber" rolünü aldı/verdi.`))

}

if(role === "instagrammer") {
    jyros.roles.cache.has(roles["rub-instagrammer"]) ? jyros.roles.remove(roles["rub-instagrammer"]) : jyros.roles.add(roles["rub-instagrammer"]) 
    message.react(emojis.yes)
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-ability"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıya "İnstagrammer" rolünü aldı/verdi.`))
//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıya "İnstagrammer" rolünü aldı/verdi.`))

}

if(role === "temsilci") {
    jyros.roles.cache.has(roles["rub-envoy"]) ? jyros.roles.remove(roles["rub-envoy"]) : jyros.roles.add(roles["rub-envoy"]) 
    message.react(emojis.yes)
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-ability"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıya "Temsilci" rolünü aldı/verdi.`))
//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıya "Temsilci" rolünü aldı/verdi.`))

}

if(role === "tasarım") {
    jyros.roles.cache.has(roles["rub-designer"]) ? jyros.roles.remove(roles["rub-designer"]) : jyros.roles.add(roles["rub-designer"]) 
    message.react(emojis.yes)
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-ability"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıya "Tasarım" rolünü aldı/verdi.`))
//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıya "Tasarım" rolünü aldı/verdi.`))

}

if(role === "müzisyen") {
    jyros.roles.cache.has(roles["rub-musician"]) ? jyros.roles.remove(roles["rub-musician"]) : jyros.roles.add(roles["rub-musician"]) 
    message.react(emojis.yes)
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-ability"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıya "Müzisyen" rolünü aldı/verdi.`))
//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıya "Müzisyen" rolünü aldı/verdi.`))

}

if(role === "yayıncı") {
    jyros.roles.cache.has(roles["rub-streamer"]) ? jyros.roles.remove(roles["rub-streamer"]) : jyros.roles.add(roles["rub-streamer"]) 
    message.react(emojis.yes)
    client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-ability"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıya "Yayıncı" rolünü aldı/verdi.`))
//cmd-genel >>>
client.guilds.cache.get(config.guildID).channels.cache.get(cnls["cmd-genel"]).send(embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı kullanıcı ${jyros} (\`${jyros.id}\`) adlı kullanıcıya "Yayıncı" rolünü aldı/verdi.`))

}

}};
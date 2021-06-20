const { MessageEmbed } = require('discord.js')
const config = require("../settings/config.json");
module.exports = {
conf: {
aliases: ["cevir","çevir","dcçevir","dc-çevir","çvr","cvr"],
name: "dc",
},
run: async (client, message, args) => {
const dogruluk = [
"Bir zaman makinen olsa hangi zaman dönemine giderdin?",
"Zeka ve güzellik arasında bir seçim yapmak zorunda kalsan neyi seçerdin?",
"Hayatın film olsa seni kim oynardı?",
"Çekici olduğunu düşündüğün bir öğretmenin oldu mu hiç? Kim? Neden?",
"Küçükken en sevdiğin çizgi film hangisiydi?",
"Çıplak uyur musun?",
"Seninle ilgili en garip şey ne? Bununla gurur duyuyor musun?",
"Bir günlüğüne görünmez olsan ne yapardın?",
"Hiç ilişkiye girdinmi?",
"Hiç sana çıkma teklif eden birileri oldumu?",
"Herhangi birine beni bu kişiye ayarla sevgili olalım dedin mi? Dediysen anlat!",
"En sevdiğin yemeği buradaki biriyle paylaşsan kiminle paylaşırdın?",
"Vücudunda en beğendiğin bölüm neresidir?",
"Hayatta yaptığın en büyük kötülük nedir?",
"Anne babana söylediğin en büyük yalan nedir?",
"Sana kendini ne güvensiz hissettirir?",
"En büyük korkun nedir?",
"Bir hatanı geri alma şansın olsa hangi hatanı geri almak isterdin?",
"Herkesin severek okuduğu/izlediği ama senin sevmediğin bir kitap ya da film var mı?",
"Burada bulunan kişilerden kendine en yakın hissettiğin kişi kimdir?",
"Kendin istemediğin halde ailenin zoruyla yaptığın bir şeyi bize söyler misin?",
"Şimdiye kadar aldığın hediyeler içinde seni en mutlu eden hediye nedir?",
"Buradaki kişilerden ölmesini istediğin birini söyler misin? Neden?",
"Buradaki kişilerden birine aşık olmak zorundasın. Kim olurdu? (Karşı cins)",
"Issız bir adaya düşsen bu odadakilerden kim yanında olsun istersin?",
"Telefonunda/Bilgisayarında en çok kullandığın ve asla silmem dediğin uygulama hangisidir?",
"Bir yangın anında hepimiz aynı binada kalsak buradakilerden en son kimi kurtarırdın?",
"Baba tarafından en sevmediğin kişi kimdir? Tek bir kişi olsun hepsi değil sadfkadsf",
"Dünya’da en çok görmek istediğin yer neresidir?",
"Gördüğün rüyalar içinde seni en çok etkileyeni bize anlat."
]
const cesaret = [
"Sana gelen en son mesajı sesli oku.",
"Alfabeyi tersten oku.",
"Bir tur boyunca maymun gibi davran.",
"Bebek sesiyle şarkı söyle.",
"Rastgele birine senden nefret ediyorum mesajı at. (Ekran paylaşma veya Ekran görüntüsü gerekiyor.)",
"2 dakika boyunca horoz taklidi yap.",
"Söyleyeceğin her cümlenin sonunda 31 de.",
"3 kişiye senden hoşlanıyorum diye mesaj at. (Ekran paylaşma veya Ekran görüntüsü gerekiyor.)",
"Git elini yüzünü yıka kendine gel aq",
"En nefret ettiğin kişiye onu sevdiğini söyle. (Ekran paylaşma veya Ekran görüntüsü gerekiyor.)",
"Sevgiline ayrılmak istediğini söyle. (Ekran paylaşma veya Ekran görüntüsü gerekiyor.)",
"Bildiğin en ağır küfrü et.",
"İnstagram hesabından gizli hesaplarını takip ettiğin 3 hesabı takipten çıkar.",
"Karadeniz şivesi ile çok ciddi bir olay anlat.",
"Herhangi bir müzik botundan açılan şarkı ile karaoke yap."
]
let embed = new MessageEmbed()
if (!message.member.voice.channel) return message.channel.send(embed.setDescription(`Ses kanalında değilsin!`))
if(message.member.voice.channel.members.size < 3) return message.channel.send(embed.setDescription(`Ses kanalında en az 3 kişi olmalı!`))
var dogrulukcevap = dogruluk[Math.floor(Math.random() * dogruluk.length)];
var cesaretcevap = cesaret[Math.floor(Math.random() * cesaret.length)];
let dogrulukembed = embed.setDescription(`${message.author} kurbanın ${message.member.voice.channel.members.filter(a => a.id !== message.author.id).random()}
**${dogrulukcevap}**`)
let cesaretembed = embed.setDescription(`${message.author} kurbanın ${message.member.voice.channel.members.filter(a => a.id !== message.author.id).random()}
**${cesaretcevap}**`)
let secilenid = message.member.voice.channel.members.filter(a => a.id !== message.author.id).random()
let secim = embed.setDescription(`${message.author} kurbanın ${message.member.voice.channel.members.filter(a => a.id !== message.author.id).random()} Doğruluk mu ? Cesaretlik mi?`).setFooter(`${config.embed.footer}`).setColor("RANDOM")  
message.channel.send(secim).then(async jrs => {
jrs.react("❕").then(gereksiz => jrs.react("❔"))
const filtre = (reaction, user) => {
return ["❕", "❔"].includes(reaction.emoji.name) && user.id === secilenid.id;
}
jrs.awaitReactions(filtre, { max: 1, time: 30000}).then(collected => {
const tepki = collected.first();  
if(tepki.emoji.name == "❕") {
jrs.edit(cesaretembed)}
if(tepki.emoji.name == "❔") {
jrs.edit(dogrulukembed)}})})
}}
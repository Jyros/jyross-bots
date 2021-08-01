const cnls = require("../base/channels.json");
module.exports = (message) => {

    let iltifatlar = [
        "Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.",
        "Mucizelerden bahsediyordum. Tam o sırda gözlerin geldi aklıma.",
        "Aklıma sevmek geldiğinde, gözlerimin önüne sen geliyorsun. Günün her saati canım sevmek istiyor ve seni düşünüyor kalbim.",
        "Seni severek meslek sahibi oldum ben. Seni sevmeye başladıkça şair oldum.",
        "İnsana asla fazla gelmeyecek iki şey var. Birisi sen diğeri ise  senin kokun.",
        "Seni her yerde görebileceğim arzusu, belki de bu hayattaki tek yaşama sebebim.",
        "Seni de bu dünyada görünce yaşama sebebimi anladım. Meğer senmişsin beni dünyada yaşamaya zorlayan.",
        "Gözlerinin gördüğü her yer benimdir. Bakışına şahit olan her toprak benim de vatanımdır.",
        "Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.",
        "Seni kelimeler ile anlatmak çok zor. Muhteşem desem yine eksik kalıyor anlamın.",
        "Sabah olmuş. Sen mi uyandın yoksa gönlüme güneş mi doğdu.",
        "Aklımda işin yok, durup durup aklıma gelme! Yanıma gel, mevzu kalbimde.",
        "Yürüdüğün yol olmak isterim hiç aksamadan seni yürütmek için bu hayatta.",
        "Seni özlediğim kadar kimseyi özlemedim, gecelerim kıskanır oldu artık sana çektiğim hasreti.",
        "Gülüşün kelebek olsaydı birgün değil, bin yıl yaşardı",
        "Mutluluk nedir dediler, yanında geçirdiğim anların anlamını anlatamadım.",
        "Hayatımda, ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.",
        "Bu dünyada bir sürü insan var, kimi mutlu kimi mutsuz, kimi gülüyor kimi ağlıyor, ama iyiliğe ve güzelliklere layık olan tek bi insan var oda şuan mesajımı okuyor.",
        "Haritan var mı? Gözlerinde kayboldum da.",
        "İzninle bu akşam aklım senede kalacak.",
        "Mucizelerden bahsediyordum. Tam o sırada gözlerin geldi aklıma.",
        "Benim için mutluluğun tanımı, seninle birlikteyken geçirdiğim vakittir.",
        "Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.",
        "Seni gören kelebekler, narinliğin karşısında mest olur.",
        "Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.",
        "Seni yanlışlıkla cennetten düşürmüşler. Dünyada yaşayan bir meleksin sen.",
        "Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.",
        "Mavi gözlerin, gökyüzü oldu dünyamın.",
        "Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.",
        "Huzur kokuyor geçtiğin her yer.",
        "Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.",
        "Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.",
        "Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.",
        "Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.",
        "Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.",
        "Etkili gülüş kavramını ben senden öğrendim.",
        "Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.",
        "Gözlerinle baharı getirdin garip gönlüme.",
        "Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.",
        "Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.",
        "Sen bu dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.",
        "Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.",
        "Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.",
        "Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.",
        "Aynı zaman diliminde yaşamak benim için büyük ödüldür.",
        "Biraz Çevrendeki İnsanları Takarmısın ?",
        "Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.",
        "Taş gibi kızsın ama okey taşı… Elden elde gidiyorsun farkında değilsin.",
        "Mucizelerden bahsediyordum, Aklıma Sen Geldin..."
        ];
        let iltifatSayi = 0;
        let iltifat = iltifatlar[Math.floor(Math.random() * iltifatlar.length)];
        
        if (cnls["cmd-chat"] && message.channel.id === cnls["cmd-chat"] && !message.author.bot) {
        iltifatSayi++;
        if (iltifatSayi >= 75) {
        iltifatSayi = 0;
        message.reply(iltifat)
            }
        }
        
};

module.exports.conf = {
name: "message",
c_name:"iltifat",
};
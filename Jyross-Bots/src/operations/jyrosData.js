const db = require('quick.db');
const kdb = new db.table("kullanıcı")
const ydb = new db.table("yetkili");
const cdb = new db.table("cezalar")
const ms = require('ms');
const config = require("../base/config.json");
const roles = require("../base/roles.json");
const emojis = require("../base/emojis.json");
const cnls = require("../base/channels.json");
const { MessageEmbed } = require('discord.js');
const moment = require("moment")
moment.locale("tr")
class jyrosData {

    static cezaVer(cezanumara, jyros, yetkili, sebep, time, tur, cezatipi) {
        
let cezano = cezanumara

      let ceza = {
        cezaid: cezano,
        Cezalı: jyros.id,
        Yetkili: yetkili.id,
        cezaTuru: tur,
        Tip: cezatipi,
        Sebep: sebep,
        Süre: time,
        Zaman: Date.now()
      };

      kdb.set(`ceza.${cezano}`, ceza);
      kdb.push(`cezalar.${jyros.id}`, ceza);

      if(cezatipi === "TEMP-JAIL") {
        cdb.push(`tempjail`, { cezaID: cezano,  CezaTürü: "Cezalandırılma", cezaKalkma: Date.now()+ms(time) })
        kdb.set(`tempjail.${jyros.id}`, "temp-jail");
        kdb.add(`cezapuan.${jyros.id}`, 15)
        kdb.add(`jailler.${jyros.id}`, 1)
        kdb.add(`jailler.${yetkili.id}`, 1)
      } else if (cezatipi === "JAIL") {
        cdb.push(`jail`, { cezaID: cezano,  CezaTürü: "Cezalandırılma" })
        kdb.set(`jail.${jyros.id}`, "cezalı");
        kdb.add(`cezapuan.${jyros.id}`, 20)
        kdb.add(`jailler.${jyros.id}`, 1)
        ydb.add(`jailler.${yetkili.id}`, 1)
      } else if (cezatipi === "BAN") {
        cdb.push(`ban`, { cezaID: cezano,  CezaTürü: "Yasaklama" })
        kdb.add(`cezapuan.${jyros.id}`, 30)
        kdb.add(`banlar.${jyros.id}`, 1)
        ydb.add(`banlar.${yetkili.id}`, 1)
      } else if (cezatipi === "CHAT-MUTE") {
        cdb.push(`chatmute`, { cezaID: cezano,  CezaTürü: "Susturulma", cezaKalkma: Date.now()+ms(time)})
        kdb.add(`cezapuan.${jyros.id}`, 10)
        kdb.set(`chatmuted.${jyros.id}`, "chatmuted");
        kdb.add(`muteler.${jyros.id}.chat`, 1)
        ydb.add(`muteler.${yetkili.id}.chat`, 1)
      } else if (cezatipi === "VOICE-MUTE") {
        cdb.push(`voicemute`, { cezaID: cezano,  CezaTürü: "Susturulma", cezaKalkma: Date.now()+ms(time)})
        kdb.add(`cezapuan.${jyros.id}`, 10)
        kdb.set(`voicemuted.${jyros.id}`, "voicemuted");
        kdb.add(`muteler.${jyros.id}.voice`, 1)
        ydb.add(`muteler.${yetkili.id}.voice`, 1)
      } else if (cezatipi === "WARN") {
        cdb.push(`uyarilar.${jyros.id}`, `${yetkili} tarafından **${moment().format('LLL')}** tarhinde **${sebep}** sebebi ile uyarı aldı.`)
        kdb.add(`cezapuan.${jyros.id}`, 5)
        kdb.add(`uyarilar.${jyros.id}`, 1)
        ydb.add(`uyarilar.${yetkili.id}`, 1)
      } else if (cezatipi === "ADS") {
        cdb.push(`ads`, { Sebep: "Reklam", cezaID: cezano,  CezaTürü: "Reklam", cezaKalkma: Date.now()+ms(time)})
        kdb.add(`cezapuan.${jyros.id}`, 25)
        kdb.add(`ads.${jyros.id}`, 1)
        ydb.add(`banlar.${yetkili.id}`, 1)
      }

db.add(`cezano.${config.guildID}`, 1)
}

static cezaBilgi(cezano) {
  let cezabilgi = kdb.fetch(`ceza.${cezano}`)
  return cezabilgi;
}

static cezanoVer() {
  let cezano = db.get(`cezano.${config.guildID}`);
  return cezano;
}

static cezaGetir(jyros) {
  let cezagetir = kdb.get(`cezalar.${jyros.id}`)
  return cezagetir;
}

static uyarıVer(jyros) {
  let uyarıVer = cdb.get(`uyarilar.${jyros.id}`)
  return uyarıVer;
}

static uyarıKaldır(jyros) {
  uyarıKaldır = cdb.delete(`uyarilar.${jyros.id}`),
  kdb.delete(`uyarilar.${jyros.id}`)

}

static cmuteKaldır(jyros) {
 let cmuteKaldır = kdb.delete(`chatmuted.${jyros.id}`, "chatmuted");
 return cmuteKaldır;
}

static vmuteKaldır(jyros) {
  let vmuteKaldır = kdb.set(`voicemuted.${jyros.id}`, "voicemuted");
  return vmuteKaldır;
 }

static jailKaldır(jyros) {
  let jailKaldır = kdb.delete(`tempjail.${jyros.id}`, "temp-jail")
  return jailKaldır;
}


static cezaVeriKaldır(jyros) {
  let cezakaldır;
  cezakaldır =  kdb.delete(`sicil.${jyros.id}`),
                kdb.delete(`cezapuan.${jyros.id}`),
                kdb.delete(`cezalar.${jyros.id}`),
                kdb.delete(`uyarilar.${jyros.id}`),
                kdb.delete(`ads.${jyros.id}`),
                kdb.delete(`muteler.${jyros.id}.voice`),
                kdb.delete(`muteler.${jyros.id}.chat`),
                kdb.delete(`banlar.${jyros.id}`),
                kdb.delete(`jailler.${jyros.id}`)
  return cezakaldır;
}

static erkekTeyitVer(jyros) {
ydb.add(`teyit.${jyros.id}.erkek`, 1);
ydb.add(`teyit.${jyros.id}.toplam`, 1);
}

static kızTeyitVer(jyros) {
ydb.add(`teyit.${jyros.id}.kiz`, 1);
ydb.add(`teyit.${jyros.id}.toplam`, 1);
}

}

module.exports = jyrosData;
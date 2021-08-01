const ErrorCodes = {

    "YetersizYetki": { 
        "message": "Verilen kaynağa erişim izniniz yok. (Yetersiz Yetki)",
        "code":"4006" 
    },
    
    "RolHata": {
        "message": "Bilinmeyen rol",
        "code":"10011"
    }, 
    
    "MesajHata": {
        "message":"Bu kullanıcıya mesaj gönderilemiyor.",
        "code":"50007"
    },

    "BilinmeyenHata": {
        "message":"Bilinmeyen bir hata oluştu.",
        "code":"1000"
    },
    
    "KanalHata": {
        "message":"Geçersiz kanal kimliği belirtildi.",
        "code":"4005"
    },

    "KullanıcıHata": {
        "message":"Belirtilen kullanıcı kimliği geçersizdi.",
        "code":"4010"
    },
    
    "KelimeHata": { 
        "message":"Komut, yetersiz karakter/cümle/kelime içeriyor.",
        "code":"208"
    },
    
    "DataHata": {    
        "message": "Sisteme kayıtlı veri bulunamadı. / İstek bulunamadı.",
        "code":"306"
    },
    
    "SesHata": {
        "message":"Bir istemcinin ses kanalıyla bağlantısı kesildi.",
        "code":"13"
    },

    "KullanıcıHata2": {
        "message": "Belirtilen kullanıcının komutu kullanan kullanıcıyla aynı kişi olması.",
        "code":"726"
    },

    "KullanıcıHata3": {
        "message": "Yetersiz bot yetkisi.",
        "code":"249"
    },

    "KullanıcıHata4": {
        "message": "İşlem yapılmaya çalışılan kullanıcı komutu kullanan kullanıcı ile aynı yetkide bulunuyor.",
        "code":"324"
    }


}

module.exports = { 
    ErrorCodes 
}
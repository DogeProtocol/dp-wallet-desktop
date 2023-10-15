// Code goes here
var keySize = 256;
var ivSize = 128;
var iterations = 100;

function encrypt(msg, pass) {
    if (pass.length < 16) {
        return null;
    }
    
    var salt = CryptoJS.lib.WordArray.random(128 / 8);

    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize / 32,
        iterations: iterations
    });

    var iv = CryptoJS.lib.WordArray.random(128 / 8);

    var encrypted = CryptoJS.AES.encrypt(msg, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC

    });

    // salt, iv will be hex 32 in length
    // append them to the ciphertext for use  in decryption
    
    var transitmessage = salt.toString() + iv.toString() + encrypted.toString();
    //console.log("encrypt1");
    decrypted = decrypt(transitmessage, pass);
    if (decrypted == null) {
        //console.log("error decrypting 1");
        return null;
    }
    //console.log("encrypt2");
    var msg1 = decrypted.toString(CryptoJS.enc.Utf8);
    if (msg != msg1) {
        //console.log("error decrypting 2 ");
        return null;
    }

    //console.log("encrypt ok");
    return transitmessage;
}

function decrypt(transitmessage, pass) {
    if (transitmessage.length < 65) {
        return null;
    }
    
    var salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
    
    var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32))
    var encrypted = transitmessage.substring(64);
    
    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize / 32,
        iterations: iterations
    });
    
    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC

    })
    var msg1 = decrypted.toString(CryptoJS.enc.Utf8);
    //console.log("decrypted ok");

    return decrypted;
}
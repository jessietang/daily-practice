/**
 * Created by jessietang on 2017/7/29.
 */
//CBCģʽ����
function encryptByDESModeCBC(message) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var ivHex = CryptoJS.enc.Utf8.parse(key);
    encrypted = CryptoJS.DES.encrypt(message, keyHex, {
            iv:ivHex,
            mode: CryptoJS.mode.CBC,
            padding:CryptoJS.pad.Pkcs7
        }
    );
    return encrypted.ciphertext.toString();
}
//CBCģʽ����
function decryptByDESModeCBC(ciphertext2) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var ivHex = CryptoJS.enc.Utf8.parse(key);
// direct decrypt ciphertext
    var decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Hex.parse(ciphertext2)
    }, keyHex, {
        iv:ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
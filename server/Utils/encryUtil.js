let crypto = require('crypto'); 
let md5 = crypto.createHash('md5'); 
class EncryUtil{
    encodeMD5(value){
        return md5(value);
    }
}

module.exports = EncryUtil;
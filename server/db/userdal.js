let BaseDal = require('./db')
let db = new BaseDal()
let ResultInfo = require('../common/resultInfo')
let resultInfo;
class UserDal {
    login(req, res) {
        let userNo = req.body.userNo;
        let passWord = req.body.passWord;
        let rember = req.body.rember;
        let sql = `select * from super_user where userNo='${userNo}' and userPassword='${passWord}'`
        db.execSql(sql, (err, data) => {
            if (err) {
                res.send(new ResultInfo(false, data, "登录失败"))
            } else {
                if (data.length) {
                    resultInfo = new ResultInfo(true, data, "登录成功")
                    res.json(resultInfo);
                } else {
                    resultInfo = new ResultInfo(false, data, "登录失败");
                    res.json(resultInfo)
                }
            }
        });
    }


}

module.exports = UserDal
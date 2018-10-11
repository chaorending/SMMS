let BaseDal = require('./db')
let db = new BaseDal()
let ResultInfo = require('../common/resultInfo')
let resultInfo;
class UserDal {
    login(req, res) {
        let userNo = req.body.userNo;
        let passWord = req.body.userPassword;
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

    updateuserInfo(req, res) {
        let userName = req.body.userName;
        let passWord = req.body.userPassword;
        let id = req.body.id;
        let sql = `UPDATE super_user set userName='${userName}',userPassword='${passWord}' where id=${id}`;
        db.execSql(sql, (err, data) => {
            if (err) {
                res.send(new ResultInfo(false, data, "修改失败"))
            } else {
                resultInfo = new ResultInfo(true, data, "修改成功")
                res.json(resultInfo);

            }
        });
    }



}

module.exports = UserDal